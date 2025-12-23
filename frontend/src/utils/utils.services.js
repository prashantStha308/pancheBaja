export const setError = (error)=>{
    return { success: false , data: null , message: error.message || "Unknown Error occured." };
}

export const setSuccess = (resData) => {
    return { success: true , data: resData.data , message: resData.message || "Operation Successful" };
}