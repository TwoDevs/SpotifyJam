import {LOAD_USERS, LOAD_ROOMS} from './lobbyConstants';
import {CLEAR_SESSION} from '../session/sessionConstants';

//Initial State
const initialLobbyState = {
    users: [],
    rooms: [],
    connectionStatus: ""
}

//Lobby Reducer
export default (state = initialLobbyState, action) => {
    switch(action.type){
        case LOAD_USERS:
            return {
                ...state,
                users: action.payload
            };
        case LOAD_ROOMS:
            return {
                ...state,
                rooms: action.payload
            };
        case CLEAR_SESSION:
            return {
                ...initialLobbyState
            };
        default:
            return state;
    }
};