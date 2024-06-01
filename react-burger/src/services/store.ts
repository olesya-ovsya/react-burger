import { applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import { rootReducer } from "./reducers";
import { compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_ERROR, WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_DATA, WS_FEED_SEND } from "./actions/ws-feed";
import { WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_ERROR, WS_ORDERS_CONNECTION_START, WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_GET_DATA, WS_ORDERS_SEND } from "./actions/ws-orders";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
  
export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const feedSocketMiddleware = socketMiddleware({
  onStart: WS_FEED_CONNECTION_START,
  onSuccess: WS_FEED_CONNECTION_SUCCESS,
  onError: WS_FEED_CONNECTION_ERROR,
  onClosed: WS_FEED_CONNECTION_CLOSED,
  onGetData: WS_FEED_GET_DATA,
  onSend: WS_FEED_SEND
});

const ordersSocketMiddleware = socketMiddleware({
  onStart: WS_ORDERS_CONNECTION_START,
  onSuccess: WS_ORDERS_CONNECTION_SUCCESS,
  onError: WS_ORDERS_CONNECTION_ERROR,
  onClosed: WS_ORDERS_CONNECTION_CLOSED,
  onGetData: WS_ORDERS_GET_DATA,
  onSend: WS_ORDERS_SEND
});

const enhancer = composeEnhancers(applyMiddleware(thunk, feedSocketMiddleware, ordersSocketMiddleware));

export const store = configureStore({
    reducer: rootReducer,
    enhancers: (getDefaultMiddleware) => getDefaultMiddleware().concat(enhancer),
});