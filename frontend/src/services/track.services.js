import axios from "axios";
import { setError, setSuccess } from "./utils.services";

export const getAllTracks = async( page = 1 , limit = 10 )=>{
    try {
        const res = await axios.get(`/api/music?page=${page}&limit=${limit}`);
        if( !res.success ){
            throw new Error(res.message);
        }
        return setSuccess(res);
    } catch (error) {
        return setError(error);
    }
}

export const getTrackById = async( id ) => {
    try {
        const res = await axios.get(`/api/music/${id}`);
        if( !res.success ){
            throw new Error(res.message);
        }
        return setSuccess(res);
    } catch (error) {
        return setError(error);
    }
}