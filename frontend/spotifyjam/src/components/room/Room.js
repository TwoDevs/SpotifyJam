//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Components
import {Button, Input, List, Row, Col} from 'antd';
import Header from '../header/Header';


class Room extends Component {

    //Messaging
    handleMessageInput = (e) => {
        
    }
    submitNewMessage = () => {
        
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
                    <Button key = "test" onClick={this.props.socketTestMiddle}>Send Test</Button>

                </Col>
            </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Room);
