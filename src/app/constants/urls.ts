const BASE_URL = 'http://localhost:8081/api/';

export const API_URLS = {
  LOGIN: BASE_URL + 'auth/sign-in',
  REGISTER: BASE_URL + 'auth/sign-up',
  LOGOUT: BASE_URL + 'auth/logout',
  FORGOT_PASSWORD: BASE_URL + 'auth/forgot-password',
  RENEW_TOKEN: BASE_URL + 'auth/renew-token',
  ACCOUNTS: BASE_URL + 'accounts'
}
