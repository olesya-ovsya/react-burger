import { applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import { rootReducer } from "./reducers";
import { compose } from "redux";
import { configureStore, Tuple } from "@reduxjs/toolkit";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
  
export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = configureStore({
    reducer: rootReducer,
    enhancers: (getDefaultMiddleware) => getDefaultMiddleware().concat(enhancer),
});