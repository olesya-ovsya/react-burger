import { 
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_FAILED
} from "../actions/order-details";
import {
    getOrderDetailsRequest,
    getOrderDetailsSuccess,
    getOrderDetailsFailed
} from '../actions/order-details';
import { orderDetailsReducer } from "./order-details";

describe('order-details reducer', () => {
    it('should return the initial state', () => {
        expect(orderDetailsReducer(undefined, {}))
        .toEqual(
          {
            order: null,
            getOrderDetailsRequest: false,
            getOrderDetailsFailed: false
          }
        )
    });

    const testOrder = {
        _id: 'test',
        ingredients: [ 'id001', 'id002', 'id003', 'id001 '],
        owner: 'user',
        status: 'pending',
        name: 'order',
        createdAt: '2024-06-01 15:00:00',
        updatedAt: '2024-06-01 15:01:00',
        number: 1,
        __v: 1
    };

    it(`should handle ${GET_ORDER_DETAILS_REQUEST}`, () => {
        expect(orderDetailsReducer(undefined, getOrderDetailsRequest()))
        .toEqual(
            {
            order: null,
            getOrderDetailsRequest: true,
            getOrderDetailsFailed: false
            }
        )
    });

    it(`should handle ${GET_ORDER_DETAILS_SUCCESS}`, () => {
        expect(orderDetailsReducer(
            {
                order: null,
                getOrderDetailsRequest: true,
                getOrderDetailsFailed: false
            },
            getOrderDetailsSuccess(testOrder)))
        .toEqual(
            {
                order: testOrder,
                getOrderDetailsRequest: false,
                getOrderDetailsFailed: false
            }
        )
    });

    it(`should handle ${GET_ORDER_DETAILS_FAILED}`, () => {
        expect(
            orderDetailsReducer({ 
                order: testOrder,
                getOrderDetailsRequest: true,
                getOrderDetailsFailed: false
            },
            getOrderDetailsFailed()))
        .toEqual(
            {
                order: null,
                getOrderDetailsRequest: false,
                getOrderDetailsFailed: true
            }
        )
    });
});