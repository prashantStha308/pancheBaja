import { CircleMinus, CirclePlus } from 'lucide-react';
import Heart from "../../../components/icons/Heart";


const TrackDetails = ({ track }) => {

	const artists = track?.artists.map((item, index) => {
		if (index < 4) return item.username;
	});
	console.log("Artist's usernames: ", artists);

	return (
		<div className='w-full flex justify-between items-center' >
			<div className='flex flex-col gap-0.5 max-w-44 md:max-w-56' >
				<span className='line-clamp-1 text-sm md:text-base capitalize' >
					{track?.name || "Unknown Track"}
				</span>
				<span className='text-white-tersery text-[0.65rem] md:text-[0.7rem] line-clamp-1' >
					{ artists || "Unknown Artist" }
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
					<Heart
						size={25}
						strokeWidth={2}
						className='hidden md:block hover:fill-white '
					/>

					<Heart
						size={20}
						strokeWidth={2}
						className='md:hidden'
					/>
				</button>

			</div>
		</div>
	)
}

export default TrackDetails