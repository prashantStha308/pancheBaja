const Dot = ({ size=5 , fill="none" }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 5 5" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor"/>
        </svg>
    )
}

export default Dot