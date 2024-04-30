import {
    GET_USER_REQUEST,
    GET_USER_FAILED,
    GET_USER_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    NEED_UPDATE_TOKEN,
    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED
} from "../actions/user";

const initialState = {
    name: null,
    email: null,
    authorized: false,
    getUserRequest: false,
    getUserFailed: false,
    loginRequest: false,
    loginFailed: false,
    updateTokenRequest: false,
    updateTokenFailed: false,
    logoutRequest: false,
    logoutFailed: false
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                getUserRequest: true
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
        case NEED_UPDATE_TOKEN:
            return {
                ...state,
                authorized: false
            }
        case UPDATE_TOKEN_REQUEST:
            return {
                ...state,
                updateTokenRequest: true,
                updateTokenFailed: false
            }
        case UPDATE_TOKEN_FAILED:
            return {
                ...state,
                updateTokenRequest: false,
                updateTokenFailed: true
            }
        case UPDATE_TOKEN_SUCCESS: {
            return {
                ...state,
                updateTokenRequest: false,
                updateTokenFailed: false,
                authorized: true
            }
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
        default:
            return state;
    }
};