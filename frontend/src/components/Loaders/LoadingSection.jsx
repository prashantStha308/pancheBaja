import React from 'react'
import {motion, spring} from "motion/react"
import useIsMobile from '../../utils/useIsMobile';
import LoadingTile from './LoadingTile';

const LoadingSection = () => {

    const sectRef = React.useRef(null);
    const isMobile = useIsMobile(760)

    const containerVarient = {
    hidden: {
        opacity: 0.25,
    },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.065,
        type: spring,
        stiffness: 2000,
        damping: 20
        },
    },
    };

    const childVarient = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    
    const Array = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <motion.section initial="hidden" whileInView="visible" variants={containerVarient} viewport={{ amount: isMobile ? 0.5 : 0.1 }} className="flex flex-col isolate w-full justify-center " >
            
            <div
                className="relative bg-white-primary/10 w-[40%] md:w-[25%] h-5 rounded-sm overflow-hidden"
            >
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
            </div>
            
            <article ref={sectRef} className=" relative max-w-screen h-full flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide" >

            { Array.map( (item , index) => (
                <motion.div key={index} variants={childVarient} >
                    <LoadingTile />
                </motion.div>
            ) ) }

            </article>
        </motion.section>
    )
}

export default LoadingSection