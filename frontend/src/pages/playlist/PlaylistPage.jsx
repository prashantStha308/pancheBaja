import { useParams } from "react-router-dom"
import usePlaylistStore from "../../store/playlist.store";
import { useQuery } from "@tanstack/react-query"
import { getPlaylist } from "../../queries/playlist.queries";
import Loader from "../../components/Loader";
import ProfilePicture from "../../components/icons/ProfilePicture";
import PlayBtn from "../../components/Button/PlayBtn";

const PlaylistPage = () => {
	
	const { slug } = useParams();
	const { setPlaylistPage } = usePlaylistStore();
	// const { data , isLoading , isError } = useQuery({
	// 	queryFn:()=>getPlaylist(slug),
	// 	queryKey: [slug]
	// })

	// if( isLoading ){
	// 	return <Loader />
	// }

	// if( data.success ){
	// 	setPlaylistPage(data.data || "");
	// }

	return (
		<section className="flex flex-col gap-8 items-start mt-14 w-full lg:w-[70dvw]" >
			{/* playlist details section */}
			<section id="playlistDetails" className="flex gap-4 justify-start items-center px-2" >
				<div className="flex items-center gap-2 md:gap-16" >
					<div>
						{/* for medium to larger sclae */}
						<img src={"/assets/aadiiItyadii.jpg"} alt={""} width={250} height={250} className="hidden md:block" />
						{/* for smaller scale */}
						<img src={"/assets/aadiiItyadii.jpg"} alt={""} width={170} height={170} className="md:hidden" />
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
	)
}

export default PlaylistPage