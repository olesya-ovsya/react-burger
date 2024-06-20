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
import {
    getUserRequest,
    getUserSuccess,
    getUserFailed,
    loginRequest,
    loginSuccess,
    loginFailed,
    logoutRequest,
    logoutSuccess,
    logoutFailed,
    updateUserDataRequest,
    updateUserDataSuccess,
    updateUserDataFailed,
    registerRequest,
    registerSuccess,
    registerFailed
} from '../actions/user';
import { userReducer } from "./user";

describe('user reducer', () => {

    const testState = {
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
    };

    const testUser = {
        email: 'test@test.com',
        name: 'user'
    }

    const testUserUpdatedData = {
        email: 'new_test@test.com',
        name: 'new_user'
    }

    it('should return the initial state', () => {
        expect(userReducer(undefined, {}))
        .toEqual(testState)
    });

    // GET USER
    it(`should handle ${GET_USER_REQUEST}`, () => {
        expect(userReducer(undefined, getUserRequest()))
        .toEqual({ ...testState, getUserRequest: true })
    });

    it(`should handle ${GET_USER_SUCCESS}`, () => {
        expect(userReducer(
            { ...testState, getUserRequest: true },
            getUserSuccess(testUser)))
        .toEqual({ 
            ...testState,
            getUserRequest: false,
            name: testUser.name,
            email: testUser.email,
            authorized: true 
        })
    });

    it(`should handle ${GET_USER_FAILED}`, () => {
        expect(userReducer(
            { ...testState, getUserRequest: true }, 
            getUserFailed()))
        .toEqual({ ...testState, getUserRequest: false, getUserFailed: true })
    });

    // LOGIN
    it(`should handle ${LOGIN_REQUEST}`, () => {
        expect(userReducer(undefined, loginRequest()))
        .toEqual({ ...testState, loginRequest: true })
    });

    it(`should handle ${LOGIN_SUCCESS}`, () => {
        expect(userReducer(
            { ...testState, loginRequest: true },
            loginSuccess(testUser)))
        .toEqual({ 
            ...testState,
            loginRequest: false,
            name: testUser.name,
            email: testUser.email,
            authorized: true 
        })
    });

    it(`should handle ${LOGIN_FAILED}`, () => {
        expect(userReducer(
            { ...testState, loginRequest: true },
            loginFailed()))
        .toEqual({ ...testState, loginRequest: false, loginFailed: true })
    });

    // LOGOUT
    it(`should handle ${LOGOUT_REQUEST}`, () => {
        expect(userReducer(undefined, logoutRequest()))
        .toEqual({ ...testState, logoutRequest: true })
    });

    it(`should handle ${LOGOUT_SUCCESS}`, () => {
        expect(
            userReducer({ ...testState, logoutRequest: true },
            logoutSuccess(testUser)))
        .toEqual({ 
            ...testState,
            logoutRequest: false,
            authorized: false 
        })
    });

    it(`should handle ${LOGOUT_FAILED}`, () => {
        expect(
            userReducer({ ...testState, logoutRequest: true },
            logoutFailed()))
        .toEqual({ ...testState, logoutRequest: false, logoutFailed: true })
    });

    // UPDATE USER DATA
    it(`should handle ${UPDATE_USER_DATA_REQUEST}`, () => {
        expect(userReducer(undefined, updateUserDataRequest()))
        .toEqual({ ...testState, updateUserDataRequest: true })
    });

    it(`should handle ${UPDATE_USER_DATA_SUCCESS}`, () => {
        expect(
            userReducer({
                ...testState,
                email: testUser.email,
                name: testUser.name,
                updateUserDataRequest: true 
            },
            updateUserDataSuccess(testUserUpdatedData)))
        .toEqual({ 
            ...testState,
            updateUserDataRequest: false,
            name: testUserUpdatedData.name,
            email: testUserUpdatedData.email
        })
    });

    it(`should handle ${UPDATE_USER_DATA_FAILED}`, () => {
        expect(userReducer(
            {
                ...testState,
                email: testUser.email,
                name: testUser.name,
                updateUserDataRequest: true 
            },
            updateUserDataFailed()))
        .toEqual({
            ...testState,
            email: testUser.email,
            name: testUser.name,
            updateUserDataRequest: false,
            updateUserDataFailed: true
        })
    });

    // REGISTER
    it(`should handle ${REGISTER_REQUEST}`, () => {
        expect(userReducer(undefined, registerRequest()))
        .toEqual({ ...testState, registerRequest: true })
    });

    it(`should handle ${REGISTER_SUCCESS}`, () => {
        expect(userReducer(
            { ...testState, registerRequest: true },
            registerSuccess(testUser)))
        .toEqual({ 
            ...testState,
            registerRequest: false,
            name: testUser.name,
            email: testUser.email,
            authorized: true 
        })
    });

    it(`should handle ${REGISTER_FAILED}`, () => {
        expect(userReducer(
            { ...testState, registerRequest: true },
            registerFailed()))
        .toEqual({ ...testState, registerRequest: false, registerFailed: true })
    });
});