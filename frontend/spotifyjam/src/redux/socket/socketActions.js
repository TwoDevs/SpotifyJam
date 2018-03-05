import {
    SOCKET_AUTH_LOADING,
    SOCKET_REAUTH_LOADING,
    CONNECTED
} from '../socket/socketConstants';

import {clearSession} from '../session/sessionActions';

import {redirectToHome} from '../API/historyFunctions';

import {
    selectUserReq,
} from '../selectors';

export const socketConnected = () => {
    return {
        type: CONNECTED
    };
}

export const socketAuthenticate = () => {
    return (dispatch, getState) => {
        const user_req = selectUserReq(getState());
        dispatch({type: SOCKET_AUTH_LOADING});
        dispatch({
            type: "server/" + SOCKET_AUTH_LOADING,
            payload: user_req,
        })
    }
}

export const socketReauthenticate = () => {
    return (dispatch, getState) => {
        const user_req = selectUserReq(getState());
        dispatch({type: SOCKET_REAUTH_LOADING});
        dispatch({
            type: "server/" + SOCKET_REAUTH_LOADING,
            payload: user_req,
        })
    }
}

export const socketTestMiddle = () => {
    return dispatch => {
        dispatch({
            type: "server/test",
            payload: "hello"
        });
    }
}