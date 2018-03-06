import {createSelector} from 'reselect';

//Input Selectors
const getURLHash = (state) => state.router.location.hash;
const getAccessToken = (state) => state.session.access_token;
const getSessionLoadingStatus = (state) => state.session.status;
const getSocketLoadingStatus = (state) => state.spotify.status;
const getSessionUser = (state) => state.session.user;
const getRooms = (state) => state.spotify.availableRooms;

//Memoized Selectors
export const selectURLHash = createSelector(
    [getURLHash],
    hash => {
        return hash;
    }
)

export const selectAccessToken = createSelector(
    [getAccessToken],
    token => {
        return token;
    }
)

export const selectLoadingStatus = createSelector(
    getSessionLoadingStatus, 
    getSocketLoadingStatus,
    (sessionStatus, socketAuth) => {
        return Object.assign({}, sessionStatus, socketAuth);
    }
)

export const selectUserReq = createSelector(
    [getSessionUser],
    user => {
        const {id, display_name} = user;
        return {spotify_id: id, username: display_name, is_guest: false};
    }
)

export const selectUser = createSelector(
    [getSessionUser],
    user => {
        return user;
    }
)

export const selectRooms = createSelector(
    [getRooms],
    rooms => {
        return rooms;
    }
)