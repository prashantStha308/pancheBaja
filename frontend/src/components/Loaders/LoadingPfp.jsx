import React from 'react'
import {motion} from 'motion/react'

const LoadingPfp = ({ size = 45 }) => {

    return (
        <div style={{ width: size, height: size }}
            className='rounded-full bg-hover-primary overflow-hidden'
        >
            <motion.div
                animate={{
                    x: [-40, (size + 30)],
                    rotate: [-45]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity
                }}
                className={`w-3 h-full bg-white/45 blur-md`}    
            ></motion.div>
        </div>
    )
}

export default LoadingPfp