import User from "../models/user.model.js"
import { getAllData, getDataById } from "./generic.controller.js";
import { setError } from "./utils.controller.js";

export const createUser = async( req , res )=>{
    try {
        const body = req.body;
        // const img = req.file.profilePicture[0];

        if( !body.username || !body.email ){
            return setError( res , 400 , "Required Fields not filled" );
        }

        const newUser = new User(body);
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