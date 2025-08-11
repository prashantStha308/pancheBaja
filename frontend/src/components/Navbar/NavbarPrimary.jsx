// Libraries
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Icons
import Home from "../icons/Home";
import Library from "../icons/Library";
import Search from "../icons/Search";
import Logo from "../icons/Logo"
import Add from "../icons/Add";
import ProfilePicture from "../icons/ProfilePicture"
// Lucid React
import { Bell, ChevronLeft } from "lucide-react";
// Stores
import useUserStore from "../../store/user.store";
import useGlobalStore from "../../store/global.store";

const NavbarPrimary = () => {

    const [currentPage, setCurrentPage] = useState('home');
    const navRef = useRef();
    const historyStack = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn } = useUserStore()
    const { setNavbarRef } = useGlobalStore();

    const  handleUserRedirect = ()=>{
        if( !isLoggedIn ){
            navigate('/login');
        }
    }
    
    const canGoBack = historyStack.current.length > 1;

    const goBack = () => {
        if (canGoBack) {
            historyStack.current.pop();
            navigate(-1);
        } else {
            console.log("No previous page");
        }
    }

    useEffect( ()=>{
        const path = location.pathname.substring(1).split('/')[0] || "home";
        setCurrentPage(path);
    }, [location])

    useEffect(() => {
        const last = historyStack.current[historyStack.current.length - 1];
        if (last !== location.pathname) {
            historyStack.current.push(location.pathname);
        }
    },[location])

    // Get navbar height
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

                  {/* Edit for mobile */}
                <div className="flex w-full md:w-auto justify-between md:justify-start " >

                    <button className={` ${ canGoBack ? "opacity-100" : "opacity-0" } rounded-full p-0.5 active:bg-hover-primary transition-all duration-100 ease-in-out`} onClick={goBack} >
                        <ChevronLeft className="text-red-primary md:hidden" size={30} />
                    </button>

                    <Link to={'/'} className="flex md:flex-row md:justify-start items-end gap-3 px-2" >
                        <Logo size={40} />
                        <span className="md:hidden font-header text-xl font-extrabold text-red-primary underline" > Panche Baja </span>
                    </Link>
                        
                      <div className="md:hidden" ></div>

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

              {/* Right portion */}
              <div className="hidden md:flex items-center gap-4" >
                    <button className="flex items-center text-red-primary " >
                        <Add size={35} />
                    </button>

                  <button className="flex items-center text-red-primary hover:text-white-secondary hover:fill-red-primary cursor-pointer hover:bg-hover-primary active:bg-hover-primary transition-all ease-in-out duration-100 box-border p-1 rounded-full" >
                      <Bell size={25} />
                  </button>
                  
                    <button className="items-center" onClick={handleUserRedirect}>
                        <ProfilePicture src={"/assets/aadiiItyadii.jpg"} altText="aadiiItyadi" size={50} />
                    </button>                  
              </div>
        </div>
        <hr className="bg-red-primary rounded-xs h-0.5 border-none" />
    </header>
  )
}

export default NavbarPrimary