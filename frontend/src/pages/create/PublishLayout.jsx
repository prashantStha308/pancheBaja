// Stores
import useUserStore from "../../store/user.store.js";
import LoginError from "../Error/LoginError.jsx";

// Components

const PublishLayout = () => {

	const { isLoggedIn } = useUserStore();

	if (!isLoggedIn) {
		return <LoginError />
	}

	return (
		<section id="publish-page">
			<PublishForm />
		</section>
	)
}

export default PublishLayout