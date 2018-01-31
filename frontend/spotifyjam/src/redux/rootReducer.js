import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './features/session/sessionReducer';
import lobby from './features/lobby/lobbyReducer';
import user from './features/spotify/spotifyReducer';

export default combineReducers({
    router: routerReducer,
    session,
    lobby,
    user
});