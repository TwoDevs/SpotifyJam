//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Components
import {Spin} from 'antd';

class Lobby extends Component {

    render() {
        return(
            <div>
              <Spin/>
              <h1>Lobby</h1>
            </div>
        );
    }
}


export default connect(null, null)(Lobby);
