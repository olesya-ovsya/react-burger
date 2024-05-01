export function getAccessToken() {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + 'accessToken'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

export function setAccessToken(value) {
  const d = new Date();
  let exp = 1200;
  d.setTime(d.getTime() + exp * 1000);
  exp = d;
  value = encodeURIComponent(value);
  let updatedCookie = 'accessToken' + '=' + value + '; ' + 'expires=' + exp;
  document.cookie = updatedCookie;
}

export function deleteAccessToken() {
  let updatedCookie = 'accessToken' + '=' + null + '; ' + 'expires=' + -1;
  document.cookie = updatedCookie;
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken') ?? null;
}

export function setRefreshToken(value) {
  localStorage.setItem('refreshToken', value);
}

export function deleteRefreshToken() {
  localStorage.removeItem('refreshToken');
}

export function isAuthorized() {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  return accessToken !== null && refreshToken !== null;
}