//Action Constants
import {
    LOAD_USERS, 
    LOAD_ROOMS,
    LOBBY_CONNECT,
    LOBBY_DISCONNECT
} from './lobbyConstants';

import {selectSocketAuthStatus} from '../../selectors';

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

export const lobbyConnect = (socket) => {
    return (dispatch, getState) => {
        const postData = getState();
        console.log(postData);
        if (selectSocketAuthStatus(getState())) {
            // Connect with old authentication
            console.log("authenticated");
  
          } else {
            // Re authenticate with the server
            console.log("not authenticated");
          }
    }
}