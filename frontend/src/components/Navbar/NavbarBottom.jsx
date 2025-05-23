import { Link, useLocation } from "react-router-dom"
import Home from "../icons/Home"
import Search from "../icons/Search"
import Library from "../icons/Library"
import Add from "../icons/Add"
import ProfilePicture from "../icons/ProfilePicture"
import { useEffect, useState } from "react"

const NavbarBottom = () => {

    const [ currentPage , setCurrentPage ] = useState('home');
    const location = useLocation();

    useEffect( ()=>{
        const path = location.pathname.substring(1) || "home";
        setCurrentPage(path);
    } , [location] )

  return (
    <nav className="flex justify-between items-center p-2 text-red-primary" >
        
        <Link className="px-3 py-1 rounded-md active:bg-black-tersery "  to={'/'} >
            <div>
                <Home size={25} strokeWidth={3} fill={ currentPage === 'home' ? "white" : "none" } strokeColor={ currentPage === 'home' ? "black" : "currentColor" } />
            </div>
        </Link>

        <Link className="px-3 py-1 rounded-md active:bg-black-tersery "  to={'/search'} >
            <div>
                <Search size={25} strokeWidth={3} fill={ currentPage === 'search' ? "white" : "none" } strokeColor={ currentPage === 'search' ? "white" : "currentColor" } />
            </div>
        </Link>

        <Link className="px-3 py-1 rounded-md active:bg-black-tersery" to={'/upload/track'} >
            <div>
                <Add size={35} strokeWidth={5} />
            </div>
        </Link>

        <Link className="px-4 py-2 rounded-md active:bg-black-tersery "  to={'/library'} >
            <div>
                <Library size={20} strokeWidth={3} fill={ currentPage === 'library' ? "white" : "none" } strokeColor={ currentPage === 'library' ? "white" : "currentColor" } />
            </div>
        </Link>

        <Link className="px-3 py-1 rounded-md active:bg-black-tersery " >
            <div>
                <ProfilePicture src={"/assets/aadiiItyadii.jpg"} altText="aadiiItyadi" size={35} />
            </div>
        </Link>
    </nav>
  )
}

export default NavbarBottom