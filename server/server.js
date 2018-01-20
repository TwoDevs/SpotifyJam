//Express App Set Up
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var app = require('express')();

//Socket.IO Set Up
var server = require('http').Server(app);
var io = require('socket.io')(server);
var defaultPort = 8000;
server.listen(defaultPort);

//Third Party Packages
var shortid = require('shortid');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

//Server Mode 
var devMode = true;
var {devURLs, productionURLs, client_id, client_secret} = require('./devKeys');
var {redirect_uri, frontend_url, server_url} = devMode ? devURLs : productionURLs;

//Player Management
var members = [];
var admins = [];

//---Server Start---
console.log("\n---------------------------")
console.log("Server Started - Port: " + defaultPort);
var mode = devMode ? "Development Mode" : "Production Mode";
console.log("\nRunning in", mode);
console.log(  "---------------------------\n")


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

app.get('/login', function(req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
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
            var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
            };

            // use the access token to access the Spotify Web API
            // request.get(options, function(error, response, body) {
            // console.log(body);
            // });

            // we can also pass the token to the browser to make requests from there
            res.redirect(frontend_url + '/#' +
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
    console.log("\n~ Connection Created - Member " +  thisMemberId + " | Connected to socket: " + socket.id + " ~");
    members.push(thisMemberId);

    // No admins yet, add admin
    console.log("Number of Admins: ");
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
        console.log("\n~ Player " + thisMemberId + " is Disconnecting. ~");
        var memberIndex = members.indexOf(thisMemberId);
        members.splice(memberIndex, 1);
        var adminIndex = admins.indexOf(thisMemberId);
        if (adminIndex >= 0) {
            admins.splice(adminIndex, 1);
        }
        socket.broadcast.emit('disconnected', {id: thisMemberId});
        console.log("Updated Member List: ", members);
        console.log("Updated Admin List: ", admins);
    });
});