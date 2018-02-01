//React | Router | Redux
import React, {Component} from 'react';
import {Route ,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

//Components
import Splash from "../splash/Splash";
import Lobby from '../lobby/Lobby';
import Todo from '../todo/Todo';
import Verification from '../verification/Verification';

//Styling
import "./App.css";
import { bindActionCreators } from 'redux';

//Actions
import {clearSession} from '../../redux/session/sessionActions';

class App extends Component {
  render () {
    return (
      <div>
        <main className = "App">
          <Route exact path="/" component = {Splash}/>
          <Route exact path="/verification" component = {Verification}/>
          <Route exact path="/lobby" component = {Lobby}/>
          <Route exact path="/todo" component = {Todo}/>
        </main>
        <button onClick = {this.props.clearSession}> Clear Session </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  clearSession
}, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(App));
