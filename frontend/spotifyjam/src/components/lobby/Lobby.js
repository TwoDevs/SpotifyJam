//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Components
import {Button, Input, List} from 'antd';

//Actions
import {
    socketConnected,
    requestSocketAuth,
    handleAuthResult,
    requestSocketReAuth,
    handleReAuthResult
} from '../../redux/socket/socketActions';

//Selectors
import {
    selectUserReq,
    selectSocketAuth
} from '../../redux/selectors';

//Socket
import socketIO from 'socket.io-client';

//Devkeys
import {devURLs, productionURLs} from '../../devKeys';
const devMode = true;
const {server_url} = devMode ? devURLs : productionURLs;

//Socket Instance
const io = socketIO.connect(server_url);

class Lobby extends Component {
    constructor(props){
        super(props);

        const username = props.user_req.display_name;

        this.state = {
            rooms: [],
            currentRoom: "",
            newRoom: "",
            messages: [],
            newMessage: "",
            username
        };

        //Socket Event Listeners
        io.on('connect', props.socketConnected);
        
        //Check for existing auth
        if (props.socketAuth){
            //Get ReAuth from socket
            props.requestSocketReAuth(io);

            //On reauthenticate
            io.on('reauthenticate', (res) => {
                props.handleReAuthResult(res)
            });
        }
        else {
            //Get Auth from socket
            props.requestSocketAuth(io);

            //On authenticate
            io.on('authenticate', (res) => {
                props.handleAuthResult(res)
            });
        }

        //Retrieve rooms
        io.on('availableRooms', (res) => {
            this.setState({
                rooms: res.rooms,
                currRoom: res.currentRoom
            });
        });
        //Retrieve msgs
        io.on('msg', (res) => {
            debugger;
            const currState = this.state;
            currState.messages.push(res.username + ": " + res.message_text);
            this.setState(currState);
        });

    }

    //Room Handling
    submitNewRoom = () => {
        const {newRoom} = this.state;
        io.emit('createRoom', {room_name: newRoom});
        this.setState({
            newRoom: ""
        });
    }
    joinRooms = () => {
        const {newRoom} = this.state;
        io.emit('joinRoom', {room_name: newRoom});
    }
    handleRoomNameInput = (e) => {
        this.setState({
            newRoom: e.target.value
        });
    }


    //Messaging
    handleMessageInput = (e) => {
        this.setState({
            newMessage: e.target.value
        });
    }
    submitNewMessage = () => {
        const {newMessage, username} = this.state;

        const currState = this.state;
        currState.messages.push(username + ": " + newMessage);

        this.setState(currState);
        io.emit('msg', {mesage_text: newMessage});
        
        this.setState({
            newMessage: ""
        });
    }

    render() {
        const {rooms, currRoom, messages} = this.state;
        const roomList = rooms.map((roomName) => {
            <div>
                <p id="roomName"> {roomName} </p>
            </div>
        });
        return(
            <div>
              <h1>Lobby</h1>
              <hr/>
              <br/>
              <div>Rooms: </div>
              {rooms}
              <div>Current Room: {currRoom}</div>
              <br/>
              <br/>
              <Input onChange={this.handleRoomNameInput}/>
              <Button onClick={this.submitNewRoom}>Create Room</Button>
              <Button onClick={this.joinRooms}>Join Room</Button>
              <br/>
              <br/>
              <h1>Chat</h1>
              <hr/>
              <List
                size="small"
                dataSource={messages}
                renderItem={item => (<List.Item>{item}</List.Item>)}
                />
                <Input onChange={this.handleMessageInput}/>
                <Button onClick={this.submitNewMessage}>Send Message</Button>
              <br/>
              <br/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_req: selectUserReq(state),
        socketAuth: selectSocketAuth(state)
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    socketConnected,
    requestSocketAuth,
    handleAuthResult,
    requestSocketReAuth,
    handleReAuthResult
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
