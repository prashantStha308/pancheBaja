import { Link } from "react-router-dom"
import { Menu } from "lucide-react"
import { useState } from "react"

const Navbar = () => {

    const [ isOpen , setIsOpen ] = useState(false);

    const toggleMobileNavbar = ()=>{
        setIsOpen(!isOpen);
    }

  return (
    <header className=" px-5 lg:px-16 py-4 flex items-center justify-between z-50" >
        {/* icon and company name */}
        <Link to={'/'} >
            <div className="flex items-center justify-between gap-6" >
                <img src="/assets/logo.svg" alt="panche baja logo" width={25} height={25} />
                <h1 className="text-xl lg:text-2xl font-extrabold underline text-red-primary" >Panche Baja</h1>
            </div>
        </Link>

        {/* navlinks for larger devices */}
        <nav className="hidden lg:block" >
            <ul className="flex gap-4 text-red-primary font-medium" >
                <li className="cursor-pointer hover:text-red-secondary" >Home</li>
                <li className="cursor-pointer hover:text-red-secondary" >Library</li>
                <li className="cursor-pointer hover:text-red-secondary" >Upload</li>
            </ul>
        </nav>

        {/* Hamburger to activate navbar for smaller devices */}
        <button className="lg:hidden p-4 hover:bg-white/10 active:bg-white/20 transition-all duration-150 rounded-lg focus:outline-1 text-red-primary hover:text-white active:text-white cursor-pointer" onClick={toggleMobileNavbar} >
            <Menu size={30} />
        </button>

        {/* navbar */}
        {
            isOpen&&(
                <div className="absolute left-0 top-0 grid gap-4 min-h-screen w-full z-40" >

                </div>
            )
        }

    </header>
  )
}

export default Navbar