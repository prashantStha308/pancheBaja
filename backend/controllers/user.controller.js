import { IMAGE_DEFAULT_URL } from "../constants.js";
import User from "../models/user.model.js"
import { uploadToCloudinary } from "../services/cloudinary.services.js";
import { getAllData, getDataById } from "./generic.controller.js";
import { setError } from "./utils.controller.js";

export const createUser = async( req , res )=>{
    try {
        const body = req.body;
        const image = {src: IMAGE_DEFAULT_URL , publicId: ""};

        if( !body.username || !body.email ){
            return setError( res , 400 , "Required Fields not filled" );
        }

        if( req.file ){
            const imageRes = await uploadToCloudinary(req.file.buffer , 'image' , 'image');
            image.src = imageRes.secure_url;
            image.publicId = imageRes.public_id;
        }

        const newUser = new User({
            ...body,
            image
        });
        await newUser.save();

        return res.status(201).json({ success: true , message: "User Creation Successfull " });

    } catch (error) {
        return setError( res , 500 , error );
    }
}

export const getAllUsers = async( req , res ) => {
    try {
        await getAllData( User , req , res );
    }
    catch (error) {
        return setError( res , 500 , error );
    }
}

export const getUserById = async( req , res ) =>{
    try {
        await getDataById( User , req , res );
    } catch (error) {
        return setError( res , 500 , error );
    }
}

export const deleteUser = async( req , res ) => {
    try {
        const {id} = req.params;

        

    } catch (error) {
        return setError( res , 500 , error );
    }
}