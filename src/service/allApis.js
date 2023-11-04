import { BASE_URL } from "./baseUrl";
import { commonRequest } from "./commonRequest";


//video add -post -url,body
export const addVideo=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/videos`,body)
}


//get all videos-get -url
export const getAllVideos=async()=>{
    return await commonRequest("GET",`${BASE_URL}/videos`,"")
}

//add category -post -url,body
export const addCategory=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/category`,body)
}

//delete  video in get all videos -delete-url
export const removeVideo=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/videos/${id}`,{})
}

//get all categories
export const getAllCategory=async()=>{
    return await commonRequest("GET",`${BASE_URL}/category`,"")
}

//delete category  
export const removeCategory=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/category/${id}`,{})
}

//get all history
export const getHistory=async()=>{
    return await commonRequest("GET",`${BASE_URL}/history`,{})
}

//add history
export const addHistory=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/history`,body)
}

//drag and drop
//1-api to get single video
export const getVideo=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/videos/${id}`,{})

}

//2-api to update category array
export const updateCategory=async(id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/category/${id}`,body)
}


