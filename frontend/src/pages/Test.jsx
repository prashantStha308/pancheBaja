import SearchButton from "../components/Button/SearchButton"
import LoadingBottomPlayer from "../components/Loaders/Player/LoadingBottomPlayer"
import ExploreTile from "../components/Tiles/ExploreTile"

const Test = () => {

	return (
		<div  className={`fixed bottom-0 left-0 right-0 bg-black-secondary/55 backdrop-blur-3xl z-40 transition-all duration-200 ease-in-out`} >
			<LoadingBottomPlayer />
		</div>
	)
}

export default Test