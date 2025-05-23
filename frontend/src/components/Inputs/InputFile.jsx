const InputFile = ({ type= 'text' , label , name , required= false , accept }) => {

	if( type !== 'file' ){
		return "Unsupported type. Use this component only for files input";
	}
  
	return (
		<div className="flex gap-1" >
            <div> {label}: </div>
			<label htmlFor={name} className="bg-red-primary hover:bg-red-secondary rounded-md font-medium px-2 py-1 text-center" > Upload </label>
			<input
				type={type} name={name} id={name} required={required}
                accept={accept}
				style={{display: "none"}}
			/>
		</div>
	)
}

export default InputFile;