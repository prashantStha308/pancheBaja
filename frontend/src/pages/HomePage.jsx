import { useEffect, useRef, useState } from "react";
import PlaylistTile from "../components/Tiles/PlaylistTile.jsx"
import {ChevronRight} from "lucide-react";

const HomePage = () => {

  const testData = [
    {
      title: "Top Hits",
      createdBy: "Panche Baja",
      numberOfTracks: 50,
      imgSrc: '/assets/laijauMalai.webp'
    },
    { title: "Rock Hits",
      createdBy: "Panche Baja",
      numberOfTracks: 50,
      imgSrc: '/assets/attiBhayo.jpeg'
     },
     {
      title: "Tender Lifts",
      createdBy: "Panche Baja",
      numberOfTracks: 50,
      imgSrc: '/assets/aadiiItyadii.jpg'
     },
     {
      title: "Lovely Upbeats",
      createdBy: "Panche Baja",
      numberOfTracks: 50,
      imgSrc: '/assets/sastoMutu.png'
     },
     {
      title: "Timeless hits",
      createdBy: "Panche Baja",
      numberOfTracks: 50,
      imgSrc: '/assets/narayanGopal.jpg'
     },
     {
      title: "Newari Expendition",
      createdBy: "Panche Baja",
      numberOfTracks: 50,
      imgSrc: '/assets/kumaSagar.jpeg'
     }
  ]
  const scrollRef = useRef(null);
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
    element.scrollBy({ left: 200, behavior: "smooth" });
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
    <div className="flex flex-col gap-8 w-full lg:w-auto" >
      <section className="flex flex-col gap-2 px-5" >
        <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold" > Top Hits </h2>
        <article ref={scrollRef} className=" relative h-auto flex gap-12 lg:gap-4 overflow-x-auto lg:overflow-x-hidden scrollbar-hide" >
          {/* also set a definate height for tiles, to make it uniform */}
          {
            testData.map( (item , index) => <PlaylistTile item={item} key={index} /> )
          }

          {/* Can use ref instead to toggle opacity instead to have a bit smoother transition when it goes hidden. */}
          {
            !atEndScroll &&(
            <button onClick={scrollRight} className="sticky z-30 right-0 top-0 flex justify-end items-center h-40 lg:h-50 w-20 bg-gradient-to-l from-gray-900 to-transparent text-white-tersery cursor-pointer" >
              <ChevronRight />
            </button>
            )
          }
        </article>
      </section>
    </div>
  )
}

export default HomePage