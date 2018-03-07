//Constants
import {
    GET_TOKENS_LOADING,
    GET_TOKENS_SUCCESS,
    GET_TOKENS_FAIL,
    
    GET_PROFILE_LOADING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,

    CLEAR_SESSION,
} from './sessionConstants';

//Initial State
const initialSessionState = {
    access_token: "",
    refresh_token: "",
    expires_in: "",
    isGuest: true,
    loggedIn: false,
    // "wait" -> "progress" -> "finished" || "failed"
    status: {
        tokenStatus: "wait",
        profileStatus: "wait",
    },
    user: {
        country: null,
        display_name: null,
        email: null,
        external_urls: {},
        followers: {},
        href: null,
        id: null,
        images: [],
        product: null,
        type: null,
        uri: null,
    }
}

//Session Reducer
export default (state = initialSessionState, action) => {
    switch(action.type){
        case GET_TOKENS_LOADING:
            return Object.assign({}, state, {
                status: Object.assign({}, state.status, {tokenStatus: "process"})
            });
        case GET_TOKENS_SUCCESS:
            return Object.assign({}, state, 
                {status: Object.assign({}, state.status, {tokenStatus: "finished"})}, 
                {access_token: action.payload, isGuest: false});
        case GET_TOKENS_FAIL:
            return Object.assign({}, state, {
                status: Object.assign({}, state.status, {tokenStatus: "failed"})
            });
        case GET_PROFILE_LOADING:
            return Object.assign({}, state, {
                status: Object.assign({}, state.status, {profileStatus: "process"})
            });
        case GET_PROFILE_SUCCESS:
            return Object.assign({}, state, 
                {status: Object.assign({}, state.status, {profileStatus: "finished"})}, 
                {user: action.payload});
        case GET_PROFILE_FAIL:
            return Object.assign({}, state, {
                status: Object.assign({}, state.status, {profileState: "failed"})
            });
        case CLEAR_SESSION:
            return {
                ...initialSessionState
            };
        default:
            return state;
    }
};