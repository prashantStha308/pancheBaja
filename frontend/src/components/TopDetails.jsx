import ProfilePicture from "./icons/ProfilePicture";
import PlayBtn from "./Button/PlayBtn";
import ShuffleBtn from "./Button/ShuffleBtn";
import Share from "./icons/Share";
import Heart from "./icons/Heart";
import Dot from "./icons/Dot";

const TopDetails = ({ visitingPage }) => {

    let duration = '';

    if (typeof visitingPage?.duration === 'number' && !isNaN(visitingPage.duration)) {
        const durationInMs = visitingPage.duration * 1000;
        const isoTime = new Date(durationInMs).toISOString();
        duration = visitingPage.duration < 3600 
        ? isoTime.substring(14, 19) 
        : isoTime.substring(11, 16);
    }

    return (
        <section className="flex flex-col gap-4 items-start mt-8 w-full" >
            {/* playlist details section */}
            <section id="playlistDetails" className="flex gap-4 justify-start items-center" >
                <div className="flex items-center gap-4 md:gap-16" >
                    <div>
                        {/* for medium to larger sclae */}
                        <img src={visitingPage.image.src} alt={""} width={190} height={190} className=" rounded-xs hidden md:block aspect-square object-cover " />
                        {/* for smaller scale */}
                        <img src={visitingPage.image.src} alt={""} width={140} height={140} className=" rounded-xs md:hidden aspect-square object-cover " />
                    </div>
                    <article className="w-fit flex flex-col gap-2">
                        <p className=" capitalize font-medium text-sm md:text-lg" > { visitingPage?.type } </p>

                        {/* set user input limit to 50 charcters */}
                        <p className="capitalize text-[clamp(1.25rem,4vw,2.75rem)] font-extrabold w-fit break-words" > { visitingPage?.title } </p>
                        
                    <div id="created-by" className="flex items-center gap-1" >
                            <ProfilePicture src={"/assets/aadiiItyadii.jpg"} size={25} />
                            <p className="text-3xl" > &middot; </p>
                            <p className="text-xs md:text-base font-semibold" > Popsy </p>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm" >
                            <p> <span className="font-bold" >{visitingPage.totalTracks || ""}</span> tracks </p>
                            <p> <Dot size={5} /> </p>
                            <p> <span className="font-bold" > {duration} </span> </p>
                            <p> <Dot size={5} /> </p>
                            <p> <span className="font-bold" > {visitingPage?.saves} </span> saves </p>
                        </div>
                    </article>
                </div>
            </section>
            {/* bottom button section */}
            <section className="flex justify-between items-center w-full" >
                <div className="flex gap-4" >
                    <PlayBtn />
                    <ShuffleBtn />
                </div>

                <div className="flex gap-4 items-center" >
                    {/* Love*/}
                    <div className="flex flex-col items-center gap-1 md:gap-2 p-2 hover:bg-hover-primary active:bg-hover-primary cursor-pointer aspect-square rounded-sm transition-all duration-100 ease-in-out group" >
                        <Heart size={20} className="hidden md:block group-hover:text-red-primary group-active:text-red-primary"  />
                        <Heart size={15} className="md:hidden group-hover:text-red-primary group-active:text-red-primary"  />
                        <p className="text-xs"> Save </p>
                    </div>

                    {/* Share */}
                    <div className="flex flex-col items-center gap-1 md:gap-2 p-2 hover:bg-hover-primary active:bg-hover-primary cursor-pointer aspect-square rounded-sm transition-all duration-100 ease-in-out" >
                        <Share size={20} className="hidden md:block" />
                        <Share size={15} className="md:hidden" />
                        <p className="text-xs"> Share </p>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default TopDetails