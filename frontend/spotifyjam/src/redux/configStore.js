//Redux
import { createStore, applyMiddleware } from 'redux';
import {history} from './API/historyFunctions';
import rootReducer from './rootReducer';

//Middleware
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';

//Socket
import socketIO from 'socket.io-client';
import socketIoMiddleware from 'redux-socket.io-middleware'

//Persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//Devkeys
import {devURLs, productionURLs} from '../devKeys';
const devMode = true;
const {server_url} = devMode ? devURLs : productionURLs;

//Create Config (only session persist)
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['session'],
}

//Socket Instance
const io = socketIO.connect(server_url);

//Persist Root Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

//Middleware
const middleware = [
    thunk,
    routerMiddleware(history),
    logger,
    socketIoMiddleware(io)
];

//Create Store and Persistor
const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware),
);

const persistor = persistStore(store);

export {store, persistor};

