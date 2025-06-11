import SignupForm from "../../components/Forms/SignupForm"

const Signup = () => {
  document.title = "Sign Up | Panche Baja";
  return (
    <section id="loginPage" className="w-full" >

        <section className="relative z-40" >
            <SignupForm />
        </section>

        {/* Background */}
        <div className="fixed top-10 left-0 right-0 min-h-screen max-w-screen isolate overflow-hidden " >
            {/* gradient */}
            <div className=" absolute top-0 right-0 left-0 min-h-screen w-screen bg-gradient-to-t from-black-primary from from-20% to-transparent z-20" ></div>
        
            {/* image */}

            {/* make one for mobile as well, keep this hidden in mobile */}
            <div className=" absolute top-0 right-0 left-0 h-[80dvh] w-screen object-cover bg-top lg:bg-center z-10 " style={{ backgroundImage: `url('/assets/loginPage_bg.jpg')` , backgroundRepeat: 'no-repeat' , backgroundSize: '100%' }} ></div>
        </div>
    </section>
  )
}

export default Signup