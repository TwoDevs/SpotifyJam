var method = UserManager.prototype;

function UserManager() {
    this.users = {};
}

method.createUser = function(user_id, username, is_guest, spotify_id) {
    return {
        user_id : user_id,
        username : username,
        is_guest : is_guest,
        spotify_id : spotify_id
    };
}

method.existsUser = function(user_id) {
    return (user_id in this.users);
}

method.getUser = function(user_id) {
    return this.users[user_id];
}

method.existsUsername = function(username) {
    return Object.values(this.users).map(function(e) {return e.username;}).indexOf(username) >= 0;
}

method.existsSpotifyID = function(spotify_id) {
    return Object.values(this.users).map(function(e) {return e.spotify_id;}).indexOf(spotify_id) >= 0;
}

method.getUsername = function(user_id) {
    return this.users[user_id].username;
}

method.sendAvailableUsers = function(socket) {
    socket.emit('availableUsers', {usernames: Object.values(this.users).map(function(e) {
        return e.username;
      })
    });
}

method.broadcastAvailableUsers = function(io) {
    io.emit('availableUsers', {usernames: Object.values(this.users).map(function(e) {
        return e.username;
      }) 
    });
}

method.genUserID = function(socket) {
    return socket.id;
}

method.addUser = function(socket, username, is_guest, spotify_id) {
    var user_id = this.genUserID(socket);
    if (is_guest) {
        // Do not persist
        // Username is guest name
        console.log("Adding guest\n")
        if (this.existsUser(user_id) || this.existsUsername(username) || this.existsSpotifyID(spotify_id)) {
            return null;
        } else {
            var user = this.createUser(user_id,username,is_guest,spotify_id);
            this.users[user_id] = user;
            return user;
        }
    } else {
        // Persist data
        // Username needs cleaning
        console.log("Adding user\n")
        if (this.existsUser(user_id) || this.existsUsername(username) || this.existsSpotifyID(spotify_id)) {
            return null;
        } else {
            var user = this.createUser(user_id,username,is_guest,spotify_id);
            this.users[user_id] = user;
            return user;
        }
    }
}

method.deleteUser = function(user) {
    var user_id = user.user_id;
    if (this.existsUser(user_id)) {
        var user = this.users[user_id];
        delete this.users[user_id];
        return user;
    }
    return null;
}

module.exports = UserManager;