import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './session/sessionReducer';
import spotify from './socket/socketReducer';

export default combineReducers({
    router: routerReducer,
    session,
    spotify
});