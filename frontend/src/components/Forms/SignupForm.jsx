
const SignupForm = () => {
  return (
    <section className=" w-[50%] flex flex-col gap-10 mt-4 " >
        <h1 className="text-5xl font-extrabold font-header" >
            Elevate your Music Experience
        </h1>
        <form className="flex flex-col gap-8 text-xs font-text" >
            <div className="flex flex-col gap-12" >
                <div className=" w-full flex flex-col" >
                    <div className=" w-full text-sm flex gap-4 items-center" >
                        <label htmlFor="username" className=" font-bold" >
                            Username:
                        </label>
                        <input type="text" name="username" id="username" required className=" font-semibold outline-none focus:ring-0 w-full" />
                        <span className="text-sm font-bold" >*</span>
                    </div>
                    <hr className="border-[0.02rem]" style={{boxShadow: '0 4px 4px rgba(0,0,0,0.8)'}} />
                </div>

                {/* Email */}
                <div className=" w-full flex flex-col" >
                    <div className=" w-full text-sm flex gap-4 items-center" >
                        <label htmlFor="email" className=" font-bold" >
                            Email:
                        </label>
                        <input type="email" name="email" id="email" required className=" font-semibold outline-none focus:ring-0 w-full" />
                        <span className="text-sm font-bold" >*</span>
                    </div>
                    <hr className="border-[0.02rem]" style={{boxShadow: '0 4px 4px rgba(0,0,0,0.8)'}} />
                </div>

                {/* Phone */}
                <div className=" w-full flex flex-col" >
                    <div className=" w-full text-sm flex gap-4 items-center" >
                        <label htmlFor="phone" className=" font-bold" >
                            Phone:
                        </label>
                        <input type="text" name="phone" id="phone" className=" font-semibold outline-none focus:ring-0 w-full" />
                    </div>
                    <hr className="border-[0.02rem]" style={{boxShadow: '0 4px 4px rgba(0,0,0,0.8)'}} />
                </div>

                {/* Password */}
                <div className=" w-full flex flex-col" >
                    <div className=" w-full text-sm flex gap-4 items-center" >
                        <label htmlFor="password" className=" font-bold" >
                            Password:
                        </label>
                        <input type="password" name="password" id="password" required className=" font-semibold outline-none focus:ring-0 w-full" />
                        <span className="text-sm font-bold" >*</span>
                    </div>
                    <hr className="border-[0.02rem]" style={{boxShadow: '0 4px 4px rgba(0,0,0,0.8)'}} />
                </div>
            </div>
            <div className="w-full flex justify-end" >
                <input type="submit" value="Sign Up" className="cursor-pointer bg-red-secondary hover:bg-red-700 active:bg-red-700 px-12 py-2 font-text font-bold text-base rounded-sm shadow-lg transition-all duration-100 ease-in" />
            </div>
            
        </form>
    </section>
  )
}

export default SignupForm