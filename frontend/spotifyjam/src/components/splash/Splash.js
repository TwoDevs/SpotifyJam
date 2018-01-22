//React | Redux
import React, {Component} from 'react';
import {connect} from 'react-redux';

//Selector
import {selectAccessTokenExists} from '../../redux/selectors';

//Components 
import Particles from 'react-particles-js';
import {Card, Button} from 'antd';

//Particle Config
import {particles} from './particlesjs-config';

class Splash extends Component {
    render() {
        const {sessionExists} = this.props;
        return (
            <div>
            <Particles params={{particles}} style ={{backgroundColor: "black"}}/>
                <Card title="Spotify Jam!" style={{ width: 300, position: "absolute", top: "40%", left: "42%", textAlign: "center" }}>
                    <p>Come jam out to songs together!</p>
                    <p>Access Token Exists: {sessionExists.toString()}</p>
                    <Button type="primary" size='large'>Verify Spotify</Button>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sessionExists: selectAccessTokenExists(state)
    };
}
export default connect(mapStateToProps, null)(Splash);