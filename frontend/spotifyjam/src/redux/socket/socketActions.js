import {
  SOCKET_AUTH_LOADING,
  SOCKET_REAUTH_LOADING,
  SOCKET_CREATE_ROOM_LOADING,
  CONNECTED,
  SOCKET_LOG_OUT,
  SOCKET_CREATE_ROOM
} from "../socket/socketConstants";

import { selectUserReq, selectSocketUser } from "../selectors";
import { redirectToRoom } from "../API/historyFunctions";

export const socketConnected = () => {
  return {
    type: CONNECTED
  };
};

export const socketAuthenticate = () => {
  return (dispatch, getState) => {
    const user_req = selectUserReq(getState());
    dispatch({ type: SOCKET_AUTH_LOADING });
    dispatch({
      type: "server/" + SOCKET_AUTH_LOADING,
      payload: user_req
    });
  };
};

export const socketReauthenticate = () => {
  return (dispatch, getState) => {
    const user_req = selectSocketUser(getState());
    dispatch({ type: SOCKET_REAUTH_LOADING });
    dispatch({
      type: "server/" + SOCKET_REAUTH_LOADING,
      payload: user_req
    });
  };
};

export const socketCreateRoom = room_name => {
  return dispatch => {
    dispatch({ type: SOCKET_CREATE_ROOM_LOADING });
    dispatch({
      type: "server/" + SOCKET_CREATE_ROOM,
      payload: { room_name }
    });
    dispatch(redirectToRoom(room_name));
  };
};

export const socketLogOut = () => {
  return (dispatch, getState) => {
    const user_req = selectSocketUser(getState());
    dispatch({
      type: "server/" + SOCKET_LOG_OUT,
      payload: user_req
    });
  };
};
