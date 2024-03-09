import * as actionType from "./message.actionType"
import { API_BASE_URL, api } from "../../config/api"


//2
export const createMessage=(reqData)=>async(dispatch)=>{
    dispatch({type:actionType.CREATE_MESSAGE_REQUEST})
    try {
        const {data} = await api.post(`${API_BASE_URL}/api/messages/chat/${reqData.message.chatId}`,reqData.message);
        reqData.sendMessageToServer(data)
        console.log("created message",data);
        dispatch({type:actionType.CREATE_MESSAGE_SUCCESS,payload:data});
        dispatch(getAllChats())
    } catch (error) {
        console.log("error....",error);
        dispatch({type:actionType.CREATE_MESSAGE_FAILURE,payload:error});
    }

};
export const createChat=(chat)=>async(dispatch)=>{
    console.log("chatid to be created",chat)
    dispatch({type:actionType.CREATE_CHAT_REQUEST})
    try {
        const {data} = await api.post(`${API_BASE_URL}/api/chats`,chat)
        console.log("created chats",data)
        dispatch({type:actionType.CREATE_CHAT_SUCCESS,payload:data})
    } catch (error) {
        console.log("error....",error)
        dispatch({type:actionType.CREATE_CHAT_FAILURE,payload:error})
    };

}

export const getAllChats=()=>async(dispatch)=>{
    dispatch({type:actionType.GET_ALL_CHATS_REQUEST})
    try {
        const {data} = await api.get(`${API_BASE_URL}/api/chats`)
        console.log("get all chats",data)
        dispatch({type:actionType.GET_ALL_CHATS_SUCCESS,payload:data})

        

    } catch (error) {
        console.log("error....",error)
        dispatch({type:actionType.GET_ALL_CHATS_FAILURE,payload:error})
    };

}
