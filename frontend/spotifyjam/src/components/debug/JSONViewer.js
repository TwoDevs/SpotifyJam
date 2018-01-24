//React | Redux
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Actions
import {setUsername, setAccessToken, clearSession} from '../../redux/features/session/sessionActions';

//Components
import ReactJson from 'react-json-view'
import {Button, Row, Col} from 'antd';

const JSONViewer = (props) => {
    const {setUsername, setAccessToken, clearSession} = props;
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
                    <Button type="dashed" onClick = {() => setAccessToken("#access_token=TESTTOKEN")}>Set Access Token</Button>
                    <Button type="danger" onClick = {() => clearSession()}>Clear Session</Button>
                    <Button type="danger" onClick = {() => window.location.reload(true)}>Clear Cache</Button>
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
    setAccessToken,
    clearSession
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(JSONViewer);