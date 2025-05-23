import axios from "axios";
import { setError, setSuccess } from "./utils.services";
/*
    setError(error) ---> error == error object
    returns { success: false , message: error.message || "Unexpected Error" }

    setSuccess(res) ---> res = Response Object
    returns { success: true , data: res.data , message: res.message }
*/


export const uploadTrack = async ( formData ) => {
    try {

        if( !formData.get('title') || !formData.get('track') ){
            throw new Error("Required Fields not met");
        }

        const res = await axios.post('/api/track/' , formData);
        if( !res.data.success ){
            throw new Error(res?.message);
        }
        return setSuccess(res.data);
    } catch (error) {
        return setError(error);
    }
}

export const getAllTracks = async( page = 1 , limit = 10 )=>{
    try {
        const res = await axios.get(`/api/track?page=${page}&limit=${limit}`);
        if( !res.data.success ){
            throw new Error(res.data.message); 
        }
        return setSuccess(res.data);
    } catch (error) {
        return setError(error);
    }
}

export const getTrackById = async( id ) => {
    try {
        const res = await axios.get(`/api/track/${id}`);
        if( !res.data.success ){
            throw new Error(res.data.message);
        }
        return setSuccess(res.data);
    } catch (error) {
        return setError(error);
    }
}

