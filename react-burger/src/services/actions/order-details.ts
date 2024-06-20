import { getOrderDetails } from "../../utils/api";
import { IOrderDetails } from "../../utils/shared-prop-types";
import { AppDispatch, AppThunk } from "../types";


export const GET_ORDER_DETAILS_REQUEST: 'GET_ORDER_DETAILS_REQUEST' = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS: 'GET_ORDER_DETAILS_SUCCESS' = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED: 'GET_ORDER_DETAILS_FAILED' = 'GET_ORDER_DETAILS_FAILED';

export interface IGetOrderDetailsRequestAction {
    type: typeof GET_ORDER_DETAILS_REQUEST
}

export interface IGetOrderDetailsSuccessAction {
    type: typeof GET_ORDER_DETAILS_SUCCESS,
    order: IOrderDetails
}

export interface IGetOrderDetailsFailedAction {
    type: typeof GET_ORDER_DETAILS_FAILED
}

export type TOrderDetailsActions = IGetOrderDetailsRequestAction
    | IGetOrderDetailsSuccessAction
    | IGetOrderDetailsFailedAction;

export const getOrderDetailsRequest = () : IGetOrderDetailsRequestAction => ({
    type: GET_ORDER_DETAILS_REQUEST
});

export const getOrderDetailsSuccess = (order: IOrderDetails) : IGetOrderDetailsSuccessAction => ({
    type: GET_ORDER_DETAILS_SUCCESS,
    order
});

export const getOrderDetailsFailed = (): IGetOrderDetailsFailedAction => ({
    type: GET_ORDER_DETAILS_FAILED
});

export const getOrder = (number: number): AppThunk => (dispatch: AppDispatch) => {
    dispatch(getOrderDetailsRequest());

    getOrderDetails(number)
        .then((model) => {
            if (model && model.success && model.orders && model.orders.length > 0) {
                dispatch(getOrderDetailsSuccess(model.orders[0]));
            } else {
                throw new Error('Failed to receive data from the server');
            }
        })
        .catch(e => dispatch(getOrderDetailsFailed()));
}