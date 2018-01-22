import {SET_USERNAME, SET_ACCESS_TOKEN} from './sessionConstants';

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
