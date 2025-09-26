import { motion } from "motion/react";
import LoadingTrackDetails from "./LoadingTrackDetails";
import LoadingControllers from "./LoadingControllers";
import LoadingPfp from "../LoadingPfp";
import { Dot } from "lucide-react";

const LoadingBottomPlayer = () => {
    return (
        <div className={`hidden md:flex z-40 justify-between items-center py-2 px-5`}>
            <LoadingTrackDetails />
            <LoadingControllers />

            <div className="flex gap-2 items-center" >
                <LoadingPfp size={10} />
                <LoadingPfp size={10} />
                <LoadingPfp size={10} />
            </div>

        </div>
    )
}

export default LoadingBottomPlayer