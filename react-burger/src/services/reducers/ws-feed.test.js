import { 
    WS_FEED_CONNECTION_START,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_GET_DATA,
    WS_FEED_CONNECTION_CLOSE,
    WS_FEED_SEND
} from "../actions/ws-feed";
import {
    wsFeedConnectionStart,
    wsFeedConnectionSuccess,
    wsFeedConntectionError,
    wsFeedConntectionClosed,
    wsFeedGetData,
    wsFeedSend,
    wsFeedConnectionClose
} from '../actions/ws-feed';
import { wsFeedReducer } from "./ws-feed";

describe('ws-feed reducer', () => {

    const testState = {
        wsConnected: false,
        allOrders: [],
        total: 0,
        totalToday: 0,
        error: undefined
    };

    const errorEvent = new ErrorEvent('error');

    const testOrders = {
        success: true,
        orders: [
            {
                ingredients: ['id01', 'id02', 'id03', 'id01'],
                _id: '001',
                status: 'done',
                name: 'order1',
                number: 1,
                createdAt: '2024-06-01 15:00:00',
                updatedAt: '2024-06-01 15:01:00'
            },
            {
                ingredients: ['id01', 'id04', 'id05', 'id01'],
                _id: '002',
                status: 'done',
                name: 'order2',
                number: 2,
                createdAt: '2024-06-02 15:00:00',
                updatedAt: '2024-06-02 15:01:00'
            }
        ],
        total: 2,
        totalToday: 1
    }

    it('should return the initial state', () => {
        expect(wsFeedReducer(undefined, {}))
        .toEqual(testState)
    });

    it(`should handle ${WS_FEED_CONNECTION_START}`, () => {
        expect(wsFeedReducer(undefined, wsFeedConnectionStart('url')))
        .toEqual({ ...testState, wsConnected: false, error: undefined })
    });

    it(`should handle ${WS_FEED_CONNECTION_SUCCESS}`, () => {
        expect(wsFeedReducer(testState, wsFeedConnectionSuccess(new Event('connection success'))))
        .toEqual({ ...testState, wsConnected: true, error: undefined });
    });

    it(`should handle ${WS_FEED_CONNECTION_ERROR}`, () => {
        expect(wsFeedReducer(
            { ...testState, wsConnected: true },
            wsFeedConntectionError(errorEvent)))
        .toEqual({ ...testState, wsConnected: false, error: errorEvent });
    });

    it(`should handle ${WS_FEED_CONNECTION_CLOSED}`, () => {
        expect(wsFeedReducer(
            { ...testState, wsConnected: true },
            wsFeedConntectionClosed(new Event('connection closed'))))
        .toEqual({ ...testState, wsConnected: false, error: undefined });
    });

    it(`should handle ${WS_FEED_GET_DATA}`, () => {
        expect(wsFeedReducer(
            { ...testState, wsConnected: true },
            wsFeedGetData(testOrders)))
        .toEqual({
            ...testState,
            wsConnected: true,
            error: undefined,
            allOrders: testOrders.orders,
            total: testOrders.total,
            totalToday: testOrders.totalToday
        });
    });

    it(`should handle ${WS_FEED_CONNECTION_CLOSE}`, () => {
        expect(wsFeedReducer(
            { ...testState, wsConnected: true },
            wsFeedConnectionClose()))
        .toEqual({ ...testState, wsConnected: false, error: undefined });
    });

    it(`should handle ${WS_FEED_SEND}`, () => {
        expect(wsFeedReducer(undefined, wsFeedSend('')))
        .toEqual(testState)
    });
}); 