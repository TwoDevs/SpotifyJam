//Constants
import {
    SOCKET_AUTH_LOADING,
    SOCKET_REAUTH_LOADING,

    CONNECTED,
    DISCONNECTED,

    SEND_SYNC,
    RECIEVED_SYNC
} from './socketConstants';

//Initial State
const initialSocketState = {
    spotifyPlayer: {},
    socketUser: {},
    status: {
        // "wait" -> "progress" -> "finished" || "fail",
        connected: true,
        authStatus: 'wait',
    }
}

//Session Reducer
export default (state = initialSocketState, action) => {
    switch(action.type){
        case CONNECTED:
            return Object.assign({}, state, 
                {status: Object.assign({}, state.status, {connected: true})}
            )
        case DISCONNECTED:
            return Object.assign({}, state, 
                {status: Object.assign({}, state.status, {connected: false})}
            )
        case SOCKET_AUTH_LOADING:
            return Object.assign({}, state, 
                {status: Object.assign({}, state.status, {authStatus: 'progress'})}
            )
        case SOCKET_REAUTH_LOADING:
            return Object.assign({}, state, 
                {status: Object.assign({}, state.status, {authStatus: 'progress'})}
            )

        //Handlers for Server Actions
        case 'authenticate':
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
        case 'reauthenticate':
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
        default:
            return state;
    }
};