import { API_BASE_URL, api } from "../../config/api"
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS } from "./post.actionType"

export const createPostAction=(postData)=>async(dispatch)=>{
    console.log("in create post action",postData)
    dispatch({type:CREATE_POST_REQUEST})
    try {
        
        const {data} = await api.post(`${API_BASE_URL}/api/posts`,postData)
        dispatch({type:CREATE_POST_SUCCESS,payload:data})
        console.log("created post",data)
    } catch (error) {
        console.log("error......",error)
        dispatch({type:CREATE_POST_FAILURE,payload:error})
    }

}
export const getAllPostAction=()=>async(dispatch)=>{
    dispatch({type:GET_ALL_POST_REQUEST})
    try {
        const {data} = await api.get(`${API_BASE_URL}/api/posts`)
        dispatch({type:GET_ALL_POST_SUCCESS,payload:data })
        console.log("Get all posts",data)
    } catch (error) {
        console.log(error)
        dispatch({type:GET_ALL_POST_FAILURE,payload:error})
    }

}
export const getUsersPostAction=(userId)=>async(dispatch)=>{
    dispatch({type:GET_USERS_POST_REQUEST})
    try {
        const {data} = await api.get(`${API_BASE_URL}/api/posts/user/${userId}`)
        dispatch({type:GET_USERS_POST_SUCCESS,payload:data })
        console.log("Get user posts",data)
    } catch (error) {
        console.log(error)
        dispatch({type:GET_USERS_POST_FAILURE,payload:error})
    }

}
export const likePostAction=(postId)=>async(dispatch)=>{
    dispatch({type:LIKE_POST_REQUEST})
    try {
        const {data} = await api.put(`${API_BASE_URL}/api/posts/like/${postId}`)
        dispatch({type:LIKE_POST_SUCCESS,payload:data })
        console.log("Like post",data)
    } catch (error) {
        console.log(error)
        dispatch({type:LIKE_POST_FAILURE,payload:error})
    }

}
export const createCommentAction=(reqdata)=>async(dispatch)=>{
    dispatch({type:CREATE_COMMENT_REQUEST})
    try {
        const {data} = await api.post(`${API_BASE_URL}/api/comments/post/${reqdata.postId}`,reqdata.data)
        dispatch({type:CREATE_COMMENT_SUCCESS,payload:data})
        console.log("created COMMENT",data)
    } catch (error) {
        console.log("error......",error)
        dispatch({type:CREATE_COMMENT_FAILURE,payload:error})
    }

}