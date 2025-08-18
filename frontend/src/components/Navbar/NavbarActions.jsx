// Libraries
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
// Stores
import useUserStore from "../../store/user.store"
// Components
import ProfilePicture from "../icons/ProfilePicture";
import Add from "../icons/Add";
import { Bell } from "lucide-react";

const NavbarActions = () => {
    const navigate = useNavigate();
    const { isLoggedIn, currentUser } = useUserStore();

    const handleUserRedirect = () => {
        if (!isLoggedIn) navigate("/login");
        
        else navigate("/me");
    };

    return (
        <div className="hidden md:flex items-center gap-4">
                <>
                    <button className="flex items-center text-red-primary">
                        <Link to={"/publish"}>
                            <Add size={35} />
                        </Link>
                    </button>

                    <button className="flex items-center text-red-primary hover:text-white-secondary hover:fill-red-primary cursor-pointer hover:bg-hover-primary active:bg-hover-primary transition-all ease-in-out duration-100 box-border p-1 rounded-full">
                        <Link to={"/me/notification"}>
                            <Bell size={25} />
                        </Link>
                    </button>

                    <button className="items-center" onClick={handleUserRedirect}>
                        <ProfilePicture
                            src={currentUser?.profilePicture?.src}
                            alt={"profile"}
                            size={30}
                        />
                    </button>
                </>
        </div>
    );
};

export default NavbarActions;
