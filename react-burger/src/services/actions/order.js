import { postCreateOrder } from "../../utils/api";

export const CREATE_ORDER_REQUEST = 'REATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'REATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED ='CREATE_ORDER_FAILED';
export const CLEAR_ORDER_NUMBER = 'CLEAR_ORDER_NUMBER';

export function createOrder(ingredients) {
  return function(dispatch) {
    dispatch({
        type: CREATE_ORDER_REQUEST
    });

    postCreateOrder(ingredients)
    .then((model) => {
        if (model && model.success) {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                number: model.order.number
            });
        } else {
          throw new Error('Failed to receive data from the server. In the response model "success":false');
        }
      })
    .catch(e => dispatch({ type: CREATE_ORDER_FAILED }));
  }
} 