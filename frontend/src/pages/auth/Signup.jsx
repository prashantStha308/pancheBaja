// Libraries
import { useEffect } from "react";
// Components
import SignupForm from "../../components/Forms/SignupForm.jsx"
import transition from "../../utils/transition.jsx";
import Background from "../../components/Background.jsx";
// Background Image
import signupBg from "/assets/signup_bg.jpg?url";


const Signup = () => {
	
	useEffect(() => {
		document.title = "Sign Up | Panche Baja";
		return( ()=> document.title = "Panche Baja")
	}, []);
	
	
	return (
		<section id="signUpPage" className=" w-full" >

			<section className="relative z-40" >
					<SignupForm />
			</section>

			<Background src={signupBg} gradientPercent={20} blur={false} />

		</section>
	)
}

const PageTransition = transition(Signup);

export default PageTransition;