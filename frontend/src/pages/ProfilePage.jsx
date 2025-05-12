import { useParams } from "react-router-dom"

const ProfilePage = () => {

    const {slug} = useParams();

  return (
    <div>ProfilePage. slug: {slug}</div>
  )
}

export default ProfilePage