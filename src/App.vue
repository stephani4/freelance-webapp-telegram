<script>
import {defineComponent} from "vue";
import { RouterView } from 'vue-router';

import ModalCreateTask from "./components/Modals/ModalCreateTask.vue";
import {useAuthStore} from "@/stores/auth";
import {useNotificationStore} from "@/stores/notification";
import {useStatusesStore} from "@/stores/statuses";

export default defineComponent({
  components: {
    RouterView,
    ModalCreateTask
  },

  async beforeCreate() {
    // Получем информацию о текущем пользователе
    // Срабатывает после перезагрузки страницы
    const {checkAuthUser} = useAuthStore();
    const {loadNotifications} = useNotificationStore();
    const {loadStatuses} = useStatusesStore();

    try {
      // Получаем данные по текущему пользователю
      await checkAuthUser();

      // Загружаем уведомления
      await loadNotifications();

      // Загружаем статусы
      await loadStatuses();
    } catch (e) {}
  }
});
</script>

<template>
  <RouterView />
  <ModalCreateTask />
</template>
