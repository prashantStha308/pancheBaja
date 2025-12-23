// Configs
import express from "express";
import upload from "../config/multer.config.js";
// Controllers
import {
    createPlaylist,
    getAllPlaylist,
    getPlaylistById,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    updatePlaylistById,
    updatePlayCount,
    deletePlaylistById,
    updateTotalPlayDuration,
    getPlaylistByUserId
} from "../controllers/playlist.controller.js";
// Middlewares
import { authorize } from "../middleware/authorize.js";
import { sanitizeAndValidatePlaylistBody, sanitizePlaylistQuery , sanitizePlaylistParams, sanitizeUserParams } from "../middleware/sanitizor.js";

// Router
const playlistRouter = express.Router();

// Routes

/* [GET] */

// Get All playlist
playlistRouter.get('/', sanitizePlaylistQuery, getAllPlaylist);

// Get playlist by Id
playlistRouter.get('/:playlistId', sanitizePlaylistParams, getPlaylistById);

// Get playlist by UserId
playlistRouter.get('/user/:userId', sanitizeUserParams, authorize(['user', 'admin', 'artist']) , getPlaylistByUserId);


// ---------------------------------------------------------------------------------------------------------------------

/* [POST] */

// Create playlist
playlistRouter.post('/', upload.single('coverArt'),authorize(['user', 'artist', 'admin']),sanitizeAndValidatePlaylistBody,createPlaylist);

// ---------------------------------------------------------------------------------------------------------------------
/* [PUT/ PATCH ] */

// update playlist by Id
playlistRouter.patch('/:playlistId', upload.single('coverArt'), authorize(['user', 'artist', 'admin']), sanitizePlaylistParams, sanitizeAndValidatePlaylistBody, updatePlaylistById);

// add track to playlist
playlistRouter.patch('/addTrack/:playlistId', authorize(['user', 'artist', 'admin']), sanitizePlaylistParams, addTrackToPlaylist);

// remove track from playlist
playlistRouter.patch('/removeTrack/:playlistId', authorize(['user', 'artist', 'admin']), removeTrackFromPlaylist);

// update playcount
playlistRouter.patch('/playCount/:playlistId', authorize(['user', 'artist', 'admin']), sanitizePlaylistParams, sanitizeAndValidatePlaylistBody, updatePlayCount);

// update total play duration
playlistRouter.patch('/playDuration/:playlistId', authorize(['user', 'artist', 'admin']), sanitizePlaylistParams, sanitizeAndValidatePlaylistBody, updateTotalPlayDuration);

// ---------------------------------------------------------------------------------------------------------------

/* [DELETE] */

// delete playlist by Id
playlistRouter.delete('/:playlistId', authorize(['user', 'artist', 'admin']), sanitizePlaylistParams, deletePlaylistById);

export default playlistRouter;