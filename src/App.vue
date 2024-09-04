<script>
import {defineComponent} from "vue";
import {storeToRefs} from "pinia";
import {RouterView} from 'vue-router';
import {useWebApp} from "vue-tg";

import ModalCreateTask from "./components/Modals/ModalCreateTask.vue";
import {useAuthStore} from "@/stores/auth";
import {useNotificationStore} from "@/stores/notification";
import {useStatusesStore} from "@/stores/statuses";
import useWsStore from "@/stores/ws";
import {useChatsStore} from "@/stores/chats";

export default defineComponent({
  components: {
    RouterView,
  },

  async beforeCreate() {
    const {setMode, checkAuthUserWebapp} = useAuthStore();
    const {mode} = storeToRefs(useAuthStore());

    const webAppInitData = useWebApp();
    const initData = webAppInitData?.initData;

    if (initData)
      setMode('webapp')
    else
      setMode('web');

    if (mode.value === 'webapp') {
      // Аутентификация в приложении по средством webapp init data
      await checkAuthUserWebapp(initData);
    }

    // Получем информацию о текущем пользователе
    // Срабатывает после перезагрузки страницы
    const {loadNotifications} = useNotificationStore();
    const {loadStatuses} = useStatusesStore();

    // Загружаем чаты
    const chatsStore = useChatsStore();
    const {emitHeaderChats, bindEvents} = chatsStore;
    emitHeaderChats();
    bindEvents();

    try {
      // Загружаем уведомления
      await loadNotifications();

      // Загружаем статусы
      await loadStatuses();
    } catch (e) {
      alert(e.message);
    }
  }
});
</script>

<template>
  <RouterView/>
</template>
