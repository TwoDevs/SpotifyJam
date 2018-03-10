//React, Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import { Spin } from "antd";
import Header from "../header/Header";

//Selectors
import { selectReAuthStatus } from "../../redux/selectors";

//Actions
import { connectionHandler, logOut } from "../../redux/session/sessionActions";

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    props.connectionHandler();
  }

  reAuthHandler = () => {
    const { reAuthStatus, logOut } = this.props;
    if (reAuthStatus === "failed") {
      logOut();
    }
  };

  render() {
    //Wrapped Component
    const { Component } = this.props;
    const { reAuthStatus } = this.props;

    //Handle Re-Authorization
    this.reAuthHandler();

    return (
      <div>
        {reAuthStatus === "finished" ? (
          <div>
            <Header />
            <Component />
          </div>
        ) : (
          <Spin size="large" style={{ textAlign: "center" }} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reAuthStatus: selectReAuthStatus(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      connectionHandler,
      logOut
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
