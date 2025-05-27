import Play from "../icons/Play";

const PlayBtn = () => {
  return (
    <button type="button" className="flex items-center cursor-pointer gap-1 bg-white text-black-primary px-4 py-1.5 hover:bg-red-primary hover:text-white rounded-md transition-all duration-100 ease-in active:bg-red-secondary font-extralight" >
        <Play size={20} />
        <span className="text-sm capitalize font-normal"> Play </span>
    </button>
  )
}

export default PlayBtn