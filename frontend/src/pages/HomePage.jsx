import PlaylistTile from "../components/Tiles/PlaylistTile.jsx"
import ArtistTile from "../components/Tiles/ArtistTile.jsx";
import AlbumTile from "../components/Tiles/AlbumTile.jsx";
import Section from "../components/Section.jsx";

const HomePage = () => {


  const testData = [
    {
      title: "Top Hits",
      createdBy: "",
      numberOfTracks: 50,
      imgSrc: '/assets/laijauMalai.webp'
    },
    { title: "Rock Hits",
      createdBy: "",
      numberOfTracks: 50,
      imgSrc: '/assets/attiBhayo.jpeg'
     },
     {
      title: "Tender Lifts",
      createdBy: "",
      numberOfTracks: 50,
      imgSrc: '/assets/aadiiItyadii.jpg'
     },
     {
      title: "Lovely Upbeats",
      createdBy: "",
      numberOfTracks: 50,
      imgSrc: '/assets/sastoMutu.png'
     },
     {
      title: "Timeless hits",
      createdBy: "",
      numberOfTracks: 50,
      imgSrc: '/assets/narayanGopal.jpg'
     },
     {
      title: "Newari Expendition",
      createdBy: "",
      numberOfTracks: 50,
      imgSrc: '/assets/kumaSagar.jpeg'
     },
  ]

  const testArtist=[
    { name: "Albatross",
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
  ]

  return (
    <div className="flex flex-col gap-8 w-full lg:w-[70dvw] justify-center " >
      {/* <div className=" flex flex-col gap-4 " > */}
        <Section data={testData} title={"Top Hits"} Tile={PlaylistTile} />
        <Section data={testArtist} title={"Top Artists on Panche Baja"} Tile={ArtistTile} />
        <Section data={testArtist} title={"Popular Ablums"} Tile={AlbumTile} />
      {/* </div> */}
    </div>
  )
}

export default HomePage