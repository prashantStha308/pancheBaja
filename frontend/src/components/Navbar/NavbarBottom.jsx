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
        const path = location.pathname.substring(1).split('/')[0] || "home";
        setCurrentPage(path);
    }, [location])
    
    const primaryRed = "#fd4b4e";

  return (
    <nav className="flex justify-between items-center p-2 text-red-primary" >
        
        <Link className="px-3 py-1 rounded-md active:bg-black-tersery "  to={'/'} >
            <div>
                <Home size={25} strokeWidth={3} fill={ currentPage === 'home' ? primaryRed : "none" } strokeColor={ currentPage === 'home' ? "black" : "currentColor" } />
            </div>
        </Link>

        <Link className="px-3 py-1 rounded-md active:bg-black-tersery "  to={'/search'} >
            <div>
                <Search size={25} strokeWidth={3} fill={ currentPage === 'search' ? primaryRed : "none" } strokeColor={ currentPage === 'search' ? primaryRed : "currentColor" } />
            </div>
        </Link>

        <Link className="px-3 py-1 rounded-md active:bg-black-tersery" to={'/upload/track'} >
            <div>
                <Add className={`${currentPage === 'upload' && "fill-red-primary text-white " }`} size={35} strokeWidth={5} />
            </div>
        </Link>

        <Link className="px-4 py-2 rounded-md active:bg-black-tersery "  to={'/library'} >
            <div>
                <Library size={20} strokeWidth={3} fill={ currentPage === 'library' ? primaryRed : "none" } strokeColor={ currentPage === 'library' ? primaryRed : "currentColor" } />
            </div>
        </Link>

        <Link to={'/login'} className="px-3 py-1 rounded-md active:bg-black-tersery " >
            <div>
                <ProfilePicture src={"/assets/aadiiItyadii.jpg"} altText="aadiiItyadi" size={35} />
            </div>
        </Link>
    </nav>
  )
}

export default NavbarBottom