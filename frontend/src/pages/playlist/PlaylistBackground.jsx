import usePlaylistStore from "../../store/playlist.store.js"

const PlaylistBackground = () => {

    const { visitingPlaylist } = usePlaylistStore();

    return (
    <div className="absolute top-0 left-0 right-0 h-screen max-w-screen object-cover blur-sm bg-top lg:bg-center" style={{backgroundImage: `linear-gradient( to top , #0F0F0F 50% , transparent ) ,  url(${ visitingPlaylist.image.src || "/assets/aadiiItyadii.jpg" })`, backgroundRepeat: 'no-repeat' , backgroundSize: "100%" } }  ></div>
  )
}

export default PlaylistBackground