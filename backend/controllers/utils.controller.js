export const setError = ( error )=>{
    return { success: false , data: null , message: error.message };
}

export const setSuccess = ( res )=>{
    return { success: true , data: res.data , message: res.message };
}