import { Link, useLocation } from "react-router-dom";
import Home from "./icons/Home";
import Library from "./icons/Library";
import Search from "./icons/Search";
import Logo from "./icons/Logo"
import { useEffect, useState } from "react";

const Navbar2 = () => {

    const [ currentPage , setCurrentPage ] = useState('home');
    const location = useLocation();

    useEffect( ()=>{
        const path = location.pathname.substring(1) || "home";
        setCurrentPage(path);
    } , [location] )

  return (
    <header className="px-24 lg:px-48 py-4 z-50 mt-4" >
        <div className="flex items-end justify-between border-b-4 border-red-primary px-2 pb-1" >
            {/* left */}
            <div className="flex items-end gap-8" >
                <Link to={'/'} className="px-2 group" >
                    <Logo size={50} />
                </Link>
                <nav className="flex items-end gap-4" >
                    <li className={`list-none group p-2 px-8 rounded-sm ${currentPage === "home" ? "bg-black-tersery" : ""} hover:bg-black-tersery transition-all duration-100 ease-in cursor-pointer`} >
                        <Link>
                            <div className={`flex items-center gap-4 ${ currentPage === "home" ? "text-white-primary" : "text-red-primary" } group-hover:text-white-secondary  transition-all duration-100 ease-in`} >
                                <Home size={25} strokeWidth={6} />
                                <span className="font-medium text-sm lg:text-md " > Home </span>
                            </div>
                        </Link>
                    </li>
                    <li className={`list-none group p-2 px-8 rounded-sm ${currentPage === "search" ? "bg-black-tersery" : ""} hover:bg-black-tersery transition-all duration-100 ease-in cursor-pointer`} >
                        <Link>
                            <div className={`flex items-center gap-4 ${ currentPage === "search" ? "text-white-primary" : "text-red-primary" } group-hover:text-white-secondary  transition-all duration-100 ease-in`} >
                                <Search size={25} strokeWidth={6} />
                                <span className="font-medium text-sm lg:text-md" > Search </span>
                            </div>
                        </Link>
                    </li>
                    <li className={`list-none group p-2 px-8 rounded-sm ${currentPage === "library" ? "bg-black-tersery" : ""} hover:bg-black-tersery transition-all duration-100 ease-in cursor-pointer`} >
                        <Link>    
                            <div className={`flex items-center gap-4 ${ currentPage === "library" ? "text-white-primary" : "text-red-primary" } group-hover:text-white-secondary  transition-all duration-100 ease-in`} >
                                <Library size={25} strokeWidth={6} />
                                <span className="font-medium text-sm lg:text-md" > Library </span>
                            </div>
                        </Link>
                    </li>
                </nav>
            </div>

            {/* pp */}
            <div>
                <div className="rounded-full cursor-pointer" >
                    <img src="/assets/defaultUser.jpg" alt="userIcon" className="rounded-full box-border p-1" width={50} />
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar2