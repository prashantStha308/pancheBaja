import Heart from "../icons/Heart"
import React, { useState , useRef } from "react"
import ListItem from "./ListItems.jsx";

const ListLayout = ({ tracks = [] }) => {
    
    const [activeIndex, setActiveIndex] = useState(null);
    const timeoutIdRef = useRef();

    const demoEffect = (index) => {
        setActiveIndex(index);

        if (timeoutIdRef.current) {
            clearInterval(timeoutIdRef.current);
        }

        timeoutIdRef.current = setTimeout( ()=> setActiveIndex(null) , 3 * 1000 );
    }
    
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
                            <span className="text-left hidden md:block " >Duration</span>
                            <span className="opacity-0" ><Heart size={15} /></span>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody className="text-xs md:text-xs text-white-secondary" >
                {
                      tracks.map((track, index) => (
                          <React.Fragment key={index} >
                              <ListItem track={track} index={index} demoEffect={demoEffect} activeIndex = {activeIndex} />
                        </React.Fragment>
                    ) )
                }
            </tbody>
        </table>
    </section>
  )
}

export default ListLayout;