// React Hooks
import { useEffect, useState } from "react"
// Assets
import googleLogo from "/assets/google_logo.png?url";
import facebookLogo from "/assets/facebook_logo.png?url";

const LoginBtn = ({ brand = "apple" }) => {

    // React Hooks
    const [src, setSrc] = useState();
    const [isError, setIsError] = useState(false);

    // Use Effects
    useEffect(() => {
        switch (brand.toLowerCase()) {
            case "google":
                setIsError(false);
                setSrc(googleLogo);
                break;
            case "facebook":
                setIsError(false);
                setSrc(facebookLogo);
                break;
            default:
                setIsError(true);
        }
    },[brand])

    if (isError) {
        return;
    }

    return (
        <button className="flex justify-between items-center bg-white-primary hover:bg-white-secondary active:bg-white-tersery text-black  cursor-pointer box-border px-10 py-2 rounded-md transition-all ease-in-out duration-100 shadow-md shadow-black" >
            
            <div>
                <img src={src} alt={`${brand.toLowerCase()} logo`} className="h-8" />
            </div>
            
            <span className="capitalize font-text font-bold">
                Continue with {brand}
            </span> 
            
            <div>
                {/* just for alignment, no real content */}
            </div>
        </button>
    )
}

export default LoginBtn