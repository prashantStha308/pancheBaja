// Libraries
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
// Components
import LogoNoRect from "../icons/Logo_noRect.jsx";
import LoginBtn from "../Button/LoginBtn.jsx";
import RevealingEye from "../icons/RevealingEye.jsx";
import { Eye, Mail } from "lucide-react";


const LoginForm = () => {
	// React Hooks
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [isFilled, setIsFilled] = useState(false);
	const [ showPassword, setShowPassword ] = useState(false);

	// Main body

	// Functions
	const detectValidEmail = (e) => {
		setIsFilled(e.target.value.trim().length > 0);

		const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
		const isValid = regex.test(e.target.value.trim());
		
		setIsValidEmail(isValid);
	};

	const togglePasswordShow = () => {
		console.log("HIHIHIIH");
		setShowPassword(prev => !prev);
		console.log(showPassword);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
	}

	const isFilledNotValid = isFilled && !isValidEmail;
	const isFilledValid = isFilled && isValidEmail;

	return (
		<section id="login-form" className=" -mt-6 py-8 md:py-14 px-8 md:px-24 flex flex-col gap-4 bg-black-secondary/40 backdrop-blur-3xl border border-black-tersery rounded-md shadow-md shadow-black " >

			{/* Logo */}
			<div className="flex flex-col gap-4 justify-center items-center" >
				<LogoNoRect size={80} fill="#fff" />
				<h1 className="text-white-secondary font-header text-3xl text-center font-black capitalize" > LOG IN </h1>
			</div>

			{/* Form */}
			<form
				className="flex flex-col gap-4 w-full"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col gap-2 justify-center " >
					<div
						className={`border ${ (isFilledNotValid) ? "border-red-primary" : (isFilledValid) ? "border-white-secondary" : "border-black-tersery" }  w-xs md:w-md font-semibold text-base rounded-md px-6 py-2 outline-none bg-black-tersery focus-within:bg-black-primary transition-all ease-in duration-100 flex gap-4 justify-center `}
					>
						<input
							type="email"
							className="placeholder-white-tersery bg-transparent outline-none w-full font-semibold text-base"
							name="password" id="password"
							placeholder="Enter your email"
							onChange={detectValidEmail}
						/>

						<div className="text-white-tersery flex items-center" >
							<Mail size={20} />
						</div>
					</div>

					<div
						className="group bg-black-tersery rounded-md px-6 py-2 transition-all duration-150 ease-in focus-within:bg-black-primary border border-black-tersery flex gap-4"
					>
						<input
							type={`${showPassword ? "text" : "password" }`}
							className="placeholder-white-tersery bg-transparent outline-none w-full font-semibold text-base select-none"
							name="password" id="password"
							placeholder="Enter your Password"
						/>

						<RevealingEye toggle={togglePasswordShow} revealState={showPassword} />
					</div>
				</div>

				<div className="flex justify-between" >
					<span className={`text-xs text-red-primary ${(isFilledNotValid) ? "opacity-100" : "opacity-0" } transition-all ease-in-out duration-150`} >
						Please enter a valid email
					</span>

						<span className=" text-[0.65rem] md:text-xs" >
							Don't have an account? <Link to={'/signup'} className="text-blue-500 hover:underline font-bold" > Register here! </Link>
						</span>
				</div>

				<button type="submit"
					className={`${isValidEmail ? "bg-red-primary hover:bg-red-secondary active:bg-red-800 text-white cursor-pointer" : "cursor-not-allowed bg-disabled-button text-disabled-text" } rounded-md py-2 font-semibold transition-all ease-in duration-100 shadow-md shadow-black`}
					disabled={!isValidEmail}
				>
					Continue
				</button>
			</form>

			<p className="text-center text-white-secondary " > or </p>

			<div className="w-full md:w-md flex justify-center gap-6" >
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