import {
    SET_USERNAME, 
    SET_ACCESS_TOKEN, 
    SET_REFRESH_TOKEN,
    VERIFICATION_SUCCESS,
    VERIFICATION_FAILED,
    CLEAR_SESSION
} from './sessionConstants';

import {verifyTokens} from '../../../spotify/tokenVerification';

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
        const {valid, access_token, refresh_token} = verifyTokens(hash);
        if (valid){
            dispatch(setAccessToken(access_token));
            dispatch(setRefreshToken(refresh_token));
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