import transition from "../../utils/transition";
import ExploreTile from "../../components/Tiles/ExploreTile.jsx";
import {
	useGetAllGenreQuery
} from "../../queries/genre.queries.js";

const SearchLayout = () => {

	const { data, isPending, isLoading, isError, error } = useGetAllGenreQuery();

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