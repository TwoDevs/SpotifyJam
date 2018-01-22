import {createSelector} from 'reselect';

//Input Selectors
const getCurrentPage = (state) => state.router.location.pathname;
const getUsername = (state) => state.session.username;
const getAccessToken = (state) => state.session.access_token;

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

export const selectAccessTokenExists = createSelector(
    [getAccessToken],
    token => {
        return token !== "";
    }
)