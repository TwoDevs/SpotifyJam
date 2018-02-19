//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Components
import {Button, Input, List, Row, Col} from 'antd';
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
    selectSocketAuth,
    selectCurrentPage,
    selectSocketStatus
} from '../../redux/selectors';

//Socket
import socketIO from 'socket.io-client';

//Socket Instance
const io = socketIO.connect(process.env.REACT_APP_SERVER_URL);

class Room extends Component {
    constructor(props){
        super(props);

        const username = props.user_req.username;
        const roomname = props.match.params.roomname;
        const socketConnected = props.socketStatus;
        
        this.state = {
            messages: [],
            newMessage: "",
            username,
            roomname
        };

        //Socket Event Listeners
        io.on('connect', props.socketConnected);
        
        //Check for existing auth
        if (props.socketAuth){
            //Get ReAuth from socket
            props.requestSocketReAuth(io);

            //On reauthenticate
            io.on('reauthenticate', (res) => {
                props.handleReAuthResult(res);
                if (res.status === 'succeeded'){
                    const roomname = props.match.params.roomname;
                    io.emit('joinRoom', {room_name: roomname});
                }
            });
        }
        else {
            //Get Auth from socket
            props.requestSocketAuth(io);

            //On authenticate
            io.on('authenticate', (res) => {
                props.handleAuthResult(res);
                if (res.status === 'succeeded'){
                    const roomname = props.match.params.roomname;
                    io.emit('joinRoom', {room_name: roomname});
                }
            });
        }
        //Retrieve msgs
        io.on('msg', (res) => {
            const currState = this.state;
            currState.messages.push(res.username + ": " + res.message_text);
            this.setState(currState);
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
        const {messages, newMessage, roomname} = this.state;

        return(
            <div>
            <Header/>
            <Row type="flex" justify="space-around" gutter={32}>
                <Col offset={1} span={14}>
                    {roomname}
                </Col>
                <Col span={6}>
                    <h1>Chat</h1>
                    <hr/>
                    <List
                      size="small"
                      dataSource={messages}
                      renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                    <Input placeholder="Type a message..." onChange={this.handleMessageInput} value = {newMessage}/>
                    <Button onClick={() => this.submitNewMessage()}>Send Message</Button>
                </Col>
            </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_req: selectUserReq(state),
        socketAuth: selectSocketAuth(state),
        currRoom: selectCurrentPage(state),
        socketStatus: selectSocketStatus(state)
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    socketConnected,
    requestSocketAuth,
    handleAuthResult,
    requestSocketReAuth,
    handleReAuthResult
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Room);
