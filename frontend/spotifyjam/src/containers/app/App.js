import React from 'react';
import { Route, Link } from 'react-router-dom';

//Components
import Home from '../home/Home';
import Error from '../error/Error';



const App = () => {
    return (
      <div>
        <header>
        <h1>Header Sample Nav</h1>
          <Link to="/">Home</Link>
          |
          <a href = "<INSERT SERVER HERE>/login">Authorize Spotify</a>
        </header>
        
        <main>
          <Route exact path ="/" component = {Home}/>
        </main>
      </div>
    );
}

export default App;
