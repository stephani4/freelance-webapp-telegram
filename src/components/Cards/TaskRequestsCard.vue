<script setup lang="ts">
import {defineProps, defineEmits} from "vue";

import Button from "primevue/button";
import Card from "primevue/card";
import Badge from "primevue/badge";
import Chat from 'vue-material-design-icons/Chat.vue';


const props = defineProps({
  requests: Array,
});

const emits = defineEmits(["cancelRequest", "openChat"]);
</script>

<template>
  <Card v-for="(request, i) in props.requests" :key="i">
    <template #content>
      <div class="flex relative mb-2">
        <Badge
            value="Отклонен"
            severity="danger"
            class="ml-2 absolute"
            style="top: 0; right: 0"
        />
        <div class="grid grid-cols-1">
          <div class="flex flex-col gap-1">
            <span>Запрос от: {{ request.user.name }}</span>
            <span>Сообщение: {{ request.comment }}</span>
            <span>Сумма к выполнению: {{ request.prevent_price }} руб.</span>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <Button @click="emits('openChat', request)" label="Чат" size="small" outlined severity="primary">
          <Chat /> Открыть чат
        </Button>

        <Button v-if="request.status !== 'cancel'" label="Принять" size="small" outlined severity="success" />
        <Button @click="emits('cancelRequest', request)" v-if="request.status !== 'cancel'" label="Отказать" size="small" outlined severity="danger" />
      </div>
    </template>
  </Card>
</template>
