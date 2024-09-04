import _ from "lodash";
import {defineStore, storeToRefs} from "pinia";
import {ref, reactive, nextTick} from "vue";

import useWsStore from "@/stores/ws";
import {useAuthStore} from "@/stores/auth";
import {create} from "@/services/chats";

export const useChatsStore = defineStore('chats', () => {
    const wsStore = useWsStore();
    const authStore = useAuthStore();

    const {ws} = storeToRefs(wsStore);

    const chat = ref([]);
    const messagesRefs = ref([]);
    const setMessageRef = (index) => (messagesRefs.value[index] = ref(null));

    const isLoadedChat = ref(false);
    const isSendMessage = ref(true);

    const headerChats = ref([]);
    const chatListen = reactive({chat: null});

    const emitHeaderChats = () => {
        ws.value.emit('chats:load', {
            limit: 5,
            user: authStore.user.id
        });
    };

    const onHeaderChats = () => {
        ws.value.on('chats:load', (data) => {
            headerChats.value = data.chats;
        });
    };

    const emitChatListen = (chatId, filters = {}) => {
        isLoadedChat.value = false;
        ws.value.emit('chat:listen', {
            user: authStore.user.id,
            chatId,
            filters,
        });
    };

    const onChatListen = () => {
        ws.value.on('chat:listen', async (data: any) => {
            const countMessages = data.messages.data.length;
            if (Array.isArray(chatListen.chat?.messages?.data)) {
                data.messages.data = [...data.messages.data.reverse(), ...chatListen.chat.messages.data];
                chatListen.chat.messages = data.messages;
            } else {
                chatListen.chat = data;
                chatListen.chat.messages.data = chatListen.chat.messages.data.reverse();
            }

            await nextTick();

            if (countMessages) {
                chat.value.scrollTop = messagesRefs.value[13].value[0].offsetTop - 15;
            }
        });
    };

    const messageSendCbs = ref([]);
    const onMessageSend = () => {
        ws.value.on('message:send', async (data) => {
            if (!chatListen.chat) return;

            chatListen.chat.messages.data.push(data);
            isSendMessage.value = true;

            for (let cb of messageSendCbs.value) {
                await cb();
            }
        });
    };

    const bindEvents = () => {
        onHeaderChats();
        onChatListen();
        onMessageSend();
    };

    /**
     * Отправка сообщения
     *
     * @param messageData
     */
    const sendMessage = (messageData) => {
        isSendMessage.value = false;

        ws.value.emit('message:send', {
            user: authStore.user.id,
            chatId: chatListen.chat.id,
            message: messageData,
        });
    };

    /**
     * Создание чата
     *
     * @param participantId
     */
    const createChat = async (participantId: number) => {
        return await create(participantId);
    };

    return {
        chat,
        messagesRefs,
        setMessageRef,

        isSendMessage,
        isLoadedChat,

        headerChats,
        chatListen,
        messageSendCbs,
        emitHeaderChats,
        onHeaderChats,
        emitChatListen,
        sendMessage,
        createChat,
        bindEvents,
    }
});