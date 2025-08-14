// Components
import { CircleUser } from "lucide-react";
import LoadingPfp from "../Loaders/LoadingPfp";

const ProfilePicture = ({ src, alt, size = 45 }) => {

    return (
        <div className="rounded-full aspect-square cursor-pointer box-border text-red-primary hover:bg-hover-primary p-1 transition-all ease-in duration-1a00 " >
            {
                !src ?                    
                    <CircleUser size={size} />
                    :
                    <img src={src} alt={alt} className="rounded-full object-cover" width={size} height={size} />
            }
        </div>
    )
}

export default ProfilePicture