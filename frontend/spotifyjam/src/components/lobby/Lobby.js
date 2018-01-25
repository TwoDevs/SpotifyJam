//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Components
import {Modal, Button} from 'antd';

//Socket Libraries
import socketIOClient from "socket.io-client";

//Actions 
import {lobbyConnect} from '../../redux/features/lobby/lobbyActions';
import {setUsername} from '../../redux/features/session/sessionActions';

//Selectors
import {selectUsernameSet} from '../../redux/selectors';

//Keys & Mode
import {devURLs, productionURLs} from '../../devKeys';
const devMode = true;
const {server_url} = devMode ? devURLs : productionURLs;

//Name Gen
var generateName = require('sillyname');
var generate_names = require('name-jam-rator');

class Lobby extends Component {
    constructor(props){
        super(props);
        const socket = socketIOClient.connect(server_url);
        this.state = {
          socketID: socket.id,
          username: ""
        };
        console.dir(socket);
        lobbyConnect(socket);
      }
    
    generateUsername = () => {
      this.setState({
        username: generate_names()[0]
      });
    }

    render() {
      const {socketID, username} = this.state;
      const {usernameSet, setUsername} = this.props;
        return(
            <div>
              <Modal
                title="Generate a username!"
                visible={usernameSet}
                onOk={() => setUsername(username)}>

                <Button onClick={this.generateUsername}>Generate!</Button>
                <p>{username}</p>

              </Modal>
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
  lobbyConnect,
  setUsername
}, dispatch);

const mapStateToProps = state => ({
  usernameSet: selectUsernameSet(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
