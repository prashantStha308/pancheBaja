import DefaultModel from "../components/Ui/DefaultModel";
import { useState } from "react";
import Toast from "../components/Ui/Toast";
import ConnectionError from "./Error/ConnectionError";

const Test = () => {

	const [isError, setIsError] = useState(false);

	if (isError) {
		return <ConnectionError />
	}

	return (
		<div className="h-screen w-screen flex flex-row justify-center items-center gap-10" >
			<button
				className="bg-black-secondary text-white text-sm px-4 py-3 rounded-md cursor-pointer hover:bg-black-tersery"
				onClick={()=> setIsError(true)}
			>
				Cause Network Error
			</button>
		</div>
	)
}

export default Test