import { Link, useLocation, useNavigate } from "react-router-dom";
import Home from "../icons/Home";
import Library from "../icons/Library";
import Search from "../icons/Search";
import Logo from "../icons/Logo"
import ProfilePicture from "../icons/ProfilePicture"
import { useEffect, useState } from "react";
import useUserStore from "../../store/user.store";
import TransitionLink from "../Wrappers/TransitionLink";

const NavbarPlaylist = () => {

    const [ currentPage , setCurrentPage ] = useState('home');
    const location = useLocation();
    const navigate = useNavigate();
    const {isLoggedIn} = useUserStore()

    const  handleUserRedirect = ()=>{
        if( !isLoggedIn ){
            navigate('/signup');
        }
    }

    useEffect( ()=>{
        const path = location.pathname.substring(1).split('/')[0] || "home";
        setCurrentPage(path);
    } , [location] )

  return (
    <header className="header bg-black-secondary/70 backdrop-blur-md" >
        <div className="flex items-end justify-between pb-1" >
            {/* left */}
            <div className="flex items-end gap-4 w-full" >

                <div className="flex w-full md:w-auto justify-end md:justify-start " >
                    <Link to={'/'} className="flex flex-row-reverse md:flex-row md:justify-start items-end gap-3 px-2" >
                        <Logo size={40} />
                        <span className="md:hidden text-xl font-extrabold text-red-primary underline" > Panche Baja </span>
                    </Link>
                </div>

                <nav className=" hidden md:flex items-end gap-1" >
                    <Link to={'/'} >
                        <li className={`list-none group p-2 px-8 rounded-sm ${currentPage === "home" ? "bg-black-tersery/50  text-white-primary" : "text-red-primary hover:bg-hover-primary/55 hover:backdrop-blur-lg hover:text-white-secondary "} transition-all duration-100 ease-in cursor-pointer`} >
                            <div className="header-items" >
                                <Home size={20} strokeWidth={6} />
                                <span className="header-links " > Home </span>
                            </div>
                        </li>
                    </Link>
                    <Link to={'/search'} >
                        <li className={`list-none group p-2 px-8 rounded-sm ${currentPage === "search" ? "bg-black-tersery/50  text-white-primary" : "text-red-primary hover:bg-hover-primary/55 hover:backdrop-blur-lg hover:text-white-secondary "} transition-all duration-100 ease-in cursor-pointer`} >
                            <div className="header-items" >
                                <Search size={20} strokeWidth={6} />
                                <span className="header-links" > Search </span>
                            </div>
                        </li>
                    </Link>
                    <Link to={'/library'} >  
                        <li className={`list-none group p-2 px-8 rounded-sm ${currentPage === "library" || currentPage === "playlist" ? "bg-black-tersery/50  text-white-primary" : "text-red-primary hover:bg-hover-primary/55 hover:backdrop-blur-lg hover:text-white-secondary "} transition-all duration-100 ease-in cursor-pointer`} >  
                            <div className="header-items" >
                                <Library size={20} strokeWidth={6} />
                                <span className="header-links" > Library </span>
                            </div>
                        </li>
                    </Link>
                </nav>
            </div>

            {/* pp */}
            <div className="hidden md:block" onClick={handleUserRedirect} >
                <ProfilePicture src={"/assets/aadiiItyadii.jpg"} altText="aadiiItyadi" size={35} />
            </div>
        </div>
        <hr className="bg-red-primary rounded-xs h-0.5 border-none" />
    </header>
  )
}

export default NavbarPlaylist