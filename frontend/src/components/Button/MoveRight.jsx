import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const MoveRight = ({ scrollRef }) => {
    const [ atEndScroll , setIsEndScroll ] = useState(false);

    const checkScrollEnd = ()=>{
        const element = scrollRef.current;
        if( !element ) return;
        const isAtEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 100;
        setIsEndScroll(isAtEnd);
    }

    const scrollRight = () => {
        const element = scrollRef.current;
        if( !element ) return;
        element.scrollBy({ left: 500, behavior: "smooth" });
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
            <button onClick={scrollRight} className="sticky right-0 z-10 flex justify-end items-center p-3 text-white-tersery cursor-pointer opacity-60 hover:opacity-95 active:opacity-95 transition-all duration-100 ease-in" style={{height: `${scrollRef.clientHeight}`}}  >
                <div className="bg-red-primary text-white-secondary rounded-full p-1 md:p-2">
                    <ChevronRight />
                </div>
            </button>
        )
    )
}

export default MoveRight