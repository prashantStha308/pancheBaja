import axios from "axios";
import { setError } from "../utils/utils.services.js";


export const uploadTrack = async ( formData ) => {
    try {

        if( !formData.get('title') || !formData.get('track') ){
            throw new Error("Required Fields not met");
        }

        const res = await axios.post('/api/track/' , formData);
        if( !res.data.success ){
            throw new Error(res?.message);
        }
        return res.data.data
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
        return res.data.data;
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
        return res.data.data;
    } catch (error) {
        return setError(error);
    }
}


// backend ma configure garnu xa, can't use this rn
export const getTrackByQuery = async ( queryObj = {} , page = 1 , limit = 10 ) => {
    try {
        let queries = "?" ;
        /* queryObj = { query: key, query:key , query: key } */
        for( const query in queryObj ){
            queries += `${encodeURIComponent(query)}=${encodeURIComponent(queryObj[query])}&`;
        }
        if (page > 0) {
            queries += `page=${page}&`;
        }

        if (limit > 0) {
            queries += `limit=${limit}&`;
        }

        // Remove & at end
        queries = queries.replace(/&$/, "");

        const res = await axios.get(`/api/track${queries}`);
        if( !res.data.success ){
            throw new Error(res.data.message);
        }
        return res.data.data;

    } catch (error) {
        return setError(error);
    }
}