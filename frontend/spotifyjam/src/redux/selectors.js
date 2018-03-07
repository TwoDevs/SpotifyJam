import {createSelector} from 'reselect';

//Input Selectors
const getURLHash = (state) => state.router.location.hash;
const getAccessToken = (state) => state.session.access_token;
const getSessionLoadingStatus = (state) => state.session.status;
const getSocketLoadingStatus = (state) => state.spotify.status;
const getSocketUser = (state) => state.spotify.socketUser;
const getSessionUser = (state) => state.session.user;
const getRooms = (state) => state.spotify.availableRooms;

//Memoized Selectors
export const selectURLHash = createSelector(
    [getURLHash],
    hash => {
        return hash;
    }
)

// Select Access Token 
export const selectAccessToken = createSelector(
    [getAccessToken],
    token => {
        return token;
    }
)

// Loading Objs for verification page
export const selectLoadingStatus = createSelector(
    getSessionLoadingStatus, 
    getSocketLoadingStatus,
    (sessionStatus, socketAuth) => {
        return Object.assign({}, sessionStatus, socketAuth);
    }
)

// Create user_req obj for authenticating
export const selectUserReq = createSelector(
    [getSessionUser],
    user => {
        const {id, display_name} = user;
        return {spotify_id: id, username: display_name, is_guest: false};
    }
)

// Select socket user_req obj for verifying 
export const selectSocketUser = createSelector(
    [getSocketUser],
    user_req => {
        return user_req;
    }
)

// Select Entire User Obj from Spotify for user profile/header
export const selectUser = createSelector(
    [getSessionUser],
    user => {
        return user;
    }
)

// Select rooms for lobby
export const selectRooms = createSelector(
    [getRooms],
    rooms => {
        return rooms;
    }
)

// Check Reauth status for redirect
export const selectReauthFailed = createSelector(
    [getSocketLoadingStatus],
    status => {
        return status.authStatus === 'failed';
    }
)