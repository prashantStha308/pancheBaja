// Libraries
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
// Components
import { ChevronLeft } from 'lucide-react';

const NavbarBack = () => {

    const historyStack = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();

    const canGoBack = historyStack.current.length > 1;
    const goBack = () => {
        if (canGoBack) {
            historyStack.current.pop();
            navigate(-1);
        } else {
            console.log("No previous page");
        }
    }

    useEffect(() => {
        const last = historyStack.current[historyStack.current.length - 1];
        if (last !== location.pathname) {
            historyStack.current.push(location.pathname);
        }
    },[location])

    return (
        <button className={` ${ canGoBack ? "opacity-100" : "opacity-0" } rounded-full p-0.5 active:bg-hover-primary transition-all duration-100 ease-in-out`} onClick={goBack} >
            <ChevronLeft className="text-red-primary md:hidden" size={30} />
        </button>
    )
}

export default NavbarBack