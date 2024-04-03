export const CREATE_ORDER_REQUEST = 'REATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'REATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED ='CREATE_ORDER_FAILED';
export const CLEAR_ORDER_NUMBER = 'CLEAR_ORDER_NUMBER';

const URL = "https://norma.nomoreparties.space/api/orders";

export function createOrder(ingredients) {
  return function(dispatch) {
    dispatch({
        type: CREATE_ORDER_REQUEST
    });

    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ingredients })
    };

    fetch(URL, requestInfo)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      dispatch({ type: CREATE_ORDER_FAILED});
      return Promise.reject(`Ошибка ${response.status}`);
    })
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