import { 
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_SUCCESS,
    CLEAR_ORDER_NUMBER 
} from "../actions/order";
import {
    createOrderRequest,
    createOrderSuccess,
    createOrderFailed,
    clearOrderNumber
} from '../actions/order';
import { orderReducer } from "./order";

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {}))
        .toEqual(
            {
                orderNumber: null,
                createOrderRequest: false,
                createOrderFailed: false
            }
        )
    });

    const testOrderNumber = 101;

    it(`should handle ${CREATE_ORDER_REQUEST}`, () => {
        expect(orderReducer(undefined, createOrderRequest()))
        .toEqual(
            {
                orderNumber: null,
                createOrderRequest: true,
                createOrderFailed: false
            }
        )
    });

    it(`should handle ${CREATE_ORDER_SUCCESS}`, () => {
        expect(orderReducer(
            {
                orderNumber: null,
                createOrderRequest: true,
                createOrderFailed: false
            },
            createOrderSuccess(testOrderNumber)))
        .toEqual(
            {
                orderNumber: testOrderNumber,
                createOrderRequest: false,
                createOrderFailed: false
            }
        )
    });

    it(`should handle ${CREATE_ORDER_FAILED}`, () => {
        expect(
            orderReducer({ 
                orderNumber: testOrderNumber,
                createOrderRequest: true,
                createOrderFailed: false
            },
            createOrderFailed()))
        .toEqual(
            {
                orderNumber: null,
                createOrderRequest: false,
                createOrderFailed: true
            }
        )
    });

    it(`should handle ${CLEAR_ORDER_NUMBER}`, () => {
        expect(
            orderReducer({ 
                orderNumber: testOrderNumber,
                createOrderRequest: false,
                createOrderFailed: false
            },
            clearOrderNumber()))
        .toEqual(
            {
                orderNumber: null,
                createOrderRequest: false,
                createOrderFailed: false
            }
        )
    });
});