// Models
import Track from "../models/track.model.js";
import User from "../models/user.model.js"
// Services
import { deleteFromCloudinary } from "../services/cloudinary.services.js";
// Helpers and Utils
import { ApiError } from "../utils/ApiError.js";
import { HelperError } from "../utils/Errors.js";
import {
    getFollowers,
    getFollowings,
    getSavedTracks,
    getSavedPlaylist,
    getCreatedPlaylist,
} from "../utils/helper.js";


// Functions
export const checkExistingUserByEmail = async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
    }
}

export const uploadUserMedias = async (files) => {
    let profilePicture = {
        src: "https://res.cloudinary.com/dww0antkw/image/upload/v1747984790/deafultImg_woxk8f.png",
        publicId: ""
    }
    let coverArt = { ...profilePicture };
    
    if (files.profilePicture) {
        profilePicture = await handleImageUploads(files.profilePicture);
    }

    if (files.coverArt) {
        coverArt = await handleImageUploads(files.coverArt);
    }

    return { profilePicture, coverArt };
}

export const deleteUserMediaUploads = async (profilePictureId , coverArtId) => {
    await Promise.all([
        profilePictureId && deleteFromCloudinary(profilePictureId, 'image'),
        coverArtId && deleteFromCloudinary(coverArtId, 'image')
    ]);
}

export const getCreatedTracksIfArtist = async (req) => {
    const role = req.user.role;
    const id = req.user.id;
    let tracks = [];
    if (role === 'artist') {
        tracks = await Track.find({ artists: id }).lean();
    }

    return tracks;
}

export const getUserFollowingAndFollowerData = async (userId) => {
    try {
        const [followers, followings] = await Promise.all([
            getFollowers(userId),
            getFollowings(userId)
        ])

        return {
            followers,
            followerCount: followers.length,
            followings,
            followingCount: followings.length
        };
    } catch (error) {
        throw new HelperError( error.message || "Failed to get follower/followings");
    }
}

export const getUserSavedTracksAndPlaylist = async (userId) => {
    try {
        const [savedTracks, savedPlaylist] = await Promise.all([
            getSavedTracks(userId),
            getSavedPlaylist(userId),
        ])

        return {
            savedTracks,
            trackSaveCount: savedTracks.length,
            savedPlaylist,
            playlistSaveCount: savedPlaylist.length
        }
    } catch (error) {
        throw new HelperError( error.message || "Failed to get Saved Tracks/Playlists");
    }
}

export const getUserCreatedTracksAndPlaylist = async (userId) => {
    try {
        const [createdPlaylists, createdTracks] = await Promise.all([
        getCreatedPlaylist(userId),
        getCreatedTracksIfArtist(userId)
    ])

    return {
        createdPlaylists,
        playlistCreatedCount: createdPlaylists.length,
        createdTracks,
        trackCreatedCount: createdTracks.length
    }
    } catch (error) {
        throw new HelperError( error.message || "Failed to get Created Tracks/Playlists");
    }
}

export const getUserStats = async (userId) => {
    try {
        const [followingsMetaDataData, savedMetaData, creationMetaData ] = await Promise.all([
            getUserFollowingAnfFollowerData(userId),
            getUserSavedTracksAndPlaylist(userId),
            getUserCreatedTracksAndPlaylist(userId),
        ]);

        return {
            ...followingsMetaDataData,
            ...savedMetaData,
            ...creationMetaData
        }
    } catch (error) {
        throw new HelperError( error.message || "Failed to get complete user stats");
    }
}

export const getQueryFilteredUsers = async (req) => {
    let { limit = 10, page = 1 , role, name, city, country, sort } = req.query;

    const queryObj = {};
    const queryKeys = [ 'role', 'username', 'location.city', 'location.country'];

    [role, name, city, country].forEach((query , index) => {
        if (query) {
            queryObj[queryKeys[index]] = query;
        }
    })

    let query = User.find(queryObj).select('-password -location -dob -subscription -trackList -playLists').skip((page - 1) * limit).limit(limit);

    if (sort) {
        query = query.sort(sort);
    }

    const users = await query.lean();
    return users;

}