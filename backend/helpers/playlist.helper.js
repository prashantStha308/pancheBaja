// Services
import { deleteFromCloudinary } from "../services/cloudinary.services.js";
// Utils and Helpers
import { ApiError } from "../utils/ApiError.js";
// Models
import Playlist from "../models/playlist.model.js";
import Track from "../models/track.model.js";
import SavedPlaylist from "../models/saves/playlistSave.model.js";
import { validateExistance } from "../utils/validator.js";

export const validateBodyTrackList = (body) => {
    if (!Array.isArray(body.trackList) || body.trackList.length < 1) {
        throw new ApiError(400, "body.trackList must be an array containing atleast 1 track._id");
    }
}

export const getArtistsFromTrackList = async (trackList) => {
    return Promise.all(
        trackList.map(async (item) => {
            const artist = await Track.findById(item).populate({
                path: 'artists',
                select: '_id'
            });
            return artist;
        })
    )
}

export const calculateTotalDuration = (trackList) => trackList.reduce((sum, track) => {
    return sum + (track.totalDuration);
}, 0);

export const safeDeleteCloudinary = async (id, type) => {
    if (id && type) {
        await deleteFromCloudinary(id , type);
    } else {
        console.error("Undefined Id or type at safeDeleteCloudinary.");
    }
}

export const getQueryFilteredPlaylists = async (req) => {
    const { page = 1, limit = 5, name, artist, sort } = req.query;
    
    const queryObj = {};
    if (name) {
        queryObj['name'] = name;
    }
    if (artist) {
        queryObj['artists'] = artist;
    }

    const select = '_id username role profilePicture';
    const trackList = {
        path: 'trackList',
        select: '_id name createdBy artists audio coverArt totalDuration',
        populate: {
            path: 'artists',
            select
        }
    }
    const createdBy = {
        path: 'createdBy',
        select
    };

    let query = Playlist.find(queryObj)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({
            path: 'artists',
            select
        })
        .populate(trackList)
        .populate(createdBy);
    
    if (sort) {
        query = query.sort(sort);
    }
    
    const playlists = await query.lean();
    return playlists;
}

export const getIdPlaylist = async (id) => {
    const select = '_id username profilePicture';
    const playlist = await Playlist.findById(id).populate([
        { path: 'artists', select },
        { path: 'createdBy', select },
        {
            path: 'trackList',
            select: '_id name coverArt audio artists totalDuration'
        }
    ]).lean();

    validateExistance(playlist);
    return playlist;
}

export const getRawPlaylistById = async (id) => {
    const playlist = await Playlist.findById(id);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    return playlist;
}

export const getPlaylistSavedBy = async (id) => {
    const savedBy = await SavedPlaylist.find({ resource: id }).select('savedBy').populate({
        path: 'savedBy',
        select: '_id username role profilePicture'
    }).lean();

    return savedBy;
}

export const deleteAssociatedPlaylistSaves = async (playlistId) => {
    const saves = await SavedPlaylist.find({ resource: playlistId })
    saves.forEach(async(save) => {
        await SavedPlaylist.findByIdAndDelete(save._id);
    })
}

export const handleCoverArtUpdate = async (playlist , imageFile) => {
    if (imageFile) {
        const imgRes = await uploadToCloudinary(imageFile.buffer, 'image', 'image');
        if (playlist.coverArt.publicId) {
            await deleteFromCloudinary(playlist.coverArt.publicId , 'image');
        }
        playlist.coverArt.src = imgRes.secure_url;
        playlist.coverArt.publicId = imgRes.public_id;
    }
}

export const reorderTracks = async (trackList) => {

    if (!Array.isArray(trackList) || !trackList.every(item=> mongoose.Types.ObjectId.isValid(item)) ) {
        throw new ApiError(400, "trackList must be an array of valid ObjectIds");
    }

    const tracks = await Track.find({ _id: { $in: trackList } });

    const trackCopy = {};
    tracks.forEach( ( item )=>(
        trackCopy[item._id.toString()] = item
    ));

    const reorderedTrackList = trackList.map(id => trackCopy[id.toString()]);

    return reorderedTrackList;
}