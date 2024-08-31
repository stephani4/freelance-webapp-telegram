import http from "../../plugins/http";

export const readed = (notificationId: number) => {
    return http.post(`/telegram/notifications/${notificationId}/read`);
};