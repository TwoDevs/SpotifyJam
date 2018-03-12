//React | Router | Redux
import React, { Component } from "react";
import { Route } from "react-router-dom";

//Components
import AuthRoute from "../authroute/AuthRoute";
import Splash from "../splash/Splash";
import Lobby from "../lobby/Lobby";
import Verification from "../verification/Verification";
import Room from "../room/Room";

class App extends Component {
  render() {
    return (
      <div>
        <main className="App">
          <Route exact path="/" component={Splash} />
          <Route exact path="/verification" component={Verification} />
          <Route exact path="/lobby" render={() => <AuthRoute Component={Lobby} />} />
          <Route exact path="/room/:roomname" render={() => <AuthRoute Component={Room} />} />
        </main>
      </div>
    );
  }
}

export default App;
