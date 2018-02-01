
export const socketInitialization = () => {
    return (dispatch, getState)  => {
        //Check for prior socket
        if (!selectSocket(getState())){
            //Check Authorization
            if (selectAuthorizationStatus(getState())){
                //Create user_req to auth
                const user_req = selectUserReq(getState());
                const globalSocket = createSocket(user_req);
                //Dispatch and load global socket
                dispatch({
                    type: SET_SOCKET,
                    payload: globalSocket
                });
            }
            else{
                //Dispatch Router Change
                dispatch(redirectToHome());
                //Dispatch Unsuccessful Auth
                return dispatch({
                    type: AUTH_FAIL
                });
            }
        }
        else {
            //Socket Already Exists
            dispatch({
                type: SOCKET_PRIOR
            });
        }
    }
}
