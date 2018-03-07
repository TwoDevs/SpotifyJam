var method = RoomManager.prototype;

function RoomManager(global_room, default_room) {
    this._default_room = default_room;
    this._global_room = global_room;
    this.rooms = { [default_room] : {admins: [], members: []}};
}

method.existsRoom = function(room_name) {
    return (room_name in this.rooms);
}

method.isDefaultRoom = function(room_name) {
    return (room_name == this._default_room);
}

method.isGlobalRoom = function(room_name) {
    return (room_name == this._global_room);
}

method.sendAvailableRooms = function(socket) {
    console.log("Sending available rooms.");
    socket.emit('action', {
        type:'socket/availableRooms', 
        payload: {rooms: Object.keys(this.rooms), currentRoom: this.currentRoom(socket)}
    });
}

method.broadcastAvailableRooms = function(io) {
    io.to(this._global_room).emit('availableRooms', {rooms: Object.keys(this.rooms)});
}

method.currentRoom = function(socket) {
    var joinedRooms = socket.rooms;
    for (var room_name in joinedRooms) {
        if (this.existsRoom(room_name)) {
            //ignore unary socket.id room
            //leave all other rooms.
            return room_name;
        }
    }
}

method.createRoom = function(room_name) {
    if (this.isDefaultRoom(room_name)) {
        return;
    } else if (this.isGlobalRoom(room_name)) {
        return;
    } else if (this.existsRoom(room_name)) {
        return;
    } else {
        this.rooms[room_name] = {admins:[],members:[]}
    }
}

method.inRoom = function(socket, room_name) {
    return ((room_name in this.rooms) && (this.rooms[room_name].members.indexOf(socket.id) >= 0));
}

method.leaveRooms = function(socket) {
    var joinedRooms = socket.rooms;
    for (var room_name in joinedRooms) {
        if (this.existsRoom(room_name)) {
            //ignore unary socket.id room
            //leave all other rooms.
            var mIndex = this.rooms[room_name].members.indexOf(socket.id);
            this.rooms[room_name].members.splice(mIndex, 1);
            var aIndex = this.rooms[room_name].admins.indexOf(socket.id);
            if (aIndex >= 0) {
                this.rooms[room_name].admins.splice(aIndex, 1);
            }
            socket.leave(room_name);
        }
    }
}

method.joinRoom = function(socket, room_name, callback) {
    if (!this.existsRoom(room_name)) {
        return;
    } else if (this.inRoom(socket, room_name)) {
        return;
    } else {
        var joinRoom = this.rooms[room_name];
        this.leaveRooms(socket);
        joinRoom.members.push(socket.id);
        
        socket.join(room_name, () => {
            if (joinRoom.admins.length == 0) {
                // Add admin
                joinRoom.admins.push(socket.id);
                socket.emit('action', {
                    type:'socket/config', 
                    payload: {isAdmin: true}
                });
            } else {
                socket.emit('action', {
                    type:'socket/config', 
                    payload: {isAdmin: false}
                });
            }
            callback();
        });
    }
}

method.deleteRoom = function(room_name) {
    if (isDefaultRoom(room_name)) {
        return;
    } else if (isGlobalRoom(room_name)) {
        return;
    } else if (existsRoom(room_name)) {
        io.to(room_name).emit('joinRoom', this._default_room);
        delete this.rooms[room_name];
    }
}

module.exports = RoomManager;