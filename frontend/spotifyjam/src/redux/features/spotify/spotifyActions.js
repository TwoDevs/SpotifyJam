import {
    SET_SPOTIFY_TOKENS,
    GET_SPOTIFY_PROFILE,
    GET_PROFILE_LOADING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE
} from './spotifyConstants';

//Spotify Instance
import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

//Session Actions
export const setSpotifyTokens = (access_tokens, refresh_tokens) => {
    
    spotifyApi.setAccessToken(accessToken);
    
    return dispatch => {
        dispatch(setAccessToken(access_token));
        dispatch(setRefreshToken(refresh_token));
    }
}

export const getSpotifyProfile = () => {
    return dispatch => {
        dispatch({ 
            type: GET_PROFILE_LOADING
        });
        spotifyApi.getMe()
            .then(profileData => {
                dispatch({ 
                    type: GET_PROFILE_SUCCESS, 
                    payload: profileData 
                });
            })
            .catch(e => {
                dispatch({ 
                    type: GET_PROFILE_FAILURE, 
                    error: e 
                });
            });
    };
}