import http from "../../plugins/http";

export const check = () => http.post('/auth/telegram/check');