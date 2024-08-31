<script>
import {defineComponent} from "vue";
import {mapState, storeToRefs} from "pinia";

import HeaderArea from '@/components/Header/HeaderArea.vue'
import SidebarArea from '@/components/Sidebar/SidebarArea.vue'

import {useAuthStore} from "@/stores/auth";
import {useNotificationStore} from "@/stores/notification";
import {useChatsStore} from "@/stores/chats";

export default defineComponent({
  setup() {
    const notificationStore = useNotificationStore();
    const chatsStore = useChatsStore();

    const toReadable = async (notification) => {
      if (notification.read_at) return;
      await notificationStore.toReadable(notification.id);
    };

    return {toReadable};
  },
  computed: {
    ...mapState(useAuthStore, ['auth', 'user']),
    ...mapState(useNotificationStore, ['notifications']),
    ...mapState(useChatsStore, ['headerChats']),
  },
  components: {
    HeaderArea,
    SidebarArea
  },
})
</script>

<template>
  <!-- ===== Page Wrapper Start ===== -->
  <div class="flex h-screen overflow-hidden">
    <!-- ===== Sidebar Start ===== -->
    <SidebarArea v-if="auth && user?.register"/>
    <!-- ===== Sidebar End ===== -->

    <!-- ===== Content Area Start ===== -->
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <!-- ===== Header Start ===== -->
      <HeaderArea
          v-if="auth && user?.register"
          :chats="headerChats"
          :notifications="notifications"
          :readableNoticeHandler="toReadable"
      />
      <!-- ===== Header End ===== -->

      <!-- ===== Main Content Start ===== -->
      <main>
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <slot></slot>
        </div>
      </main>
      <!-- ===== Main Content End ===== -->
    </div>
  </div>
  <!-- ===== Page Wrapper End ===== -->
</template>
