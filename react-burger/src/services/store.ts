import { applyMiddleware, createStore } from "redux";
import { thunk } from 'redux-thunk';
import { rootReducer } from "./reducers";
import { compose } from "redux";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { WS_FEED_CONNECTION_CLOSE, WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_ERROR, WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_DATA, WS_FEED_SEND } from "./actions/ws-feed";
import { WS_ORDERS_CONNECTION_CLOSE, WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_ERROR, WS_ORDERS_CONNECTION_START, WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_GET_DATA, WS_ORDERS_SEND } from "./actions/ws-orders";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const feedSocketMiddleware = socketMiddleware({
  onStart: WS_FEED_CONNECTION_START,
  onSuccess: WS_FEED_CONNECTION_SUCCESS,
  onError: WS_FEED_CONNECTION_ERROR,
  onClosed: WS_FEED_CONNECTION_CLOSED,
  onGetData: WS_FEED_GET_DATA,
  onSend: WS_FEED_SEND,
  close: WS_FEED_CONNECTION_CLOSE
});

const ordersSocketMiddleware = socketMiddleware({
  onStart: WS_ORDERS_CONNECTION_START,
  onSuccess: WS_ORDERS_CONNECTION_SUCCESS,
  onError: WS_ORDERS_CONNECTION_ERROR,
  onClosed: WS_ORDERS_CONNECTION_CLOSED,
  onGetData: WS_ORDERS_GET_DATA,
  onSend: WS_ORDERS_SEND,
  close: WS_ORDERS_CONNECTION_CLOSE
});

const enhancer = composeEnhancers(applyMiddleware(thunk, feedSocketMiddleware, ordersSocketMiddleware));

export const store = createStore(rootReducer, undefined, enhancer);