// Libraries
import { Link } from "react-router-dom";
// Stores
import useNavbarStore from "../../store/navbar.store"
// Components
import SearchButton from "../Button/SearchButton.jsx";
import Home from "../icons/Home";
import Library from "../icons/Library";

const NavbarList = () => {

    const { currentPage, isSearchActive } = useNavbarStore();

    return (
        <nav className=" hidden md:flex items-end gap-1" >
            <Link to={'/'} >
                <li className={`list-none group p-2 px-8 rounded-sm ${currentPage === "home" ? "bg-black-tersery/50  text-white-primary" : "text-red-primary hover:bg-hover-primary/55 hover:backdrop-blur-lg hover:text-white-secondary "} transition-all duration-100 ease-in cursor-pointer`} >
                    <div className="header-items" >
                        <Home size={20} strokeWidth={6} />
                        <span className="header-links " > Home </span>
                    </div>
                </li>
            </Link>
            <Link to={'/explore'} >
                    <SearchButton isActive={isSearchActive} />
            </Link>
            <Link to={'/library'} >  
                <li className={`list-none group p-2 px-8 rounded-sm ${currentPage === "library" ? "bg-black-tersery/50  text-white-primary" : "text-red-primary hover:bg-hover-primary/55 hover:backdrop-blur-lg hover:text-white-secondary "} transition-all duration-100 ease-in cursor-pointer`} >  
                    <div className="header-items" >
                        <Library size={20} strokeWidth={6} />
                        <span className="header-links" > Library </span>
                    </div>
                </li>
            </Link>
        </nav>
    )
}

export default NavbarList