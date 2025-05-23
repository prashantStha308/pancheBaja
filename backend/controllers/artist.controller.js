import mongoose from "mongoose";
import Artist from "../models/artist.model";
import { getAllData } from "./generic.controller";
import { setError } from "./utils.controller";


export const createArtist = async ( req , res )=>{
    try {
        const body = res.body;
        if( !body.name || !body.email ){
            return setError( res , 400 , "Required Fields not filled" );
        }

        const newArtist = new Artist(body);
        await newArtist.save();

        return res.status(201).json({ success: true , message: "Artists Successfully Created" });

    } catch (error) {
        return setError( res , 500 , error );
    }
}

// comment out later
export const getAllArtists = async( req , res ) => {
    try {
        await getAllData( Artist , req , res );
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
// populate garda, later make it more specific on which data to populate with, currently sabai data aauxa which is not performance friendly
        const artist = await Artist.findById(id).populate('track').populate('album');
        if( !artist ){
            return setError( res , 404 , "Artist not Found" );
        }

        return res.status(200).json({ success: true , data: artist , message: "Artist found" });
    } catch (error) {
        return setError( res , 500 , error );
    }
}

export const increment = async ()=>{

}