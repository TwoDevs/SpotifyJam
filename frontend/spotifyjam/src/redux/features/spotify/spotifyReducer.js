import {
    GET_PROFILE_LOADING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    SET_SOCKET_AUTH, 
} from './spotifyConstants';

import {
    CLEAR_SESSION
} from '../session/sessionConstants';

//Initial State
const initialSpotifyState = {
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
    loading: false,
    socket_auth: false,
}

//Session Reducer
export default (state = initialSpotifyState, action) => {
    switch(action.type){
        case GET_PROFILE_LOADING:
            return {
                ...state,
                loading: true,
                socket_auth: true
            };
        case GET_PROFILE_SUCCESS:
            return Object.assign({}, state, action.payload, {loading: false}) ;
        
        case GET_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                socket_auth: false
            };
        case SET_SOCKET_AUTH:
            return {
                ...state,
                socket_auth: action.payload
            };
        case CLEAR_SESSION:
            return {
                ...initialSpotifyState
            };
        default:
            return state;
    }
};