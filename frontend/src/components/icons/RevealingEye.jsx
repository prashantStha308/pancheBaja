import { motion } from "motion/react";
import { Eye } from "lucide-react";

const RevealingEye = ({toggle, revealState}) => {
    return (
        <div
            className='relative text-white-tersery cursor-pointer flex items-center'
            onClick={toggle}
        >
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: revealState ? 0 : 1 }}
                transition={{ duration: 0.15 }}
                className="absolute bg-white-tersery h-0.5 top-1/2 left-0 w-full origin-left"
            ></motion.div>
            <Eye size={20} />
        </div>
    )
}

export default RevealingEye