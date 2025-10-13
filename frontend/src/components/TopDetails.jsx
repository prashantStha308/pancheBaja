// Helpers
import { normalizeTime } from "../helpers/player.helper.js";
// Components
import ProfilePicture from "./icons/ProfilePicture";
import PlayBtn from "./Button/PlayBtn";
import ShuffleBtn from "./Button/ShuffleBtn";
import Share from "./icons/Share";
import Heart from "./icons/Heart";
import Dot from "./icons/Dot";

const TopDetails = ({ visitingPage }) => {

    let duration = normalizeTime(visitingPage?.totalDuration);

    const owner = visitingPage.type !== 'playlist' ? visitingPage?.primaryArtist || "Unknown Artist" : visitingPage?.createdBy || "Unknown user" ;

    return (
        <section className="flex flex-col gap-4 items-start w-full" >
            {/* playlist details section */}
            <section id="playlistDetails" className="flex w-full gap-4 justify-start items-center " >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full md:w-auto " >

                    {/* Image Section */}
                    <div className="flex justify-center md:block w-full md:w-auto " >
                        {/* image for medium to larger sclae */}
                        <img src={visitingPage.coverArt.src} alt={ visitingPage.name || ""} width={190} height={190} className=" rounded-xs hidden md:block aspect-square object-cover shadow-md shadow-black" />
                        {/* image for smaller scale */}
                            <img src={visitingPage.coverArt.src} alt={ visitingPage.name || ""} width={170} height={170} className="md:hidden rounded-xs aspect-square object-cover shadow-md shadow-black" />
                    </div>

                    {/* Track Details */}
                    <article className="flex flex-col gap-2">
                        <p className=" capitalize font-medium hidden md:block md:text-lg" > { visitingPage?.type } </p>

                        {/* Name of playlist / track */}
                        <p className="capitalize text-[clamp(1.25rem,4vw,2.75rem)] font-extrabold w-fit break-words" > {visitingPage?.name} </p>
                        
                        <div className="flex md:flex-col items-center md:items-start gap-2" >
                            {/* User pfp */}
                            <div id="created-by" className="flex items-center gap-2" >

                                <ProfilePicture src={owner?.profilePicture?.src} alt={owner?.username || "Unknown User"} size={23} />
                                
                                <Dot size={5} />
                                <p className="text-base md:text-lg font-semibold" > {owner?.username || "Unknown User"} </p>
                                
                                <span className="md:hidden" >
                                    <Dot size={5} />
                                </span>
                            </div>
                            
                            {/* Metadatas */}
                            <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base" >
                                <p> <span className="font-bold" >{visitingPage.type === "track" ? 1 : visitingPage?.trackList.length || 0 }</span> tracks </p>
                                <p> <Dot size={5} /> </p>
                                <p> <span className="font-bold" > {duration} </span> </p>
                                <p> <Dot size={5} /> </p>
                                <p> <span className="font-bold" > {visitingPage?.saveCount} </span> saves </p>
                            </div>
                        </div>
                    </article>

                </div>
            </section>
            {/* bottom button section */}
            <section className="flex flex-row-reverse md:flex-row justify-between items-center w-full" >
                <div className="flex flex-row-reverse md:flex-row gap-4" >
                    <PlayBtn />
                    <ShuffleBtn />
                </div>

                <div className="flex gap-4 items-center" >
                    {/* Love*/}
                    <div className="flex flex-col items-center gap-1 md:gap-2 p-2 hover:bg-hover-primary active:bg-hover-primary cursor-pointer aspect-square rounded-sm transition-all duration-100 ease-in-out group" >
                        <Heart size={20} className = {`group-hover:text-red-primary group-active:text-red-primary  `}  />
                        <p className="text-xs hidden md:block"> Save </p>
                    </div>

                    {/* Share */}
                    <div className="group flex flex-col items-center gap-1 md:gap-2 p-2 hover:bg-hover-primary active:bg-hover-primary cursor-pointer aspect-square rounded-sm transition-all duration-100 ease-in-out" >
                        <Share size={20} className="group-hover:text-red-primary" />
                        <p className="text-xs hidden md:block"> Share </p>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default TopDetails