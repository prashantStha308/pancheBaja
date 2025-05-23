import axios from "axios"
import {setError , setSuccess} from "./utils.services.js"

export const getAllPlaylist = async ( page = 1 , limit = 8 )=>{
    try {
        const res = await axios.get(`/api/music?page=${page}&limit=${limit}`);
        if( res.data?.success ){
            return setSuccess(res?.data);
        }else{
            throw new Error(res.data?.message);
        }
    } catch (error) {
        return setError(error);
    }
}

export const getPlaylistBySlug = async ( slug ) =>{
    try {
        const res = await axios.get(`/api/music/${slug}`);
        if( res.data?.success ){
            return setSuccess(res?.data);
        }else{
            throw new Error(res.data?.message);
        }
    } catch (error) {
        return setError(error);
    }
}