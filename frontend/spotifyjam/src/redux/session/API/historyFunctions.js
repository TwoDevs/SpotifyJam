import createHistory from 'history/createBrowserHistory';
import {push, replace} from 'react-router-redux';

const history = createHistory();
export {history};

export const redirectToLobby = () => {
    return dispatch => {
        dispatch(replace('/lobby'));
    }
}

export const redirectToHome = () => {
    return dispatch => {
        dispatch(replace('/'));
    }
}

