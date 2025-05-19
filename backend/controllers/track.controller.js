import Track from "../models/track.model.js";
import mongoose from "mongoose";
import { setError } from "./utils.controller.js";

export const createTrack = async( req , res ) =>{
    try {
        const body = res.body;
        const trackFile = res.file[0];
        const coverArt =res.file.track;

        if( !body.title || !trackFile ){
            return res.status(401).json({ success: false , data: null , message: "Required fields not set" });
        }

    } catch (error) {
        return setError(error);
    }
}

export const getAllTrack = async ( req , res )=> {
    try {
        const { pageQuery = 1 , limitQuery  = 10 } = req.query;
        const page = Math.max( 1 , parseInt(pageQuery) );
        const limit = Math.max( 1 , parseInt(limitQuery) );

        const tracks = await Track.find({}).skip( ( page - 1 ) * limit ).limit( limit );

        return res.status(200).json({
            success: true,
            data: tracks,
            message: "Successfully Fetched Tracks"
        });

    } catch (error) {
        return setError(error);
    }
}

export const getTrackById = async ( req , res )=>{
    try {
        const { id } = req.query;
        if( !mongoose.Types.ObjectId.isValid(id) ){
            throw new Error("Invalid ID");
        }
        const track = await Track.findById(id);

        res.status(200).json({ success: true, data: track , message: "Track Found" });
    } catch (error) {
        return setError(error);
    }
}

export const getTrackByType = async ( req , res ) => {
    try {
        const { type , name: filter= null } = req.query;
    } catch (error) {
        return setError(error);
    }
}