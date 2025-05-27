import { Link } from "react-router-dom"
import Heart from "./icons/Heart"
import React from "react"

const List = ({ tracks = [] }) => {
  return (
    <section>
        <table className="w-full table-auto border-spacing-y-2" >
            <thead className="text-xs text-white-tersery" >
                <tr >
                    <th className="p-2" >
                        <div className="flex gap-3">
                            <span>#</span>
                            <span>Title</span>
                        </div>
                    </th>
                    <th className="text-left p-2">Artists</th>
                    <th className="p-2" >
                        <div className=" flex gap-6 justify-end">
                            <span className="text-left" >Time</span>
                            <span className="opacity-0" ><Heart size={15} /></span>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody className="text-xs md:text-sm text-white-secondary" >
                {
                    tracks.map( (track , index)=>{
                        return(
                            <tr key={index} className="text-xs hover:text-white-primary cursor-pointer hover:bg-hover-primary transition-all duration-50 ease-in-out rounded-md p-4" >
                                <td className="p-2 rounded-l-sm ">
                                    <div className="flex gap-3">
                                        <span> {index + 1} </span>
                                        <span className="hover:underline active:underline" > <Link> {track.title} </Link> </span>
                                    </div>
                                </td>
                                <td className="p-2">
                                {Array.isArray(track.artists)
                                    ? track.artists.length > 3
                                    ? "Various Artists"
                                    : track.artists.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <Link className="hover:underline active:underline">
                                            {item.name}
                                            </Link>
                                            {index < track.artists.length - 1 && ', '}
                                        </React.Fragment>
                                        ))
                                    : "Unknown Artist"}
                                </td>
                                <td className="p-2 rounded-r-sm">
                                    <div className="flex gap-6 justify-end items-center">
                                        <span className="text-left" > { track.duration === undefined ? 0 : track?.duration < 3600 ? new Date(track?.duration * 1000).toISOString().substring(14, 19) : new Date(track?.duration * 1000).toISOString().substring(11, 16) } </span>
                                        <span className="md:hidden group" > <Heart size={15} strokeWidth={2} className="group-hover:text-red-primary group-active:text-red-primary "  /> </span>
                                        <span className="hidden md:block group" > <Heart size={15} strokeWidth={3} className="group-hover:text-red-primary group-active:text-red-primary "  /> </span>
                                    </div>
                                </td>
                            </tr>
                        )
                    } )
                }
            </tbody>
        </table>
    </section>
  )
}

export default List