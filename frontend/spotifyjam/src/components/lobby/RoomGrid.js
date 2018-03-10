//React, Router, Redux
import React, { Component } from "react";
import { Link } from "react-router-dom";

//Components
import { Col, Row } from "antd";
import RoomCard from "./RoomCard";

const RoomGrid = props => {
  const roomList = props.rooms
    .filter(roomName => roomName !== "Lobby")
    .map(roomName => (
      <Col span={6} key={roomName}>
        <Link to={"/room/" + roomName}>
          <RoomCard roomName={roomName} />
        </Link>
      </Col>
    ));
  return (
    <div>
      <Row type="flex" justify="center" gutter={32}>
        <Col span={20}>
          <br />
          <Row type="flex" justify="space-around" gutter={32}>
            {roomList}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default RoomGrid;
