import { motion } from 'motion/react';

const LoadingExploreTile = () => {
    return (
        <div className="relative bg-hover-primary w-[clamp(3.5rem,10vw, 9rem )] md:w-52 aspect-video rounded-md overflow-hidden shadow-md shadow-black ">
            <motion.div
                animate={{
                    x: [-130, 290],
                    y: [-90],
                    rotate:[-45]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className='h-64 w-9 absolute bg-white/15 blur-lg'
            ></motion.div>
        </div>
    )
}

export default LoadingExploreTile