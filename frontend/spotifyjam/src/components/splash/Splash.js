//React | Redux
import React, {Component} from 'react';

//Components 
import Particles from 'react-particles-js';
import SplashCard from './SplashCard';

//Particle Config
import {particles} from './particlesjs-config';

class Splash extends Component {
    render() {
        const {verified} = this.props;
        return (
            <div>
            <h3 style={{ color: "white", position: "absolute", top: "80%", left: "75%" }} >Access Token Exists: {verified}</h3>
            <Particles params={{particles}} style ={{backgroundColor: "black"}}/>
                <SplashCard/>
            </div>
        );
    }
}

export default Splash;