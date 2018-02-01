//Constants
import {
    GET_TOKENS_LOADING,
    GET_TOKENS_SUCCESS,
    GET_TOKENS_FAIL,
    
    GET_PROFILE_LOADING,
    GET_PROFILE_FAIL,
    GET_PROFILE_SUCCESS,

    AUTH_SUCCESS,
    AUTH_FAIL,

    CLEAR_SESSION,
} from './sessionConstants';

//Core API
import {
    verifyTokens,
    setSpotifyTokens,
    getProfile
} from '../API/spotifyFunctions';

import {
    redirectToLobby,
    redirectToHome
} from '../API/historyFunctions';

//Selectors
import {
    selectURLHash,
    selectAuthorizationStatus,
    selectUserReq,
} from '../selectors';


export const setTokens = () => {
    return (dispatch, getState) => {
        //Start Loading
        dispatch({
            type: GET_TOKENS_LOADING
        });
        //Retrieve hash from store
        const hash = selectURLHash(getState());
        //Check hash
        const {valid, access_token} = verifyTokens(hash);
        if (valid){
            //Spotify API Token Setting
            setSpotifyTokens(access_token);
            //Dispatch Success
            dispatch({
                type: GET_TOKENS_SUCCESS,
                payload: access_token
            });
        }
        else {
            //Dispatch Fail
            dispatch({
                type: GET_TOKENS_FAIL
            });
            //Log Out
            dispatch({
                type: CLEAR_SESSION
            });
        }
    }
}

export const setProfile = () => {
    return (dispatch) => {
        //Start Loading
        dispatch({
            type: GET_PROFILE_LOADING
        });
        //Spotify API Profile Retrieval
        return getProfile()
        .then(profileData => {
            //Dispatch Success
            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: profileData
            });
        })
        .catch(e => {
            //Replace with logger middleware later
            console.log("Profile Fail:", e);
            //Dispatch Fail
            dispatch({
                type: GET_PROFILE_FAIL
            });
            //Log Out
            dispatch({
                type: CLEAR_SESSION
            });
        });

    }
}

export const authorize = () => {
    return (dispatch, getState) => {
        //Shoot off token setting (synchronous)
        dispatch(setTokens());
        //Start profile retrieval (update status async)
        dispatch(setProfile()).then(() => {
            if (selectAuthorizationStatus(getState())){
                //Dispatch Router Change
                dispatch(redirectToLobby());
                //Dispatch Successful Auth
                return dispatch({
                    type: AUTH_SUCCESS
                });
            }
            else{
                //Dispatch Router Change
                dispatch(redirectToHome());
                //Dispatch Unsuccessful Auth
                return dispatch({
                    type: AUTH_FAIL
                });
            }
        });
    }
}

export const clearSession = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_SESSION
        });
    }
}

