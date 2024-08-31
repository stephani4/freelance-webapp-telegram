import {reactive, ref} from 'vue';
import {useRouter} from "vue-router";

import { defineStore } from 'pinia';

import type {Register} from "@/types/auth/register";

import {checkTelegram} from "@/services/auth/check-telegram";
import {register} from "@/services/auth/register";
import {check} from "@/services/auth/check";
import {refresh} from "@/services/auth/refresh";

import {useTokensStore} from "./tokens";

export const useAuthStore = defineStore('auth', () => {
    const
        auth = ref(false),
        user = reactive({}),
        mode = ref('webapp');

    const router = useRouter();

    const {setAccessToken, getAccessToken} = useTokensStore();

    const checkAuthUserWebapp = async (webAppInitData: string) => {
        try {
            const {data} = await checkTelegram(webAppInitData);
            const {user: userData, token} = data;

            // Устанавливаем токен
            setAccessToken(token);

            // Присваиваем данные пользователя
            for (let key of Object.keys(userData)) {
                user[key] = userData[key];
            }

            // Включаем авторизацию
            auth.value = true;
        } catch (e) {
            alert(e.message)
        }
    };

    const checkAuthUser = async () => {
        if (!getAccessToken()) {
            return;
        }

        const response = await check();
        const {user: userData} = response.data;

        for (let key of Object.keys(userData)) {
            user[key] = userData[key];
        }

        auth.value = true;

        const path = window.location.pathname;
        const excludePaths = ['auth/signup'];

        if (excludePaths.find(segment => (new RegExp(segment)).test(path))) {
            router.push({path: '/tasks/my' }).catch(e => console.error(e));
        } else {
            router.push({ path }).catch(e => console.error(e));
        }
    };

    const registerUser = async (data: Object) => {
        const requestData: Register = {
            description: data.description,
            specialty: data.specialty,
            email: data.email,
            name: data.name,
        };

        const response = await register(requestData);
        const {token} = response.data;

        setAccessToken(token);

        // Говорим, что пользователь авторизован
        auth.value = true;
        router.push({path: '/' }).catch(e => console.error(e));
    };

    const refreshTokenUser = async (telegramID: number) => {
        const response = await refresh(telegramID);
        const {token} = response.data;
        setAccessToken(token);
        auth.value = true;
    };

    const setMode = (newMode: string) => {
        mode.value = newMode;
    };

    return {
        auth,
        user,
        mode,

        setMode,
        registerUser,
        checkAuthUser,
        refreshTokenUser,
        checkAuthUserWebapp,
    };
})