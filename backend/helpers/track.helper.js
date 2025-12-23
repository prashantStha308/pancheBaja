// External Libraries
import { parseBuffer } from "music-metadata";
// Models
import Track from "../models/track.model.js";
import SavedTrack from "../models/saves/trackSave.model.js";
// Services
import { deleteFromCloudinary } from "../services/cloudinary.services.js";
// Utils and Helpers
import {
    updateTrackAffiliatedArtists,
    updateTrackAffiliatedPlaylists
} from "../utils/helper.js";
import { ApiError } from "../utils/ApiError.js";
import { validateExistance } from "../utils/validator.js";

// Functions

// CLEANUPS
export const cleanUpFailedUploads = async (audioId, imageId) => {
    await Promise.all([
        audioId && deleteFromCloudinary(audioId, 'video'),
        imageId && deleteFromCloudinary(imageId, 'image')
    ]);
}

export const cleanAffiliatedTrackData = async (track) => {
    await Promise.all([
        updateTrackAffiliatedArtists(track),
        updateTrackAffiliatedPlaylists(track),
        SavedTrack.deleteMany({ track: track._id })
    ]);
}

// ---------------------------------------------------------------------------------------------------------------------

// GET DATAS
export const getQueryFilteredTracks = async (req) => {
    const { page = 1, limit = 5, sort, artist, name, genre:genres } = req.query;
    
    const queryObj = {};
    if (artist) {
        queryObj['artist'] = artist;
    }
    if (name) {
        queryObj['name'] = name;
    }
    if(genres){
        queryObj['genre']= {
            $in: genres.split(',').map(g => g.trim().toLowerCase())
        }
    }

    const select = 'username profilePicture bio followerCount';
    const populateOptions = [
        { path: 'primaryArtist', select },
        { path: 'artists', select }
    ]
    let query = Track.find(queryObj)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate(populateOptions);

    if (sort) {
        query = query.sort(sort);
    }
    const tracks = await query.lean();

    return tracks;
}

export const getIdTrack = async (id) => {
    const select = '_id username profilePicture'
    const track = await Track.findById(id).populate([
        { path: 'artists', select },
        { path: 'primaryArtist', select }
    ]).lean();

    validateExistance(track);
    return track;
}

export const getAudioDuration = async (audioFile) => {
    const musicMetadata = await parseBuffer(audioFile.buffer, 'audio/mpeg');
    return musicMetadata.format.duration;
}

export const removeTrackMediaFromCloudinary = async (track) => {
    await Promise.all([
        track.audio?.publicId && deleteFromCloudinary(track.audio.publicId, 'video'),
        track.coverArt?.publicId && deleteFromCloudinary(track.coverArt.publicId, 'image')
    ]);
};

export const getTrackSavedBy = async (trackId) => {
    const saves = await SavedTrack.find({ track: trackId }).select('savedBy').populate({
        path: 'savedBy',
        select: '_id username role profilePicture'
    }).lean();
    return saves;
}

// ---------------------------------------------------------------------------------------------------------------------

// UPDATE DATA

export const updateTrackCoverArt = async (track , imageFile) => {
    if (imageFile) {
        const imgRes = await uploadToCloudinary(imageFile.buffer, 'image', 'image');
        if (track.coverArt.publicId) {
            await deleteFromCloudinary(track.coverArt.publicId , 'image');
        }
        track.coverArt.src = imgRes.secure_url;
        track.coverArt.publicId = imgRes.public_id;
    }
}

export const updateTrackFields = (req, track) => {
    const {
        name,
        artists,
        visibility,
        genre,
    } = req.body;

    if (name) track.name = name;
    if (artists) track.artists = [...artists];
    if (visibility) track.visibility = visibility;
    if (genre) track.genre = genre.map(g => g.toLowerCase());
}

// ---------------------------------------------------------------------------------------------------------------------