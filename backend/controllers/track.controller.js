import Track from "../models/track.model.js";
import mongoose from "mongoose";
import { getAllData, getDataById, setError } from "./generic.controller.js";
import { IMAGE_DEFAULT_URL } from "../constants.js";
import { uploadToCloudinary } from "../services/cloudinary.services.js";

export const createTrack = async( req , res ) =>{
    try {
        const body = res.body;
        let coverArt = { secureUrl: IMAGE_DEFAULT_URL  }
        let track = {};

        if( !body.title || !req.files.track ){
            return setError( res , 400 , "Required fields not set"  );
        }

        if( req.files.track[0] ){
            const trackBuffer = Buffer.from(req.files.track[0]);
            const res = await uploadToCloudinary( trackBuffer , 'video' , 'track' );
            if( !res ){
                throw new Error( res );
            }
            track = {
                publicId: res.public_id,
                secureUrl: res.secure_url,
                displayName: res.display_name,
                bytes: res.bytes
            }
        }

        if( req.files.coverArt[0]){
            const imageBuffer = Buffer.from(req.files.coverArt[0]);
            const res = await uploadToCloudinary( imageBuffer , 'image' , 'image' );
            if( !res ){
                throw new Error( res );
            }
            coverArt = {
                publicId: res.public_id,
                secureUrl: res.secure_url,
                displayName: res.display_name,
                bytes: res.bytes
            };
        }

        const updatedBody = {
            ...body,
            ...track,
            ...coverArt
        }

        const newTrack = new Track(updatedBody);
        await newTrack.save();

    } catch (error) {
        return setError( res , 500 , error );
    }
}

export const getAllTracks = async ( req , res )=> {
    try {
        await getAllData( Track , req , res );
    } catch (error) {
        return setError( res , 500 , error );
    }
}

export const getTrackById = async ( req , res )=>{
    try {
        await getDataById( Track , req , res );
    } catch (error) {
        return setError( res , 500 , error );
    }
}

export const getTrackByName = async ( req , res ) => {
    try {
        const { name } = req.query;
        if( !name ){
            return setError( res , 400 , "Required fields not set"  );
        }
        const res = await Track.find({title: name});
        if( !res ){
            return setError( res , 404 , "Track not found" );
        }
    } catch (error) {
        return setError( res , 500 , error );
    }
}

export const getTrackByArtist = async ( req , res ) => {
    try {
        const { artistId } = req.query;
        if( !artistId ){
            return setError( res , 404 , "Invalid Id" );
        }
        if( !mongoose.Types.ObjectId.isValid(artistId) ){
            return setError( res , 404 , "Invalid Id" );
        }

        const response = await Track.find({artist: artistId});
        if( response.length === 0 ){
            return setError( res , 404 , "Track not found" );
        }

        res.status(200).json({ success: true , data: response , message: "Track Found" });
    } catch (error) {
        return setError( res , 500 , error );
    }
}