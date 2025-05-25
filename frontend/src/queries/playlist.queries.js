import { useQuery } from "@tanstack/react-query";
import { getAllPlaylist , getPlaylistByid } from "../services/playlist.services.js";

export const useAllPlaylistQuery = ( page = 1 , limit = 10 ) => {
    return useQuery({
        queryFn: ()=> getAllPlaylist(page , limit),
        queryKey: ['playlist' , { page  , limit }]
    })
}

export const usePlaylistByIdQuery = (id)=>{
    return useQuery({
        queryFn: ()=> getPlaylistByid(id),
        queryKey: [ 'playlist' , {id} ],
        enabled: false
    })
}