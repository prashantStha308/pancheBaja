import { Pause } from "lucide-react"
import Play from "../components/icons/Play"


const Test = () => {

	return (
		// <div  className={`fixed bottom-0 left-0 right-0 bg-black-secondary/55 backdrop-blur-3xl z-40 transition-all duration-200 ease-in-out`} >
		<button className="bg-white-secondary rounded-full w-8 h-8 text-black-secondary hover:bg-red-primary hover:text-white-secondary cursor-pointer transition duration-150 ease-in-out flex items-center justify-center relative" >
			<Play
				className={`absolute`}
				size={25}
			/>
			<Pause
				className={`absolute`}
				size={25} strokeWidth={1}
			/>
		</button>
		// </div>
	)
}

export default Test