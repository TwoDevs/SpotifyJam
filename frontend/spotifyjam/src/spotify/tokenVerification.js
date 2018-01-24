const queryString = require('query-string');


export const verifyTokens = (hash) => {
    //Logic for checking tokens and false tokens
    const access_token = queryString.parse(hash).access_token;
    const refresh_token = queryString.parse(hash).refresh_token;

    //Falsy for undefined/null/0/NaN
    return {
        valid: (hash && access_token && refresh_token), 
        access_token, 
        refresh_token
    };
}