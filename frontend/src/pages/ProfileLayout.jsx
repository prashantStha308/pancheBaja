import { useParams } from "react-router-dom"

const ProfileLayout = () => {

    const {slug} = useParams();

  return (
    <div>ProfileLayout. slug: {slug}</div>
  )
}

export default ProfileLayout