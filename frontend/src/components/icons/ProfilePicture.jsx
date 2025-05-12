const ProfilePicture = ({ src , altText = "user profile picture" , size = 45 }) => {
    return (
        <div className="rounded-full cursor-pointer box-border px-1" >
            <img src={src} alt={altText} className="rounded-full object-cover" width={size} height={size} />
        </div>
    )
}

export default ProfilePicture