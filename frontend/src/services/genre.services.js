import axios from "axios"
import { setError } from "../utils/utils.services.js";

export const getAllGenres = async (page = 1, limit = 10)=>{
	try{
		const res = await axios.get(`/api/genre?page=${page}&limit=${limit}`);

		if(!res.data.success)
			throw new Error(res.message || "Falied to fetch genres");

		console.log(res.data.data);

		return res.data.data;

	}catch(e){
		console.log(e);
		return setError(e);
	}
}