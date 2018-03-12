//React | Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import CreateRoomModal from "./CreateRoomModal";
import RoomGrid from "./RoomGrid";

//Actions
import { socketCreateRoom } from "../../redux/socket/socketActions";

//Selectors
import { selectRooms } from "../../redux/selectors";

class Lobby extends Component {
  render() {
    const { rooms, socketCreateRoom } = this.props;
    return (
      <div>
        <RoomGrid rooms={rooms} />
        <CreateRoomModal createRoom={socketCreateRoom} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: selectRooms(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      socketCreateRoom
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
