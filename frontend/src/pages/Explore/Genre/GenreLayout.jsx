import { useParams } from "react-router-dom"
import Background from "../../../components/Background.jsx";

const GenreLayout = ()=>{

	const {slug} = useParams();

	return(
		<section id="genre-layout" className="max-w-screen" >

	        <section className="flex flex-col gap-4 items-start w-full z-50" >
	            {/* playlist details section */}
	            <div id="playlistDetails" className="flex w-full gap-4 justify-start items-center " >
	                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full md:w-auto " >

	                    {/* Image Section */}
	                    <div className="flex justify-center md:block w-full md:w-auto " >
	                        {/* image for medium to larger sclae */}
	                        <img src={"/assets/aadiiItyadii.jpg"} alt={"CiverArt"} width={190} height={190} className=" rounded-xs hidden md:block aspect-square object-cover shadow-md shadow-black" />
	                        {/* image for smaller scale */}
	                            <img src={"/assets/aadiiItyadii.jpg"} alt={"CiverArt"} width={170} height={170} className="md:hidden rounded-xs aspect-square object-cover shadow-md shadow-black" />
	                    </div>

	                    {/* Track Details */}
	                    <article className="flex flex-col gap-2">
	                    	{/*Type*/}
	                        <p className=" capitalize font-medium hidden md:block md:text-lg" > { slug } </p>

	                        {/* Name of playlist / track */}
	                        <p className="capitalize text-[clamp(1.25rem,4vw,2.75rem)] font-extrabold w-fit break-words" > {slug} </p>

	                    </article>

	                </div>
	            </div>
	        </section>

	        <Background src={"/assets/aadiiItyadii.jpg"} />
        </section>
	)
}

export default GenreLayout;