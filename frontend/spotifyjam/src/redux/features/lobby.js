//Lobby Action Constants
export const LOAD_USERS = "LOAD_USERS";
export const LOAD_ROOMS = "LOAD_ROOMS";

//Initial State
const initialLobbyState = {
    users: [],
    rooms: []
}

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