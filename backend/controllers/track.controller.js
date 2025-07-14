import mongoose from "mongoose";
import Track from "../models/track.model.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../services/cloudinary.services.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { allTracks, cleanAffilicatedTrackData, getAudioDuration, getTrackSaves, handleFilesUploads , sortTracks } from "../utils/helper.js";
import { validatorMiddlewareError , validateMongoose } from "../utils/validator.js";


export const createTrack = async (req, res, next) => {
    let audioId, coverId;
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        validatorMiddlewareError(req);

        if (userRole !== "artist") {
            throw new ApiError(401, "Must be a valid artist to create a track");
        }

        let { name, visibility, artists = [], genre = [] } = req.body;

        if (!name || !visibility) {
            throw new ApiError(400, 'Required fields not submitted');
        }

        if (!Array.isArray(artists) || artists.length === 0) {
            artists = [userId];
        }

        const { audioRes, coverArt } = await handleFilesUploads(req.files);
        audioId = audioRes.publicId;
        coverId = coverArt.publicId;

        const totalDuration = await getAudioDuration(req.files.track[0]);

        const track = await Track.create({
            name,
            primaryArtist: userId,
            artists,
            coverArt,
            audio: {
                streamUrl: `/api/track/${audioRes.publicId}/stream`,
                publicId: audioRes.publicId.split('/')[1]
            },
            visibility,
            totalDuration,
            genre
        })

        if (!track) {
            throw new ApiError(500,"Something went wrong while creating track");
        }

        res.status(201).json(new ApiResponse(201, 'Track Created Successfully', {id: track._id}));

    } catch (error) {
        console.log("deleteing files");
        if (audioId) await deleteFromCloudinary(audioId, 'video');
        if (coverId) await deleteFromCloudinary(coverId, 'image');

        return next(error);
    }
}

export const getAllTracks = async (req, res, next) => {
    try {
        validatorMiddlewareError(req);
        let { sort } = req.query;

        const trackRes = sort ? await sortTracks(req.query) : await allTracks(req.query);

        res.status(200).json(new ApiResponse(200, 'Successfully fetched tracks', trackRes));
    } catch (error) {
        next(error);
    }
}

export const getTrackById = async (req, res, next) => {
    validatorMiddlewareError(req);

    const { trackId } = req.params;
    validateMongoose(trackId);

    const track = await Track.findById(trackId).lean();
    const savedBy = await getTrackSaves(trackId);

    res.status(200).json(new ApiResponse(200, "Fetched Track Successfully", {
        ...track,
        savedBy,
        saveCount: savedBy.length
    }));
}

export const deleteTrackById = async (req, res, next) => {
    validatorMiddlewareError(req);

    let { trackId } = req.params;
    validateMongoose(trackId);

    const track = await Track.findByIdAndDelete(trackId);
    if (!track) {
        throw new ApiError(400, 'Track not found');
    }
    
    if (track.audio.publicId) {
        await deleteFromCloudinary(track.audio.publicId, 'video');
    }
    if (track.coverArt.publicId) {
        await deleteFromCloudinary(track.coverArt.publicId, 'image');
    }

    // Updates affiliates
    await cleanAffilicatedTrackData(trackId);

    res.status(200).json(new ApiResponse(200, "Deleted Track Successfully", { id: trackId }));
}

export const updateTrackById = async (req, res, next) => {
    const userId = req.user.id;
    validatorMiddlewareError(req);
    const { trackId } = req.params;
    const {
        name,
        artists,
        visibility,
        genre,
    } = req.body;
    const imageFile = req.file;

    if (!userId) {
        throw new ApiError(401, "userId must be present");
    }

    try {
        const track = await Track.findById(trackId);
        if (!track) {
        return res.status(404).json({ message: 'Track not found' });
        }

        if (track.primaryArtist !== userId) {
            throw new ApiError(401, "Track can only be updated by the primaryArtist");
        }

        if (name) track.name = name;
        if (artists && Array.isArray(artists)) track.artists = artists;
        if (visibility) track.visibility = visibility;
        if (genre && Array.isArray(genre)) track.genre = genre;

        if (imageFile) {
            const imgRes = await uploadToCloudinary(imageFile.buffer, 'image', 'image');
            if (track.coverArt.publicId) {
                await deleteFromCloudinary(track.coverArt.publicId , 'image');
            }
            track.coverArt.src = imgRes.secure_url;
            track.coverArt.publicId = imgRes.public_id;
        }

        await track.save();
        res.json({ data: track });
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            // Format errors for the frontend
            const errors = {};
            for (let field in err.errors) {
            errors[field] = {
                message: err.errors[field].message
            };
            }
            return res.status(400).json({ errors });
        }
        next(err);
    }
}

export const updatePlayCount = async (req, res) => {
    const userId = req.user.id
    validatorMiddlewareError(req);
    const { trackId } = req.params;

    if (!userId) {
        throw new ApiError(401, "Must have a valid userId");
    }

    validateMongoose(trackId);

    const track = await Track.findById(trackId);
    if (!track) {
        throw new ApiError(404, "Track not found");
    }

    track.playCount++;
    await track.save();

    res.status(200).json(new ApiResponse(200, "playcount++"));
}