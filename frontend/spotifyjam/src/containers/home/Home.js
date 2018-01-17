import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreator } from 'redux';
import { Link } from 'react-router-dom';

import socketIOClient from "socket.io-client";

import {get_sync_dict_from_json} from '../../playerUtil';
//var devKeys = require('../../../../../server/devKeys');

const queryString = require('query-string');

var SpotifyWebAPI = require("spotify-web-api-js");
var spotifyAPI = new SpotifyWebAPI();



class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
          connected: false,
          endpoint: 'http://35.226.86.75:8000',
          isAdmin: false,
          accessToken: null
        };
      } 
      sync_local_player = (sync_data) => {
        spotifyAPI.getMyCurrentPlayingTrack( function(err, my_data) {
          if (err) {
            console.error(err)
          } else {
            let dict = get_sync_dict_from_json(my_data, sync_data);
            if (dict) {
              if (dict.uri) {
                let options = {uris:[dict.uri],offset:{position:0} };
                console.log(options);
                spotifyAPI.play(options, function(err, data) {console.log(data)});
              }
              if (dict.progress) {
                spotifyAPI.seek(dict.progress, function(err, data) {});
              }
              if (dict.is_playing !== null) {
                if (!dict.is_playing) {
                  spotifyAPI.pause( function(err, data) {});
                } 
              }
            }
          };
        });
      }
    
      //Lifecycle Functions
      componentDidMount(){
        if (this.props.location.hash){
            const accessToken = queryString.parse(this.props.location.hash).access_token;
            this.setState({
                accessToken: accessToken
            }, this.register);
        }

        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        const timeInterval = 5000;

        socket.on("connect", () => {
          console.log("Connected");
          this.setState({
            connected: true
          });
        });
    
        socket.on("config", (data) =>{
          this.setState({
            isAdmin: data.isAdmin
          });
        });

        socket.on("sync", (sync_data) =>{
          console.log("Received Sync!");
          console.log(sync_data);
          this.sync_local_player(sync_data);
        });
        
        setInterval(() => {
          if(this.state.isAdmin){
              this.sendSync(socket);
          }
        },timeInterval);
    
      }
    
      componentWillUnmount(){
        // console.log(this.socket);
        // socket.off("connect");
        // socket.off("config");
      }
    
    
      //Modularized Methods
    
      register = () => {
        console.log("HEY IM HERE", this.state.accessToken);
        if (this.state.accessToken){
            spotifyAPI.setAccessToken(this.state.accessToken);
            console.log("Set token successful!");
        }
      }

      sendSync = (socket) => {
        // get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
        spotifyAPI.getMyCurrentPlayingTrack( function(err, data) {
          if (err) console.error(err);
          else socket.emit('sync',data);
        });
      }
    
      gatherPlayerData = () => {
    
      }
    render() {
        const {connected, endpoint, isAdmin, accessToken} = this.state;

        return(
            <div>
                <h1> Home Page</h1>
                <hr/>
                <p>Access Token is: {accessToken}</p>
                <p>Connected: {connected.toString()}</p>
                <p>Endpoint URL: {endpoint}</p>
                
            </div>
        );
    }
}

export default Home;


// <p> Endpoint IP: {endpoint}</p>
// <p> Connected: {connected}</p>
// <p> isAdmin: {isAdmin.toString()}</p>