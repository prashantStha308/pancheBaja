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
            <button onClick={scrollRight} className="sticky -left-3 z-10 flex justify-end items-center text-white-tersery cursor-pointer p-3 opacity-60 hover:opacity-95 active:opacity-95 transition-all duration-100 ease-in isolate" style={{height: `${scrollRef.clientHeight}`}} >
                <div className="z-30 bg-red-primary text-white-secondary rounded-full p-1 md:p-2">
                    <ChevronLeft />
                </div>
            </button>
        )
    )
}

export default MoveLeft