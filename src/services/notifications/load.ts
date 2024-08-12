import http from "../../plugins/http";

/**
 * Загрузка уведомлений по текущему пользователю
 */
export const load = () => http.get('/telegram/notifications/current');