const Library = ({ className="" , fill = "none", size = 60 , strokeWidth = 4 }) => {
  return (
    <svg className={className}  width={size} height={size} viewBox="0 0 60 60" fill={fill} >
        <path d="M58 17.0176V58H40V3.92676L58 17.0176Z" stroke="currentColor" strokeWidth={`${strokeWidth}`}/>
        <line x1="2" y1="8.74228e-08" x2="2" y2="60" stroke="currentColor" strokeWidth={`${strokeWidth}`}/>
        <line x1="21" y1="8.74228e-08" x2="21" y2="60" stroke="currentColor" strokeWidth={`${strokeWidth}`}/>
    </svg>

  )
}

export default Library