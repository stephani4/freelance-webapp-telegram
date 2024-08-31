import {ref} from "vue";
import {defineStore} from "pinia";
import moment from "moment";

import {load} from "@/services/notifications/load";
import {readed} from "@/services/notifications/readed";

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref([]);

    const loadNotifications = async () => {
        const response = await load();
        const notificationList = response.data.notifications;
        notificationList.forEach(notice => {
            notice.route = '#';

            const date = moment(notice.created_at, 'YYYY-MM-DD HH:mm:ss');
            notice.created_at = date.format('YYYY-MM-DD HH:mm:ss');
        });
        notifications.value = notificationList;
    };

    const toReadable = async (notificationId: number) => {
        const response = await readed(notificationId);
        const notice = response.data;
        const readableNotice = notifications.value.find(item => item.id === notice.id);
        readableNotice.read_at = notice.read_at;
    };

    return {notifications, loadNotifications, toReadable};
});