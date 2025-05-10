import { useRef } from "react";
import PlaylistTile from "../components/Tiles/PlaylistTile.jsx"
import MoveRight from "../components/Button/MoveRight.jsx";
import MoveLeft from "../components/Button/MoveLeft.jsx";
import ArtistTile from "../components/Tiles/ArtistTile.jsx";
import AlbumTile from "../components/Tiles/AlbumTile.jsx";

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
     },
  ]

  const testArtist=[
    { name: "The Elements",
      imgSrc: '/assets/attiBhayo.jpeg'
     },
     {
      name: "Bhartika Eam Rai",
      imgSrc: '/assets/aadiiItyadii.jpg'
     },
     {
      name: "Sajjan Raj Bhyaddya",
      imgSrc: '/assets/sastoMutu.png'
     },
     {
      name: "Narayan Gopal",
      imgSrc: '/assets/narayanGopal.jpg'
     },
     {
      name: "Kuma Sagar",
      imgSrc: '/assets/kumaSagar.jpeg'
     },
     {
      name: "Bhartika Eam Rai",
      imgSrc: '/assets/aadiiItyadii.jpg'
     },
     {
      name: "Sajjan Raj Bhyaddya",
      imgSrc: '/assets/sastoMutu.png'
     },
     {
      name: "Narayan Gopal",
      imgSrc: '/assets/narayanGopal.jpg'
     },
     {
      name: "Kuma Sagar",
      imgSrc: '/assets/kumaSagar.jpeg'
     },
  ]

  const topHits = useRef(null);
  const topArtist = useRef(null);
  const popularAlbum = useRef(null);


  return (
    <div className="flex flex-col gap-8 w-full lg:w-[70dvw]" >
      {/* Top hits */}
      <section className="flex flex-col px-5 " >
        <h2 className="text-base md:text-lg lg:text-xl font-bold" > Top Hits </h2>
        <article ref={topHits} className=" relative h-auto flex  gap-7 lg:gap-4 overflow-x-auto  scrollbar-hide" >

          <MoveLeft scrollRef={topHits} />
          { testData.map( (item , index) => <PlaylistTile item={item} key={index} /> ) }
          <MoveRight scrollRef={topHits} />

        </article>
      </section>

      {/* Top Artists */}
      <section className="flex flex-col px-5 " >
        <h2 className="text-base md:text-lg lg:text-xl font-bold" > Top Artist </h2>
        <article ref={topArtist} className=" relative h-auto flex  gap-7 lg:gap-4 overflow-x-auto  scrollbar-hide" >
          
          <MoveLeft scrollRef={topArtist} />
          { testArtist.map( (item , index) => <ArtistTile item={item} key={index} /> ) }
          <MoveRight scrollRef={topArtist} />

        </article>
      </section>

      {/* Popular Albums */}
      <section className="flex flex-col px-5 " >
        <h2 className="text-base md:text-lg lg:text-xl font-bold" > Popular Albums </h2>
        <article ref={popularAlbum} className=" relative h-auto flex  gap-7 lg:gap-4 overflow-x-auto  scrollbar-hide" >
          
          <MoveLeft scrollRef={popularAlbum} />
          { testArtist.map( (item , index) => <AlbumTile item={item} key={index} /> ) }
          <MoveRight scrollRef={popularAlbum} />

        </article>
      </section>
    </div>
  )
}

export default HomePage