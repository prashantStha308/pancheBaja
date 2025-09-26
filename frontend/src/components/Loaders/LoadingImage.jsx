import { motion } from "motion/react";

const LoadingImage = ({ size = 64 }) => {

    return (
        <motion.div
            id="loading-img"
            className={`relative overflow-hidden flex justify-center aspect-square bg-white/10 rounded-sm`}
            style={{
                width: size,
                height: size
            }}
        >
            <motion.div
                animate={{
                    x: [-95, 220],
                    y: [-90],
                    rotate:[-45]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className={`absolute bg-white/25 blur-lg`}
                style={{
                    width: size/2,
                    height: size + 200
                }}
            ></motion.div>
        </motion.div>
    )
}

export default LoadingImage