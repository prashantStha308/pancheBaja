import { motion } from "motion/react";

function transition(Component){
  return function TransitionWrapper(){
    return(
      <>
        <Component />
        <motion.div
            className="slide-in relative z-[90] "
            initial={{scaleY: 1}}
            animate={{scaleY: 0}}
            exit={{scaleY: 1}}
            transition={{duration: 1, ease:[ 0.22 , 1 , 0.36 ,1 ]}}
        />

        <motion.div
            className="slide-out relative z-60"
            initial={{scaleY: 1}}
            animate={{scaleY: 0}}
            exit={{scaleY: 1}}
            transition={{duration: 2, ease:[ 0.22 , 1 , 0.36 ,1 ]}}
        />
      </>
    )
  }
}

export default transition;