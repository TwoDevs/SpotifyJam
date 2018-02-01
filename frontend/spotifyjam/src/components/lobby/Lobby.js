//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Components
import {Modal, Spin, Alert} from 'antd';

class Lobby extends Component {
  constructor(props){
    super(props);
    
    this.state = {

    };
  }
    render() {
        return(
            <div>
              <Spin/>
              <h1>Lobby</h1>
            </div>
        );
    }
}



export default Lobby;
