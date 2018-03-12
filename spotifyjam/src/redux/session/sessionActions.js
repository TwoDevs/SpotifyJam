//Constants
import { GET_TOKENS_LOADING, GET_TOKENS_SUCCESS, GET_TOKENS_FAIL, GET_PROFILE_LOADING, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL, CLEAR_SESSION, LOG_OUT, FAILED_REAUTH } from "./sessionConstants";

//Socket Actions
import { socketAuthenticate, socketReauthenticate, socketLogOut } from "../socket/socketActions";

//API
import { verifyTokens, setSpotifyTokens, getProfile } from "../API/spotifyFunctions";

import { redirectToHome } from "../API/historyFunctions";

//Selectors
import { selectURLHash, selectAccessToken } from "../selectors";

export const setTokens = () => {
  return (dispatch, getState) => {
    //Start Loading
    dispatch({ type: GET_TOKENS_LOADING });
    //Retrieve hash from store
    const hash = selectURLHash(getState());
    //Check hash
    const { valid, access_token } = verifyTokens(hash);
    if (valid) {
      //Spotify API Token Setting
      setSpotifyTokens(access_token);
      //Dispatch Success
      dispatch({
        type: GET_TOKENS_SUCCESS,
        payload: access_token
      });
    } else {
      //Dispatch Fail
      dispatch({ type: GET_TOKENS_FAIL });
      //Log Out
      dispatch(logOut());
    }
  };
};

export const setProfile = () => {
  return dispatch => {
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
        //Dispatch Fail
        dispatch({ type: GET_PROFILE_FAIL });
        //Log Out
        dispatch(logOut());
      });
  };
};

export const connectionHandler = () => {
  return (dispatch, getState) => {
    //TODO: More comprehensive selector/verify
    const access_token = selectAccessToken(getState());
    if (access_token !== "") {
      dispatch(socketReauthenticate());
    } else {
      dispatch(authenticate());
    }
  };
};

export const authenticate = () => {
  return (dispatch, getState) => {
    //Set tokens (synchronous)
    dispatch(setTokens());
    //Profile retrieval (asynchronous)
    dispatch(setProfile())
      //TODO: SOCKET AUTH
      .then(() => {
        dispatch(socketAuthenticate());
      });
  };
};

//Leave Site
export const logOut = () => {
  return dispatch => {
    //Dispatch Router Log Out
    dispatch(redirectToHome());
    dispatch(socketLogOut());
    dispatch({ type: LOG_OUT });
    dispatch(clearSession());
  };
};

export const clearSession = () => {
  return dispatch => {
    dispatch({ type: CLEAR_SESSION });
  };
};

export const failedReAuth = () => {
  return dispatch => {
    dispatch(redirectToHome());
    dispatch({ type: FAILED_REAUTH });
    dispatch(clearSession());
  };
};
