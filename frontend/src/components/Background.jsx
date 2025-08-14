import { motion, useMotionValue, useAnimationFrame } from "framer-motion"
import { useEffect, useRef, useState } from "react"


const Background = ({ src, gradientPercent = 50, blur = true }) => {

    // Gradient Essentials
    const [grd, setGrd] = useState(100);
    const grdValue = useMotionValue(100);
    const target = useRef(gradientPercent);
    const speed = 1.5;

    useAnimationFrame((t, delta) => {
        const current = grdValue.get();
        const isAnimationInProgress = Math.abs(current - target.current) > 0.1;

        if (isAnimationInProgress) {
            // interpolate
            const next = current + (target.current - current) * Math.min(1, delta * 0.005 * speed);
            grdValue.set(next);
            setGrd(next);
        } else {
            grdValue.set(target.current);
            setGrd(target.current);
        }
    });

    useEffect(() => {
        grdValue.set(100);
        setGrd(100);
        target.current = gradientPercent;
    }, [src, gradientPercent, grdValue]);

    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 min-h-screen max-w-screen isolate overflow-hidden" >

            {/* gradient */}
            <motion.div
                className={`absolute top-0 bottom-0 right-0 left-0 min-h-screen w-screen ${blur && "backdrop-blur-xs"} z-20`}
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(20,20,20,1) ${grd}%, transparent)`
                }}
            ></motion.div>

            {/* image */}
            <div
                className="absolute top-0 right-0 left-0 h-screen object-cover bg-top lg:bg-center z-10 transition-all ease-in-out duration-100"
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            ></div>
            
        </div>
    )
}

export default Background