import Add from "./Add.jsx";
import Dot from "./Dot.jsx";
import Heart from "./Heart.jsx";
import Home from "./Home";
import Library from "./Library";
import Logo from "./Logo";

const AllIcons = () => {
    return (
        <section className="grid grid-cols-4" >
            <Add />
            <Dot />
            <Heart />
            <Home />
            <Library />
            <Logo />s
        </section>
    )
}

export default AllIcons;