import mongoose from "mongoose";
import Playlist from "../models/playlist.model.js";
import { setError } from "./utils.controller.js";
import { getAllData , getDataById } from "./generic.controller.js";
import { IMAGE_DEFAULT_URL } from "../constants.js";
import Track from "../models/track.model.js";
import { uploadToCloudinary } from "../services/cloudinary.services.js";

export const getAllPlaylist = async( req , res ) => {
    await getAllData( Playlist , req , res );

}

export const getPlaylistById = async( req , res ) => {
    await getDataById( Playlist , req , res );
}

export const createPlaylist = async ( req , res ) => {
    try {
        const body = req.body;
        let image = IMAGE_DEFAULT_URL;

        if( !body.title || !body.visibility ){
            return setError( res , 400 , "Required Fields not met" );
        }
        if( !Array.isArray(body.trackList) || body.trackList.length < 1 ){
            return setError( res , 400 , "Tracklist must have at least 1 tracks" );
        }
        // get all the tracks present in playlist
        const tracks = await Track.find({ _id: { $in: body.trackList } })

        // manage image upload
        if( !req.file ){
            image = tracks[0].image.src;
        }else{
            const imgRes = await uploadToCloudinary( req.file.buffer , 'image' , 'image' );
            image = imgRes.secure_url
        }

        // calculate total duration
        const duration = tracks.reduce( (sum , track )=>{
            return sum + (track.duration);
        },0 )
        // get all artists. They're present in artistsID/s
        const artists = tracks.map( track=> track.artists || [] ).flat(1);

        const newPlaylist = new Playlist({
            ...body,
            artists,
            totalTracks: tracks.length || 0,
            image,
            duration
        })

        await newPlaylist.save();

        return res.status(201).json({ success: true , message: "Playlist Created!" });

    } catch (error) {
        return setError( res , 500 , error );
    }
}

export const updatePlaylist = async( req , res ) => {
    try {
        const body = req.body;
        const image = body.image;
        if( !body.title || !body.visibility ){
            return setError( res , 400 , "Required Fields not met" );
        }

        // update coverArt if selected or uploaded
        if( body.updatedCoverId ){
            image = await Track.findById(updatedCoverId).select('image');
        }else if( req.file ){
            const imgRes = await uploadToCloudinary( req.file.buffer , 'image' , 'image' );
            image = {
                src: imgRes.secure_url,
                publicId: imgRes.public_id
            };
        }

    } catch (error) {
        
    }
}