const Home = ({ className = "" , fill = "none", size = 60 , strokeWidth = 4 , strokeColor = "currentColor" }) => {
  return (
    <svg className={className}  width={size} height={size} viewBox="0 0 64 64" fill={fill}>
        <path d="M22 62V32H42V62M2 23L32 2L62 23V56C62 57.5913 61.2976 59.1174 60.0474 60.2426C58.7971 61.3679 57.1014 62 55.3333 62H8.66667C6.89856 62 5.20286 61.3679 3.95262 60.2426C2.70238 59.1174 2 57.5913 2 56V23Z" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default Home
