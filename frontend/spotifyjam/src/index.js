//React | Redux | Router
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './redux/store/configStore.js';

//Styling
import './index.css';

//Components
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store = {store}>
        <ConnectedRouter history = {history}>
            <div>
                <App/>
            </div>
        </ConnectedRouter>
    </Provider>, 

document.getElementById('root'));
registerServiceWorker();
