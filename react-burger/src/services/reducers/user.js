import { GET_USER_REQUEST, GET_USER_FAILED, GET_USER_SUCCESS } from "../actions/user";

const initialState = {
    name: null,
    email: null,
    authorized: false,
    getUserRequest: false,
    getUserFailed: false,
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false,
                authorized: false,
                name: null,
                email: null
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: false,
                authorized: true,
                email: action.user.email,
                name: action.user.name
            };
        case GET_USER_FAILED:
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: true,
                authorized: false,
                name: null,
                email: null
            };
        default:
            return state;
    }
};