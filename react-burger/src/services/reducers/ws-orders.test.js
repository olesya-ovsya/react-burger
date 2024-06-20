import { WS_ORDERS_CONNECTION_START,
    WS_ORDERS_CONNECTION_SUCCESS,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_GET_DATA,
    WS_ORDERS_CONNECTION_CLOSE,
    WS_ORDERS_SEND
 } from "../actions/ws-orders";
 import {
    wsOrdersConnectionStart,
    wsOrdersConnectionSuccess,
    wsOrdersConntectionError,
    wsOrdersConntectionClosed,
    wsOrdersGetData,
    wsOrdersSend,
    wsOrdersConnectionClose
 } from '../actions/ws-orders';
 import { wsOrdersReducer } from "./ws-orders";

 describe('ws-feed reducer', () => {

    const testState = {
        wsConnected: false,
        orders: [],
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
        expect(wsOrdersReducer(undefined, {}))
        .toEqual(testState)
    });

    it(`should handle ${WS_ORDERS_CONNECTION_START}`, () => {
        expect(wsOrdersReducer(undefined, wsOrdersConnectionStart('url')))
        .toEqual({ ...testState, wsConnected: false, error: undefined })
    });

    it(`should handle ${WS_ORDERS_CONNECTION_SUCCESS}`, () => {
        expect(wsOrdersReducer(testState, wsOrdersConnectionSuccess(new Event('connection success'))))
        .toEqual({ ...testState, wsConnected: true, error: undefined });
    });

    it(`should handle ${WS_ORDERS_CONNECTION_ERROR}`, () => {
        expect(wsOrdersReducer(
            { ...testState, wsConnected: true },
            wsOrdersConntectionError(errorEvent)))
        .toEqual({ ...testState, wsConnected: false, error: errorEvent });
    });

    it(`should handle ${WS_ORDERS_CONNECTION_CLOSED}`, () => {
        expect(wsOrdersReducer(
            { ...testState, wsConnected: true },
            wsOrdersConntectionClosed(new Event('connection closed'))))
        .toEqual({ ...testState, wsConnected: false, error: undefined });
    });

    it(`should handle ${WS_ORDERS_GET_DATA}`, () => {
        expect(wsOrdersReducer(
            { ...testState, wsConnected: true },
            wsOrdersGetData(testOrders)))
        .toEqual({
            ...testState,
            wsConnected: true,
            error: undefined,
            orders: testOrders.orders
        });
    });

    it(`should handle ${WS_ORDERS_CONNECTION_CLOSE}`, () => {
        expect(wsOrdersReducer(
            { ...testState, wsConnected: true },
            wsOrdersConnectionClose()))
        .toEqual({ ...testState, wsConnected: false, error: undefined });
    });

    it(`should handle ${WS_ORDERS_SEND}`, () => {
        expect(wsOrdersReducer(undefined, wsOrdersSend('')))
        .toEqual(testState)
    });
}); 