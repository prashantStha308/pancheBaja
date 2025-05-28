import mongoose from "mongoose";
import Playlist from "../models/playlist.model.js";
import { setError } from "./utils.controller.js";
import { IMAGE_DEFAULT_URL } from "../constants.js";
import Track from "../models/track.model.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../services/cloudinary.services.js";

export const getAllPlaylist = async( req , res ) => {
        try {
    let { page= 1 , limit= 10 } = req.query;
        page = Math.max( 1 , parseInt(page) ) ;
        limit = Math.max( 1 , parseInt(limit) ); 

        const response = await Playlist.find({}).skip( ( page - 1 ) * limit ).limit(limit).populate({
            path: 'trackList',
            select: '_id title artist duration track image',
            populate:{
                path: 'artists',
                select: '_id name'
            }
        });
        res.status(200).json({ success: true , data: response , message: "Successfully fetched user's datas" });

    } catch (error) {
        return setError( res , 500 , error );
    }

}

export const getPlaylistById = async( req , res ) => {
    console.log("GetPlaylistById hit");
        try {
            const { id } = req.params;
            console.log(id);
            if( !mongoose.Types.ObjectId.isValid(id) ){
                return setError( res , 404 , "Invalid Id" );
            }

            const response = await Playlist.findById(id).populate({
                path: 'trackList',
                select: '_id title artist duration track image',
                populate: {
                    path: 'artists',
                    select: '_id name'
                }
            });
            if( !response ){
                return setError( res , 404 , "Playlist not found" );
            }
            res.status(200).json({ success: true , data: response , message: "Data found" });
        } catch (error) {
            console.log(error);
            return setError ( res , 500 , error );
        }
}

export const createPlaylist = async ( req , res ) => {
    try {
        const body = req.body;
        let image = { src:IMAGE_DEFAULT_URL , publicId: "" };

        if( !body.title || !body.visibility ){
            return setError( res , 400 , "Required Fields not met" );
        }
        if( !Array.isArray(body.trackList) || body.trackList.length < 1 ){
            return setError( res , 400 , "Tracklist must have at least 1 tracks" );
        }
        // get all the tracks present in playlist
        const tracks = await Track.find({ _id: { $in: body.trackList } })

        // need to reorder it exactly as body.trackList
        const trackCopy = {};
        tracks.map( ( item )=>(
            trackCopy[item._id.toString()] = item
        ));

        let reorderedTrackList = body?.trackList.map( id => trackCopy[id.toString()] );

        // manage image upload
        if( !req.file ){
            image.src = reorderedTrackList[0].image.src;
        }else{
            const imgRes = await uploadToCloudinary( req.file.buffer , 'image' , 'image' );
            image = {
                src: imgRes.secure_url,
                publicId: imgRes.public_id
            }
        }

        // calculate total duration
        const duration = tracks.reduce( (sum , track )=>{
            return sum + (track.duration);
        },0 )
        // get all artists. They're present in artistsID/s
        const artists = tracks.map( track=> track.artists || [] ).flat(1);

        const newPlaylist = new Playlist({
            ...body,
            trackList: reorderedTrackList,
            artists,
            totalTracks: tracks.length || 0,
            image,
            duration
        })

        await newPlaylist.save();

        return res.status(201).json({ success: true , message: "Playlist Created!" });

    } catch (error) {
        console.error(error);
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

export const deletePlaylistById = async( req , res ) =>{
    try {
        const {id} = req.params;
        if( !mongoose.Types.ObjectId.isValid(id) ){
            return setError( res , 404 , "Invalid Id" );
        }

        const target = await Playlist.findByIdAndDelete(id);
        res.status(200).json({ success: true , message: "Playlist Deleted Successfully" });

        // need to fix
        if( target?.image?.publicId !== "" ){
            setInterval( async()=>{
                try {
                    await deleteFromCloudinary( target?.image?.publicId , 'image' );
                } catch (error) {
                    console.error("Error deleting playlist's coverArt from Cloudinary: ",error);
                }
            } )
        }

    } catch (error) {
        return setError( res , 500 , error );
    }
}