const Background = ({ page }) => {
    return (
        <div className="absolute top-0 left-0 right-0 min-h-screen max-w-screen isolate overflow-hidden" >
            {/* gradient */}
            <div className=" absolute top-0 right-0 left-0 min-h-screen w-screen bg-gradient-to-t from-black-primary from from-50% to-transparent backdrop-blur-xs z-20" ></div>
        
            {/* image */}
            <div className=" absolute top-0 right-0 left-0 h-[80dvh] w-screen object-cover bg-top lg:bg-center z-10 " style={{ backgroundImage: `url(${page?.image?.src})` , backgroundRepeat: 'no-repeat' , backgroundSize: '100%' }} ></div>
        </div>
    )
}

export default Background