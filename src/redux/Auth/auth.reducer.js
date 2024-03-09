import { GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEARCH_USER_SUCCESS, UPDATE_USER_PROFILE_SUCCESS } from "./auth.actionType"

const initialState={
    jwt:null,
    error:null,
    loading:false,
    user:null,
    allUsers:[],
    searchUser:[],
    profilePicture:null
}
export const authReducer=(state=initialState,action)=>{
    
    switch(action.type){
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_USER_PROFILE_REQUEST:
        case GET_ALL_USERS_REQUEST:
            return {...state,loading:true,error:null}
        case GET_USER_PROFILE_SUCCESS:
        case UPDATE_USER_PROFILE_SUCCESS:
            return {...state,user:action.payload,loading:false,error:null}
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {...state,jwt:action.payload,loading:false,error:null}
        case SEARCH_USER_SUCCESS:
            return {...state,searchUser:action.payload,loading:false,error:null}
        case GET_ALL_USERS_SUCCESS:
            return { ...state, allUsers: action.payload, loading: false, error: null };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case GET_ALL_USERS_FAILURE:
            return {...state,loading:false,error:action.payload}
        case LOGOUT_SUCCESS:
            return {...initialState}
        default:
            return state
    }
}