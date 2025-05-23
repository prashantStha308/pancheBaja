import mongoose from "mongoose";

export const setError = ( res , status = 500, error ) => {

    const message = typeof(error) == 'string' ? error : error instanceof Error ? error.message || "Unexpected Error Occured" : "Unknown Error Occured";

    res.status( status ).json({ success: false , message: message});
}

export const getAllData = async ( model , req , res )=> {
console.log(model);
    try {
        let { page= 1 , limit= 10 } = req.query;
        page = Math.max( 1 , parseInt(page) ) ;
        limit = Math.max( 1 , parseInt(limit) ); 

        const response = await model.find({}).skip( ( page - 1 ) * limit ).limit(limit);
        res.status(200).json({ success: true , data: response , message: "Successfully fetched user's datas" });

    } catch (error) {
        return setError( 500 , error );
    }
}

export const getDataById = async( model , req , res ) => {
    try {
        const { id } = req.params;
        if( !mongoose.Types.ObjectId.isValid(id) ){
            return setError( 404 , "Invalid Id" );
        }

        const response = await model.findById(id).limit(1);
        if( !response ){
            return setError( 404 , "Data of that Id not found" );
        }
        res.status(200).json({ success: true , data: response , message: "Data found" });
    } catch (error) {
        return setError( 500 , error );
    }
}