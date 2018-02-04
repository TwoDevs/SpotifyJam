var socketIOClient = require("socket.io-client");
var defaultPort = 8000;
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var state = {
    connected: false,
    endpoint: 'http://localhost:8000',
    isAdmin: false,
    accessToken: null,
    rooms: null,
    currentRoom: null
};

const {endpoint} = state;
const socket = socketIOClient(endpoint);
const timeInterval = 5000;

socket.on("connect", () => {
    console.log("Connected");
});

socket.on("availableRooms", (data) => {
    state.rooms = data.rooms;
    if ("currentRoom" in data) {
        state.currentRoom = data.currentRoom;
    }
    console.log("Updated rooms");
});

socket.on("msg", (message) => {
    console.log(message.username+": " + message.message_text);
});

socket.on("authenticate", (auth_status) => {
    var {status, req} = auth_status;
    if (status == "failed") {
        console.log("authentication failed for: ");
        console.log("username: " + req.username);
        console.log("spotify-id: " + req.spotify_id);
        console.log("is_guest: " + req.is_guest);
    } else if (status == "succeeded") {
        console.log("authentication succeeded for: ");
        console.log("username: " + req.username);
        console.log("spotify-id: " + req.spotify_id);
        console.log("is_guest: " + req.is_guest);
        console.log("Your user_id is " + auth_status.user.user_id);
    }
});

socket.on("reauthenticate", (auth_status) => {
    var {status, req} = auth_status;
    if (status == "failed") {
        console.log("reauthentication failed for: ");
        console.log("username: " + req.username);
        console.log("spotify-id: " + req.spotify_id);
        console.log("is_guest: " + req.is_guest);
    } else if (status == "succeeded") {
        console.log("reauthentication succeeded for: ");
        console.log("username: " + auth_status.user.username);
        console.log("spotify-id: " + auth_status.user.spotify_id);
        console.log("is_guest: " + auth_status.user.is_guest);
        console.log("Your user_id is " + auth_status.user.user_id);
    }
});

var dispRooms = function(){
    console.log("Current Room: " + state.currentRoom);
    console.log("Available Rooms: " + state.rooms);
}

rl.on('line', (line) => {
    if (line == "help") {
        console.log("The valid commands are:");
        console.log("authenticate <is_guest> <spotify-id> <username> : submit session info to enter the app");
        console.log("available : display available rooms");
        console.log("create <room-name> : Create a room with the given name");
        console.log("join <room-name> : Join a room with the given name");
        console.log("send <message text> : send a message to the current room");
    } else if (line == "available") {
        dispRooms();
    } else {
        var index = line.indexOf(" ");  // Gets the first index where a space occours
        if (index < 1) {
            console.log("Command '" + line + "' not recognized, use help for the command list.");
        } else {
            var command = line.substr(0, index); // Gets the first part
            var text = line.substr(index + 1);  // Gets the second part

            if (command == "authenticate") {
                var isGuestIndex = text.indexOf(" ");
                if (isGuestIndex < 0) {
                    console.log(" malformed: <is_guest> is missing");
                } else {
                    var is_guest = text.substr(0, isGuestIndex); // Gets the first part
                    var text = text.substr(isGuestIndex + 1);  // Gets the second part
                    var spotifyIDIndex = text.indexOf(" ");
                    if (spotifyIDIndex < 0) {
                        console.log("authenticate malformed: <spotify_id> is missing");
                    } else {
                        var spotify_id = text.substr(0, spotifyIDIndex); // Gets the first part
                        var username = text.substr(spotifyIDIndex + 1);  // Gets the second part
                        var user_req = {
                            spotify_id : spotify_id,
                            username : username,
                            is_guest : is_guest
                        }
                        socket.emit("authenticate", user_req);
                    }
                }

            } else if (command == "reauthenticate") {
                
                var user_id = text;
                var user_req = {
                    user_id : user_id
                }
                socket.emit("reauthenticate", user_req);
            
            } else if (command == "create") {
                socket.emit("createRoom", {room_name: text});
            } else if (command == "join") {
                socket.emit("joinRoom", {room_name: text});
            } else if (command == "send") {
                socket.emit("msg", {message_text: text});
            } else {
                console.log("Command '" + line + "' not recognized, use help for the command list.");
            }
        }
    }

});