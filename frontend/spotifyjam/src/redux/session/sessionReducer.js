//Constants
import {
    GET_TOKENS_LOADING,
    GET_TOKENS_SUCCESS,
    GET_TOKENS_FAIL,
    
    GET_PROFILE_LOADING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,

    SOCKET_AUTH_LOADING,
    SOCKET_AUTH_SUCCESS,
    SOCKET_AUTH_FAIL,

    SOCKET_REAUTH_LOADING,
    SOCKET_REAUTH_SUCCESS,
    SOCKET_REAUTH_FAIL,

    CONNECTED,

    AUTH_SUCCESS,
    AUTH_FAIL,

    CLEAR_SESSION,
} from './sessionConstants';

//Initial State
const initialSessionState = {
    access_token: "",
    refresh_token: "",
    expires_in: "",
    isGuest: true,
    status: {
        tokenStatus: "wait",
        profileStatus: "wait",
        socketStatus: "wait",
        auth: false,
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
    },
    res: null,
    connected: false
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
                {status: Object.assign({}, state.status, {tokenStatus: "finish"})}, 
                {access_token: action.payload, isGuest: false});
        case GET_TOKENS_FAIL:
            return Object.assign({}, state, {
                status: Object.assign({}, state.status, {tokenStatus: "fail"})
            });
        case GET_PROFILE_LOADING:
            return Object.assign({}, state, {
                status: Object.assign({}, state.status, {profileStatus: "process"})
            });
        case GET_PROFILE_SUCCESS:
            return Object.assign({}, state, 
                {status: Object.assign({}, state.status, {profileStatus: "finish"})}, 
                {user: action.payload});
        case GET_PROFILE_FAIL:
            return Object.assign({}, state, {
                status: Object.assign({}, state.status, {profileState: "fail"})
            });
        case SOCKET_REAUTH_LOADING:
        case SOCKET_AUTH_LOADING:
            return Object.assign({}, state, {
                status: Object.assign({}, state.status, {socketStatus: "process"})
            });
        case SOCKET_REAUTH_SUCCESS:
        case SOCKET_AUTH_SUCCESS:
            return Object.assign({}, state, 
                {status: Object.assign({}, state.status, {socketStatus: "finish"})}, 
                {res: action.payload});
        case SOCKET_REAUTH_FAIL:
        case SOCKET_AUTH_FAIL:
            return Object.assign({}, state, {
                status: Object.assign({}, state.status, {socketStatus: "fail"})
            });
        case CONNECTED:
            return Object.assign({}, state, {connected: true});
        case AUTH_SUCCESS:
            return Object.assign({}, state, {
                status: Object.assign({}, state.status, {auth: true})
            });
        case AUTH_FAIL:
            return Object.assign({}, state, {
                status: Object.assign({}, state.status, {auth: false})
            });
        case CLEAR_SESSION:
            return {
                ...initialSessionState
            };
        default:
            return state;
    }
};