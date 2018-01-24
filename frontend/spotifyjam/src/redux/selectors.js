import {createSelector} from 'reselect';

//Input Selectors
const getCurrentPage = (state) => state.router.location.pathname;
const getUsername = (state) => state.session.username;
const getLocationHash = (state) => state.router.location.hash;
const getVerificationStatus = (state) => state.session.verified;

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