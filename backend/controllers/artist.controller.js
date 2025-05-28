import mongoose from "mongoose";
import Artist from "../models/artist.model";
import { setError } from "./utils.controller";
import { IMAGE_DEFAULT_URL } from "../constants";
import { deleteFromCloudinary, uploadToCloudinary } from "../services/cloudinary.services";
import Playlist from "../models/playlist.model";


export const createArtist = async ( req , res )=>{
    try {
        const body = res.body;
        let image = {src: IMAGE_DEFAULT_URL , publicId: "" };
        if( !body.name || !body.email || !body.country ){
            return setError( res , 400 , "Required Fields not filled" );
        }

        if( req.file ){
            const imgRes = await uploadToCloudinary( req.file.buffer , 'image' , 'image' );
            if( !imgRes.success ){
                return setError( res , 404 , imgRes.message );
            }
            image = {
                src: imgRes.secure_url,
                publicId: imgRes.public_id
            };
        }

        const newArtist = new Artist({
            ...body,
            image,
        });
        await newArtist.save();

        return res.status(201).json({ success: true , message: "Artists Successfully Created" });

    } catch (error) {
        return setError( res , 500 , error );
    }
}

// incomplete
export const switchToArtist = async(req , res) => {
    try {
        const body = req.body;
    } catch (error) {
        return setError( res , 500 , error );
    }
}

// comment out later
export const getAllArtists = async( req , res ) => {
    try {
        let { page= 1 , limit= 10 } = req.query;
        page = Math.max( 1 , parseInt(page) ) ;
        limit = Math.max( 1 , parseInt(limit) ); 

        const response = await Artist.find({}).skip( ( page - 1 ) * limit ).limit(limit).populate({
            path: 'tracks',
            select: '_id title duration track image',
            option: { limit: 5 }
        }).populate({
            path: 'followers',
            select: '_id username',
            option: { limit: 5 }
        }).populate({
            path: 'albums',

        });
        res.status(200).json({ success: true , data: response , message: "Successfully fetched user's datas" });

    } catch (error) {
        return setError( res , 500 , error );
    }
}

export const getArtistById = async( req , res ) => {
    try {
        const { id } = req.params;
        if( !mongoose.Types.ObjectId.isValid(id) ){
            return setError( res , 404 , "Invalid Artist" );
        }

        const artist = await Artist.findById(id).populate({
            path: 'tracks',
            select: '_id title duration track image',
            option:{limit: 5}
        }).populate({
            path: 'follwers',
            select: '_id username',
            option: { limit: 5 }
        })
        if( !artist ){
            return setError( res , 404 , "Artist not Found" );
        }

        return res.status(200).json({ success: true , data: artist , message: "Artist found" });
    } catch (error) {
        return setError( res , 500 , error );
    }
}