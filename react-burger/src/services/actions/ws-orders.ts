import { IOrders } from "../../utils/shared-prop-types";

export const WS_ORDERS_CONNECTION_START: 'WS_ORDERS_CONNECTION_START' = 'WS_ORDERS_CONNECTION_START';
export const WS_ORDERS_CONNECTION_SUCCESS: 'WS_ORDERS_CONNECTION_SUCCESS' = 'WS_ORDERS_CONNECTION_SUCCESS';
export const WS_ORDERS_CONNECTION_ERROR: 'WS_ORDERS_CONNECTION_ERROR' = 'WS_ORDERS_CONNECTION_ERROR';
export const WS_ORDERS_CONNECTION_CLOSED: 'WS_ORDERS_CONNECTION_CLOSED' = 'WS_ORDERS_CONNECTION_CLOSED';
export const WS_ORDERS_GET_DATA: 'WS_ORDERS_GET_DATA' = 'WS_ORDERS_GET_DATA';
export const WS_ORDERS_SEND: 'WS_ORDERS_SEND' = 'WS_ORDERS_SEND';
export const WS_ORDERS_CONNECTION_CLOSE: 'WS_ORDERS_CONNECTION_CLOSE' = 'WS_ORDERS_CONNECTION_CLOSE'; 

export interface IWSOrdersConnectionStartAction {
    type: typeof WS_ORDERS_CONNECTION_START,
    payload: string
}

export interface IWSOrdersConnectionSuccessAction {
    type: typeof WS_ORDERS_CONNECTION_SUCCESS,
    payload: Event
}

export interface IWSOrdersConnectionErrorAction {
    type: typeof WS_ORDERS_CONNECTION_ERROR,
    payload: Event
}

export interface IWSOrdersConnectionClosedAction {
    type: typeof WS_ORDERS_CONNECTION_CLOSED,
    payload: Event
}

export interface IWSOrdersGetDataAction {
    type: typeof WS_ORDERS_GET_DATA,
    payload: IOrders
}

export interface IWSOrdersSendAction {
    type: typeof WS_ORDERS_SEND,
    payload: string
}

export interface IWSOrdersConnectionCloseAction {
    type: typeof WS_ORDERS_CONNECTION_CLOSE
}

export type TWSOrdersActions = IWSOrdersConnectionStartAction
    | IWSOrdersConnectionSuccessAction
    | IWSOrdersConnectionErrorAction
    | IWSOrdersConnectionClosedAction
    | IWSOrdersGetDataAction
    | IWSOrdersSendAction
    | IWSOrdersConnectionCloseAction;

export const wsOrdersConnectionStart = (payload: string) : IWSOrdersConnectionStartAction => ({
    type: WS_ORDERS_CONNECTION_START,
    payload
});

export const wsOrdersConnectionSuccess = (payload: Event) : IWSOrdersConnectionSuccessAction => ({
    type: WS_ORDERS_CONNECTION_SUCCESS,
    payload
});

export const wsOrdersConntectionError = (payload: Event) : IWSOrdersConnectionErrorAction => ({
    type: WS_ORDERS_CONNECTION_ERROR,
    payload
});

export const wsOrdersConntectionClosed = (payload: Event) : IWSOrdersConnectionClosedAction => ({
    type: WS_ORDERS_CONNECTION_CLOSED,
    payload
});

export const wsOrdersGetData = (payload: IOrders) : IWSOrdersGetDataAction => ({
    type: WS_ORDERS_GET_DATA,
    payload
});

export const wsOrdersSend = (payload: string): IWSOrdersSendAction => ({
    type: WS_ORDERS_SEND,
    payload
});

export const wsOrdersConnectionClose = (): IWSOrdersConnectionCloseAction => ({
    type: WS_ORDERS_CONNECTION_CLOSE
});