import { createSelector } from "reselect";
import { includes } from "lodash";

//Input Selectors
const getURLHash = state => state.router.location.hash;
const getAccessToken = state => state.session.access_token;
const getSessionLoadingStatus = state => state.session.status;
const getSocketLoadingStatus = state => state.spotify.status;
const getSocketUser = state => state.spotify.socketUser;
const getSessionUser = state => state.session.user;
const getRooms = state => state.spotify.availableRooms;
const getConnection = state => state.spotify.connected;

//Memoized Selectors
export const selectURLHash = createSelector([getURLHash], hash => {
  return hash;
});

//Select Access Token
export const selectAccessToken = createSelector([getAccessToken], token => {
  return token;
});

//Combine both status obj for verification
export const selectLoadingStatus = createSelector(getSessionLoadingStatus, getSocketLoadingStatus, (sessionStatus, socketAuth) => {
  return Object.assign({}, sessionStatus, socketAuth);
});

//Create user_req obj for authenticating
export const selectUserReq = createSelector([getSessionUser], user => {
  const { id, display_name } = user;
  return { spotify_id: id, username: display_name, is_guest: false };
});

//Select socket given user_req obj for verifying
export const selectSocketUser = createSelector([getSocketUser], user_req => {
  return user_req;
});

//Select the retrieved user obj from Spotify for user profile/header
export const selectUser = createSelector([getSessionUser], user => {
  return user;
});

//Select rooms for lobby
export const selectRooms = createSelector([getRooms], rooms => {
  return rooms;
});

//Check ReAuth status for redirect
export const selectReAuthStatus = createSelector([getSocketLoadingStatus], status => {
  return status.authStatus;
});

//Any failed aync operations indicated by status
export const anyFail = createSelector([selectLoadingStatus], statusObj => {
  return includes(statusObj, "failed");
});

//Select Websocket Connection
export const selectConnection = createSelector([getConnection], connection => {
  return connection;
});
