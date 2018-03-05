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


//User Management
var default_room = "Lobby";
var global_room = "GLOBAL";

var RoomManager =  require('./room-manager.js');
var rm = new RoomManager(global_room, default_room);

var UserManager =  require('./user-manager.js');
var um = new UserManager();

var devMode = true;
for (let j = 2; j < process.argv.length; j++) { 
    console.log(j + ' -> ' + (process.argv[j]));
    if (process.argv[j] === "--prod") {
        devMode = false;
    }
}

//Key Setup
var {devURLs, productionURLs, client_id, client_secret} = require('./devKeys'); 
var {redirect_uri, frontend_url, server_url, error_url} = devMode ? devURLs : productionURLs; 


//---Server Start---
console.log("\n---------------------------")
console.log("Server Started - Port: " + defaultPort);
console.log("\nRedirect URI: " + redirect_uri);
console.log("Frontend URL: " + frontend_url);
console.log("Error URL: " + error_url);
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


// Express Spotify Verification
// ----------------------------
app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-currently-playing user-modify-playback-state user-read-private';
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

    // Application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        //TODO: ADD ERROR PAGE & URL
        res.redirect(error_url+ '#' +
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
        console.log("AUTH_OPTIONS", authOptions);
        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {

                var {access_token, refresh_token, expires_in, scope} = body;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {});

                // we can also pass the token to the browser to make requests from there
                res.redirect(frontend_url + '#' +
                querystring.stringify({
                    access_token,
                    refresh_token,
                    expires_in
                }));
            } else {
                //TODO: ADD ERROR PAGE & URL
                console.log("ERROR: ", error, "BODY: ", body);
                res.redirect(error_url + '#' +
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


// Socket.io Session Code
// ----------------------
var bindUser = function(socket, user) {
    socket.join(global_room);
    socket.on('disconnect', function(){
        console.log("\n\n~ Member " + user.username + " is Disconnecting. ~");
        // rm.leaveRooms(socket);
        // um.deleteUser(user);
        socket.broadcast.emit('disconnected', {username: user.username});
    });

    socket.on('sync', function(data){
        socket.broadcast.to(rm.currentRoom(socket)).emit('sync', data);
    });

    socket.on('msg', function(message){
        socket.broadcast.to(rm.currentRoom(socket)).emit('msg', {username: user.username, message_text: message.message_text});
    });

    socket.on('availableRooms', function() {
        rm.sendAvailableRooms(socket);
    });

    socket.on('createRoom', function(data) {
        console.log("Creating room " + data.room_name);
        rm.createRoom(data.room_name);
        rm.broadcastAvailableRooms(io);
    });

    socket.on('joinRoom', function(data) {
        rm.joinRoom(socket, data.room_name, function() {
            console.log(user.username + " joined room " + rm.currentRoom(socket));
            rm.sendAvailableRooms(socket);
        });
    });
}

var createSocketSession = function(socket, user_req) {
    var {spotify_id, username, is_guest} = user_req;
    var user = um.addUser(socket, username, is_guest, spotify_id);
    if (user == null) {
        socket.emit('action', {type:'authenticate', payload: {status: "failed", req: user_req}});
    } else {
        console.log("\n\n~ Session Created - Member " +  user.username + " | Connected to socket: " + socket.id + " ~");
        rm.joinRoom(socket, default_room, function(){});
        bindUser(socket, user);
        socket.emit('action', {type: 'authenticate', payload: {status: "succeeded", req: user_req, user: user}});
        rm.sendAvailableRooms(socket);
    }
}

var recreateSocketSession = function(socket, user_req) {
    if (user_req == null) {
        socket.emit('action', {type:'reauthenticate', payload: {status: "failed", req: user_req}});
    } else {
        console.log("Not null\n")
        if (um.existsUser(user_req.user_id)) {
            var user = um.getUser(user_req.user_id);
            console.log("user exists\n")
            console.log("\n\n~ Session Rejoined - Member " +  user.username + " | Connected to socket: " + socket.id + " ~");
            rm.joinRoom(socket, default_room, function(){});
            bindUser(socket, user);
            socket.emit('action', {type:'reauthenticate', payload: {status: "succeeded", req: user_req, user: user}});
            rm.sendAvailableRooms(socket);
        }
    }
}

io.on('connection', function(socket){

    // Send feedback connected!
    socket.emit('action', {
        type: 'CONNECTED'
    });

    socket.on('action', action => {
        switch(action.type){
            case "server/test":
                console.log("Test socket middleware action recieved!");
                socket.emit('action', {
                    type:'middleware test', 
                    payload:'good day!'
                });
                break;
            case "server/SOCKET_AUTH_LOADING":
                console.log("REG: ",action.payload)
                createSocketSession(socket, action.payload);
                break;
            case "server/SOCKET_REAUTH_LOADING":
                console.log("RE: ", action.payload)
                recreateSocketSession(socket, action.payload);
                break;
            default:
                console.log("Test socket middleware action recieved but type was incorrect");
                socket.emit('action', {
                    type:'message', 
                    payload:'kind of good day!'
                });
        }
    })

    socket.on('disconnect', function(){
        socket.emit('action',{
            type: 'DISCONNECTED'
        });
    });
});
