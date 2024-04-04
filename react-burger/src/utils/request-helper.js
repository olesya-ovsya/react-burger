const BASE_URL = 'https://norma.nomoreparties.space/api';

export function sendRequest(endpoint, options) {
    return fetch(`${BASE_URL}/${endpoint}/`, options).then(checkResponse);
}

function checkResponse(response) {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
}