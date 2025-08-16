// Libraries
import { useEffect, useState } from "react";
// Components
import SignupForm from "../../components/Forms/SignupForm.jsx"
import transition from "../../utils/transition.jsx";
import Background from "../../components/Background.jsx";
// Background Image
import signupBg from "/assets/signup_bg.jpg?url";


const Signup = () => {
	
	const [formData, setFormData] = useState({})

	const handleNestedChange = (name, value) => {
        const [outer, inner] = name.split('.');
            setFormData(prev => ({
            ...prev,
            [outer]: {
                ...prev[outer],
                [inner]: value
            }
        }))
    }

    const handleChange = (e)=>{
        const { name, value } = e.target;

        if (name.includes('.')) {
            handleNestedChange(name, value);
        } else {
            setFormData(prev =>({
                ...prev,
                [name]: value
            }))
        }
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
	}

	useEffect(() => {
		document.title = "Sign Up | Panche Baja";
		return( ()=> document.title = "Panche Baja")
	}, []);
	
	
	return (
		<section id="signUpPage" className=" w-full" >

			<section className="relative z-40" >
				{/* <SignupForm /> */}
				
				<form className="flex flex-col gap-4" onSubmit={handleSubmit} >
					<label> Full name <input onChange={handleChange} className="border" type="text" name="fullName" value={formData?.fullName} id="fullName" /> </label>
					<label> Username <input onChange={handleChange} className="border" type="text" name="username" value={formData?.username} id="username" /> </label>
					<label> Email <input onChange={handleChange} className="border" type="email" name="email" value={formData?.email} id="email" /> </label>
					<label> City <input onChange={handleChange} className="border" type="text" name="location.city" value={formData?.location?.city} id="city" /> </label>
					<label> Country <input onChange={handleChange} className="border" type="text" name="location.country" value={formData?.location?.country} id="country" /> </label>

					<label> Password <input onChange={handleChange} className="border" type="password" name="password" value={formData?.password} id="password" /> </label>

					<input type="submit" value="Signup" className="bg-white-secondary text-black p-2 px-8 cursor-pointer" />

				</form>

				<span className="font-bold text-white/45" > Will Work on this later. Aaile lai kaam chalau </span>
			</section>

			<Background src={signupBg} gradientPercent={20} blur={false} />

		</section>
	)
}

const PageTransition = transition(Signup);

export default PageTransition;