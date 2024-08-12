import {ref} from "vue";
import {defineStore} from "pinia";
import moment from "moment";

import {load} from "@/services/notifications/load";

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

    return {notifications, loadNotifications};
});