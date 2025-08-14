import LoadingList from './LoadingList.jsx';
import LoadingTopDetails from './LoadingTopDetails.jsx';

const LoadingPlaylist = () => {

    return (
        <section id="loading-playlist" className="flex flex-col w-full mt-8 gap-2 z-40" >
            <LoadingTopDetails />
            <LoadingList />
        </section>
    )
}

export default LoadingPlaylist