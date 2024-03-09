import {applyMiddleware, combineReducers, createStore} from 'redux';
import {thunk} from 'redux-thunk'
import { authReducer } from "./Auth/auth.reducer";
import {postReducer} from "./Post/post.reducer"
import { messageReducer } from "./Message/message.reducer";
const rootReducers=combineReducers({
    auth:authReducer,
    post:postReducer,
    message:messageReducer
})
const Store=createStore(rootReducers,applyMiddleware(thunk))
export default Store