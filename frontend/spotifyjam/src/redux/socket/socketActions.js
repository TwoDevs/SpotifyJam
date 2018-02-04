import {
    SOCKET_AUTH_LOADING,
    SOCKET_AUTH_SUCCESS,
    SOCKET_AUTH_FAIL,
    SOCKET_REAUTH_LOADING,
    SOCKET_REAUTH_SUCCESS,
    SOCKET_REAUTH_FAIL,
    CONNECTED
} from '../session/sessionConstants';

import {clearSession} from '../session/sessionActions';

import {redirectToHome} from '../API/historyFunctions';

import {
    selectUserReq,
    selectSocketUser
} from '../selectors';

export const socketConnected = () => {
    return {
        type: CONNECTED
    };
}

export const socketAuthLoading = () => {
    return {
        type: SOCKET_AUTH_LOADING
    };
}

export const socketAuthSuccess = (user) => {
    return {
        type: SOCKET_AUTH_SUCCESS,
        payload: user
    };
}

export const socketAuthFail = () => {
    return {
        type: SOCKET_AUTH_FAIL,
    };
}

export const handleAuthResult  = (res) => {
    return (dispatch) => {
        if (res.status === "succeeded"){
            const {user} = res;
            dispatch(socketAuthSuccess(user));
        }
        else {
            dispatch(socketAuthFail());
            dispatch(clearSession());
            dispatch(redirectToHome());
        }
    }
}

export const requestSocketAuth = (io) => {
    return (dispatch, getState) => {
        // Get user_req
        const user_req = selectUserReq(getState());
        io.emit('authenticate', user_req);
        dispatch(socketAuthLoading());
    }
}

export const requestSocketReAuth = (io) => {
    return (dispatch, getState) => {
        // Get socket user
        const socketUser = selectSocketUser(getState());
        io.emit('reauthenticate', socketUser);
        dispatch(socketReAuthLoading());
    }
}

export const handleReAuthResult  = (res) => {
    return (dispatch) => {
        if (res.status === "succeeded"){
            const {user} = res;
            dispatch(socketReAuthSuccess(user));
        }
        else {
            dispatch(socketReAuthFail());
            dispatch(clearSession());
            dispatch(redirectToHome());
        }
    }
}

export const socketReAuthLoading = () => {
    return {
        type: SOCKET_REAUTH_LOADING
    };
}

export const socketReAuthSuccess = (user) => {
    return {
        type: SOCKET_REAUTH_SUCCESS,
        payload: user
    };
}

export const socketReAuthFail = () => {
    return {
        type: SOCKET_REAUTH_FAIL,
    };
}
