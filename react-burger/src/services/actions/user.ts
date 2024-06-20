import { getUser, postLogin, postLogout, patchUser, postRegister } from "../../utils/api";
import {  setAccessToken, deleteAccessToken, setRefreshToken, getRefreshToken, deleteRefreshToken } from "../../utils/utils";
import { TUser, ILoginModel, IUserDataModel } from "../../utils/shared-prop-types";
import { AppDispatch, AppThunk } from "../types";

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' ='GET_USER_FAILED';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const UPDATE_USER_DATA_REQUEST: 'UPDATE_USER_DATA_REQUEST' = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_SUCCESS: 'UPDATE_USER_DATA_SUCCESS' = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED: 'UPDATE_USER_DATA_FAILED' = 'UPDATE_USER_DATA_FAILED';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export interface IGetUserRequestAction { type: typeof GET_USER_REQUEST }
export interface IGetUserSuccessAction { type: typeof GET_USER_SUCCESS, user: TUser }
export interface IGetUserFailedAction { type: typeof GET_USER_FAILED }

export interface ILoginRequestAction { type: typeof LOGIN_REQUEST }
export interface ILoginSuccessAction { type: typeof LOGIN_SUCCESS, user: TUser }
export interface ILoginFailedAction { type: typeof LOGIN_FAILED }

export interface ILogoutRequestAction { type: typeof LOGOUT_REQUEST }
export interface ILogoutSuccessAction { type: typeof LOGOUT_SUCCESS }
export interface ILogoutFailedAction { type: typeof LOGOUT_FAILED }

export interface IUpdateUserDataRequestAction { type: typeof UPDATE_USER_DATA_REQUEST }
export interface IUpdateUserDataSuccessAction { type: typeof UPDATE_USER_DATA_SUCCESS, user: TUser }
export interface IUpdateUserDataFailedAction { type: typeof UPDATE_USER_DATA_FAILED }

export interface IRegisterRequestAction { type: typeof REGISTER_REQUEST } 
export interface IRegisterSuccessAction { type: typeof REGISTER_SUCCESS, user: TUser }
export interface IRegisterFailedAction { type: typeof REGISTER_FAILED }

export type TUserActions = IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IUpdateUserDataRequestAction
  | IUpdateUserDataSuccessAction
  | IUpdateUserDataFailedAction
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction;

export const getUserRequest = (): IGetUserRequestAction => ({ type: GET_USER_REQUEST }); 
export const getUserSuccess = (user: TUser): IGetUserSuccessAction => ({ type: GET_USER_SUCCESS, user });
export const getUserFailed = (): IGetUserFailedAction => ({ type: GET_USER_FAILED });

export const loginRequest = (): ILoginRequestAction => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user: TUser): ILoginSuccessAction => ({ type: LOGIN_SUCCESS, user });
export const loginFailed = (): ILoginFailedAction => ({ type: LOGIN_FAILED });

export const logoutRequest = (): ILogoutRequestAction => ({ type: LOGOUT_REQUEST });
export const logoutSuccess = (): ILogoutSuccessAction => ({ type: LOGOUT_SUCCESS }); 
export const logoutFailed = (): ILogoutFailedAction => ({ type: LOGOUT_FAILED });

export const updateUserDataRequest = (): IUpdateUserDataRequestAction => ({ type: UPDATE_USER_DATA_REQUEST });
export const updateUserDataSuccess = (user: TUser) :IUpdateUserDataSuccessAction => ({
  type: UPDATE_USER_DATA_SUCCESS,
  user: user
});
export const updateUserDataFailed = (): IUpdateUserDataFailedAction => ({ type: UPDATE_USER_DATA_FAILED });

export const registerRequest = (): IRegisterRequestAction => ({ type: REGISTER_REQUEST });
export const registerSuccess = (user: TUser): IRegisterSuccessAction => ({ type: REGISTER_SUCCESS, user });
export const registerFailed = (): IRegisterFailedAction => ({ type: REGISTER_FAILED });

export const getCurrentUser = (): AppThunk => (dispatch: AppDispatch) =>  {
  dispatch(getUserRequest());
  
  getUser()
  .then((model) => {
      if (model && model.success) {

        dispatch(getUserSuccess(model.user));
      } else {
        throw new Error('Failed to receive data from the server. In the response model "success":false');
      }
    })
  .catch(e => dispatch(getUserFailed()));
}

export const login = (model: ILoginModel): AppThunk => (dispatch: AppDispatch) => {
  dispatch(loginRequest());

    postLogin(model)
    .then((model) => {
        if (model && model.success) {

          setRefreshToken(model.refreshToken);

          let accessToken = null;

          if (model.accessToken.indexOf('Bearer') === 0) {
            accessToken = model.accessToken.split('Bearer ')[1];
          }

          deleteAccessToken();
          setAccessToken(accessToken);

          dispatch(loginSuccess(model.user));
        } else {
          throw new Error('Failed to receive data from the server. In the response model "success":false');
        }
      })
    .catch(e => dispatch(loginFailed()));
}

export const logout = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(logoutRequest());

    const refreshToken = getRefreshToken() ?? '';

    postLogout(refreshToken)
    .then((model) => {
        if (model && model.success) {
          deleteRefreshToken();
          deleteAccessToken();
          dispatch(logoutSuccess());
        } else {
          throw new Error('Failed to receive data from the server. In the response model "success":false');
        }
      })
    .catch(e => dispatch(logoutFailed()));
}

export const updateUserData = (model: IUserDataModel): AppThunk => (dispatch: AppDispatch) => {
  return function(dispatch: AppDispatch) {
    dispatch(updateUserDataRequest());

    patchUser(model)
    .then((model) => {
        if (model && model.success) {
          dispatch(updateUserDataSuccess(model.user));
        } else {
          throw new Error('Failed to receive data from the server. In the response model "success":false');
        }
      })
    .catch(e => dispatch(updateUserDataFailed()));
  }
}

export const register = (model: IUserDataModel): AppThunk => (dispatch: AppDispatch) => {
  dispatch(registerRequest());

    postRegister(model)
    .then((model) => {
        if (model && model.success) {

          setRefreshToken(model.refreshToken);

          let accessToken = null;

          if (model.accessToken.indexOf('Bearer') === 0) {
            accessToken = model.accessToken.split('Bearer ')[1];
          }

          deleteAccessToken();
          setAccessToken(accessToken);

          dispatch(registerSuccess(model.user));
        } else {
          throw new Error('Failed to receive data from the server. In the response model "success":false');
        }
      })
    .catch(e => dispatch(registerFailed()));
}