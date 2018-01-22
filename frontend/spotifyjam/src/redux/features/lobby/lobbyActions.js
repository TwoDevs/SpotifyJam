import {LOAD_USERS, LOAD_ROOMS} from './lobbyConstants';

//Lobby Actions
export const loadUsers = (users) => {
    return dispatch => {
        console.log("Action created for loading users");
        dispatch({
            type: LOAD_USERS,
            payload: users
        });
    }
}

export const loadRooms = (rooms) => {
    return dispatch => {
        console.log("Action created for loading rooms");
        dispatch({
            type: LOAD_ROOMS,
            payload: rooms
        });
    }
}