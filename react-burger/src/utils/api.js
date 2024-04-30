import { getCookie } from "./utils";

const BASE_URL = 'https://norma.nomoreparties.space/api';

function sendRequest(endpoint, options) {
    return fetch(`${BASE_URL}/${endpoint}/`, options).then(checkResponse);
}

function checkResponse(response) {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
}

export function getIngredients() {
    return sendRequest("ingredients");
};

export function postCreateOrder(ingredients) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
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
          Authorization: 'Bearer ' + getCookie('accessToken')
        },
    };

    return sendRequest('auth/user', requestInfo);
}

export function patchUser(model) {
    const requestInfo = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(model)
    };

    return sendRequest('auth/user', requestInfo);
}

export function postRegister(model) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(model)
    };

    return sendRequest("auth/register", requestInfo);
}

export function postLogin(model) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(model)
    };

    return sendRequest("auth/login", requestInfo);
}

export function postLogout(refreshToken) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token: refreshToken })
    };

    return sendRequest("auth/logout", requestInfo);
}

export function postToken(refreshToken) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token: refreshToken })
    };

    return sendRequest("auth/token", requestInfo);
}

export function postCheckPasswordResetAvailable(email) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email })
    };

    return sendRequest("password-reset", requestInfo);
}

export function postResetPassword(model) {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(model)
    };

    return sendRequest('password-reset/reset', requestInfo);
}