import express from "express";
import { trackUpload } from "../config/multer.config.js";
import { createTrack } from "../controllers/track.controller.js";

const trackRouter = express.Router();

trackRouter.post( '/' , trackUpload.fields([
    { name: 'track' , maxCount: 1 },
    { name: 'coverArt' , maxCount: 1 }
]) , createTrack );

trackRouter.get( '/' , ( req , res )=>{
    res.status(200).json({success: true , message: "HEHEEH"});
} );

export default trackRouter;