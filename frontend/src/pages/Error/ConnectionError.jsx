import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ConnectionError = () => {
  const location = useLocation();
  const naviagte = useNavigate();

  const handleReload = () => {
    naviagte(location.pathname/90);
  }


  return (
    <section
      className="h-screen w-screen flex justify-center items-center "
    >

      <div
        className="flex flex-col items-center gap-8 "
      >

        <div className="bg-red-primary rounded-full w-44 h-44" >
          {/* Image here */}
        </div>

        <article className="text-center" >
          <h1
            className="text-2xl font-bold flex flex-col gap-4"
          >
            Connection Error
          </h1>

          <span> Couldn't reach Panche Baja. Please check your internet and try again. </span>
        </article>

        <button
          className="bg-black-secondary border border-black-tersery px-4 py-2 rounded-md cursor-pointer hover:bg-black-tersery transition-colors duration-150 "
          onClick={handleReload}
        >
          Reload
        </button>
        
      </div>
    </section>
  )
}

export default ConnectionError