import { Readable } from "stream";
import cloudinary from "../config/cloudinary.config.js";

export const uploadToCloudinary = async ( fileBuffer , resourceType = 'auto' , folder = 'track') => {
    return new Promise( ( resolve , reject ) => {
        const stream = Readable.from(fileBuffer);
        const upload = cloudinary.uploader.upload_stream({
            folder,
            resource_type: resourceType
        }, ( error , res )=> {
            if( error ) { reject(error) }
            resolve(res);
        })
        stream.pipe(upload);
    } )
}

export const deleteFromCloudinary = async ( publicId , resourceType ) => {
    try {
        const res = await cloudinary.uploader.destroy( publicId , { resource_type: resourceType } );
        console.log(res);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
