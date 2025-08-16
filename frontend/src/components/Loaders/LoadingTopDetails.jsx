import { motion } from 'motion/react';
import Dot from '../icons/Dot';
import LoadingPfp from './LoadingPfp';
import React from 'react';

const LoadingTopDetails = () => {

    const motionDiv = (animateObj = { x: [-40, 100] }, transitionObj = { duration: 2, repeat: Infinity, ease: 'easeInOut' }, className = "bg-white/45 blur-md h-full w-4") => {
        return (
            <motion.div
                animate={animateObj}
                transition={transitionObj}
                className={className}
            ></motion.div>
        )
    }

    return (
        <section id="loading-top-details" className="flex flex-col gap-4 items-start w-full" >

            <section id="playlistDetails" className="flex w-full gap-4 justify-start items-center " >
                <div className="flex flex-col md:flex-row md:items-center gap-8 w-full md:w-auto " >

                     {/* Image Section */}
                    <div className="flex justify-center md:block w-full md:w-auto " >

                        <div className='relative flex items-center bg-hover-tersery w-[170px] h-[170px] shadow-md shadow-black rounded-sm overflow-hidden' >
                            <motion.div
                                animate={{
                                    x: [-45, 190],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    ease: 'easeInOut',
                                    repeat: Infinity,
                                    repeatType: 'loop'
                                }}
                                className='h-[180px] w-[30px] bg-white/15 blur-lg'
                            ></motion.div>
                        </div>
                    </div>

                    {/* Track Details */}
                    <article className="flex flex-col gap-4">
                        <div className=" capitalize font-medium hidden md:block md:text-lg" > </div>

                        {/* Name of playlist / track */}
                        <div className="overflow-hidden h-8 w-64 md:w-xs rounded-sm bg-hover-primary" > {
                            motionDiv({
                                x: [-50, 330],
                                opacity:[0.5, 1, 0.5]
                            }, {
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            },
                            "bg-white/15 blur-md h-full w-8"
                            )
                        } </div>
                        
                        <div className="flex md:flex-col items-center md:items-start gap-1.5" >
                            {/* User pfp */}
                            <div id="created-by" className="flex items-center gap-1.5" >

                                <LoadingPfp size={30} />
                                
                                <Dot size={3} />
                                <div className="bg-hover-primary h-4 w-16 md:w-20 rounded-sm overflow-hidden " >
                                    {motionDiv()}
                                </div>
                                
                                <span className="md:hidden" >
                                    <Dot size={3} />
                                </span>
                            </div>
                            
                            {/* Metadatas */}
                            <div className="flex items-center gap-1.5 md:gap-3 text-sm md:text-base" >
                                {
                                    [1, 2, 3].map((item, index) => (
                                        <React.Fragment key={index}>
                                            <div className='bg-hover-primary overflow-hidden w-10 md"w-14 h-4 rounded-sm' >
                                                {motionDiv(
                                                    {
                                                        x:[-40, 100]
                                                    },
                                                    {
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: 'easeInOut'
                                                    }
                                                )}
                                            </div>

                                            <div className='text-white-tersery' >
                                                {
                                                    item !== 3 && <Dot size={3} />
                                                }
                                            </div>
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            {/* bottom button section */}
            <section className="flex flex-row-reverse md:flex-row justify-between items-center w-full" >
                <div className="flex flex-row-reverse md:flex-row gap-2" >
                    {
                        [1, 2].map((_, index) => (
                            <div key={index} className='bg-hover-primary w-16 h-7 rounded-sm overflow-hidden' >
                                {
                                    motionDiv({
                                        x:[-40, 100]
                                    },
                                    {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    })
                                }
                            </div>
                        ))
                    }
                </div>

                <div className="flex gap-4 items-center" >
                    <div className='bg-hover-primary w-28 h-8 rounded-sm overflow-hidden' >
                        {motionDiv({x:[-40, 140]})}
                    </div>
                </div>
            </section>
        </section>
    )
}

export default LoadingTopDetails