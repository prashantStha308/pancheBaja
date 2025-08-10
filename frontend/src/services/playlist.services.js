import axios from "axios"
import { setError, setSuccess } from "../utils/utils.services.js";

export const getAllPlaylist = async (page = 1, limit = 10) => {
    console.log("Isnide getAllPlaylist");
    try {
        const res = await axios.get(`/api/playlist?page=${page}&limit=${limit}`);
        if (res.data?.success) {
            console.log(res?.data);
            return setSuccess(res?.data);
        }else{
            throw new Error(res.data?.message);
        }
    } catch (error) {
        return setError(error);
    }
}

export const getPlaylistByid = async (id) => {
    console.log("Inside getPlaylistById");
    try {
        const res = await axios.get(`/api/playlist/${id}`);
        if( res.data?.success ){
            return setSuccess(res?.data);
        }else{
            throw new Error(res.data?.message);
        }
    } catch (error) {
        return setError(error);
    }
}