const Search = ({ className = "" , fill = "none" , size = 60 , strokeWidth = 3 , strokeColor = "currentColor" }) => {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 60 60" fill={fill} >
        <path d="M52.5 52.5L41.625 41.625M47.5 27.5C47.5 38.5457 38.5457 47.5 27.5 47.5C16.4543 47.5 7.5 38.5457 7.5 27.5C7.5 16.4543 16.4543 7.5 27.5 7.5C38.5457 7.5 47.5 16.4543 47.5 27.5Z" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default Search;