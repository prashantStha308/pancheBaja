import mongoose from "mongoose";
// Models
import Track from "../models/track.model.js";
// Helpers and Utils
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    handleFilesUploads
} from "../utils/helper.js";
import {
    checkValidationResult,
    validateMongoose,
    validatePermission,
    validateExistance
} from "../utils/validator.js";
import {
    cleanUpFailedUploads,cleanAffiliatedTrackData, removeTrackMediaFromCloudinary,
    getQueryFilteredTracks,
    getTrackSavedBy,
    updateTrackCoverArt, updateTrackFields,
    getAudioDuration
} from "../helpers/track.helper.js";


export const createTrack = async (req, res, next) => {
    let audioId, coverId;
    try {
        const userId = req.user.id;
        checkValidationResult(req);
        let { name, visibility, artists = [], genre = [] } = req.body;

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
                streamUrl: `/api/track/${audioRes.publicId.split('/')[1]}/stream`,
                publicId: audioRes.publicId.split('/')[1]
            },
            visibility,
            totalDuration,
            genre
        })
        res.status(201).json(new ApiResponse(201, 'Track Created Successfully', {id: track._id}));

    } catch (error) {
        console.error("deleteing files");
        await cleanUpFailedUploads(audioId, coverId);
        return next(error);
    }
}

export const getAllTracks = async (req, res, next) => {
    try {
        checkValidationResult(req);
        const trackRes = await getQueryFilteredTracks(req);

        res.status(200).json(new ApiResponse(200, 'Successfully fetched tracks', trackRes));
    } catch (error) {
        next(error);
    }
}

export const getTrackById = async (req, res, next) => {
    checkValidationResult(req);

    const { trackId } = req.params;
    validateMongoose(trackId);

    const track = await Track.findById(trackId).lean();
    validateExistance(track);
    const savedBy = await getTrackSavedBy(trackId);

    res.status(200).json(new ApiResponse(200, "Fetched Track Successfully", {
        ...track,
        savedBy,
        saveCount: savedBy.length
    }));
}

export const deleteTrackById = async (req, res, next) => {
    checkValidationResult(req);
    let { trackId } = req.params;
    validateMongoose(trackId);

    const track = await Track.findByIdAndDelete(trackId);
    validateExistance(track);

    await removeTrackMediaFromCloudinary(track);
    await cleanAffiliatedTrackData(track);

    res.status(200).json(new ApiResponse(200, "Deleted Track Successfully", { id: trackId }));
}

export const updateTrackById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        checkValidationResult(req);
        const { trackId } = req.params;
        const imageFile = req.file;
        
        const track = await Track.findById(trackId);
        validateExistance(track);

        validatePermission(track.primaryArtist, userId);
        
        updateTrackFields(req , track);
        await updateTrackCoverArt(track , imageFile);

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
    checkValidationResult(req);
    const { trackId } = req.params;

    validateMongoose(trackId);

    const track = await Track.findById(trackId);
    validateExistance(track);

    track.playCount++;
    await track.save();

    res.status(200).json(new ApiResponse(200, "playcount++"));
}