import express from "express";
import { upload } from "../config/multer.config.js";
import { createTrack, deleteTrackById, getAllTracks } from "../controllers/track.controller.js";

const trackRouter = express.Router();

trackRouter.post( '/' , upload.fields([
    { name: 'track' , maxCount: 1 },
    { name: 'coverArt' , maxCount: 1 }
]) , createTrack );

trackRouter.get( '/' , getAllTracks );

trackRouter.delete( '/:id' , deleteTrackById );

export default trackRouter;