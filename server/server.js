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

//Server Mode  
var devMode = true;

for (let j = 2; j < process.argv.length; j++) {  
    console.log(j + ' -> ' + (process.argv[j]));
    if (process.argv[j] === "--prod") {
        devMode = false;
    }
}

var {devURLs, productionURLs, client_id, client_secret} = require('./devKeys'); 
var {redirect_uri, frontend_url, server_url} = devMode ? devURLs : productionURLs; 


//Player Management
var default_room = "Lobby";
var rooms = { [default_room] : {admins: [], members: []}};

//---Server Start---
console.log("\n---------------------------")
console.log("Server Started - Port: " + defaultPort);
console.log("redirect_uri: " + redirect_uri);
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

var existsRoom = function(room_name) {
    return (room_name in rooms);
}

var isDefaultRoom = function(room_name) {
    return (room_name === default_room);
}

var sendAvailableRooms = function(socket) {
    socket.emit('availableRooms', {rooms: Object.keys(rooms), currentRoom: currentRoom(socket)});
}

var currentRoom = function(socket) {
    var joinedRooms = socket.rooms;
    for (var room_name in joinedRooms) {
        if (existsRoom(room_name)) {
            //ignore unary socket.id room
            //leave all other rooms.
            return room_name;
        }
    }
}

//TODO client side room create
var createRoom = function(room_name) {
    if (isDefaultRoom(room_name)) {
        return;
    } else if (existsRoom(room_name)) {
        return;
    } else {
        rooms[room_name] = {admins:[],members:[]}
    }
}

//TODO client get room name
var inRoom = function(socket, room_name) {
    return ((room_name in rooms) && (rooms[room_name].members.indexOf(socket.id) >= 0));
}

var leaveRooms = function(socket) {
    var joinedRooms = socket.rooms;
    for (var room_name in joinedRooms) {
        if (existsRoom(room_name)) {
            //ignore unary socket.id room
            //leave all other rooms.
            var mIndex = rooms[room_name].members.indexOf(socket.id);
            rooms[room_name].members.splice(mIndex, 1);
            var aIndex = rooms[room_name].admins.indexOf(socket.id);
            if (aIndex >= 0) {
                rooms[room_name].admins.splice(aIndex, 1);
            }
            socket.leave(room_name);
        }
    }
}

//TODO client join room
var joinRoom = function(socket, room_name, callback) {
    if (!existsRoom(room_name)) {
        return;
    } else if (inRoom(socket, room_name)) {
        return;
    } else {
        var joinRoom = rooms[room_name];
        leaveRooms(socket);
        joinRoom.members.push(socket.id);
        
        socket.join(room_name, () => {
            if (joinRoom.admins.length == 0) {
                // Add admin
                joinRoom.admins.push(socket.id);
                socket.emit('config', {isAdmin: true });
            } else {
                socket.emit('config', {isAdmin: false });
            }
            callback();
        });
    }
}

//TODO client side room join
var deleteRoom = function(room_name) {
    if (isDefaultRoom(room_name)) {
        return;
    } else if (existsRoom(room_name)) {
        io.to(room_name).emit('joinRoom', default_room);
        delete rooms[room_name];
    }
}


app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.get('/login', function(req, res) {

    var state = generateRandomString(16);
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
            request.get(options, function(error, response, body) {});

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
    //var thisMemberId = shortid.generate();
    var thisMemberId = socket.id;
    console.log("\n\n~ Connection Created - Member " +  thisMemberId + " | Connected to socket: " + socket.id + " ~");

    joinRoom(socket, default_room, function(){});
    
    //broadcast track info to room
    socket.on('sync', function(data){
        socket.broadcast.emit('sync', data);
    });

    socket.on('availableRooms', function() {
        sendAvailableRooms(socket);
    });

    socket.on('createRoom', function(data) {
        console.log("Creating room " + data.room_name);
        createRoom(data.room_name);
        sendAvailableRooms(socket);
    });

    socket.on('joinRoom', function(data) {
        joinRoom(socket, data.room_name, function() {
            console.log(thisMemberId + " moved to " + currentRoom(socket));
            sendAvailableRooms(socket);
        });
    });

    socket.on('disconnect', function(){
        console.log("\n\n~ Player " + thisMemberId + " is Disconnecting. ~");
        leaveRooms(socket);
        socket.broadcast.emit('disconnected', {id: thisMemberId});
    });
});