//React | Router | Redux
import React, {Component} from 'react';
import {Route} from 'react-router-dom';

//Components
import Splash from "../splash/Splash";
import Lobby from '../lobby/Lobby';
import Todo from '../todo/Todo';
import Verification from '../verification/Verification';
import Room from '../room/Room';

class App extends Component {
  render () {
    return (
      <div>
        <main className = "App">
          <Route exact path="/" component = {Splash}/>
          <Route exact path="/verification" component = {Verification}/>
          <Route exact path="/lobby" component = {Lobby}/>
          <Route exact path="/todo" component = {Todo}/>
          <Route exact path="/room/:roomname" component = {Room}/>
        </main>
      </div>
    );
  }
}


export default App;
