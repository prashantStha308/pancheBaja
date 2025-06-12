import { motion, scale , spring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom";

const SignupForm = () => {
    const [ formData , setFormData ] = useState({})
    const [ acceptTerms , setAcceptTerms ] = useState(false);
    const inputRef = useRef();

    const handleChange = (e)=>{
        const { name , value } = e.target;
        setFormData(prev =>({
            ...prev,
            [name]: value
        }))
    }

    const toggleAcceptTerms = ()=>{
        setAcceptTerms(prev => !prev);
    }
    const containerVarient = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 20,
                duration: 0.8,
                delay: 0.015,
                ease: [0, 0.71, 0.2, 1.01],
            },
        },
    }

    const childVarient = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
    };

    useEffect(()=>{
        if(inputRef.current !== null){
            const children = inputRef.current.children;
            Array.from(children).forEach(child =>{
                child.setAttribute( 'varients' , {childVarient} );
            })
        }
    })

  return (
    <section className=" w-[50%] flex flex-col gap-8 mt-2 " >
        <h1 className="text-5xl xl:text-6xl font-extrabold font-header" >
            Elevate your Music Experience
        </h1>
        <motion.form initial="hidden" whileInView="visible" viewport={{ amount: 0.5}} variants={containerVarient} className="flex flex-col gap-4 text-xs font-text" >

            {/* inputs */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.5}} variants={{container: containerVarient , child: childVarient}} ref={inputRef} className="flex flex-col gap-8" >

                {/* username */}
                <div className=" w-full flex flex-col group" >
                    <div className=" w-full text-sm flex gap-4 items-center" >
                        <label htmlFor="username" className=" font-bold" >
                            Username:
                        </label>
                        <input type="text" name="username" placeholder="John Doe" id="username" required className=" font-semibold outline-none focus:ring-0 w-full" value={formData.username || ""} onChange={handleChange} />
                        <span className="text-lg font-bold text-red-primary" >*</span>
                    </div>
                    <hr className="border-[0.02rem] border-white-secondary group-active:border-white-primary group-hover:border-white-primary" style={{boxShadow: '0 4px 4px rgba(0,0,0,0.8)'}} />
                </div>

                {/* Email */}
                <div className=" w-full flex flex-col group" >
                    <div className=" w-full text-sm flex gap-4 items-center" >
                        <label htmlFor="email" className=" font-bold" >
                            Email:
                        </label>
                        <input type="email" name="email" placeholder="johndoe@gmail.com" id="email" required className=" font-semibold outline-none focus:ring-0 w-full" value={formData.email || ""} onChange={handleChange} />
                        <span className="text-lg font-bold text-red-primary" >*</span>
                    </div>
                    <hr className="border-[0.02rem] border-white-secondary group-active:border-white-primary group-hover:border-white-primary" style={{boxShadow: '0 4px 4px rgba(0,0,0,0.8)'}} />
                </div>

                {/* Phone */}
                <div className=" w-full flex flex-col group" >
                    <div className=" w-full text-sm flex gap-4 items-center" >
                        <label htmlFor="phone" className="flex items-center gap-1 font-bold" >
                            Phone <span className="text-xs text-white-secondary" >(optional)</span> :
                        </label>
                        <input type="text" name="phone" id="phone" placeholder="+977-9xx-xxxxxxx" className=" font-semibold outline-none focus:ring-0 w-full" value={formData.phone || ""} onChange={handleChange} />
                    </div>
                    <hr className="border-[0.02rem] border-white-secondary group-active:border-white-primary group-hover:border-white-primary" style={{boxShadow: '0 4px 4px rgba(0,0,0,0.8)'}} />
                </div>

                {/* Password */}
                <div className=" w-full flex flex-col group" >
                    <div className=" w-full text-sm flex gap-4 items-center" >
                        <label htmlFor="password" className=" font-bold" >
                            Password:
                        </label>
                        <input type="password" name="password" id="password" placeholder="Enter a password" required className=" font-semibold outline-none focus:ring-0 w-full" value={formData.password || ""} onChange={handleChange} />
                        <span className="text-lg font-bold text-red-primary" >*</span>
                    </div>
                    <hr className="border-[0.02rem] border-white-secondary group-active:border-white-primary group-hover:border-white-primary" style={{boxShadow: '0 4px 4px rgba(0,0,0,0.8)'}} />
                </div>
            </motion.div>

            {/* form bottom */}
            <div className="flex flex-col gap-2" >
                <div className="flex flex-row-reverse w-full justify-between items-center" >
                    <Link to={'/login'} className="hover:underline text-blue-500" > Already have an account? </Link>
                    <div className="flex gap-2 items-center" >
                        <input type="checkbox" name="terms" id="terms" checked={acceptTerms} onChange={toggleAcceptTerms} />
                        <label htmlFor="terms" className="flex items-center" >
                            Accept Terms and Conditions.
                            <Link className="hover:underline text-blue-500" >
                                Read Terms and Conditions
                            </Link>
                            <span className="text-xl text-red-primary"> * </span>
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="w-full flex justify-end" >
                    <motion.button type="submit" whileHover={{scale: acceptTerms && 1.15}} whileTap={{scale: acceptTerms && 0.8 , rotate: 3}} transition={{duration: 0.05}} className={`py-2 px-8 font-text font-bold text-base rounded-md shadow-lg transition-all duration-100 ease-in ${acceptTerms ? "text-white bg-red-primary hover:bg-red-700 active:bg-red-700 cursor-pointer" : "bg-neutral-800 text-neutral-500 cursor-not-allowed"}`} disabled={acceptTerms ? false : true } >
                        Sign Up
                    </motion.button>
                </div>
            </div>
        </motion.form>
    </section>
  )
}

export default SignupForm