import { useState } from "react";
import InputField from "../../components/Inputs/InputField";
import InputFile from "../../components/Inputs/InputFile";
import { uploadTrack } from "../../services/track.services";
import Loader from "../../components/Loader.jsx";

const PublishForm = () => {

    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData(e.target);
            const res = await uploadTrack( formData );
            console.log(res);
        } catch (error) {
            return error;
        }finally{
            setLoading(false);
        }
    }
    
    if( loading ){
		return <Loader />
	}

    return (
        <section id="publish-form">
            <form onSubmit={handleSubmit}
				className="flex flex-col gap-2 items-start"
				encType="multipart/form-data"
			>
				<div>
					<InputField type="text" label={'Title'} name={'title'} required={true} />
				</div>
				
				<div>
					<InputField type="text" label={"Artists('Seperate with commas')"} name={'artists'} required={true} />
				</div>

				<div>
					<InputFile type="file" label={"Upload Track"} name={"track"} required={true} accept={"audio/*"} />
				</div>

				<input type="submit" value={'Submit'} className="bg-red-primary px-4 py-2 rounded-md cursor-pointer hover:bg-red-secondary font-medium" />
			</form>
        </section>
    )
}

export default PublishForm