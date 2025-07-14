import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";

const TransitionLink = ({ children, to = "" }) => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
//   const delay = 

  const handleClick = (e) => {
    e.preventDefault();
    setIsAnimating(true);

    // wait for the animation to finish before navigating
    setTimeout(() => {
      navigate(to);
      setIsAnimating(false);
    }, 500); // match the animation duration
  };

  return (
    <>
      <Link
        onClick={handleClick}
        to={to}
        style={{ pointerEvents: isAnimating ? "none" : "auto" }}
      >
        {children}
      </Link>

      {isAnimating && (
        <>
        <motion.div
          className="slide-in"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [ 0 , 1 , 0 ] }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="slide-out"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [ 0 , 1 , 0 ] }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        </>
      )}
    </>
  );
};

export default TransitionLink;
