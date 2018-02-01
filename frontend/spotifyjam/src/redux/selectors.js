import {createSelector} from 'reselect';

//Input Selectors
const getCurrentPage = (state) => state.router.location.pathname;
const getURLHash = (state) => state.router.location.hash;
const getAccessToken = (state) => state.session.access_tokens;
const getLoadingStatus = (state) => state.session.status;
const getSession = (state) => state.session;

//Memoized Selectors
export const selectCurrentPage = createSelector(
    [getCurrentPage],
    pathname => {
        return pathname;
    }
)

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
    [getLoadingStatus],
    statusObj => {
        return statusObj;
    }
)

export const selectAuthorizationStatus = createSelector(
    [getSession],
    session => {
        return (session.user.display_name && session.access_token && session.user.type);
    }
)