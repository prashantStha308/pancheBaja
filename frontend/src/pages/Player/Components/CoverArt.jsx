/*
=======================================================================================================================

            The image tilt logic taken From: https://stackblitz.com/edit/react-ts-pjwyjw?file=TiltHoverCard.tsx
            
            THE ORIGINAL CREATOR IS: sushanyadav in StackBlitz.
            
            Check out their Profile: https://stackblitz.com/@sushanyadav

=======================================================================================================================
*/



import { useRef } from 'react'
import VinylDisc from "../../../components/icons/VinylDisc";


const CoverArt = ({ src, alt }) => {

    const cardRef = useRef();
    
    const speed = 1500;
    const easing = "cubic-bezier(.03,.98,.52,.99)";
    const max = 10;
    const perspective = 1600;
    const scale = 1;


    const setTransition = () => {
        const card = cardRef.current;

        clearTimeout(card.transitionTimeoutId);
        card.style.transition = `transform ${speed}ms ${easing}`;

        card.transitionTimeoutId = setTimeout(() => {
        card.style.transition = '';
        }, speed);
    };

    const handleMouseEnter = () => setTransition();

      // handle mouse move event
    const handleMouseMove = (event) => {
        const {
            offsetWidth,
            offsetHeight,
            offsetLeft,
            offsetTop,
            style: cardStyles,
        } = cardRef.current;

        const cardWidth = offsetWidth;
        const cardHeight = offsetHeight;

        const centerX = offsetLeft + cardWidth / 2;
        const centerY = offsetTop + cardHeight / 2;

        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;

        const rotateXUncapped = (+1 * max * mouseY) / (cardHeight / 2);
        const rotateYUncapped = (-1 * max * mouseX) / (cardWidth / 2);


        const getRotateDeg = (direction) => {
            const rotateUnCappedObj = {
            X: rotateXUncapped,
            Y: rotateYUncapped,
            };

            const rotateUnCapped = rotateUnCappedObj[direction];

            if (rotateUnCapped < -max) {
            return -max;
            }

            if (rotateUnCapped > max) {
            return rotateUnCapped > max;
            }

            return rotateUnCapped;
        };

        const rotateX = getRotateDeg('X');
        const rotateY = getRotateDeg('Y');

        // get transform styles
        const getTransformStyles = () => {
            const perspectiveStyle = `perspective(${perspective}px)`;
            const xDeg = -rotateX;
            const yDeg = -rotateY;
            const rotateXStyle = `rotateX(${xDeg}deg)`;
            const rotateYStyle = `rotateY(${yDeg}deg)`;
            const scaleStyle = `scale3d(${scale}, ${scale}, ${scale})`;

            return perspectiveStyle + rotateXStyle + rotateYStyle + scaleStyle;
        };

        // apply transform styles
        cardStyles.transform = getTransformStyles();
    };
    
      // handle mouse leave event
    const handleMouseLeave = () => {
        const card = cardRef.current;
        // reset transform styles
        card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        setTransition();
    };


    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className=" aspect-square bg-hover-primary/15 rounded-lg backdrop-blur-lg border border-black-tersery border-b-white-tersery/15 p-2 "
            style={{ transformStyle: 'preserve-3d' }}
        >
            {
                src ?
                    <img
                        src= {src }
                        alt={alt || "Cover Art"}
                        className=' w-60 h-60 md:w-72 md:h-72 aspect-square object-cover rounded-lg transition-transform duration-300 ease-in-out '
                    />
                    :
                    <div className="w-60 h-60 md:w-72 md:h-72 aspect-square flex justify-center items-center bg-red-primary/15 backdrop-blur-lg rounded-lg " >
                        <VinylDisc />
                    </div>
            }
        </div>
    )
}

export default CoverArt