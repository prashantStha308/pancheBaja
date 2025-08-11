import Heart from "../icons/Heart"
import { Link } from "react-router-dom"
import Play from "../icons/Play"

const ListItems = ({ track , index , demoEffect , activeIndex }) => {

    const getDuration = () => {
        return track?.totalDuration < 3600 ? new Date(track?.totalDuration * 1000).toISOString().substring(14, 19) : new Date(track?.totalDuration * 1000).toISOString().substring(11, 16);
    }

    return (
        <tr className=" text-sm hover:text-white-primary active:text-white-primary cursor-pointer hover:bg-hover-primary active:bg-hover-primary transition-all duration-75 ease-in-out rounded-md p-4" >
            <td className="p-2 rounded-l-sm ">
                <div className="relative flex items-center gap-3">
                    {/* Index */}
                    <span className="pr-1" >
                        <div className={`${activeIndex===index ? "hidden" : "absolute left-0 top-[50%] bottom-[50%] flex items-center" }`} > {index + 1}. </div>
                        <div className={`${activeIndex===index ? "absolute left-0 top-[50%] bottom-[50%] flex items-center" : "hidden" }`} > <Play size={15} /> </div>
                    </span>
                    {/* trackName */}
                    <span className=" cursor-pointer line-clamp-1 hover:underline active:underline capitalize" onClick={() => demoEffect(index)} > {track.name} </span>
                </div>
            </td>
            {/* Artists */}
            <td className="pt-2 line-clamp-1">
            {Array.isArray(track.artists && track.artists.length >= 1)
                ? track.artists.length > 3
                    ? "Various Artists"
                    : track.artists.map((item, index) => (
                        <React.Fragment key={item._id}>
                            <Link className="hover:underline active:underline">
                                {item.name || "Unknown Artists" }
                            </Link>
                            {index < track.artists.length - 1 && ', '}
                        </React.Fragment>
                    ))
                : "Unknown Artist"}
            </td>
            <td className="p-2 rounded-r-sm ">
                <div className="flex gap-6 justify-end items-center">
                    
                    {/* Duration */}
                    <span className="text-left" > {track.totalDuration === undefined ? 0 : getDuration()} </span>
                    {/* For alignment */}
                    <span className="md:hidden group" > <Heart size={15} strokeWidth={2} className="group-hover:text-red-primary group-active:text-red-primary " /> </span>
                    {/* Heart btn */}
                    <span className="hidden md:block group" >
                        <Heart size={15} strokeWidth={3} className="group-hover:text-red-primary group-active:text-red-primary " />
                    </span>
                </div>
            </td>
        </tr>
    )
}

export default ListItems;