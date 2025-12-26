import mongoose from "mongoose";
// Models
import Track from "../models/track.model.js";
// Helpers and Utils
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    handleFilesUploads,
    getDataByGenre
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
    getAudioDuration,
    getIdTrack
} from "../helpers/track.helper.js";


/* [POST] */
export const createTrack = async (req, res, next) => {
    let audioId, coverId;
    try {
        const user = req.user;
        checkValidationResult(req);
        let { name, visibility, artists = [], genre = [] } = req.body;

        if (!Array.isArray(artists) || artists.length === 0) {
            artists = [user._id];
        }

        const { audioRes, coverArt } = await handleFilesUploads(req.files);
        audioId = audioRes.publicId;
        coverId = coverArt.publicId;
        const totalDuration = await getAudioDuration(req.files.track[0]);

        const track = await Track.create({
            name,
            primaryArtist: user._id,
            artists,
            coverArt,
            audio: {
                // update the route path in track.route.js and change here
                streamUrl: `/api/track/${audioRes.publicId.split('/')[1]}/stream`,
                publicId: audioRes.publicId.split('/')[1]
            },
            visibility,
            totalDuration,
            genre
        }).exec();

        res.status(201).json(new ApiResponse(201, 'Track Created Successfully', {id: track._id}));

    } catch (error) {
        console.error("deleteing files");
        await cleanUpFailedUploads(audioId, coverId);
        return next(error);
    }
}

// ---------------------------------------------------------------------------------------------------------------------

/* [GET] */
export const getAllTracks = async (req, res, next) => {
    checkValidationResult(req);
    const trackRes = await getQueryFilteredTracks(req);

    res.status(200).json(new ApiResponse(200, 'Successfully fetched tracks', trackRes));
}

export const getTrackById = async (req, res, next) => {
    checkValidationResult(req);

    const { trackId } = req.params;
    validateMongoose(trackId);

    const track = await getIdTrack(trackId);
    const savedBy = await getTrackSavedBy(trackId);

    res.status(200).json(new ApiResponse(200, "Fetched Track Successfully", {
        ...track,
        savedBy,
        saveCount: savedBy.length
    }));
}

// ---------------------------------------------------------------------------------------------------------------------

/* [PUT/PATCH] */
export const updateTrackById = async (req, res, next) => {
    try {
        const user = req.user;
        checkValidationResult(req);
        const { trackId } = req.params;
        const imageFile = req.file;
        
        const track = await Track.findById(trackId).exec();
        validateExistance(track);

        validatePermission(track.primaryArtist, user._id);
        
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

    const track = await Track.findById(trackId).exec();
    validateExistance(track);

    track.playCount++;
    await track.save();

    res.status(200).json(new ApiResponse(200, "playcount++"));
}

// ---------------------------------------------------------------------------------------------------------------------

/* [DELETE] */
export const deleteTrackById = async (req, res, next) => {
    checkValidationResult(req);
    let { trackId } = req.params;
    validateMongoose(trackId);

    const track = await Track.findByIdAndDelete(trackId).exec();
    validateExistance(track);

    await Promise.all([removeTrackMediaFromCloudinary(track), cleanAffiliatedTrackData(track)]);

    res.status(200).json(new ApiResponse(200, "Deleted Track Successfully", { id: trackId }));
}