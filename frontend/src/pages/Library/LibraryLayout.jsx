import Section from "../../components/Section";
import PlaylistTile from "../../components/Tiles/PlaylistTile";
import { useAllPlaylistQuery } from "../../queries/playlist.queries";
import { useAllTrackQuery } from "../../queries/track.queries";
import transition from "../../utils/transition";

const LibraryLayout = () => {
  const trackQuery = useAllTrackQuery();
  const playlistsQuery = useAllPlaylistQuery();

  return (
    <section
      id="library"
      className="flex flex-col md:mt-8 gap-8 w-full justify-start md:items-center pb-16"
    >
      <Section title={"Recently played"} query={trackQuery} Tile={PlaylistTile} />
      <Section title={"Your Playlists"} query={playlistsQuery} Tile={PlaylistTile} />
    </section>
  )
}

const PageTransition = transition(LibraryLayout);
export default PageTransition;