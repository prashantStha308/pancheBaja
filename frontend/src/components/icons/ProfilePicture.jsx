const ProfilePicture = ({ src , alt = "user profile picture" , size = 45 }) => {
    return (
        <div className="rounded-full aspect-square cursor-pointer box-border px-1" >
            <img src={src} alt={alt} className="rounded-full object-cover" width={size} height={size} />
        </div>
    )
}

export default ProfilePicture