import React from 'react'
import ProfilePicture from '../../components/icons/ProfilePicture'
import useUserStore from '../../store/user.store';
import LoginError from '../../components/Error/LoginError';



// What to keep in this page?
/*
Well, what not to keep?
	1. Cannot keep liked songs, or playlists or even followed artists.

What can be kept?
	1. Created Playlists
	2. Follower/Following count
	3. If they're artists. Keep uploaded singles, eps, albums as well as playlists created by them
	4. Have a Section for user details. User details should contain, user's pfp, name, 

*/


const SelfProfilePage = () => {
	
	const { isLoggedIn, currentUser } = useUserStore();

	// if (!isLoggedIn) {
	// 	return <LoginError />
	// }

	return (
		<section id="self-page">
			<div className='flex justify-around' >
				<ProfilePicture />
				
				{/* User Details */}
				<form>
					<div>
						<label>
							Username:
							<input type="text" name="username" id="username" readOnly
								className='border-none' value={currentUser.name || "Some User"}
							/>
						</label>
					</div>
				</form>

			</div>
		</section>
	)
}

export default SelfProfilePage