// Libraries
import { useRef } from "react"
import { motion, spring } from "motion/react";
// Components
import MoveLeft from "./Button/MoveLeft";
import MoveRight from "./Button/MoveRight";
import useBreakpoint from "../hooks/useBreakpoint.jsx";
import LoadingSection from "./Loaders/LoadingSection.jsx";


// Motion variables
const containerVarient = {
	hidden: {
		opacity: 0.25,
	},
	visible: {
		opacity: 1,
		transition: {
		staggerChildren: 0.065,
		type: spring,
		stiffness: 120,
		damping: 8
	},
	},
};

const childVarient = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

const Section = ({ query, title, Tile }) => {
	// Hooks and queries
	const sectRef = useRef(null);
	const isMobile = useBreakpoint(640)
	const { data, isPending, isLoading, isError, error } = query;

	if (isError) {
		return (
			<>
			Error occured : {error}
			</>
		)
	}

	
	return (
		<>
			{
				isPending || isLoading ?
					<LoadingSection />
				:
					<motion.div initial="hidden" whileInView="visible" variants={containerVarient} viewport={{ amount: isMobile ? 0.5 : 0.1 }} className="flex flex-col gap-2 isolate w-full justify-center" >
						
						<h2 className="text-lg md:text-xl font-bold font-header" > {title} </h2>
						
						<article ref={sectRef} className=" relative h-auto max-w-screen flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide" >
							<MoveLeft scrollRef={sectRef} />
							
							{
								data?.map((item, index) => (
									<motion.div key={index} variants={childVarient} >
										<Tile item={item} />
									</motion.div>
								))
							}
							
							<MoveRight scrollRef={sectRef} />
						</article>
					</motion.div>
			}
		</>
	)
}

export default Section;