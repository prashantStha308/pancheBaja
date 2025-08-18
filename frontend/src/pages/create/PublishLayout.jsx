// Stores
import useUserStore from "../../store/user.store.js";;
// Components
import PublishForm from "../../components/Forms/PublishForm.jsx";
import LoginError from "../../components/Error/LoginError.jsx";

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