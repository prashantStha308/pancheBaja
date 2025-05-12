import { Link, useLocation } from "react-router-dom"
import Home from "../icons/Home"
import Library from "../icons/Library"
import Search from "../icons/Search"
import Logo from "../icons/Logo"
import ProfilePicture from "../icons/ProfilePicture"
import { useEffect, useState } from "react"

const Navbar = () => {

    const [ currentPage , setCurrentPage ] = useState('home');
    const location = useLocation();

    useEffect( ()=>{
        const path = location.pathname.substring(1) || "home";
        setCurrentPage(path);
    } , [location] )

  return (
    <header className="header bg-black-primary" >
        <div className="flex items-end justify-between pb-1" >
            {/* left */}
            <div className="flex items-end gap-8" >
                <Link to={'/'} className="flex items-end gap-3 px-2" >
                    <Logo size={45} />
                    <span className="md:hidden text-xl font-extrabold text-red-primary underline" > Panche Baja </span>
                </Link>
                <nav className=" hidden md:flex items-end gap-1" >
                    <Link to={'/'} >
                        <li className={`list-none group p-2 px-8 rounded-sm ${currentPage === "home" ? "bg-black-tersery text-white-primary" : "text-red-primary hover:bg-hover-primary hover:text-white-secondary "} transition-all duration-100 ease-in cursor-pointer`} >
                            <div className="flex items-center gap-4" >
                                <Home size={25} strokeWidth={6} />
                                <span className="font-medium text-sm lg:text-md " > Home </span>
                            </div>
                        </li>
                    </Link>
                    <Link to={'/search'} >
                        <li className={`list-none group p-2 px-8 rounded-sm ${currentPage === "search" ? "bg-black-tersery text-white-primary" : "text-red-primary hover:bg-hover-primary hover:text-white-secondary "} transition-all duration-100 ease-in cursor-pointer`} >
                            <div className="flex items-center gap-4" >
                                <Search size={25} strokeWidth={6} />
                                <span className="font-medium text-sm lg:text-md" > Search </span>
                            </div>
                        </li>
                    </Link>
                    <Link to={'/library'} >  
                        <li className={`list-none group p-2 px-8 rounded-sm ${currentPage === "library" ? "bg-black-tersery text-white-primary" : "text-red-primary hover:bg-hover-primary hover:text-white-secondary "} transition-all duration-100 ease-in cursor-pointer`} >  
                            <div className="flex items-center gap-4" >
                                <Library size={25} strokeWidth={6} />
                                <span className="font-medium text-sm lg:text-md" > Library </span>
                            </div>
                        </li>
                    </Link>
                </nav>
            </div>

            {/* pp */}
            <div className="hidden md:block" >
                <ProfilePicture src={"/assets/aadiiItyadii.jpg"} altText="aadiiItyadi" />
            </div>
        </div>
        <hr className="hidden md:block bg-red-primary rounded-xs h-0.5 border-none" />
    </header>
  )
}

export default Navbar