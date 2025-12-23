// Libraries
import { useMotionValue, useAnimationFrame } from "framer-motion"
import { useEffect, useRef, useState } from "react"


const Background = ({ src, gradientPercent = 50, blur = true }) => {

    //React Hooks
    const target = useRef(gradientPercent);
    const [grd, setGrd] = useState(100);
    // Motion Hooks
    const grdValue = useMotionValue(100);
    const speed = 1.5;

    // Motion Hooks
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

    // useEffects
    useEffect(() => {
        grdValue.set(100);
        setGrd(100);
        target.current = gradientPercent;
    }, [src, gradientPercent, grdValue]);

    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 min-h-screen max-w-screen isolate overflow-hidden" >

            {/* gradient */}

            <div
                className={`absolute top-0 bottom-0 right-0 left-0 min-h-screen w-screen ${blur && "backdrop-blur-xs"} z-20`}
            ></div>

            <div
                className={`absolute top-0 bottom-0 right-0 left-0 min-h-screen w-screen z-10`}
                style={{
                    backgroundImage: `linear-gradient(to top, #0F0F0F ${grd}%, transparent)`
                }}
            ></div>

            {/* image */}
            <div
                className="absolute top-0 right-0 left-0 h-screen object-cover bg-top lg:bg-center z-[5] transition-all ease-in-out duration-100"
                style={{
                    backgroundImage: `url(${src || ""})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            ></div>
            
        </div>
    )
}

export default Background