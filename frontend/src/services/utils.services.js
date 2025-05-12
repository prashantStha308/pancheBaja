export const setError = (error)=>{
    return { success: false , data: null , message: error.message || "Unknown Error occured." };
}

export const setSuccess = (res) => {
    return { success: true , data: res.data , message: res.message || "Operation Successful" };
}