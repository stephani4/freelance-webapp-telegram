<script>
import {defineComponent, ref, onMounted, nextTick} from "vue";
import {storeToRefs} from "pinia";
import moment from "moment";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import ChatForm from "@/components/Forms/ChatForm.vue";
import userThree from '@/assets/images/user/user-03.png'

import {useChatsStore} from "@/stores/chats";

export default defineComponent({
  setup(props, emit) {
    const chatStore = useChatsStore();
    const chatListen = chatStore.chatListen;

    const {chat} = storeToRefs(chatStore);
    const pageName = ref('Чат с пользователем');

    // Отправка сообщения
    const sendMessage = async (form) => {
      chatStore.sendMessage(form);
    };

    const formatMessageDate = (date) => moment(new Date(date)).format('DD.MM.YYYY HH:mm:ss');

    const scrollDownChat = async () => {
      await nextTick();

      const height = chat.value.scrollHeight;
      chat.value.scrollTo({
        top: height,
        behavior: 'smooth'
      });
    };

    chatStore.messageSendCbs.push(scrollDownChat);

    const setMessageRef = (index) => chatStore.setMessageRef(index);

    onMounted(() => {
      // Загружаем чаты с первой страницы, если только перешли на неё
      // Иначе, добавляем + 1 к странице, если scroll был произведен до самого верха
      chat.value.addEventListener('scroll', function (event) {
        const scrollTop = event.target.scrollTop;
        if (scrollTop === 0 && chatListen.chat) {
          chatStore.emitChatListen(chatListen.chat.id, {
            page: chatStore.chatListen?.chat?.messages?.current_page
                ? Number(chatStore.chatListen.chat.messages.current_page) + 1
                : 1,
          });
        }
      })
    })

    return {
      chat,
      formatMessageDate,
      sendMessage,
      chatListen,
      pageName,
      setMessageRef,
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
    emitChatListen(chat, {
      page: 0,
    });

    next();
  },
  beforeRouteLeave(to, from, next) {
    const chatStore = useChatsStore();
    chatStore.chatListen.chat = null;
    next();
  }
});
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageName="pageName" :pageTitle="pageName"/>

    <div ref="chat" id="chat" class="overflow-auto" style="height: calc(100vh - 15rem)">
      <template v-if="chatListen?.chat?.id">
        <div
            v-for="(message, index) in chatListen.chat.messages.data"
            :key="index"
            :ref="setMessageRef(index)"
            class="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 mb-1"
        >
          <div class="h-12.5 w-12.5 rounded-full">
            <img :src="userThree" alt="User"/>
          </div>

          <div>
            <h6 class="text-sm font-medium text-black dark:text-white">
              {{ message.chat_users.user.name }}
            </h6>
            <p class="text-sm">{{ message.message }}</p>
            <p class="text-xs">
              {{ formatMessageDate(message.created_at) }}
            </p>
          </div>
        </div>
      </template>
    </div>

    <ChatForm @toggleSend="sendMessage"/>
  </DefaultLayout>
</template>
