import { AnimatePresence, motion } from "motion/react";
import { Minus } from 'lucide-react';
import { useEffect, useRef } from "react";

const DefaultModel = ({ title = "Title", message = " This is a message", handleClose, isOpen }) => {

    const modelRef = useRef();

    useEffect(() => {
        if (!modelRef.current || !isOpen) return
        
        const handleOutOfBoxClick = (e) => {
            console.log("Clicked");
            if( modelRef.current && !modelRef.current.contains(e.target) ) handleClose()
        }
        
        document.addEventListener("mousedown", handleOutOfBoxClick);

        return (() => document.removeEventListener("mousedown", handleOutOfBoxClick));
    })

    return (
        <AnimatePresence>
            {
                isOpen && (
                    <motion.section
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        exit={{
                            opacity: 0,
                            pointerEvents: "none"
                        }}
                        
                        transition={{
                            duration: 0.15,
                            type: "spring",
                            damping: 10,
                            stiffness: 100
                        }}
                        className="fixed top-0 bottom-0 bg-black/70 w-screen min-h-screen flex justify-center items-center "
                    >
                        <motion.section
                            ref={modelRef}
                            className='bg-black-secondary rounded-lg border border-black-tersery w-80 min-h-32 flex flex-col px-4 py-2 gap-4'
                            initial={{y: -500}}
                            
                            animate={{
                                y: 0
                            }}
                            exit={{
                                y: -500,
                                pointerEvents:"none"
                            }}
                            transition={{
                                duration: 0.15,
                                type: "spring",
                                damping: 10,
                                stiffness: 100
                            }}
                        >
                            <div
                                className='flex justify-between items-center border-b border-b-black-tersery pb-1'
                            >
                                {/* header */}
                                <h1 className='' >
                                    {title}
                                </h1>

                                <button
                                    className='p-2 cursor-pointer rounded-sm hover:bg-black-tersery transition-all duration-175 ease-in'
                                    onClick={handleClose}
                                >
                                    <Minus size={15} />
                                </button>
                            </div>

                            {/* Body */}
                            <div
                                className='w-full px-2'
                            >
                                {message}
                            </div>

                        </motion.section>
                    </motion.section>
                )
            }
        </AnimatePresence>
    )
}

export default DefaultModel