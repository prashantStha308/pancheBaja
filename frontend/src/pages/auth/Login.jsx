import { useEffect, useState } from "react";
import Background from "../../components/Background.jsx";
import LoginForm from "../../components/Forms/LoginForm.jsx"
import Loader from "../../components/Loader.jsx";
import transition from "../../utils/transition.jsx";

const Login = () => {

	const [isBgLoaded, setIsBgLoaded] = useState(false);
	const src = '/assets/bg_2.jpg';

	useEffect(() => {
		const img = new Image();
		img.src = src;
		img.onload = () => setIsBgLoaded(true);
		img.onerror = () => {
			console.error("Failed to load resources");
			setIsBgLoaded(false);
		}
	}, [src])

	if (!isBgLoaded) return <Loader />

	return (
		<section className=" w-full flex flex-col justify-center items-center " >
			<section className="relative min-h-full md:min-h-0 md:h-auto z-40 flex justify-center items-center ">
				<LoginForm />
			</section>

			<Background src={'/assets/bg_2.jpg'} />
		</section>
	)
}

const PageTransition = transition(Login);
export default PageTransition;