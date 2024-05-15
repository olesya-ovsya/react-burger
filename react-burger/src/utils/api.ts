import { getAccessToken } from "./utils";
import { ILoginModel, IUserDataModel, IResetPasswordModel } from "./shared-prop-types";
import { IApiIngredient } from "./shared-prop-types";

type TResponse<T> = { success: boolean } & T;

type TUser = {
    email: string,
    name: string
}

type TToken = {
    accessToken: string,
    refreshToken: string
}

type TMessage = {
    message: string
}

type TOrder = {
    name: string,
    order: { number: number}
}

const BASE_URL = 'https://norma.nomoreparties.space/api';

const sendRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    return fetch(`${BASE_URL}/${endpoint}/`, options).then(checkResponse<T>);
}

const checkResponse = async <T>(response: Response): Promise<T> => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
}

export const getIngredients = () => {
    const requestInfo = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        }
    };
    return sendRequest<TResponse<{data: IApiIngredient[]}>>("ingredients", requestInfo);
};

export const postCreateOrder = (ingredients: Array<string>) => {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + getAccessToken()
        },
        body: JSON.stringify({ ingredients })
    };

    return sendRequest<TResponse<TOrder>>("orders", requestInfo);
}

export const getUser = () => {
    const requestInfo = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + getAccessToken()
        }
    };

    return sendRequest<TResponse<TUser>>('auth/user', requestInfo);
}

export const patchUser = (model: IUserDataModel) => {
    const requestInfo = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + getAccessToken()
        },
        body: JSON.stringify(model)
    };

    return sendRequest<TResponse<TUser>>('auth/user', requestInfo);
}

export const postRegister = (model: IUserDataModel) => {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(model)
    };

    return sendRequest<TResponse<TUser&TToken>>("auth/register", requestInfo);
}

export const postLogin = (model: ILoginModel) => {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(model)
    };

    return sendRequest<TResponse<TUser&TToken>>("auth/login", requestInfo);
}

export const postLogout = (refreshToken: string) => {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ token: refreshToken })
    };

    return sendRequest<TResponse<TMessage>>("auth/logout", requestInfo);
}

export const postToken = (refreshToken: string) => {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ token: refreshToken })
    };

    return sendRequest<TResponse<TToken>>("auth/token", requestInfo);
}

export const postCheckPasswordResetAvailable = (email: string) => {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ email })
    };

    return sendRequest<TResponse<TMessage>>("password-reset", requestInfo);
}

export const postResetPassword = (model: IResetPasswordModel) => {
    const requestInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(model)
    };

    return sendRequest<TResponse<TMessage>>('password-reset/reset', requestInfo);
}