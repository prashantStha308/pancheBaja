import { AnimatePresence, motion } from "motion/react";
import { Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Toast = ({ success = true, message = "message", handleClose, isOpen = false }) => {
    
    const toastRef = useRef();
    const [toastSize, setToastSize] = useState({ w: 0, h: 0 });

    useEffect(() => {
        if (!isOpen) return;
        const timeoutId = setTimeout(() => {
            handleClose();
        }, 1000 * 2)

        return (() => clearTimeout(timeoutId))
    }, [isOpen, handleClose])
    
    useEffect(() => {
        if ( !isOpen || !toastRef.current) return
        
        const { width, height } = toastRef.current.getBoundingClientRect();

        setToastSize({
            w: width,
            h: height
        });


    }, [toastRef, isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.section
                    ref={toastRef}
                    className={`absolute bottom-0 bg-black-secondary rounded-lg border ${success ? "border-green-standard/40" : "border-red-primary/40"} w-80 min-h-14 flex flex-col px-4 py-2 gap-4 justify-center ioslate overflow-hidden`}
                    initial={{
                        opacity: 0,
                        bottom: -10
                    }}
                    
                    animate={{
                        opacity: 1,
                        bottom: 10
                    }}
                    exit={{
                        opacity: 0,
                        bottom: -10,
                        pointerEvents:"none"
                    }}
                    transition={{
                        type: "spring",
                        damping: 10,
                        stiffness: 100
                    }}
                >
                    <div className='flex justify-between items-center z-30'>
                        <span className={`${success ? "text-green-standard" : "text-red-primary"}`} >
                            {message}
                        </span>

                        <button
                            className='p-2 cursor-pointer rounded-sm hover:bg-black-tersery/40 backdrop-blur-lg transition-all duration-175 ease-in'
                            onClick={handleClose}
                        >
                            <Minus size={15} />
                        </button>
                    </div>

                    <motion.div
                        className={`absolute ${success ? "bg-green-standard/40" : " bg-red-primary/40 "} top-0 left-0 bottom-0 right-0 rounded-lg z-10`}
                        style={{
                            height: toastSize.h || 0,
                            width: 0,
                            opacity: 0
                        }}
                        initial={{
                            opacity: 0,
                            width: 0
                        }}
                        animate={{
                            width: [0, toastSize.w],
                            opacity: [0,1]
                        }}

                        exit={{
                            opacity: 0,
                            width: 0
                        }}

                        transition={{
                            duration: 2,
                            ease: "anticipate"
                        }}

                    ></motion.div>

                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default Toast