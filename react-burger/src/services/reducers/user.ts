import {
    GET_USER_REQUEST,
    GET_USER_FAILED,
    GET_USER_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from "../actions/user";
import { TUserActions } from "../actions/user";

export type TUserState = {
    name: string | null,
    email: string | null,
    authorized: boolean,
    getUserRequest: boolean,
    getUserFailed: boolean,
    loginRequest: boolean,
    loginFailed: boolean,
    logoutRequest: boolean,
    logoutFailed: boolean,
    updateUserDataRequest: boolean,
    updateUserDataFailed: boolean,
    registerRequest: boolean,
    registerFailed: boolean
}

const initialState: TUserState = {
    name: null,
    email: null,
    authorized: false,
    getUserRequest: false,
    getUserFailed: false,
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    updateUserDataRequest: false,
    updateUserDataFailed: false,
    registerRequest: false,
    registerFailed: false
}

export const userReducer = (
    state = initialState,
    action: TUserActions): TUserState => {
    switch(action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false,
                loginFailed: false,
                logoutFailed: false
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                email: action.user.email,
                name: action.user.name,
                authorized: true,
                getUserRequest: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                email: action.user.email,
                name: action.user.name,
                authorized: true,
                loginRequest: false
            };
        case GET_USER_FAILED:
            return {
                ...state,
                getUserFailed: true,
                getUserRequest: false
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                loginRequest: true,
                authorized: false
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loginFailed: true,
                loginRequest: false
            }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: false,
                authorized: false
            }
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            }
        }
        case UPDATE_USER_DATA_REQUEST: {
            return {
                ...state,
                updateUserDataRequest: true,
                updateUserDataFailed: false
            }
        }
        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                updateUserDataRequest: false,
                updateUserDataFailed: false,
                email: action.user.email,
                name: action.user.name
            }
        }
        case UPDATE_USER_DATA_FAILED: {
            return {
                ...state,
                updateUserDataRequest: false,
                updateUserDataFailed: true
            }
        }
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerFailed: false,
                authorized: false
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: false,
                email: action.user.email,
                name: action.user.name,
                authorized: true
            }
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true
            }
        }
        default:
            return state;
    }
};