import { useState } from "react";

const InputField = ({ type= 'text' , label , name , required= false }) => {

	const [ value , setValue ] = useState('');
	if( type== 'file' ){
		return "Unsupported type. Use 'InputFile' for file inputs";
	}
  
	const handleChange = (e) => {
		setValue(e.target.value);
	}

	return (
		<div className="flex flex-col gap-1" >
			<label htmlFor={name} > {label} </label>
			<input
				type={type} name={name} id={name} required={required}
				value={value} onChange={handleChange}
				className=" border border-white-secondary rounded-sm outline-none px-2 py-1 "
			/>
		</div>
	)
}

export default InputField;