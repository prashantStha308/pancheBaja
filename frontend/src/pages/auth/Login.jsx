// Libraries
import { useEffect } from "react";
// Components
import Background from "../../components/Background.jsx";
import LoginForm from "../../components/Forms/LoginForm.jsx"
// Utils
import transition from "../../utils/transition.jsx";
// Image
import loginBg from "/assets/login_bg.jpg?url";

const Login = () => {

	useEffect(() => {
		document.title = "Sign Up | Panche Baja";
		return( ()=> document.title = "Panche Baja")
	}, []);

	// Buuild the second phase
	return (
		<section className=" w-full flex flex-col justify-center items-center " >
			<section className="relative min-h-full md:min-h-0 md:h-auto z-40 flex justify-center items-center ">
				<LoginForm />
			</section>

			<Background src={loginBg} />
		</section>
	)
}

const PageTransition = transition(Login);
export default PageTransition;