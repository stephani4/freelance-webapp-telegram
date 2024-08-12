import axios from 'axios';

import {useTokensStore} from "../stores/tokens";
const {getAccessToken} = useTokensStore();

import {useAuthStore} from "../stores/auth";

// import {useWebApp} from "vue-tg";
// const {webAppInit} = useWebApp();

const http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
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
            await refreshTokenUser(6812184116)
        }

        return Promise.reject(error);
    });

export default http;