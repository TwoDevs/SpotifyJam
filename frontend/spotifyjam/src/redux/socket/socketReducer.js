//Constants
import {
    SOCKET_AUTH_LOADING,
    SOCKET_REAUTH_LOADING,

    CONNECTED,
    DISCONNECTED,

    SEND_SYNC,
    RECIEVED_SYNC
} from './socketConstants';

// Lodash
import {isEqual} from 'lodash';

//Initial State
const initialSocketState = {
    spotifyPlayer: {},
    socketUser: {},
    status: {
        // "wait" -> "progress" -> "finished" || "failed",
        connected: true,
        authStatus: 'wait',
    },
    currentRoom: "",
    availableRooms: {},
    roomAdmin: false
}

//Socket Reducer
export default (state = initialSocketState, action) => {
    switch(action.type){
        case SOCKET_AUTH_LOADING:
            return Object.assign({}, state, 
                {status: Object.assign({}, state.status, {authStatus: 'progress'})}
            )
        case SOCKET_REAUTH_LOADING:
            return Object.assign({}, state, 
                {status: Object.assign({}, state.status, {authStatus: 'progress'})}
            )
        case 'CLEAR_SESSION':
            return initialSocketState;
        //Handlers for Server Actions
        case 'socket/' + CONNECTED:
            return Object.assign({}, state, 
                {status: Object.assign({}, state.status, {connected: true})}
            )
        case 'socket/' + DISCONNECTED:
            return Object.assign({}, state, 
                {status: Object.assign({}, state.status, {connected: false})}
            )
        case 'socket/authenticate':
            if (action.payload.status === "succeeded") {
                return Object.assign({}, state, 
                    {socketUser: action.payload.user},
                    {status: Object.assign({}, state.status, {authStatus: 'finished'})},
                );
            } else {
                return Object.assign({}, state, 
                    {socketUser: action.payload.user},
                    {status: Object.assign({}, state.status, {authStatus: 'finished'})},
                );
            }
        case 'socket/reauthenticate':
            if (action.payload.status === "succeeded" && isEqual(action.payload.req, state.socketUser)) {
                return Object.assign({}, state, 
                    {socketUser: action.payload.user},
                    {status: Object.assign({}, state.status, {authStatus: 'finished'})},
                );
            } else {
                return Object.assign({}, initialSocketState, 
                    {status: Object.assign({}, state.status, {authStatus: 'failed'})},
                );
            }
        case 'socket/availableRooms':
            return Object.assign({}, state, 
                {currentRoom: action.payload.currentRoom},
                {availableRooms: action.payload.rooms}
            );
        case 'socket/config':
            return Object.assign({}, state, {roomAdmin: action.payload.isAdmin});
        default:
            return state;
    }
};