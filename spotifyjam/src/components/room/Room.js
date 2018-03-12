//React | Redux | Router
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import { Layout, Button, Input, List, Row, Col } from "antd";
import Header from "../header/Header";

const { Content, Sider } = Layout;

class Room extends Component {
  render() {
    return (
      <Layout>
        <Content>
          <div>hi</div>
        </Content>
        <Sider>
          <div>chat here</div>
        </Sider>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Room);
