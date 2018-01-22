import {SET_USERNAME, SET_ACCESS_TOKEN} from './sessionConstants'; 

//Initial State
const initialSessionState = {
    username: "",
    access_token: "",
    currentRoom: "lobby",
    isGuest: true
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
        default:
            return state;
    }
};