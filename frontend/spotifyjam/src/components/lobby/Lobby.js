//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

//Components
import {Button, Input, List, Row, Col} from 'antd';
import Header from '../header/Header';



class Lobby extends Component {

    render() {
        return(
            <div>
            <Header/>
            hi
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

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
