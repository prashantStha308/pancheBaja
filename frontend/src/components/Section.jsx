import { useRef } from "react"
import { motion, spring } from "motion/react";
import MoveLeft from "./Button/MoveLeft";
import MoveRight from "./Button/MoveRight";
import useIsMobile from "../utils/useIsMobile.jsx";


const Section = ({ data = [] , title , Tile }) => {
  const sectRef = useRef(null);
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

  
  return (
    <motion.div initial="hidden" whileInView="visible" variants={containerVarient} viewport={{ amount: isMobile ? 0.5 : 0.1}} className="flex flex-col isolate w-full justify-center" >
        <h2 className= "text-lg md:text-xl font-bold font-header" > {title} </h2>
        <article ref={sectRef} className=" relative h-auto flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide" >

            <MoveLeft scrollRef={sectRef} />
            { data.map( (item , index) => (
                <motion.div key={index} variants={childVarient} >
                  <Tile item={item} />
                </motion.div>
            ) ) }
            <MoveRight scrollRef={sectRef} />

        </article>
    </motion.div>
  )
}

export default Section