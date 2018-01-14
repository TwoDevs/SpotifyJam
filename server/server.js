//Packages and Setup
var defaultPort = 3000;
var io = require('socket.io')(process.env.PORT || defaultPort);
var shortid = require('shortid');

//Player Management
var members = [];
var admins = [];

//---Server Start---
console.log("\n---------------------------")
console.log("Server Started - Port: " + defaultPort);
console.log(  "---------------------------")

io.on('connection', function(socket){

    //instantiate member
    var thisMemberId = shortid.generate();
    console.log("\n\n~ Connection Created - Player " +  thisMemberId + " | Connected to socket: " + socket.id + " ~");
    members.push(thisMemberId);

    //broadcast track info to room
    socket.on('sync', function(data){
        socket.broadcast.emit('synch', data);
    });

    socket.on('disconnect', function(){
        console.log("\n\n~ Player " + thisMemberId + " is Disconnecting. ~");
        var memberIndex = members.indexOf(thisMemberId);
        members.splice(memberIndex, 1);
        socket.broadcast.emit('disconnected', {id: thisMemberId});
        console.log("Updated member list: " + members);
    });
});