import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './features/session';
import lobby from './features/lobby';

export default combineReducers({
    router: routerReducer,
    session,
    lobby
});