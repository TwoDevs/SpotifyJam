//React | Redux | Router
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setUsername, setAccessToken} from '../../redux/features/session';

//Socket Libraries
import socketIOClient from "socket.io-client";
import {get_sync_dict_from_json} from '../../spotify/playerUtil';

//Components
import {Input, Icon, Button} from 'antd';

//Keys & Mode
import {devURLs, productionURLs} from '../../devKeys';
const devMode = true;
const {server_url} = devMode ? devURLs : productionURLs;

//Spotify Libraries
const queryString = require('query-string');
var SpotifyWebAPI = require("spotify-web-api-js");
var spotifyAPI = new SpotifyWebAPI();



class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
          connected: false,
          endpoint: server_url,
          isAdmin: false,
          accessToken: null,
          username: "",
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

        const {endpoint, isAdmin} = this.state;
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
          this.sync_local_player(sync_data);
        });
        
        const pollingInterval = setInterval(() => {
          if(isAdmin){
              this.sendSync(socket);
          }
        },timeInterval);
        this.setState({
          pollingInterval
        });
    
      }
    
      componentWillUnmount(){
        const {pollingInterval} = this.state;
        clearInterval(pollingInterval);
      }
    
    
      //Modularized Methods
      register = () => {
        const {accessToken} = this.state;
        if (accessToken){
            spotifyAPI.setAccessToken(accessToken);
        }
      }

      sendSync = (socket) => {
        spotifyAPI.getMyCurrentPlayingTrack( function(err, data) {
          if (err) console.error(err);
          else {
              data.timestamp = Date.now();
              socket.emit('sync',data);
          }
        });
      }
      
      handleUsername = (e) => {
        this.setState({
          username: e.target.value
        });
      }

      handleAccessToken = (e) => {
        this.setState({
          accessToken: e.target.value
        });
      }

    render() {
        const {connected, endpoint, isAdmin, accessToken, username} = this.state;
        const {setUsername, setAccessToken} = this.props;
        return(
            <div>
                <h1> Home Page</h1>
                <hr/>
                <p>Admin: {isAdmin.toString()}</p>
                <p>Connection Status: {connected.toString()}</p>
                <p>Server URL: {endpoint}</p>
                <p>Access Token: {accessToken}</p>
                <Input
                  placeholder="Enter your usename"
                  prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange = {this.handleUsername}/>
                <Button type="dashed" onClick = {() => setUsername(username)}>Submit Username</Button>
                <Input
                  placeholder="Enter your token"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange = {this.handleAccessToken}/>
                <Button type="dashed" onClick = {() => setAccessToken(accessToken)}>Submit Access Token</Button>
            </div>
        );
    }
}


//Redux Connection Functions

const mapDispatchToProps = dispatch => bindActionCreators({
  setUsername,
  setAccessToken
}, dispatch);

export default connect(null, mapDispatchToProps)(Home);
