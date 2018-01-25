//Action Constants
import {
    SET_USERNAME, 
    SET_ACCESS_TOKEN, 
    SET_REFRESH_TOKEN,
    SET_EXPIRATION,
    VERIFICATION_FAILED,
    CLEAR_SESSION,
    VERIFICATION_SUCCESS,
    SET_SOCKET_AUTH, 
} from './sessionConstants'; 

//Initial State
const initialSessionState = {
    username: "",
    access_token: "",
    refresh_token: "",
    expires_in: "",
    currentRoom: "lobby",
    isGuest: true,
    verified: false,
    socket_auth: false,
}

//Session Reducer
export default (state = initialSessionState, action) => {
    switch(action.type){
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            };
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                access_token: action.payload
            };
        case SET_REFRESH_TOKEN:
            return {
                ...state,
                refresh_token: action.payload
            };
        case SET_EXPIRATION:
            return {
                ...state,
                expires_in: action.payload
            };
        case SET_SOCKET_AUTH:
            return {
                ...state,
                socket_auth: action.payload
            };
        case VERIFICATION_FAILED:
            return {
                ...state,
                verified: false
            };
        case VERIFICATION_SUCCESS:
            return {
                ...state,
                verified: true
            };
        case CLEAR_SESSION:
            return {
                ...initialSessionState
            };
        default:
            return state;
    }
};