import {reactive, ref} from 'vue';
import {useRouter} from "vue-router";

import { defineStore } from 'pinia';

import type {Register} from "@/types/auth/register";

import {register} from "@/services/auth/register";
import {check} from "@/services/auth/check";
import {refresh} from "@/services/auth/refresh";

import {useTokensStore} from "./tokens";

export const useAuthStore = defineStore('auth', () => {
    const
        auth = ref(false),
        user = reactive({});

    const router = useRouter();

    const {setAccessToken, getAccessToken} = useTokensStore();
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
            telegram_id: data.telegramId,
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

    return {
        auth,
        user,
        registerUser,
        checkAuthUser,
        refreshTokenUser,
    };
})