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

var dispRooms = function(){
    console.log("Current Room: " + state.currentRoom);
    console.log("Available Rooms: " + state.rooms);
}

rl.on('line', (line) => {
    if (line == "help") {
        console.log("Available commands are:");
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
            if (command == "create") {
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