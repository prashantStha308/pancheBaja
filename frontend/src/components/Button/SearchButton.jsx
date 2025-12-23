import Search from "../icons/Search.jsx";
import { motion } from "motion/react";

import useBreakpoint from "../../hooks/useBreakpoint.jsx";
import { useEffect, useRef } from "react";

const SearchButton = ({ isActive = false }) => {
  const isTablet = useBreakpoint(1024);
  const inputRef = useRef();

  useEffect(() => {
    const currRef = inputRef.current;
    if (currRef && isActive) currRef.focus();

    return () => currRef.blur();
  });

  return (
    <section
      id="search-button"
      className={`list-none group p-2 px-8 ${
        isActive
          ? "text-white bg-hover-tersery/50"
          : "bg-transparent text-red-primary hover:bg-hover-primary/55 hover:backdrop-blur-lg hover:text-white-secondary  "
      } rounded-sm transition-all duration-100 ease-in cursor-pointer  w-fit`}
    >
      <motion.button className="flex items-center gap-2 cursor-pointer w-fit">
        <Search size={20} strokeWidth={6} />

        {/* Label */}
        <motion.span
          initial={{ width: "auto", opacity: 1 }}
          animate={{
            width: isActive ? 0 : "auto",
            opacity: isActive ? 0 : 1,
          }}
          className="font-medium text-xs overflow-hidden"
        >
          Search
        </motion.span>

        {/* Sliding Input */}
        <motion.input
          ref={inputRef}
          type="text"
          name="searchKey"
          id="searchKey"
          placeholder="Search for Artists, Albums or Playlists"
          className="outline-none border-b border-white-secondary overflow-hidden bg-transparent text-sm"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isActive ? (isTablet ? "15rem" : "20rem") : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 40,
          }}
        />
      </motion.button>
    </section>
  );
};

export default SearchButton;
