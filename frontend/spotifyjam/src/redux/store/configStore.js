import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

export const history = createHistory();

const initialState = {};
const middleware = [
    thunk,
    routerMiddleware(history)
];


export default createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);