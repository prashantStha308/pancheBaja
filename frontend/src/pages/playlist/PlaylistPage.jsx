import { useParams } from "react-router-dom"
import usePlaylistStore from "../../store/playlist.store";
import ProfilePicture from "../../components/icons/ProfilePicture";
import PlayBtn from "../../components/Button/PlayBtn";
import { useEffect } from "react";
import { useState } from "react";
import { setError } from "../../services/utils.services";
import Loader from "../../components/Loader";
import { getPlaylistByid } from "../../services/playlist.services";

const PlaylistPage = () => {
	
	const { id } = useParams();
	const { setVisitingPlaylist , visitingPlaylist } = usePlaylistStore();
	const [ loading , setLoading ] = useState(false);

	useEffect( ()=>{
		const fetchPlaylist = async()=>{
			try {
				setLoading(true);
				const res = await getPlaylistByid(id);
				if( !res.success ){
					throw new Error(res.message);
				}
				setVisitingPlaylist(res.data);
			} catch (error) {
				setError(error);
			}finally{
				setLoading(false);
			}
		}
		if( !visitingPlaylist?._id ){
			fetchPlaylist();
		}
	} , [] );

	if( loading ){
		return <Loader />;
	}

	return (
		<>
			<section className="flex flex-col gap-8 items-start mt-14 w-full lg:w-[70dvw] z-40" >
				{/* playlist details section */}
				<section id="playlistDetails" className="flex gap-4 justify-start items-center px-2" >
					<div className="flex items-center gap-2 md:gap-16" >
						<div>
							{/* for medium to larger sclae */}
							<img src={visitingPlaylist.image} alt={""} width={250} height={250} className="hidden md:block aspect-square object-cover " />
							{/* for smaller scale */}
							<img src={visitingPlaylist.image} alt={""} width={170} height={170} className="md:hidden aspect-square object-cover " />
						</div>
						<article className="w-fit flex flex-col gap-2">
							<p className="font-medium text-sm md:text-lg" > Playlist </p>

							{/* set user input limit to 50 charcters */}
							<p className=" text-3xl lg:text-6xl font-extrabold w-fit break-words text-[clamp(1.25rem,4vw,3.75rem)]" > Tender Lifts </p>
							
							<div className="flex items-center gap-2" >
								<ProfilePicture src={"/assets/aadiiItyadii.jpg"} size={30} />
								<p className="text-3xl" > &middot; </p>
								<p className="text-lg font-semibold" > Popsy </p>
							</div>
						</article>
					</div>
				</section>

				{/* bottom */}
				<section>
					<PlayBtn />
				</section>
			</section>
			<div className="absolute top-0 left-0 right-0 h-screen max-w-screen object-cover bg-top lg:bg-center blur-[1px]" style={{backgroundImage: `linear-gradient( to top , #0F0F0F 50% , transparent ) ,  url(${ visitingPlaylist?.image })`, backgroundRepeat: 'no-repeat' , backgroundSize: "100%" } }  ></div>
		</>
	)
}

export default PlaylistPage