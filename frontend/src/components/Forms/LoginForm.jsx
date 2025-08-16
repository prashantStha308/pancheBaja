import { useState } from "react";
import LogoNoRect from "../icons/Logo_noRect.jsx";
import LoginBtn from "../Button/LoginBtn.jsx";
import { Link } from "react-router-dom";

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
		<section id="login-form" className=" py-8 md:py-6 px-8 md:px-24 flex flex-col gap-4 " >

			{/* Logo */}
			<div className="flex flex-col gap-4 justify-center items-center" >
				<LogoNoRect size={80} fill="#fff" />
				<h1 className="text-white-secondary font-header text-3xl text-center font-black capitalize" > LOG IN </h1>
			</div>

			{/* Form */}
			<form className="flex flex-col gap-2 w-full" >
				<input type="text" name="email" id="email"
					className={`border ${ (isFilledNotValid) ? "border-red-primary" : (isFilledValid) ? "border-white-secondary" : "border-black-tersery" }  w-xs md:w-md font-semibold text-base rounded-md px-6 py-2 outline-none bg-black-tersery active:bg-black-primary focus:bg-black-primary transition-all ease-in duration-100`} placeholder="Enter your email(This and signup,both doesn't work for now)"
					onChange={detectValidEmail}
				/>

				<div className="flex justify-between" >
					<span className={`text-xs text-red-primary ${(isFilledNotValid) ? "opacity-100" : "opacity-0" } transition-all ease-in-out duration-150`} >
						Please enter a valid email
					</span>

						<span className=" text-[0.65rem] md:text-xs" >
							Don't have an account? <Link to={'/signup'} className="text-blue-500 hover:underline font-bold" > Register here! </Link>
						</span>
				</div>

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