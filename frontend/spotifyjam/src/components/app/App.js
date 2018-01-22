//React | Router | Redux
import React, {Component} from 'react';
import {Route, Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

//Components
import {Menu, Icon} from 'antd';
import Splash from "../splash/Splash";
import Lobby from '../lobby/Lobby';
import Error from '../error/Error';
import Todo from '../todo/Todo';
import JSONViewer from '../debug/JSONViewer';

//Selectors
import {selectCurrentPage} from '../../redux/selectors';
import {selectAccessTokenExists} from '../../redux/selectors';

//Styling
import "./App.css";

//Keys & Mode
import {devURLs, productionURLs} from '../../devKeys';
const devMode = true;
const {server_url} = devMode ? devURLs : productionURLs;


class App extends Component {

  render () {
    const {currentTab, sessionExists} = this.props;
    return (
      <div>
      
        <header>
          <Menu selectedKeys={[currentTab]} mode="horizontal" theme = "dark">
            <Menu.Item key="/">
              <Link to="/">
                <Icon type="api"/>Splash
              </Link>
            </Menu.Item>
            <Menu.Item key="/lobby">
              <Link to="/lobby">
                <Icon type="home"/>Lobby
              </Link>
            </Menu.Item>
            <Menu.Item key="/login">             
              <a href = {server_url + "/login"}>
                <Icon type="unlock" /> Authorize Spotify
              </a>
            </Menu.Item>
            <Menu.Item key="/todo">
              <Link to="/todo">
                <Icon type="line-chart" /> Todo List
              </Link>
            </Menu.Item>
            <Menu.Item key="/store">
              <Link to="/store">
                <Icon type="database" /> Redux Store
              </Link>
            </Menu.Item>
            <Menu.Item key="/error">
              <Link to="/error">
                <Icon type="warning" /> Error
              </Link>
            </Menu.Item>
          </Menu>
        </header>
        
        <main className = "App">
          <Route exact path ="/" component = {Splash}/>
          <Route exact path="/lobby" render={ () => sessionExists ? <Lobby/> : <Redirect to="/"/> }/>
          <Route exact path="/error" component = {Error}/>
          <Route exact path="/todo" component = {Todo}/>
          <Route exact path="/store" component = {JSONViewer}/>
          <JSONViewer/>
        </main>

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    currentTab: selectCurrentPage(state),
    sessionExists: selectAccessTokenExists(state)
  };
}


export default connect(mapStateToProps, null)(App);
