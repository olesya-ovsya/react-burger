import { postCreateOrder } from "../../utils/api";
import { AppDispatch, AppThunk } from "../types";

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED: 'CREATE_ORDER_FAILED' ='CREATE_ORDER_FAILED';
export const CLEAR_ORDER_NUMBER: 'CLEAR_ORDER_NUMBER' = 'CLEAR_ORDER_NUMBER';

export interface ICreateOrderRequestAction {
  type: typeof CREATE_ORDER_REQUEST
}

export interface ICreateOrderSuccessAction {
  type: typeof CREATE_ORDER_SUCCESS,
  number: number
}

export interface ICreateOrderFailedAction {
  type: typeof CREATE_ORDER_FAILED
}

export interface IClearOrderNumberAction {
  type: typeof CLEAR_ORDER_NUMBER
}

export type TOrderActions = ICreateOrderRequestAction
  | ICreateOrderSuccessAction
  | ICreateOrderFailedAction
  | IClearOrderNumberAction;

export const createOrderRequest = () : ICreateOrderRequestAction => ({
  type: CREATE_ORDER_REQUEST
});

export const createOrderSuccess = (number: number): ICreateOrderSuccessAction => ({
  type: CREATE_ORDER_SUCCESS,
  number: number
});

export const createOrderFailed = (): ICreateOrderFailedAction => ({
  type: CREATE_ORDER_FAILED
});

export const clearOrderNumber = (): IClearOrderNumberAction => ({
  type: CLEAR_ORDER_NUMBER
});

export const createOrder = (ingredients: string[]): AppThunk => (dispatch: AppDispatch) => {
  dispatch(createOrderRequest());

    postCreateOrder(ingredients)
    .then((model) => {
        if (model && model.success) {
            dispatch(createOrderSuccess(model.order.number));
        } else {
          throw new Error('Failed to receive data from the server. In the response model "success":false');
        }
      })
    .catch(e => dispatch(createOrderFailed()));
} 