import React from 'react'
import { motion } from 'motion/react';

const LoadingTile = () => {

    const movingSpan =
    <motion.div
        animate={{
            x: [-30,120]
        }}
        transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        }}
        
        className='h-full w-5 absolute bg-white/70 blur-sm'
    ></motion.div>

    return (
        <motion.section
            className="flex flex-col items-center justify-start gap-2 w-40 h-56 rounded-md bg-hover-primary/25 p-4 "
        >
            <motion.div
                className=" relative overflow-hidden w-full flex justify-center aspect-square bg-hover-primary rounded-sm"
            >
                <motion.div
                    animate={{
                        x: [-90, 120, -90],
                        y: [-90],
                        rotate:[-45]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className='h-64 w-14 absolute bg-white/5 blur-lg '
                ></motion.div>
            </motion.div>

            <article className=' w-full h-24 flex flex-col justify-between' >
                <div className='flex flex-col gap-1' >

                    <div
                        className="relative bg-white-primary/25 w-[80%] h-3 rounded-xs overflow-hidden"
                    >
                        {movingSpan}
                    </div>
                    
                    <div
                        className="relative bg-white-primary/25 w-[60%] h-2.5 rounded-xs overflow-hidden"
                    >
                        {movingSpan}
                    </div>
                </div>

            </article>

        </motion.section>
    )
}

export default LoadingTile