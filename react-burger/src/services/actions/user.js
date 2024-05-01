import {
  getUser,
  postLogin,
  postLogout,
  patchUser,
  postRegister
} from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/utils";

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

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function login(email, password) {
  return function(dispatch) {
    dispatch({ type: LOGIN_REQUEST });

    postLogin({email, password})
    .then((model) => {
        if (model && model.success) {

          localStorage.setItem('refreshToken', model.refreshToken);

          let accessToken;

          if (model.accessToken.indexOf('Bearer') === 0) {
            accessToken = model.accessToken.split('Bearer ')[1];
          }

          deleteCookie('accessToken');
          setCookie('accessToken', accessToken, { expires: 2000 });

            dispatch({
                type: LOGIN_SUCCESS,
                user: model.user
            });
        } else {
          throw new Error('Failed to receive data from the server. In the response model "success":false');
        }
      })
    .catch(e => dispatch({ type: LOGIN_FAILED }));
  }
}

export const NEED_UPDATE_TOKEN = 'NEED_UPDATE_TOKEN';
export const USER_AUTHORIZED = 'USER_AUTHORIZED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export function logout() {
  return function(dispatch) {
    dispatch({ type: LOGOUT_REQUEST });

    const refreshToken = localStorage.getItem('refreshToken');

    postLogout(refreshToken)
    .then((model) => {
        if (model && model.success) {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
          dispatch({ type: LOGOUT_SUCCESS });
        } else {
          throw new Error('Failed to receive data from the server. In the response model "success":false');
        }
      })
    .catch(e => dispatch({ type: LOGOUT_FAILED }));
  }
}

export const UPDATE_USER_DATA_REQUEST = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED';

export function updateUserData(model) {
  return function(dispatch) {
    dispatch({ type: UPDATE_USER_DATA_REQUEST });

    patchUser(model)
    .then((model) => {
        if (model && model.success) {
          dispatch({ type: UPDATE_USER_DATA_SUCCESS, user: model.user });
        } else {
          throw new Error('Failed to receive data from the server. In the response model "success":false');
        }
      })
    .catch(e => dispatch({ type: UPDATE_USER_DATA_FAILED }));
  }
}

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function register(model) {
  return function(dispatch) {
    dispatch({ type: REGISTER_REQUEST });

    postRegister(model)
    .then((model) => {
        if (model && model.success) {

          localStorage.setItem('refreshToken', model.refreshToken);

          let accessToken;

          if (model.accessToken.indexOf('Bearer') === 0) {
            accessToken = model.accessToken.split('Bearer ')[1];
          }

          deleteCookie('accessToken');
          setCookie('accessToken', accessToken, { expires: 2000 });

          dispatch({ type: REGISTER_SUCCESS, user: model.user });
        } else {
          throw new Error('Failed to receive data from the server. In the response model "success":false');
        }
      })
    .catch(e => dispatch({ type: REGISTER_FAILED }));
  }
}