// React, Redux
import React, {Component} from 'react';
import {connect} from 'react-redux';

// Selector
import {selectUser} from '../../redux/selectors';
import { Button, Menu, Avatar, Icon, Row, Col } from 'antd';
import SpotifyIcon from 'react-icons/lib/fa/spotify';
const SubMenu = Menu.SubMenu;

class Header extends Component {
    state = {
        current: 'home'
    }

    handleClick = (e) => {
        this.setState({
          current: e.key,
        });
    }

    render(){
        const { current } = this.state;
        const { user } = this.props;
        return(
                <Row>
                    <Col span={3}>
                        <Menu mode="horizontal">     
                            <Menu.Item>
                                <SpotifyIcon/> Spotify Jam
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={3} offset={18}>
                        <Menu mode="horizontal">
                            <SubMenu title={
                                <span>
                                    <Avatar src={user.images[0].url}/>
                                    {user.display_name}
                                </span>}>
                                <Menu.Item>
                                <Icon type="logout" /> Log Out
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: selectUser(state),
    };
}

export default connect(mapStateToProps, null)(Header);