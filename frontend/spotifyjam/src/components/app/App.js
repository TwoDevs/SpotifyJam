//React | Router | Redux
import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';

//Components
import {Menu, Icon} from 'antd';
import Home from '../home/Home';
import Error from '../error/Error';
import Todo from '../todo/Todo';
import ReduxView from '../storeview/ReduxView';

//Selectors
import {selectCurrentPage} from '../../redux/selectors';

//Styling
import "./App.css";

//Keys & Mode
import {devURLs, productionURLs} from '../../devKeys';
const devMode = true;
const {server_url} = devMode ? devURLs : productionURLs;


class App extends Component {

  render () {
    const {currentTab} = this.props;
    return (
      <div>
      
        <header>
          <Menu selectedKeys={[currentTab]} mode="horizontal" theme = "dark">
            <Menu.Item key="/">
              <Link to="/">
                <Icon type="home"/>Home
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
          <Route exact path ="/" component = {Home}/>
          <Route exact path="/error" component = {Error}/>
          <Route exact path="/todo" component = {Todo}/>
          <Route exact path="/store" component = {ReduxView}/>
          <ReduxView/>
        </main>

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    currentTab: selectCurrentPage(state)
  };
}


export default connect(mapStateToProps, null)(App);
