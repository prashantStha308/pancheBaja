import transition from "../../utils/transition";
import ExploreTile from "../../components/Tiles/ExploreTile.jsx";
import {
	useGetAllGenreQuery
} from "../../queries/genre.queries.js";

const SearchLayout = () => {

	const { data, isPending, isLoading, isError, error } = useGetAllGenreQuery();

	// Probably needs to be fetched through backend
	const ExploreOptionExamples = [
		{
			name: "Pop",
			imgSrc: '',
			_id: ''
		},
		{
			name: "Hip-Hop",
			imgSrc: '',
			_id: ''
		},{
			name: "Rap",
			imgSrc: '',
			_id: ''
		},{
			name: "Old is Gold",
			imgSrc: '',
			_id: ''
		},{
			name: "Newari Bhasa",
			imgSrc: '',
			_id: ''
		},{
			name: "Tanamg Selo",
			imgSrc: '',
			_id: ''
		},{
			name: "Rock",
			imgSrc: '',
			_id: ''
		},{
			name: "Alternative Rock",
			imgSrc: '',
			_id: ''
		},
	]

	if(isLoading || isPending){
		return "Loading";
	}

	if(isError){
		return (
			<>
				Error Occured; {error}
			</>	
		)
	}

	return (
		<section id="explore-page" className="w-full flex justify-center " >
			<section id="genre-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" >
				{
					data.map((item, index) => (
						<ExploreTile topic={item} key={index} />
					))
				}
			</section>
		</section>
	)
}

const PageTransition = transition(SearchLayout);
export default PageTransition;