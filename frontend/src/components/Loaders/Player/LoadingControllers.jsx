import { motion } from "motion/react";
import LoadingPfp from "../LoadingPfp.jsx";

const LoadingControllers = () => {
    return (
        <div className="flex gap-2 items-center" >
            <LoadingPfp size={15} />
            <LoadingPfp size={25} />
            <LoadingPfp size={15} />
        </div>
    )
}

export default LoadingControllers