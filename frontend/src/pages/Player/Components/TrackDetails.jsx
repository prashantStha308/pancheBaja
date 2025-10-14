import { CircleMinus, CirclePlus } from 'lucide-react';


const TrackDetails = ({ track }) => {
	
	return (
		<div className='w-full flex justify-between items-center' >
			<div className='flex flex-col gap-0.5 max-w-30 md:max-w-40' >
				<span className='line-clamp-1 text-sm md:text-base capitalize' >
					{track?.name || "Unknown Track"}
				</span>
				<span className='text-white-tersery text-[0.65rem] md:text-[0.7rem] line-clamp-1' >
					{track?.artists || "Unknown Artist" }
				</span>
			</div>

			<div className='flex gap-2' >
				{/* Buttons */}
				<button className='cursor-pointer' >
					<CircleMinus
						size={20}
						strokeWidth={1}
						className='text-white-tersery hidden md:block '
					/>

					<CircleMinus
						size={17}
						strokeWidth={1}
						className='text-white-tersery md:hidden '
					/>

				</button>
				<button className='cursor-pointer text-white'>
					<CirclePlus
						size={25}
						strokeWidth={1}
						className='hidden md:block'
					/>

					<CirclePlus
						size={20}
						strokeWidth={1}
						className='md:hidden'
					/>
				</button>

			</div>
		</div>
	)
}

export default TrackDetails