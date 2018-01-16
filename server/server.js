//Packages and Setup
var defaultPort = 8000;
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//var io = require('socket.io')(process.env.PORT || defaultPort);
server.listen(defaultPort);

//Third Party Packages
var shortid = require('shortid');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

//Key Setup
var devKeys = require('./devKeys');
var client_id = devKeys.id; // Your client id
var client_secret = devKeys.secret; // Your secret
var redirect_uri = devKeys.redirect_uri; // Your redirect uri

//Player Management
var members = [];
var admins = [];

//---Server Start---
console.log("\n---------------------------")
console.log("Server Started - Port: " + defaultPort);
console.log(  "---------------------------")

//Spotify Authorization
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
var stateKey = 'spotify_auth_state';

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());
console.log(__dirname + '/public');

app.get('/login', function(req, res) {
    console.log("Login Clicked!");
    var state = generateRandomString(16);
    console.log("State Key: ", state);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-currently-playing user-modify-playback-state';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
        }));
});

app.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter
    console.log("Callback triggered.");
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
        querystring.stringify({
            error: 'state_mismatch'
        }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
        };

        request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            var access_token = body.access_token,
                refresh_token = body.refresh_token;
            console.log(access_token);
            var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
            };

            // use the access token to access the Spotify Web API
            request.get(options, function(error, response, body) {
            console.log(body);
            });

            // we can also pass the token to the browser to make requests from there
            res.redirect('/#' +
            querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token
            }));
        } else {
            res.redirect('/#' +
            querystring.stringify({
                error: 'invalid_token'
            }));
        }
        });
    }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});




//Websocket Functions
io.on('connection', function(socket){
    //instantiate member
    var thisMemberId = shortid.generate();
    console.log("\n\n~ Connection Created - Member " +  thisMemberId + " | Connected to socket: " + socket.id + " ~");
    members.push(thisMemberId);

    // No admins yet, add admin
    console.log("Admins:");
    console.log(admins.length);
    if (admins.length == 0) {
        admins.push(thisMemberId);
        socket.emit('config', { isAdmin: true });
    } else {
        socket.emit('config', { isAdmin: false });
    }
    

    //broadcast track info to room
    socket.on('sync', function(data){
        socket.broadcast.emit('sync', data);
    });

    socket.on('disconnect', function(){
        console.log("\n\n~ Player " + thisMemberId + " is Disconnecting. ~");
        var memberIndex = members.indexOf(thisMemberId);
        members.splice(memberIndex, 1);
        var adminIndex = admins.indexOf(thisMemberId);
        if (adminIndex >= 0) {
            admins.splice(adminIndex, 1);
        }
        socket.broadcast.emit('disconnected', {id: thisMemberId});
        console.log("Updated member list: " + members);
        console.log("Updated admin list: " + admins);
    });
});