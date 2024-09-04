<script lang="ts" setup>
import {defineProps} from "vue";

import userThree from '@/assets/images/user/user-03.png'

const props = defineProps({
  chats: Array,
});

</script>

<template>
  <template v-for="(chat, index) in props.chats">
    <router-link :to="{name: 'chat', params: {chat: chat.id}}">
      <div
          class="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
        <div class="h-12.5 w-12.5 rounded-full">
          <img :src="userThree" alt="User" />
        </div>

        <div>
          <h6 class="text-sm font-medium text-black dark:text-white">{{ chat.members[0].users_name }}</h6>
          <p class="text-sm">{{ chat.message_text }}</p>
          <p class="text-xs">{{ chat.message_created_at }}</p>
        </div>
      </div>
    </router-link>
  </template>

</template>