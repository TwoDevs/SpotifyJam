//React | Redux | Router
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Components
import Header from '../header/Header';
import CreateRoomModal from './CreateRoomModal';
import RoomGrid from './RoomGrid';

//Selectors
import {selectRooms} from '../../redux/selectors';

//Actions
import {connectionHandler} from '../../redux/session/sessionActions';

class Lobby extends Component {
    render() {
        return(
            <div>
                <Header/>
                <RoomGrid rooms={this.props.rooms}/>
                <CreateRoomModal/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rooms: selectRooms(state)
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    connectionHandler
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
