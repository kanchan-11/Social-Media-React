import axios from "axios"
import { API_BASE_URL, api } from "../../config/api"
import { GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_USER_PROFILE_FAILURE, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS } from "./auth.actionType"

export const loginUserAction = (loginData) =>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,loginData.data)
        if(data.token){
            localStorage.setItem("jwt",data.token)
        }
        console.log("Login success")
        dispatch({type:LOGIN_SUCCESS,payload:data.token})
    } catch (error) {
        console.log("--------",error)
        dispatch({type:LOGIN_FAILURE,payload:error})
    }
}
export const RegisterUserAction = (registerData) =>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`,registerData.data)
        if(data.token){
            localStorage.setItem("jwt",data.token)
        }
        console.log("Register success",data)
        dispatch({type:REGISTER_SUCCESS,payload:data.token})
    } catch (error) {
        console.log("--------",error)
        dispatch({type:REGISTER_FAILURE,payload:error})
    }
}
export const GetUserProfileAction = (jwt) => async(dispatch)=>{
    dispatch({type:GET_USER_PROFILE_REQUEST})
    try{
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`,
        {
            headers:{
                "Authorization":`Bearer ${jwt}`,
            }
        })
        console.log("User Profile ",data)
        dispatch({type:GET_USER_PROFILE_SUCCESS,payload:data})
    }
    catch(error){
        console.log("---------",error)
        dispatch({type:GET_USER_PROFILE_FAILURE,payload:error})
    }
}
export const UpdateUserProfileAction = (updateData) =>async(dispatch)=>{
    dispatch({type:UPDATE_USER_PROFILE_REQUEST})
    try {
        const {data} = await api.put(`${API_BASE_URL}/api/users`,updateData)
        console.log("Update success",data)
        dispatch({type:UPDATE_USER_PROFILE_SUCCESS,payload:data})
    } catch (error) {
        console.log("--------",error)
        dispatch({type:UPDATE_USER_PROFILE_FAILURE,payload:error})
    }
}
export const searchUser = (query) => async(dispatch)=>{
    dispatch({type:SEARCH_USER_REQUEST})
    try{
        const {data} = await api.get(`${API_BASE_URL}/api/users/search?query=${query}`)
        console.log("Search User ",data)
        dispatch({type:SEARCH_USER_SUCCESS,payload:data})
    }
    catch(error){
        console.log("---------",error)
        dispatch({type:SEARCH_USER_FAILURE,payload:error})
    }
}
export const logoutUserAction=()=>async(dispatch)=>{
    dispatch({type:LOGOUT_REQUEST})
    try{
        localStorage.removeItem('jwt')
        console.log("logout successful")
        dispatch({type:LOGOUT_SUCCESS})
    }
    catch(error){
        console.log("logout failure error",error)
        dispatch({type:LOGIN_FAILURE})
    }
}

export const GetAllUsersAction = (jwt) => async(dispatch)=>{
    dispatch({type:GET_ALL_USERS_REQUEST})
    try{
        const {data} = await api.get(`${API_BASE_URL}/api/users`)
        console.log("List of All users",data)
        dispatch({type:GET_ALL_USERS_SUCCESS,payload:data})
    }
    catch(error){
        console.log("---------",error)
        dispatch({type:GET_ALL_USERS_FAILURE,payload:error})
    }
}