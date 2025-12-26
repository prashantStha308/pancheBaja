// Libraries
import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
// Stores and Queries
import usePlaylistStore from "../../store/playlist.store";
import { useTrackByIdQuery } from "../../queries/track.queries";
// Utils and Services
import transition from "../../utils/transition";
// Components
import LoadingPlaylist from "../../components/Loaders/LoadingPlaylist.jsx";
import TopDetails from "../../components/TopDetails";
import ListLayout from "../../components/List/ListLayout";
import Background from "../../components/Background";


const TrackLayout = () => {
    
    const { id } = useParams();
    const { setVisitingPlaylist, visitingPlaylist } = usePlaylistStore();

    useEffect(() => {
        document.title = visitingPlaylist?.name ? `${visitingPlaylist?.name } | Panche Baja` : "Panche Baja";
		return( ()=> document.title = "Panche Baja")
    }, [visitingPlaylist?.name])

    const { isPending, isLoading, data, isError, error } = useTrackByIdQuery(id);
    
    useEffect(() => {
        if (data && data.success) {
            setVisitingPlaylist(data.data);
        }
    },[data , setVisitingPlaylist])

    if (isError) {
        return (
            <p>
				Error occured: {error}
			</p>
        )
    }
    
    return (
        <>
            {
                isPending || isLoading ?
                    <LoadingPlaylist />
                    :
                    <>
                        <section className="flex flex-col w-full mt-8 gap-2 z-40" >
                            {/* Top */}
                            <TopDetails visitingPage={data} />
                            <ListLayout tracks={ [data] } />
                        </section>

                        <Background src={data.coverArt?.src} gradientPercent={50} />
                    </>
            }
		</>
    )
}

const PageTransition = transition(TrackLayout);

export default PageTransition;