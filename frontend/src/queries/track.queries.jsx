import { useQuery } from "@tanstack/react-query";
import { getAllTracks, getTrackById } from "../services/track.services.js";

export const useAllTrackQuery = ( page = 1 , limit = 10 ) => {
    return useQuery({
        queryFn: () => getAllTracks( page , limit ),
        queryKey: [ 'tracks' , { page , limit } ]
    });
}

export const useTrackByIdQuery = (id) => {
    return useQuery({
        queryFn: () => getTrackById(id),
        queryKey: [ 'track' , {id} ]
    })
}