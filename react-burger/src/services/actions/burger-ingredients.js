import { sendRequest } from '../../utils/request-helper';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_SUCCESS';

export function getBurgerIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        sendRequest("ingredients")
        .then((model) => {
            if (model && model.success) {
              dispatch({ type: GET_INGREDIENTS_SUCCESS, data: model.data });
            } else {
              throw new Error('Failed to receive data from the server. In the response model "success":false');
            }
          })
        .catch(e => dispatch({ type: GET_INGREDIENTS_FAILED }));
    }
}