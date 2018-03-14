//React, Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

//Selector
import { selectUser, selectConnection } from "../../redux/selectors";

//Action
import { logOut } from "../../redux/session/sessionActions";

//Components
import { Menu, Avatar, Icon, Row, Col } from "antd";
import SpotifyIcon from "react-icons/lib/fa/spotify";
const SubMenu = Menu.SubMenu;

class Header extends Component {
  handleLogOut = ({ key }) => {
    if (key === "logout") {
      this.props.logOut();
    }
  };

  render() {
    const { user, connected } = this.props;
    return (
      <Row>
        <Col span={6}>
          <Menu mode="horizontal">
            <Menu.Item>
              <Link to="/lobby">
                <SpotifyIcon /> Spotify Jam
              </Link>
            </Menu.Item>
            <Menu.Item>{connected ? <Icon type="wifi" /> : <Icon type="loading" />} Connection</Menu.Item>
          </Menu>
        </Col>
        <Col span={3} offset={15}>
          <Menu mode="horizontal" onClick={this.handleLogOut}>
            <SubMenu
              title={
                <span>
                  <Avatar src={user.images[0].url} />
                </span>
              }
            >
              <Menu.Item key="logout">
                <Icon type="logout" /> Log Out
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectUser(state),
    connected: selectConnection
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logOut
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
