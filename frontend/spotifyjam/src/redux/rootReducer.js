import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './features/session/sessionReducer';
import lobby from './features/lobby/lobbyReducer';

export default combineReducers({
    router: routerReducer,
    session,
    lobby
});