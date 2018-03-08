//React | Redux
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Components
import Header from '../header/Header';
import CreateRoomModal from './CreateRoomModal';
import RoomGrid from './RoomGrid';

//Selectors
import {selectRooms, selectReAuthStatus} from '../../redux/selectors';

//Actions
import {connectionHandler, logOut} from '../../redux/session/sessionActions';
import {socketCreateRoom} from '../../redux/socket/socketActions';

class Lobby extends Component {
    constructor(props){
        super(props);
        props.connectionHandler();
    }

    render() {
        const {reAuthStatus, logOut} = this.props;
        const failedAuth = reAuthStatus === 'failed';
        if (failedAuth){ logOut(); }
        return(
            <div>
                {!failedAuth && <Header/>}
                {!failedAuth && <RoomGrid rooms={this.props.rooms}/>}
                <CreateRoomModal createRoom={this.props.socketCreateRoom}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rooms: selectRooms(state),
        reAuthStatus: selectReAuthStatus(state)
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    connectionHandler,
    socketCreateRoom,
    logOut,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
