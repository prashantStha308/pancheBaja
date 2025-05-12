import PlaylistTile from "../components/Tiles/PlaylistTile.jsx"
import ArtistTile from "../components/Tiles/ArtistTile.jsx";
import AlbumTile from "../components/Tiles/AlbumTile.jsx";
import Section from "../components/Section.jsx";

const HomePage = () => {

  // design a upload button on figma

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
    <div className="flex flex-col gap-8 w-full lg:w-[70dvw] " >
      <div className="" >
        <Section data={testData} title={"Top Hits"} Tile={PlaylistTile} />
        <Section data={testArtist} title={"Top Artists on Panche Baja"} Tile={ArtistTile} />
        <Section data={testArtist} title={"Popular Ablums"} Tile={AlbumTile} />
      </div>
    </div>
  )
}

export default HomePage