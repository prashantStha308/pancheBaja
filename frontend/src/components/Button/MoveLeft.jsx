import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

const MoveLeft = ({ scrollRef }) => {
    const [ atEndScroll , setIsEndScroll ] = useState(false);

    const checkScrollEnd = ()=>{
        const element = scrollRef.current;
        if( !element ) return;
        const isAtEnd = element.scrollLeft <= 100;
        setIsEndScroll(isAtEnd);
    }

    const scrollRight = () => {
        const element = scrollRef.current;
        if( !element ) return;
        element.scrollBy({ left: -500, behavior: "smooth" });
        checkScrollEnd();
    };

    useEffect( ()=>{
        const element = scrollRef?.current;
        if( !element ) return;
        element.addEventListener( "scroll" , checkScrollEnd );
        checkScrollEnd();
        return () => element.removeEventListener( "scroll" , checkScrollEnd );
    } , [] )

    return (
        !atEndScroll &&(
            <button onClick={scrollRight} className="sticky -left-3 z-10 flex justify-end items-center text-white-tersery cursor-pointer p-3 opacity-80 hover:opacity-95 active:opacity-95 transition-all duration-100 ease-in isolate" style={{height: `${scrollRef.clientHeight}`}} >
                <div className=" text-red-primary bg-white-secondary/15 active:bg-white-secondary/25 rounded-full p-1 md:p-2">
                    <ChevronLeft size={30} />
                </div>
            </button>
        )
    )
}

export default MoveLeft