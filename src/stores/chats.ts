import {defineStore, storeToRefs} from "pinia";
import {ref, reactive} from "vue";
import useWsStore from "@/stores/ws";
import {useAuthStore} from "@/stores/auth";

export const useChatsStore = defineStore('chats', () => {
    const wsStore = useWsStore();
    const authStore = useAuthStore();

    const {ws} = storeToRefs(wsStore);

    const isLoadedChat = ref(false);
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

    const onceChatListen = () => {
        isLoadedChat.value = true;
        ws.value.once('chat:listen', (data) => {
            chatListen.chat = data;
        });
    };

    onceChatListen();

    return {
        isLoadedChat,
        headerChats,
        chatListen,
        emitHeaderChats,
        onHeaderChats,
        emitChatListen,
    }
});