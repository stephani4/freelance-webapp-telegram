<script>
import {defineComponent} from "vue";
import {mapState} from "pinia";

import HeaderArea from '@/components/Header/HeaderArea.vue'
import SidebarArea from '@/components/Sidebar/SidebarArea.vue'

import {useAuthStore} from "@/stores/auth";
import {useNotificationStore} from "@/stores/notification";

export default defineComponent({
  computed: {
    ...mapState(useAuthStore, ['auth']),
    ...mapState(useNotificationStore, ['notifications']),
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
    <SidebarArea v-if="auth" />
    <!-- ===== Sidebar End ===== -->

    <!-- ===== Content Area Start ===== -->
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <!-- ===== Header Start ===== -->
      <HeaderArea v-if="auth" :notifications="notifications" />
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
