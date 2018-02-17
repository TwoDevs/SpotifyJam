//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Components
import {Button, Input, List} from 'antd';
import Header from '../header/Header';

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

//Socket Instance
const io = socketIO.connect(process.env.REACT_APP_SERVER_URL);

class Lobby extends Component {
    constructor(props){
        super(props);

        const username = props.user_req.username;

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
            const currState = this.state;
            currState.messages.push(res.username + ": " + res.message_text);
            this.setState(currState);
        });

    }

    //Room Handling
    submitNewRoom = () => {
        const {newRoom} = this.state;
        io.emit('createRoom', {room_name: newRoom});
        // Reset Field
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

        // Add new message to stack
        const currState = this.state;
        currState.messages.push(username + ": " + newMessage);
        this.setState(currState);

        // Emit new message to others
        io.emit('msg', {message_text: newMessage});
        
        // Reset field
        this.setState({
            newMessage: ""
        });
    }

    render() {
        const {rooms, currRoom, messages, newMessage, newRoom} = this.state;
        const roomList = rooms.map((roomName) => {
            <div>
                <p id="roomName"> {roomName} </p>
            </div>
        });
        return(
            <div>
            <Header/>
              <h1>Lobby</h1>
              <hr/>
              <br/>
              <div>Rooms: </div>
              {rooms}
              <div>Current Room: {currRoom}</div>
              <br/>
              <br/>
              <Input onChange={this.handleRoomNameInput} value = {newRoom}/>
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
                <Input placeholder="Type a message..." onChange={this.handleMessageInput} value = {newMessage}/>
                <Button onClick={() => this.submitNewMessage()}>Send Message</Button>
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
