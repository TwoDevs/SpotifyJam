//React | Redux
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Components
import Header from '../header/Header';
import CreateRoomModal from './CreateRoomModal';
import RoomGrid from './RoomGrid';

//Selectors
import {selectRooms, selectReauthFailed} from '../../redux/selectors';

//Actions
import {connectionHandler, logOut} from '../../redux/session/sessionActions';

class Lobby extends Component {
    constructor(props){
        super(props);
        props.connectionHandler();
    }

    render() {
        const {reauthFailed, logOut} = this.props;
        if (reauthFailed){ logOut(); }
        return(
            <div>
                {!reauthFailed && <Header/>}
                {!reauthFailed && <RoomGrid rooms={this.props.rooms}/>}
                <CreateRoomModal/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rooms: selectRooms(state),
        reauthFailed: selectReauthFailed(state)
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    connectionHandler,
    logOut
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
