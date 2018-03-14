//React, Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import { Spin } from "antd";
import Header from "../header/Header";

//Selectors
import { anyFail } from "../../redux/selectors";

//Actions
import { connectionHandler, logOut } from "../../redux/session/sessionActions";

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    props.connectionHandler();
  }

  reAuthHandler = () => {
    const { anyFail, logOut } = this.props;
    if (anyFail) {
      logOut();
    }
  };

  render() {
    //Wrapped Component
    const { Component } = this.props;
    const { anyFail } = this.props;

    //Handle Re-Authorization
    this.reAuthHandler();

    return (
      <div>
        {!anyFail ? (
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
    anyFail: anyFail(state)
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
