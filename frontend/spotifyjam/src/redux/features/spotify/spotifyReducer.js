import {
    GET_PROFILE_LOADING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
} from './spotifyConstants';


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
}

//Session Reducer
export default (state = initialSpotifyState, action) => {
    switch(action.type){
        case GET_PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE_SUCCESS:
            debugger;
            return Object.assign({}, state, action.payload, {loading: false}) ;
        
        case GET_PROFILE_FAILURE:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
};