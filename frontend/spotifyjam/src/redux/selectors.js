import {createSelector} from 'reselect';

//Input Selectors
const getCurrentPage = (state) => state.router.location.pathname;
const getUsername = (state) => state.session.username;
const getLocationHash = (state) => state.router.location.hash;
const getVerificationStatus = (state) => state.session.verified;
const getSocketAuthStatus = (state) => state.user.socket_auth;
const getSpotifyName = (state) => state.user.display_name;

//Memoized Selectors
export const selectCurrentPage = createSelector(
    [getCurrentPage],
    pathname => {
        return pathname;
    }
)

export const selectCurrentUsername = createSelector(
    [getUsername],
    username => {
        return username;
    }
)

export const selectVerified = createSelector(
    [getVerificationStatus],
    status => {
        return status;
    }
)

export const selectLocationHash = createSelector(
    [getLocationHash],
    hash => {
        return hash;
    }
)

export const selectUsernameSet = createSelector(
    [selectCurrentUsername],
    username => {
        return username === "";
    }
)

export const selectSocketAuthStatus = createSelector(
    [getSocketAuthStatus],
    status => {
        return status;
    }
)

export const selectSpotifyName = createSelector(
    [getSpotifyName],
    display_name => {
        return display_name;
    }
)