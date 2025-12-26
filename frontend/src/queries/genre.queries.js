import { useQuery } from "@tanstack/react-query";
import {
	getAllGenres
} from "../services/genre.services.js";

export const useGetAllGenreQuery = (page = 1, limit = 10)=>{
	return useQuery({
		queryFn: () => getAllGenres(page, limit),
		queryKey: ['allGenre']
	});
}