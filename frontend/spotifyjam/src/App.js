import React, { Component } from 'react';
//import Websocket from 'react-websocket';
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      connected: false,
      endpoint: 'http://localhost:3000'
    };
  }

  componentDidMount(){
    const {endpoint} = this.state;
    const socket = socketIOClient(endpoint);
    
    socket.on("connect", () => {
      console.log("Connected");
      this.setState({
        connected: true
      });
    });
    
  }

  render() {
    return (
      <div>
        <h1> Spotify Jam Prototype </h1>
        <hr/>
        <h3> Connected: {this.state.connected.toString()}</h3>
        <p> Endpoint IP: {this.state.endpoint}</p>
        <br/>
        <br/>
      </div>
    );
  }
}

export default App;
