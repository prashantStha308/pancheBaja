import PlaylistTile from "../components/Tiles/PlaylistTile.jsx"
import ArtistTile from "../components/Tiles/ArtistTile.jsx";
import AlbumTile from "../components/Tiles/AlbumTile.jsx";
import Section from "../components/Section.jsx";

const HomeLayout = () => {

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
    { name: "Albatross",
      imgSrc: '/assets/attiBhayo.jpeg'
    },
    {
      name: "Bhartika Eam Rai",
      imgSrc: '/assets/aadiiItyadii.jpg'
    },
    {
      name: "Sajjan Raj Bhyaddya dkjfhsdjf skdjfkjsdhf sdkjfhksjdfh sdkjfhksdfjh skdjhfskdfjh",
      imgSrc: '/assets/sastoMutu.png'
    },
  ]

  return (
    <div className="flex flex-col mt-8 gap-8 w-full justify-start md:items-center" >
      {/* <div className=" flex flex-col gap-4 " > */}
        {/* <Section data={testData} title={"Top Hits"} Tile={PlaylistTile} /> */}
        <Section data={testArtist} title={"Top Artists on Panche Baja"} Tile={ArtistTile} />
        <Section data={testArtist} title={"Popular Ablums"} Tile={AlbumTile} />
      {/* </div> */}
    </div>
  )
}

export default HomeLayout