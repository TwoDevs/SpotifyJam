//Session Constants
export const SET_USERNAME = "SET_USERNAME";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SET_CURRENT_ROOM = "SET_CURRENT_ROOM";

//Initial State
const initialSessionState = {
    username: "",
    access_token: "",
    currentRoom: "lobby",
    isGuest: true
}

//Session Actions
export const setUsername = (username) => {
    return dispatch => {
        console.log("Action created for set username");
        dispatch({
            type: SET_USERNAME,
            payload: username
        });
    }
}

export const setAccessToken = (access_token) => {
    return dispatch => {
        console.log("Action created for set token");
        dispatch({
            type: SET_ACCESS_TOKEN,
            payload: access_token
        });
    }
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