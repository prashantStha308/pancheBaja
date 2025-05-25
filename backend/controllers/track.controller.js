import Track from "../models/track.model.js";
import mongoose from "mongoose";
import {parseBuffer} from "music-metadata";
import { getAllData, getDataById } from "./generic.controller.js";
import { processTrackUpload, setError, updateAffiliatedPlaylists } from "./utils.controller.js";
import { IMAGE_DEFAULT_URL } from "../constants.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../services/cloudinary.services.js";
import Playlist from "../models/playlist.model.js";

// POST
export const createTrack = async (req, res) => {
    try {
        const body = req.body;
        console.log(req.body);
        // Validate request
        if (!body.title || !req.files.track ) {
            return setError( res , 400 , "Required Fields not met" );
        }
        
        // Upload audio file to Cloudinary
        const trackRes = await processTrackUpload( req.files.track[0] , 'track' , 'video' );
        const metadata = await parseBuffer( req.files.track[0].buffer , 'audio/mpeg' );
        const duration = metadata.format.duration;
        
        // initializing 
        let imageUrl = IMAGE_DEFAULT_URL;
        let imagePublicId = "";
        if (req.files.coverArt && req.files.coverArt[0]) {
            const imageFile = req.files.coverArt[0];
            const imageRes = await uploadToCloudinary(
                imageFile.buffer, 
                "image", 
                "image"
            );

            imageUrl = imageRes.secure_url;
            imagePublicId = imageRes.public_id;
        }
        
        // Create music document in MongoDB
        const newTrack = new Track({
            title: body.title,
            // artists: [body.artist],
            track:{
                src: trackRes.secure_url,
                publicId: trackRes.public_id
            },
            image:{
                src: imageUrl,
                publicId: imagePublicId
            },
            duration
        });
        
        // Save to database
        await newTrack.save();
        
        return res.status(201).json({
            success: true,
            data: newTrack,
            message: "Music uploaded successfully"
        });
        
    } catch (error) {
        return setError ( res , 500 , error );
    }
};


// GET controllers
export const getAllTracks = async ( req , res )=> {
    await getAllData( Track , req , res );
}

export const getTrackById = async ( req , res )=>{
    await getDataById( Track , req , res );
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

// DELETE Controllers

export const deleteTrackById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return setError( res , 404 , "Invalid ID" );
        }

        const target = await Track.findById(id);
        if (!target) {
            return setError( res , 404 , "Track not found" );
        }

        // TOO SLOWW

        // Delete image from cloudinary
        await deleteFromCloudinary( target.track.public_id , 'video');
        // Delete Track
        await Track.findByIdAndDelete(id);
        // update playlists that has this track
        await updateAffiliatedPlaylists();

        return res.status(200).json({ success: true, message: "Track deleted successfully." });

    } catch (error) {
        console.error("Deletion failed:", error);
        return setError( 500 , error );
    }
};

// export const deleteAll = async ( req , res ) => {
//     try {
//         await Track.deleteMany();
//         return { success: true , message: "Deleted all tracks" };
//     } catch (error) {
//         return setError( 500 , error );
//     }
// }