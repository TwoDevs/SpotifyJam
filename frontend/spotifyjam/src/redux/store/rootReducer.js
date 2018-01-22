import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from '../session/session';
import lobby from '../lobby/lobby';

export default combineReducers({
    router: routerReducer,
    session,
    lobby
});