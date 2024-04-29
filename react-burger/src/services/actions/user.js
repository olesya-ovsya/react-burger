import { getUser } from "../../utils/api";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED ='GET_USER_FAILED';

export function getCurrentUser() {
    return function(dispatch) {
      dispatch({
          type: GET_USER_REQUEST
      });
  
      getUser()
      .then((model) => {
          if (model && model.success) {
              dispatch({
                  type: GET_USER_SUCCESS,
                  user: model.user
              });
          } else {
            throw new Error('Failed to receive data from the server. In the response model "success":false');
          }
        })
      .catch(e => dispatch({ type: GET_USER_FAILED }));
    }
  }