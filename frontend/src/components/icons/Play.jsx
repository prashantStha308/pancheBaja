const Play = ({ className = "" , fill = "none", size = 35 }) => {
    return (
        <svg className={`${className}`} width={size} height={size} viewBox="0 0 60 60" fill={fill}>
            <path d="M20 47.5V12.5L47.5 30L20 47.5Z" fill="currentColor"/>
        </svg>
    )
}

export default Play