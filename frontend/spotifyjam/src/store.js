import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './modules';

export const history = createHistory();

const initialState = {};
const middleware = [
    routerMiddleware(history)
];


export default createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);