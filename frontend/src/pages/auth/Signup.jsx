import { useEffect, useState } from "react";
import SignupForm from "../../components/Forms/SignupForm.jsx"
import transition from "../../utils/transition.jsx";
import Background from "../../components/Background.jsx";
import Loader from "../../components/Loader.jsx";


const Signup = () => {

	const [ isBgLoaded, setIsBgLoaded ] = useState(false);
	const src = '/assets/signup_bg.jpg';
	
	useEffect(() => {
		document.title = "Sign Up | Panche Baja";
		return( ()=> document.title = "Panche Baja")
	}, []);
	
	useEffect(() => {
		const img = new Image();
		img.src = src;
		img.onload = () => setIsBgLoaded(true);
		img.onerror = () => {
			console.error("Failed to load resources");
			setIsBgLoaded(false);
		}
	}, [src]);

	if (!isBgLoaded) {
		return <Loader />
	}
	
	return (
		<section id="signUpPage" className=" w-full" >

			<section className="relative z-40" >
					<SignupForm />
			</section>

			<Background src={src} gradientPercent={20} />

		</section>
	)
}

const PageTransition = transition(Signup);

export default PageTransition;