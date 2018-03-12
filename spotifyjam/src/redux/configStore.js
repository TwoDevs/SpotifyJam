//Redux
import { createStore, applyMiddleware } from "redux";
import { history } from "./API/historyFunctions";
import rootReducer from "./rootReducer";

//Middleware
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import createSocketIoMiddleware from "redux-socket.io";

//Persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Socket Configuration
import io from "socket.io-client";
const serverURL = process.env.REACT_APP_SERVER_URL || "https://lit-shelf-90391.herokuapp.com";
let socket = io(serverURL);
let socketIOMiddleware = createSocketIoMiddleware(socket, "server/");

//Create Config (only session persist)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["session", "spotify"]
};

//Persist Root Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Middleware
const middleware = [thunk, routerMiddleware(history), socketIOMiddleware];

//Create Store and Persistor
const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middleware));

const persistor = persistStore(store);

export { store, persistor };
