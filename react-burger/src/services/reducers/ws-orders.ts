import { WS_ORDERS_CONNECTION_START,
    WS_ORDERS_CONNECTION_SUCCESS,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_GET_DATA,
    WS_ORDERS_CONNECTION_CLOSE
 } from "../actions/ws-orders";

 import { IOrderData } from "../../utils/shared-prop-types";
 import { TWSOrdersActions } from "../actions/ws-orders";

 type TWSOrdersState = {
    wsConnected: boolean,
    orders: IOrderData[],
    error?: Event
 };

 const initialState: TWSOrdersState = {
    wsConnected: false,
    orders: []
 };

 export const wsOrdersReducer = (
    state = initialState,
    action: TWSOrdersActions
 ): TWSOrdersState => {
    switch (action.type) {
        case WS_ORDERS_CONNECTION_START:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                orders: []
            };
        case WS_ORDERS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_ORDERS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_ORDERS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };
        case WS_ORDERS_GET_DATA:
            return {
                ...state,
                error: undefined,
                orders: action.payload.orders
            };
        case WS_ORDERS_CONNECTION_CLOSE:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            }
        default:
            return state;
    }
 }