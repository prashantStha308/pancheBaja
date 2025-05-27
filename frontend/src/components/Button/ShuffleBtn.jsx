import Shuffle from "../icons/Shuffle";

const ShuffleBtn = () => {
  return (
    <button type="button" className="flex items-center cursor-pointer gap-1 bg-black-tersery text-white-secondary px-4 py-1.5 hover:bg-red-primary hover:text-white rounded-md transition-all duration-100 ease-in active:bg-red-secondary" >
        <Shuffle size={20} />
        <span className=" text-sm capitalize font-normal"> Shuffle </span>
    </button>
  )
}

export default ShuffleBtn