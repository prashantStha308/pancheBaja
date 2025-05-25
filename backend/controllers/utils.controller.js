import Playlist from "../models/playlist.model.js";
import Track from "../models/track.model.js";
import { uploadToCloudinary } from "../services/cloudinary.services.js";


export const setError = ( res , state = 500, error ) => {
    const message = typeof(error) == 'string' ? error : error instanceof Error ? error.message || "Unexpected Error Occured" : "Unknown Error Occured";
    return res.status( state ).json({ success: false , message: message});
}

// uploads images to cloudinary and returns necessary metadatas
export const processTrackUpload = async( file , folder , resourceType )=>{
    console.log("processTrackUpload hit");
    try {

        const uploadRes = await uploadToCloudinary( file.buffer , folder , resourceType );
        const { public_id,
            secure_url,
            format,
            bytes,
            duration,
            bit_rate,
            audio,
            created_at,
            original_filename,
            asset_folder
        } = uploadRes;

        return ({
            public_id,
            secure_url,
            format,
            bytes,
            duration,
            bit_rate,
            audio,
            created_at,
            original_filename,
            asset_folder
        })

    } catch (error) {
        throw error;
    }
}

export const updateAffiliatedPlaylists = async(id)=>{
    try {
        const affectedPlaylists = await Playlist.find({ trackList: id });

        for (const playlist of affectedPlaylists) {
            playlist.trackList = playlist.trackList.filter(item => item.toString() !== id.toString());
            
            const tracks = await Track.find({ _id: { $in: playlist.trackList } });
            playlist.totalTracks = tracks.length;
            playlist.duration = tracks.reduce((sum, t) => sum + (t.duration || 0), 0);

            await playlist.save();
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}