<script>
import {defineComponent, ref} from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import ChatForm from "@/components/Forms/ChatForm.vue";

import userThree from '@/assets/images/user/user-03.png'

import {useChatsStore} from "@/stores/chats";

export default defineComponent({
  setup(props, emit) {
    const chatStore = useChatsStore();
    const chatListen = chatStore.chatListen;

    const pageName = ref('Чат с пользователем');
    return {
      chatListen,
      pageName
    };
  },
  components: {
    DefaultLayout,
    BreadcrumbDefault,
    ChatForm,
    userThree,
  },
  beforeRouteEnter(to, from, next) {
    const chatStore = useChatsStore();
    const emitChatListen = chatStore.emitChatListen;

    const {chat} = to.params;
    emitChatListen(chat, {});

    next();
  },
});
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageName="pageName" :pageTitle="pageName" />

    {{ chatListen }}

    <template  v-if="chatListen?.chat?.id">
      <div
          v-for="(message, index) in chatListen.chat.messages"
          class="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
        <div class="h-12.5 w-12.5 rounded-full">
          <img :src="userThree" alt="User" />
        </div>

        <div>
          <h6 class="text-sm font-medium text-black dark:text-white">1</h6>
          <p class="text-sm">{{ message.message }}</p>
          <p class="text-xs">2</p>
        </div>
      </div>


    </template>

    <ChatForm />
  </DefaultLayout>
</template>
