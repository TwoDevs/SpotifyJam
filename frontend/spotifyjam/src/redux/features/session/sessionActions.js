import {
    SET_USERNAME, 
    SET_ACCESS_TOKEN, 
    SET_REFRESH_TOKEN,
    SET_EXPIRATION,
    SET_SOCKET_AUTH,
    VERIFICATION_SUCCESS,
    VERIFICATION_FAILED,
    CLEAR_SESSION
} from './sessionConstants';

//Spotify Actions
import {setSpotifyTokens} from '../spotify/spotifyActions';

//Helper
import {verifyTokens} from '../spotify/utils/tokenVerification';


//Session Actions
export const setUsername = (username) => {
    return dispatch => {
        dispatch({
            type: SET_USERNAME,
            payload: username
        });
    }
}

export const setAccessToken = (access_token) => {
    return dispatch => {
        dispatch({
            type: SET_ACCESS_TOKEN,
            payload: access_token
        });
    }
}

export const setRefreshToken = (refresh_token) => {
    return dispatch => {
        dispatch({
            type: SET_REFRESH_TOKEN,
            payload: refresh_token
        });
    }
}

export const setExpiration = (expires_in) => {
    return dispatch => {
        dispatch({
            type: SET_EXPIRATION,
            payload: expires_in
        });
    }
}

export const setSocketAuth = (status) => {
    return dispatch => {
        dispatch({
            type: SET_SOCKET_AUTH,
            payload: status
        });
    }
}

export const verificationFailed = () => {
    return dispatch => {
        dispatch({
            type: VERIFICATION_FAILED,
        });
    }
}

export const verificationSuccess = () => {
    return dispatch => {
        dispatch({
            type: VERIFICATION_SUCCESS,
        });
    }
}


export const verify = (hash) => {
    return dispatch => {
        const {valid, access_token, refresh_token, expires_in} = verifyTokens(hash);
        if (valid){
            dispatch(setSpotifyTokens(access_token,refresh_token));
            dispatch(setExpiration(expires_in));
            dispatch(verificationSuccess());
        }
        else{
            dispatch(clearSession());
            dispatch(verificationFailed());
        }
    }
}

export const clearSession = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_SESSION
        });
    }
}