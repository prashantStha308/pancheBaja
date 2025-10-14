const Add = ({ className = "" ,size = 60 , strokeWidth = 4 }) => {
  return (
    <svg className={`${className}`} width={size} height={size} viewBox="0 0 145 145" >
        <path d="M72.5 48.3333V96.6667M48.3333 72.5H96.6667M132.917 72.5C132.917 105.867 105.867 132.917 72.5 132.917C39.1328 132.917 12.0833 105.867 12.0833 72.5C12.0833 39.1328 39.1328 12.0833 72.5 12.0833C105.867 12.0833 132.917 39.1328 132.917 72.5Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default Add;