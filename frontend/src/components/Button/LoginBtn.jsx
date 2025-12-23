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
        <button className="" >
            
            <div>
                <img src={src} alt={`${brand.toLowerCase()} logo`} className="h-10" />
            </div>
{/*             
            <span className="capitalize font-text font-bold">
                Continue with {brand}
            </span> 
            
            <div></div> */}
        </button>
    )
}

export default LoginBtn