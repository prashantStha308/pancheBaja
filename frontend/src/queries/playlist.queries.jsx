import { useQuery } from "@tanstack/react-query";
import getAllPlaylist from "../services/playlist.services.js";

export const useAllPlaylistQuery = () => {
    return useQuery({
        queryFn: ()=> getAllPlaylist(),
        queryKey: ['playlist']
    })
}