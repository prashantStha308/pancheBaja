import { useRef } from "react"
import { motion } from "motion/react";
import MoveLeft from "./Button/MoveLeft";
import MoveRight from "./Button/MoveRight";


const Section = ({ data = [] , title , Tile }) => {
  const sectRef = useRef(null);

  return (
      <motion.div initial={{opacity: 0.25}} whileInView={{opacity: 1}} viewport={{ amount: 0.9 }} className="flex flex-col isolate w-full  justify-center " >
          <h2 className= "text-lg md:text-xl font-bold font-header" > {title} </h2>
          <article ref={sectRef} className=" relative h-auto flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide" >

              <MoveLeft scrollRef={sectRef} />
              { data.map( (item , index) => (
                  <Tile key={index} item={item} />
              ) ) }
              <MoveRight scrollRef={sectRef} />

          </article>
    </motion.div>
  )
}

export default Section