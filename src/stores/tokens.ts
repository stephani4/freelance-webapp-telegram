import {ref} from 'vue';

export const useTokensStore = () => {
    const ACCESS_TOKEN_KEY = ref('access_token');

    const setAccessToken = (token) => localStorage.setItem(ACCESS_TOKEN_KEY.value, token);
    const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY.value);

    return {
        ACCESS_TOKEN_KEY,
        setAccessToken,
        getAccessToken,
    }
};