import {LOAD_USERS, LOAD_ROOMS} from './lobbyConstants';

//Initial State
const initialLobbyState = {
    users: [],
    rooms: []
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
        default:
            return state;
    }
};