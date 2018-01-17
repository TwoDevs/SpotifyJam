import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreator } from 'redux';
import { Link } from 'react-router-dom';

import socketIOClient from "socket.io-client";
const queryString = require('query-string');

var SpotifyWebAPI = require("spotify-web-api-js");
var spotifyAPI = new SpotifyWebAPI();

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
          connected: false,
          endpoint: 'http://localhost:8000',
          isAdmin: false,
          accessToken: null
        };
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
        
        setInterval(() => {
          if(this.state.isAdmin){
              this.sendSync();
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

      sendSync = () => {
          
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