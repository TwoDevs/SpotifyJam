//Action Constants
import {
    SET_USERNAME, 
    SET_ACCESS_TOKEN, 
    SET_REFRESH_TOKEN,
    SET_EXPIRATION,
    VERIFICATION_FAILED,
    CLEAR_SESSION,
    VERIFICATION_SUCCESS, 
} from './sessionConstants'; 

//Initial State
const initialSpotifyState = {
    
}

//Session Reducer
export default (state = initialSpotifyState, action) => {
    switch(action.type){
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            };

        default:
            return state;
    }
};