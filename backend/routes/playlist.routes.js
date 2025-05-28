import express from "express";
import { upload } from "../config/multer.config.js";
import { createPlaylist, deletePlaylistById, getAllPlaylist, getPlaylistById } from "../controllers/playlist.controller.js";

const playlistRouter = express.Router();

playlistRouter.get('/' , getAllPlaylist);
playlistRouter.get( '/:id' , getPlaylistById );

playlistRouter.post('/' , upload.single('coverArt') ,createPlaylist);

playlistRouter.delete( '/:id' , deletePlaylistById );

export default playlistRouter;