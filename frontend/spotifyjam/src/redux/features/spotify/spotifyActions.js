import {
    GET_PROFILE_LOADING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    SESSION_TIMED_OUT,
    TIMEOUT
} from './spotifyConstants';
import { CLEAR_SESSION } from '../session/sessionConstants';

//Session Action
import {setAccessToken, setRefreshToken} from '../session/sessionActions';

//Spotify Instance
import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

//Session Actions
export const setSpotifyTokens = (access_token, refresh_token) => {
    
    spotifyApi.setAccessToken(access_token);    
    return dispatch => {
        dispatch(setAccessToken(access_token));
        dispatch(setRefreshToken(refresh_token));
    }
}

export const authenticate = () => {
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
                dispatch(startTimeOut());
            })
            .catch(e => {
                dispatch({ 
                    type: GET_PROFILE_FAILURE, 
                    error: e 
                });
                dispatch({
                    type: CLEAR_SESSION
                });
            });
    };
}

export const startTimeOut =() => {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: SESSION_TIMED_OUT
            });
            dispatch({
                type: CLEAR_SESSION
            })
        }, TIMEOUT);
    }
}