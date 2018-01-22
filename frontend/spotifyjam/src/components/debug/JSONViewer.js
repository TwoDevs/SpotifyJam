//React | Redux
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUsername, setAccessToken} from '../../redux/features/session/sessionActions';

//Components
import ReactJson from 'react-json-view'
import {Button, Row, Col} from 'antd';

const JSONViewer = (props) => {
    const {setUsername, setAccessToken} = props;
    return(
        <div>
            <br/>
            <br/>
            <Row type="flex" justify="space-around">
                <Col span={8}>
                    <h1>Redux Store</h1>
                    <hr/>
                    <ReactJson src={props.store} />
                </Col>
                <Col span={10}>
                    <Button type="dashed" onClick = {() => setUsername("Test Username")}>Set Username</Button>
                    <Button type="dashed" onClick = {() => setAccessToken("Test Access Token")}>Set Access Token</Button>
                    <Button type="danger" onClick = {() => setUsername("")}>Clear Username</Button>
                    <Button type="danger" onClick = {() => setAccessToken("")}>Clear Access Token</Button>
                </Col>
            </Row>
            <br/>
            <br/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    store: state
});


const mapDispatchToProps = dispatch => bindActionCreators({
    setUsername,
    setAccessToken
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(JSONViewer);