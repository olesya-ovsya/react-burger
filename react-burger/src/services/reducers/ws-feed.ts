import { WS_FEED_CONNECTION_START,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_GET_DATA } from "../actions/ws-feed";
import { IOrderData } from "../../utils/shared-prop-types";
import { TWSFeedActions } from "../actions/ws-feed";

type TWSFeedState = {
    wsConnected: boolean,
    allOrders: IOrderData[],
    error?: Event
};

const initialState: TWSFeedState = {
    wsConnected: false,
    allOrders: []
};

export const wsFeedReducer = (
    state = initialState,
    action: TWSFeedActions) : TWSFeedState => {
    switch (action.type) {
        case WS_FEED_CONNECTION_START:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };
        case WS_FEED_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_FEED_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false,
            };
        case WS_FEED_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };
        case WS_FEED_GET_DATA:
            return {
                ...state,
                error: undefined,
                allOrders: action.payload.orders
            }
        default:
            return state;
    }
}