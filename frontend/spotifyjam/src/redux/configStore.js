//Redux
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

//Persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//Create Config (only session persist)
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['session'],
}

//Persist Root Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

//History
const history = createHistory();

//Thunk and Router Middleware
const middleware = [
    thunk,
    routerMiddleware(history),
];

//Create Store and Persistor
const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware),
);
const persistor = persistStore(store);

export {store, persistor, history};

