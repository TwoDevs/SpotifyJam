//Action Constants
import {
    SET_USERNAME, 
    SET_ACCESS_TOKEN, 
    SET_REFRESH_TOKEN,
    VERIFICATION_FAILED,
    CLEAR_SESSION,
    VERIFICATION_SUCCESS, 
} from './sessionConstants'; 

//Initial State
const initialSessionState = {
    username: "",
    access_token: "",
    refresh_token: "",
    currentRoom: "lobby",
    isGuest: true,
    verified: false
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