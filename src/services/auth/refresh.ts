import http from "../../plugins/http";

export const refresh = (telegramID: number) => http.post('/auth/telegram/refresh', {telegram_id: telegramID});