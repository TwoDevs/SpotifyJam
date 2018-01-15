import React, { Component } from 'react';
import Websocket from 'react-websocket';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      testData: "Test message here",
      connected: false
    };
  }

  handleTestMessage = (data) => {
    let result = JSON.parse(data);
    this.setState({
      testData: {result}
    });
  }

  handleConnected = (data) => {
    let result = JSON.parse(data);
    this.setState({
      connected: result
    });
  }

  render() {
    return (
      <div>
        <h1> Simple Rick </h1>
        <Websocket
          url =''
          onMessage = {this.handleTestMessage}
          onOpen = {this.handleConnected}/>
      </div>
    );
  }
}

export default App;
