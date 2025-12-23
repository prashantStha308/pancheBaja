import mongoose from "mongoose";
import { deleteFromCloudinary } from "../services/cloudinary.services.js";
// Models
import Playlist from "../models/playlist.model.js";
// Utils and helpers
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    handleImageUploads,
    getDataByGenre
} from "../utils/helper.js";
import {
    checkValidationResult,
    validateMongoose,
    validatePermission,
} from "../utils/validator.js";
import {
    getArtistsFromTrackList,
    calculateTotalDuration,
    safeDeleteCloudinary,
    getQueryFilteredPlaylists, getIdPlaylist, getRawPlaylistById,
    getPlaylistSavedBy,
    deleteAssociatedPlaylistSaves,
    handleCoverArtUpdate,
    reorderTracks
} from "../helpers/playlist.helper.js";


/* [POST] */
// Create a Playlist
export const createPlaylist = async (req, res , next) => {
    let coverArtId;
    try {
        const userId = req.user.id;
        const body = req.body;

        checkValidationResult(req);

        // Validate tracklist in the body
        if (!Array.isArray(body.trackList) || body.trackList.length < 1) {
            throw new ApiError(400, "body.trackList must be an array containing atleast 1 track._id");
        }

        const artists = await getArtistsFromTrackList(body.trackList);
        const coverArt = await handleImageUploads(req.file);
        coverArtId = coverArt.publicId;

        const reorderedTrackList = await reorderTracks(body.trackList);
        const totalDuration = calculateTotalDuration(reorderedTrackList);

        const newPlaylist = await Playlist.create({
            ...body,
            createdBy: userId,
            trackList: reorderedTrackList,
            artists,
            coverArt,
            totalDuration
        });

        if (!newPlaylist) {
            throw new ApiError(500, "Some Error occured while creating playlist");
        }

        res.status(201).json(new ApiResponse(201, 'Created Playlist Successfully', { id: newPlaylist._id }));

    } catch (error) {
        await safeDeleteCloudinary(coverArtId, 'image');
        return next(error);
    }
}

// ---------------------------------------------------------------------------------------------------------------------

/* [GET] */

// Get All Playlist
export const getAllPlaylist = async (req, res, next) => {
    checkValidationResult(req);
    const playlists = await getQueryFilteredPlaylists(req);

    res.status(200).json(new ApiResponse(200, 'Fetched Playlists successfully', playlists));
}

export const getPlaylistById = async (req, res, next) => {
    checkValidationResult(req);
    const { playlistId } = req.params;
    validateMongoose(playlistId , "playlistId");

    const playlist = await getIdPlaylist(playlistId);

    const savedBy = await getPlaylistSavedBy(playlistId);

    res.status(200).json(new ApiResponse(200, "Fetched Playlist Successfully", {
        ...playlist,
        totalTracks: playlist.trackList.length,
        savedBy,
        saveCount: savedBy.length
    }));
}

// Get Playlists Created by a User by using their _id
export const getPlaylistByUserId = async (req, res) => {
    checkValidationResult(req);
    const { userId } = req.params;
    validateMongoose(userId, "userId");

    const playlist = await Playlist.find({createdBy: userId}).populate([
        { path: 'artists', select: '_id username profilePicture' },
        { path: 'createdBy', select: '_id username profilePicture' },
        {path: 'trackList', select: '_id name coverArt audio artists totalDuration'}
    ]).lean();

    res.status(200).json(new ApiResponse(200, "Fetched Playlists Successfully", playlist));
}

export async function getPlaylistsByGenre(req, res, next){
    checkValidationResult(req);

    let {genre} = req.params;
    genre = genre.split(",").map(g => g.trim());

    const similarSongs = await getDataByGenre(Playlist, genre);

    res.status(200).json(new ApiResponse(200, "Fetched tracks associated with the genres", similarSongs));
}

// ---------------------------------------------------------------------------------------------------------------------

/* [PUT/PATCH] [UPDATE] */

// Add a Track to an existing playlist. Playlist's id is passed via params
export const addTrackToPlaylist = async (req, res, next) => {
    const userId = req.user.id;
    checkValidationResult(req);
    const { playlistId } = req.params;
    const { trackId } = req.body;

    validateMongoose(playlistId , "playlistId");
    validateMongoose(trackId , "trackId");

    const playlist = await getRawPlaylistById(playlistId);
    validatePermission(playlist.createdBy , userId);

    if (playlist.trackList.includes(trackId)) {
        return res.status(200).json(new ApiResponse(200, "Track is already saved"));
    }

    playlist.trackList.push(trackId);
    await playlist.save();

    res.status(200).json(new ApiResponse(200, "Track added successfully"));
}

// Remove a track from the playlist that has the id passed via params
export const removeTrackFromPlaylist = async (req, res, next) => {
    const userId = req.user.id;
    checkValidationResult(req);
    const { playlistId } = req.params;
    const { trackId } = req.body;

    validateMongoose(playlistId , "playlistId");
    validateMongoose(trackId, "trackId");
    
    const playlist = await getRawPlaylistById(playlistId);
    validatePermission(playlist.createdBy, userId);

    const targetIndex = playlist.trackList.indexOf(trackId);
    if (targetIndex === -1) {
        return res.status(200).json(new ApiResponse(200, "Track doesn't exist in trackList"));
    } 

    playlist.trackList.splice(targetIndex, 1);
    await playlist.save();

    res.status(200).json(new ApiResponse(200, "Track removed from trackList"));
}

// Update the playcount of the playlist(will probably be unused)
export const updatePlayCount = async (req, res) => {
    checkValidationResult(req);
    const { playlistId } = req.params;
    validateMongoose(playlistId);

    const playlist = await getIdPlaylist(playlistId);
    playlist.playCount++;
    await playlist.save();

    res.status(200).json(new ApiResponse(200, "playcount++"));
}

export const updateTotalPlayDuration = async (req, res, next) => {
    // need to implemented
}

// Update the properties of a Playlist. Playlist._id is required via params
export const updatePlaylistById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        checkValidationResult(req);

        const { playlistId } = req.params;
        const {
            name,
            visibility,
            durationPlayed,
        } = req.body;
        const imageFile = req.file;

        validateMongoose(playlistId);

        const playlist = await getRawPlaylistById(playlistId);
        validatePermission(playlist.createdBy , userId);

        if (name) playlist.name = name;
        if (visibility) playlist.visibility = visibility;
        if (durationPlayed) playlist.durationPlayed = durationPlayed;

        await handleCoverArtUpdate( playlist , imageFile );
        await playlist.save();

        res.json({ data: playlist });
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
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

// ---------------------------------------------------------------------------------------------------------------------

/* [DELETE] */
// Delete the Playlist
export const deletePlaylistById = async (req, res) => {
    const userId = req.user.id;
    checkValidationResult(req);
    const { playlistId } = req.params;
    validateMongoose(playlistId , "playlistId");

    const playlist = await getIdPlaylist(playlistId);
    validatePermission(playlist.createdBy._id, userId)
    
    await Playlist.findByIdAndDelete(playlistId);
    await deleteAssociatedPlaylistSaves(playlistId);

    if (playlist.coverArt?.publicId && playlist.coverArt?.publicId !== ""  ) {
        await deleteFromCloudinary(playlist.coverArt.publicId, 'image');
    }

    res.status(200).json(new ApiResponse(200, "Playlist Deleted successfully", { id: playlist._id }));
}