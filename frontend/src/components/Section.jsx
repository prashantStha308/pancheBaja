import { useRef } from "react"
import MoveLeft from "./Button/MoveLeft";
import MoveRight from "./Button/MoveRight";

const Section = ({ data = [] , title , Tile }) => {
    const sectRef = useRef(null);
  return (
    <section className="flex flex-col px-5 isolate w-full justify-center" >
        <h2 className= "text-lg md:text-xl lg:text-xl font-bold" > {title} </h2>
        <article ref={sectRef} className=" relative h-auto flex gap-7 lg:gap-4 overflow-x-auto  scrollbar-hide" >

            <MoveLeft scrollRef={sectRef} />
            { data.map( (item , index) => <Tile item={item} key={index} /> ) }
            <MoveRight scrollRef={sectRef} />

        </article>
    </section>
  )
}

export default Section