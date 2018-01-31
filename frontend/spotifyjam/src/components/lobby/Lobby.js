//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Components
import {Modal, Spin, Alert} from 'antd';
import UsernameChoices from './UsernameChoices';

//Socket Libraries
import socketIOClient from "socket.io-client";

//Actions 
import {lobbyConnect} from '../../redux/features/lobby/lobbyActions';
import {setUsername, setSocketAuth} from '../../redux/features/session/sessionActions';
import {authenticate} from '../../redux/features/spotify/spotifyActions';

//Selectors
import {selectUsernameSet, selectSocketAuthStatus} from '../../redux/selectors';

//Keys & Mode
import {devURLs, productionURLs} from '../../devKeys';
const devMode = true;
const {server_url} = devMode ? devURLs : productionURLs;

class Lobby extends Component {
    constructor(props){
        super(props);
        const socket = socketIOClient.connect(server_url);
        this.state = {
          socketID: socket.id,
          username: "",
          alertOn: false
        };
        console.dir(socket);

        //Authenicate and get Spotify Profile
        props.authenticate();

        //Connect to lobby
        props.lobbyConnect(socket);
      }
    
    handleCancel = (e) => {
      this.setState({
        alertOn: true
      });
    }

    handleUsername = (username) => {
      this.setState({
          username
      });
      console.log("YOU SET:", username);
    }

    render() {
      const {socketID, username, alertOn} = this.state;
      const {usernameSet, gotProfile, setUsername} = this.props;
        return(
            <div>
              <Modal
                title="Proceed as..."
                visible={usernameSet}
                onCancel={this.handleCancel}
                onOk = {() => setUsername(username)}
                closable = {false}
                maskClosable = {false}>

                {gotProfile ? <UsernameChoices handleUsername = {this.handleUsername}/> : <LoadingProfile/>}
                
                {alertOn && <Alert
                  message="Pick a username :)"
                  description="What should we call you?"
                  type="error"
                  closable
                />}
              </Modal>
            </div>
        );
    }
}

const AlertMessage = () => {
  return (
    <Alert
      message="Pick a username :)"
      description="What should we call you?"
      type="error"
      showIcon
    />
  )
}

const LoadingProfile = () => {
  return (
    <div>
      <Spin/>
      <p>Authenticating...</p>
    </div>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({
  lobbyConnect,
  authenticate,
  setUsername,
}, dispatch);

const mapStateToProps = state => ({
  usernameSet: selectUsernameSet(state),
  gotProfile: selectSocketAuthStatus(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
