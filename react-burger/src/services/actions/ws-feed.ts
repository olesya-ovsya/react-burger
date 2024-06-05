import { IOrders } from "../../utils/shared-prop-types";

export const WS_FEED_CONNECTION_START: 'WS_FEED_CONNECTION_START' = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_SUCCESS: 'WS_FEED_CONNECTION_SUCCESS' = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED_CONNECTION_ERROR' = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED_CONNECTION_CLOSED' = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_DATA: 'WS_FEED_GET_DATA' = 'WS_FEED_GET_DATA';
export const WS_FEED_SEND: 'WS_FEED_SEND' = 'WS_FEED_SEND';
export const WS_FEED_CONNECTION_CLOSE: 'WS_FEED_CLOSE_CONNECTION' = 'WS_FEED_CLOSE_CONNECTION'; 

export interface IWSFeedConnectionStartAction {
    type: typeof WS_FEED_CONNECTION_START,
    payload: string
}

export interface IWSFeedConnectionSuccessAction {
    type: typeof WS_FEED_CONNECTION_SUCCESS,
    payload: Event
}

export interface IWSFeedConnectionErrorAction {
    type: typeof WS_FEED_CONNECTION_ERROR,
    payload: Event
}

export interface IWSFeedConnectionClosedAction {
    type: typeof WS_FEED_CONNECTION_CLOSED,
    payload: Event
}

export interface IWSFeedGetDataAction {
    type: typeof WS_FEED_GET_DATA,
    payload: IOrders
}

export interface IWSFeedSendAction {
    type: typeof WS_FEED_SEND,
    payload: string
}

export interface IWSFeedConnectionCloseAction {
    type: typeof WS_FEED_CONNECTION_CLOSE
}

export type TWSFeedActions = IWSFeedConnectionStartAction
    | IWSFeedConnectionSuccessAction
    | IWSFeedConnectionErrorAction
    | IWSFeedConnectionClosedAction
    | IWSFeedGetDataAction
    | IWSFeedSendAction
    | IWSFeedConnectionCloseAction;

export const wsFeedConnectionStart = (payload: string) : IWSFeedConnectionStartAction => ({
    type: WS_FEED_CONNECTION_START,
    payload
});

export const wsFeedConnectionSuccess = (payload: Event) : IWSFeedConnectionSuccessAction => ({
    type: WS_FEED_CONNECTION_SUCCESS,
    payload
});

export const wsFeedConntectionError = (payload: Event) : IWSFeedConnectionErrorAction => ({
    type: WS_FEED_CONNECTION_ERROR,
    payload
});

export const wsFeedConntectionClosed = (payload: Event) : IWSFeedConnectionClosedAction => ({
    type: WS_FEED_CONNECTION_CLOSED,
    payload
});

export const wsFeedGetData = (payload: IOrders) : IWSFeedGetDataAction => ({
    type: WS_FEED_GET_DATA,
    payload
});

export const wsFeedSend = (payload: string): IWSFeedSendAction => ({
    type: WS_FEED_SEND,
    payload
});

export const wsFeedConnectionClose = (): IWSFeedConnectionCloseAction => ({
    type: WS_FEED_CONNECTION_CLOSE
});
