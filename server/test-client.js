var socketIOClient = require("socket.io-client");
var defaultPort = 8000;
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);



var state = {
    connected: false,
    endpoint: 'http://localhost:8000',
    isAdmin: false,
    accessToken: null
};

const {endpoint} = state;
const socket = socketIOClient(endpoint);
const timeInterval = 5000;

socket.on("connect", () => {
    console.log("Connected");
    socket.emit("availableRooms");
    console.log("Creating a room ");
    socket.emit("createRoom", {room_name: "Test"});
    console.log("Joining a room");
    socket.emit("joinRoom", {room_name: "Test"});
});

socket.on("availableRooms", (data) => {
    console.log("Current Room: " + data.currentRoom)
});