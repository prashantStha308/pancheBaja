const Library = ({ className="" , fill = "none", size = 60 , strokeWidth = 4 , strokeColor = "currentColor" }) => {
  return (
    <svg className={className}  width={size} height={size} viewBox="0 0 60 60" fill={fill} >
        <path d="M58 17.0176V58H40V3.92676L58 17.0176Z" stroke={strokeColor} strokeWidth={`${strokeWidth}`}/>
        <line x1="2" y1="8.74228e-08" x2="2" y2="60" stroke={strokeColor} strokeWidth={`${strokeWidth}`}/>
        <line x1="21" y1="8.74228e-08" x2="21" y2="60" stroke={strokeColor} strokeWidth={`${strokeWidth}`}/>
    </svg>

  )
}

export default Library