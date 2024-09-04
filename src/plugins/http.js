import axios from 'axios';

import {useTokensStore} from "../stores/tokens";
import {useAuthStore} from "../stores/auth";
const {getAccessToken} = useTokensStore();

const http = axios.create({
    baseURL: 'https://k2wkk7-95-181-26-94.ru.tuna.am/api'
});

http.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
});

const HTTP_UNAUTHORIZED_CODE = 401;
const {log} = console;

http.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        log(error);

        const {refreshTokenUser} = useAuthStore();
        const response = error?.response;

        const status = response?.status;
        if (status === HTTP_UNAUTHORIZED_CODE) {
            // Обновляем токе по userID Telegram
            await refreshTokenUser(6812184116);
        }

        return Promise.reject(error);
    });

export default http;