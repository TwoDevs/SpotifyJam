//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Socket Libraries
import socketIOClient from "socket.io-client";

//Actions 
import {lobbyConnect} from '../../redux/features/lobby/lobbyActions';

//Keys & Mode
import {devURLs, productionURLs} from '../../devKeys';
const devMode = true;
const {server_url} = devMode ? devURLs : productionURLs;

//Spotify Libraries
var SpotifyWebAPI = require("spotify-web-api-js");
var spotifyAPI = new SpotifyWebAPI();



class Lobby extends Component {
    constructor(props){
        super(props);
        const socket = socketIOClient.connect(server_url);
        this.state = {
          socketID: socket.id
        };
        console.dir(socket);
        lobbyConnect(socket);
      }
    
      //Modularized Methods
      register = () => {
        const {accessToken} = this.state;
        if (accessToken){
            spotifyAPI.setAccessToken(accessToken);
        }
      }

    render() {
      const {socketID} = this.state;
        return(
            <div>
                <h1> Home Page</h1>
                <hr/>
                  <p>Socket ID: {socketID}</p>
                <br/>
                <br/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  lobbyConnect
}, dispatch);

export default connect(null, mapDispatchToProps)(Lobby);
