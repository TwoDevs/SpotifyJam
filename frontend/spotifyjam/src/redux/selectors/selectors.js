import {createSelector} from 'reselect';

//Input Selectors
const getCurrentPage = (state) => state.router.location.pathname;
const getUsername = (state) => state.session.username;

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
