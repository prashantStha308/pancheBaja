const Shuffle = ({ className = "" , fill = "none", size = 60 , strokeWidth = 4 }) => {
    return (
        <svg className={`${className}`} width={size} height={size} viewBox="0 0 48 48" fill={fill} >
            <path d="M32 6H42M42 6V16M42 6L8 40M42 32V42M42 42H32M42 42L30 30M8 8L18 18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default Shuffle