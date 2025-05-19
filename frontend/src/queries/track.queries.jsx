import { useQuery } from "@tanstack/react-query";
import { getAllTracks, getTrackById } from "../services/music.services";

export const useAllTrackQuery = ( page = 1 , limit = 10 ) => {
    return useQuery({
        queryFn: () => getAllTracks( page , limit ),
        queryKey: [ 'tracks' , { page , limit } ],
        enabled: false
    });
}

export const useTrackByIdQuery = (id) => {
    return useQuery({
        queryFn: () => getTrackById(id),
        queryKey: [ 'track' , {id} ],
        enabled: false
    })
}