import http from "../../plugins/http";

export const checkTelegram = (webAppInitData) => http.post('/auth/telegram/check', {web_app_init_data: webAppInitData});