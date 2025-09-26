import { motion } from "motion/react";
import LoadingImage from "../LoadingImage";

const LoadingTrackDetails = () => {
    return (
        <section className=" flex items-center gap-2 w-fit " >
            <LoadingImage size={40} />

            <div className="flex flex-col gap-2 w-full " >
                <div
                    className="relative bg-white-primary/10 w-xs md:w-[10rem] h-2 rounded-xs overflow-hidden"
                >
                    <motion.div
                        animate={{
                            x: [-30,320]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        
                        className='h-full w-2 absolute bg-white/65 blur-md'
                    ></motion.div>
                </div>

                <div
                    className="relative bg-white-primary/10 w-xs md:w-[7rem] h-1 rounded-xs overflow-hidden"
                >
                    <motion.div
                    animate={{
                        x: [-30,320]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    
                    className='h-full w-2 absolute bg-white/65 blur-md'
                    ></motion.div>
                </div>

            </div>
        </section>
    )
}

export default LoadingTrackDetails