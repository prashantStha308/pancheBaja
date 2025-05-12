import { create } from "zustand";

const PlaylistStore = create( ( set ) => ({
    // states
    playlist: [],
    playlistPage: {},

    // setters
    setPlaylist: (playlist)=>{set({playlist: playlist})},
    setPlaylistPage: ( playlistPage )=>{ set({playlistPage: playlistPage}) },

    // services
    addTrack: ( track ) =>{

        set((state)=>{ state.playlist.some( item => item._id === track._id ) ? [ ...state.playlist.filter(item=> item._id !== track._id), track ]  : [...state.playlist , track] });
    },
    removeTrack: (id)=>{ set( state=>{ state.playlist.filter( item => item._id !== id ) } ) },


}) );

const usePlaylistStore = () => PlaylistStore();
export default usePlaylistStore;