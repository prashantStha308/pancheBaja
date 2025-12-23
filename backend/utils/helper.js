import {
    uploadToCloudinary,
    deleteFromCloudinary
} from "../services/cloudinary.services.js";
import { ApiError } from "./ApiError.js";

// Libraries
import mongoose from "mongoose";

// Models
import SavedTrack from "../models/saves/trackSave.model.js";
import SavedPlaylist from "../models/saves/playlistSave.model.js";
import Following from "../models/following.model.js"
import Track from "../models/track.model.js";
import Playlist from "../models/playlist.model.js";
import User from "../models/user.model.js";

// HANDLE DATA
export const handleFilesUploads = async ( files ) => {
    if (!files.coverArt) { throw new ApiError(400, 'Missing coverArt') };
    if (!files.track) { throw new ApiError(400, 'Missing Audio file') };

    // Upload audio and image files
    const [trackRes, imgRes] = await Promise.all([uploadToCloudinary(files.track[0].buffer, 'track', 'video'), uploadToCloudinary(files.coverArt[0].buffer, 'image', 'image')]);

    // create audio object
    const audioRes = {
        src: trackRes.secure_url,
        publicId: trackRes.public_id
    };
    // create coverArt object
    const coverArt = {
        src: imgRes.secure_url,
        publicId:  imgRes.public_id
    };
    
    return { audioRes , coverArt }
}

export const handleImageUploads = async (file) => {

    const imgRes = await uploadToCloudinary(file.buffer, 'image', 'image');
    const img = {
        src: imgRes.secure_url,
        publicId:  imgRes.public_id
    };    
    return img;
}
// ---------------------------------------------------------------------------------------------------------------------

// GET DATA

// [USER DATA]
export const getFollowers = async (userId) => {
    return Following.find({ receiver: userId }).select('sender').populate({
        path: 'sender',
        select: '_id username role profilePicture'
    }).lean();
}

export const getFollowings = async (userId) => {
    return Following.find({ sender: userId }).select('receiver').populate({
        path: 'receiver',
        select: '_id username role profilePicture'
    }).lean();
}

// [AUDIO]
export const getSavedTracks = async (userId) => {
    return SavedTrack.find({ savedBy: userId }).select('track').populate({
        path: 'track',
        select: "_id name primaryArtist coverArt genre coverArt "
    }).lean();
}
export const getSavedPlaylist = async (userId) => {
    return SavedPlaylist.find({ savedBy: userId }).select('playlist').populate({
        path: 'playlist',
        math: { type: 'playlist' },
        select: "_id name type createdBy primaryArtist coverArt"
    }).lean();
}

export const getCreatedPlaylist = async (userId) => {
    return Playlist.find({ createdBy: userId }).populate({
        path: 'artists',
        select: '_id username role profilePicture'
    }).lean();
}

export const getDataByGenre = async( model, genres = [] ) => {

    return model.find({genre: {$in: genres}}).populate({
        path: 'artists',
        select: '_id username role profilePicture'
    }).lean();
}
// ---------------------------------------------------------------------------------------------------------------------

// UPDATE DATA
export const updateImageFile = async (doc, key = "coverArt", imageFile) => {
    let publicID;
    if (imageFile) {
        const imgRes = await uploadToCloudinary(imageFile.buffer, 'image', 'image');

        if (doc[key]?.publicId) {
            await deleteFromCloudinary(doc[key].publicId, 'image');
        }

        doc[key] = {
            src: imgRes.secure_url,
            publicId: imgRes.public_id
        };
        publicID = imgRes.public_id;
    }
    return publicID;
};

export const updateTrackAffiliatedPlaylists = async (track) => {
    const playlistsHavingTrack = await Playlist.find({ trackList: track._id }).populate('trackList');

    for (const playlist of playlistsHavingTrack) {
        playlist.totalDuration = (playlist.totalDuration || 0) - (track.totalDuration || 0);
        
        const updatedTrackList = playlist.trackList.filter(track => !track._id.equals(track._id));
        playlist.trackList = updatedTrackList;

        await playlist.save();
    }
}

export const updateTrackAffiliatedArtists = async (trackId) => {
    const artists = await User.find({ trackList: trackId, role: 'artist' });

    for(const artist of artists) {
        const updatedArtistTrackList = artist.trackList.filter(track => track !== trackId);
        artist.trackList = updatedArtistTrackList;
        await artist.save();
    }
}
// ---------------------------------------------------------------------------------------------------------------------