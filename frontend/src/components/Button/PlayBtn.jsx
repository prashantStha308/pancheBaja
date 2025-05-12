const PlayBtn = () => {
  return (
    <button type="button" className="flex items-center cursor-pointer gap-1 bg-white text-black-primary px-8 py-3 hover:bg-red-primary hover:text-white rounded-md transition-all duration-100 ease-in active:bg-red-secondary" >
        <div className="w-4 h-4 bg-red-secondary rounded-full" ></div>
        <span className="font-semibold text-xl capitalize"> Play </span>
    </button>
  )
}

export default PlayBtn