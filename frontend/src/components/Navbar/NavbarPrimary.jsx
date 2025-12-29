// Libraries
import { useEffect, useRef} from "react";
import { Link, useLocation } from "react-router-dom";
// Stores
import useNavbarStore from "../../store/navbar.store";
// Components
import Logo from "../icons/Logo"
import NavbarList from "./NavbarList";
import NavbarActions from "./NavbarActions";
import NavbarBack from "./NavbarBack";


const NavbarPrimary = () => {

    const { setCurrentPage, setIsSearchActive, setNavbarRef } = useNavbarStore.getState();
    const currentPage = useNavbarStore(store => store.currentPage);

    const navRef = useRef();
    const location = useLocation();

    useEffect( ()=>{
        const path = location.pathname.substring(1).split('/')[0] || "home";

        setCurrentPage(path);
        setIsSearchActive(currentPage === 'explore' && location.pathname.substring(1).split('/').length === 1 );

    }, [location, currentPage])


    // Get navbar ref
    useEffect(() => {
        if (navRef.current !== null) {
            setNavbarRef(navRef);
        }
    },[navRef, setNavbarRef])



  return (
    <header ref={navRef} className="header bg-black-secondary/70 backdrop-blur-md" >
        <div className="flex items-end justify-between pb-1" >
            {/* left */}
            <div className="flex items-end gap-4 w-full" >
                <div className="flex w-full md:w-auto justify-between md:justify-start " >
                    {/* Go back button for mobile */}
                    <NavbarBack />

                    {/* Logo */}
                    <Link to={'/'} className="flex md:flex-row md:justify-start items-end gap-3 px-2" >
                        <Logo size={40} />
                        <span className="md:hidden font-header text-xl font-extrabold text-red-primary underline" > Panche Baja </span>
                    </Link>
                    <div className="md:hidden" > {/* For aligment purpose only */} </div>

                </div>
                    <NavbarList />
            </div>
              
            <NavbarActions />
        </div>
        <hr className="bg-red-primary rounded-xs h-0.5 border-none" />
    </header>
  )
}

export default NavbarPrimary