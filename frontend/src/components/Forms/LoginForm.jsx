import { useState } from "react";
import Logo from "../icons/Logo.jsx"; 
import LogoNoRect from "../icons/Logo_noRect.jsx";
import LoginBtn from "../Button/LoginBtn.jsx";

const LoginForm = () => {

	const [isValidEmail, setIsValidEmail] = useState(false);
	const [isFilled, setIsFilled] = useState(false);

	const detectValidEmail = (e) => {
		setIsFilled(e.target.value.trim().length > 0);

		const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
		const isValid = regex.test(e.target.value.trim());
		
		setIsValidEmail(isValid);
	};

	const isFilledNotValid = isFilled && !isValidEmail;
	const isFilledValid = isFilled && isValidEmail;

	return (
		<section id="login-form" className=" py-8 md:py-6 px-8 md:px-24 flex flex-col gap-8 " >

			<div className="flex flex-col gap-4 justify-center items-center" >
				<LogoNoRect size={75} fill="#dbdbdb" />
				<h1 className="text-white-secondary font-header text-3xl text-center font-black capitalize" > LOG IN </h1>
			</div>
			
			<form className="flex flex-col gap-1 w-full" >
				<input type="text" name="email" id="email"
					className={`border ${ (isFilledNotValid) ? "border-red-primary" : (isFilledValid) ? "border-white-secondary" : "border-black-tersery" }  w-xs md:w-md font-semibold text-base rounded-md px-6 py-2 outline-none bg-black-tersery active:bg-black-primary focus:bg-black-primary transition-all ease-in duration-100`} placeholder="Enter yout email"
					onChange={detectValidEmail}
				/>

				<span className={`text-xs text-red-primary ${(isFilledNotValid) ? "opacity-100" : "opacity-0" } transition-all ease-in-out duration-150`} >
					Please enter a valid email
				</span>

				<button type="submit"
					className={`${isValidEmail ? "bg-red-primary hover:bg-red-secondary active:bg-red-800 text-white cursor-pointer" : "cursor-not-allowed bg-button-disabled text-disabledtext" } rounded-md py-2 font-semibold transition-all ease-in duration-100 shadow-md shadow-black`}
					disabled={!isValidEmail}
				>
					Continue
				</button>
			</form>

			<p className="text-center text-white-secondary " > or </p>

			<div className="w-xs md:w-md flex flex-col gap-4" >
				{
					['google', 'facebook'].map((item, index) => (
						<LoginBtn key={index} brand={item} />
					))
				}
			</div>

		</section>
	)
}

export default LoginForm