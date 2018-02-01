//Spotify Instance
import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();
const queryString = require('query-string');

//Spotify Interface
export const setSpotifyTokens = (access_token, refresh_token) => {
    spotifyApi.setAccessToken(access_token);    
}

export const getProfile = () => {    
    return spotifyApi.getMe();
}

export const verifyTokens = (hash) => {
    //Logic for checking tokens and false tokens
    const access_token = queryString.parse(hash).access_token;
    const refresh_token = queryString.parse(hash).refresh_token;
    const expires_in = queryString.parse(hash).expires_in;

    //Falsy for undefined/null/0/NaN
    return {
        valid: (hash && access_token && refresh_token && expires_in), 
        access_token, 
        refresh_token,
        expires_in
    };
}