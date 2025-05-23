import express from "express";
import { trackUpload } from "../config/multer.config.js";
import { createTrack, deleteTrack, getAllTracks } from "../controllers/track.controller.js";

const trackRouter = express.Router();

trackRouter.post( '/' , trackUpload.fields([
    { name: 'track' , maxCount: 1 },
    { name: 'coverArt' , maxCount: 1 }
]) , createTrack );

trackRouter.get( '/' , getAllTracks );

trackRouter.delete( '/:id' , deleteTrack );

export default trackRouter;