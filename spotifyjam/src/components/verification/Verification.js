//React | Redux | Router
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";

//Components
import { Steps, Icon, Spin, Button, Row, Col } from "antd";
import GifPlayer from "react-gif-player";

//Actions
import { connectionHandler, failedReAuth } from "../../redux/session/sessionActions";

//Selectors
import { selectLoadingStatus, selectReAuthStatus, anyFail } from "../../redux/selectors";

//Redirect
import { redirectToLobby } from "../../redux/API/historyFunctions";

const Step = Steps.Step;

class Verification extends Component {
  componentWillMount() {
    const { reAuthStatus, redirectToLobby, failedReAuth, connectionHandler } = this.props;
    if (reAuthStatus === "finished") {
      redirectToLobby();
    } else if (reAuthStatus === "failed") {
      failedReAuth();
    } else {
      connectionHandler();
    }
  }

  render() {
    const { anyFail } = this.props;
    const { tokenStatus, profileStatus, authStatus } = this.props.loadingStatus;
    const loadCompleted = tokenStatus === "finished" && profileStatus === "finished" && authStatus === "finished";
    return (
      <div>
        {loadCompleted ? (
          <div style={{ textAlign: "center", width: "100%", left: "40%", paddingTop: "10%" }}>
            <h1>Ready!</h1>
          </div>
        ) : (
          <div style={{ textAlign: "center", width: "100%", left: "40%", paddingTop: "10%" }}>
            <h2>Loading...</h2>
            <Spin size="large" />
          </div>
        )}

        <div style={{ textAlign: "center", width: "100%", left: "40%", paddingTop: "10%" }}>
          <GifPlayer gif="https://i.imgur.com/WjhGJKb.gif" autoplay={!loadCompleted} />
        </div>

        <Row gutter={32} type="flex" justify="center" align="middle" style={{ paddingTop: "10%" }}>
          <Col offset={14}>
            {loadCompleted && (
              <Link to="/lobby">
                <Button size="large" type="primary">
                  Next<Icon type="arrow-right" />
                </Button>
              </Link>
            )}
            {anyFail && (
              <Link to="/">
                <Button size="large" type="danger">
                  Retry<Icon type="reload" />
                </Button>
              </Link>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      connectionHandler,
      redirectToLobby,
      failedReAuth
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    loadingStatus: selectLoadingStatus(state),
    reAuthStatus: selectReAuthStatus(state),
    anyFail: anyFail(state)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Verification));
