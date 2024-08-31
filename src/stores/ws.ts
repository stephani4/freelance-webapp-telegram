import {ref, onBeforeMount, computed, onUnmounted} from "vue";
import {defineStore} from "pinia";
import {io} from "socket.io-client";

const WEBSOCKET_SERVER_HOST = 'wss://8s3lc6-95-181-26-94.ru.tuna.am';

export default defineStore('wsStore', function () {
    const ws = ref(false);

    ws.value = io(WEBSOCKET_SERVER_HOST);

    ws.value.on("connection", () => {
        console.log("Connected to websocket server");
    });

    return {
        ws,
    };
})