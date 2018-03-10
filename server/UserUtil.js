var util = require("util"),
  exec = require("child_process").exec,
  applescript = require("applescript");

//User commands the server will call
var commands = {
  play: 'tell application "Spotify" to play',
  playTrack: 'tell application "Spotify" to play track "%s"',
  playTrackInContext:
    'tell application "Spotify" to play track "%s" in context "%s"',
  playPause: 'tell application "Spotify" to playpause',
  pause: 'tell application "Spotify" to pause',
  jumpTo: 'tell application "Spotify" to set player position to %s',
  isRunning: 'get running of application "Spotify"'
};

var utilPath = __dirname + "/util/";

var execScript = function(scriptName, callback, params) {
  //applescript lib needs a callback, but callback is not always useful
  if (!callback) callback = function() {};

  if (typeof params !== "undefined" && !Array.isArray(params)) {
    params = [params];
  }

  var script = commands[scriptName];
  console.log(script);
  if (typeof script === "string") {
    if (typeof params !== "undefined")
      script = util.format.apply(util, [script].concat(params));
    return applescript.execString(script, callback);
  } else if (script.file) {
    return applescript.execFile(utilPath + script.file, callback);
  }
};

var createJSONResponseHandler = function(callback, flag) {
  if (!callback) return null;
  return function(error, result) {
    if (!error) {
      try {
        result = JSON.parse(result);
      } catch (e) {
        console.log(flag, result);
        return callback(e);
      }
      return callback(null, result);
    } else {
      return callback(error);
    }
  };
};

var createBooleanResponseHandler = function(callback) {
  return function(error, response) {
    if (!error) {
      return callback(null, response === "true");
    } else {
      return callback(error);
    }
  };
};

//API
//----------------------------------------------------------------------------

//Open track
exports.open = function(uri, callback) {
  return exec('open "' + uri + '"', callback);
};

exports.playTrack = function(track, callback) {
  return execScript("playTrack", callback, track);
};

exports.playTrackInContext = function(track, context, callback) {
  return execScript("playTrackInContext", callback, [track, context]);
};

//Playback control

exports.play = function(callback) {
  return execScript("play", callback);
};

exports.pause = function(callback) {
  return execScript("pause", callback);
};

exports.playPause = function(callback) {
  return execScript("playPause", callback);
};

exports.next = function(callback) {
  return execScript("next", callback);
};

exports.previous = function(callback) {
  return execScript("previous", callback);
};

exports.jumpTo = function(position, callback) {
  return execScript("jumpTo", callback, position);
};

//State retrieval

//exports.getTrack = function(callback){
//    return execScript('track', createJSONResponseHandler(callback, 'track'));
//};

//exports.getState = function(callback){
//    return execScript('state', createJSONResponseHandler(callback, 'state'));
//};

exports.isRunning = function(callback) {
  return execScript("isRunning", createBooleanResponseHandler(callback));
};

//exports.isRepeating = function(callback){
//    return execScript('isRepeating', createBooleanResponseHandler(callback));
//};

//exports.isShuffling = function(callback){
//    return execScript('isShuffling', createBooleanResponseHandler(callback));
//};

exports.playTrack("spotify:track:4Vn7TykT27PIygBiZjTR2s", function() {
  //track is playing
});

var sleep = require("sleep");
sleep.sleep(1); //sleep for ten seconds

exports.jumpTo(254, function() {
  //track is playing
});
