import { getAccessToken } from "./utils";
import { ILoginModel, IUserDataModel, IResetPasswordModel } from "./shared-prop-types";

const BASE_URL = 'https://norma.nomoreparties.space/api';

function sendRequest(endpoint: string, options?: any) {
    
    return fetch(`${BASE_URL}/${endpoint}/`, options).then(checkResponse);
}

function checkResponse(response: Response) {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
}

export function getIngredients() {
    const requestInfo = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        }
    };
    return sendRequest("ingredients", requestInfo);
};

export function postCreateOrder(ingredients: Array<string>) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + getAccessToken()
        },
        body: JSON.stringify({ ingredients })
    };

    return sendRequest("orders", requestInfo);
}

export function getUser() {
    const requestInfo = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + getAccessToken()
        }
    };

    return sendRequest('auth/user', requestInfo);
}

export function patchUser(model: IUserDataModel) {
    const requestInfo = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + getAccessToken()
        },
        body: JSON.stringify(model)
    };

    return sendRequest('auth/user', requestInfo);
}

export function postRegister(model: IUserDataModel) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(model)
    };

    return sendRequest("auth/register", requestInfo);
}

export function postLogin(model: ILoginModel) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(model)
    };

    return sendRequest("auth/login", requestInfo);
}

export function postLogout(refreshToken: string) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ token: refreshToken })
    };

    return sendRequest("auth/logout", requestInfo);
}

export function postToken(refreshToken: string) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ token: refreshToken })
    };

    return sendRequest("auth/token", requestInfo);
}

export function postCheckPasswordResetAvailable(email: string) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ email })
    };

    return sendRequest("password-reset", requestInfo);
}

export function postResetPassword(model: IResetPasswordModel) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(model)
    };

    return sendRequest('password-reset/reset', requestInfo);
}