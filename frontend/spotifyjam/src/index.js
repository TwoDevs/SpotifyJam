//React | Redux | Router
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import {store, persistor, history } from './redux/configStore';

//Persist
import { PersistGate } from 'redux-persist/lib/integration/react'

//Styling
import './index.css';

//Components
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import {Spin} from 'antd';

//const {store, persistor, history } = configureStore();


ReactDOM.render(
    <Provider store = {store}>
        <PersistGate persistor = {persistor} loading = {<Spin size="large" />} onBeforeLift={() => console.log('lifted')}>
            <ConnectedRouter history = {history}>
                <div>
                    <App/>
                </div>
            </ConnectedRouter>
        </PersistGate>
    </Provider>, 

document.getElementById('root'));
registerServiceWorker();
