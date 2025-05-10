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

    console.log(atEndScroll);

    return (
        !atEndScroll &&(
            <button onClick={scrollRight} className="sticky z-30 -left-3 top-0 flex justify-end items-center w-20 text-white-tersery cursor-pointer p-3 opacity-70 hover:opacity-95 active:opacity-95 transition-all duration-100 ease-in" style={{height: `${scrollRef.clientHeight}`}} >
                <div className="bg-red-primary text-black-secondary rounded-full p-2">
                    <ChevronLeft />
                </div>
            </button>
        )
    )
}

export default MoveLeft