<script setup lang="ts">
import {defineProps, defineEmits} from "vue";

import Button from "primevue/button";
import Card from "primevue/card";
import Badge from "primevue/badge";

const props = defineProps({
  requests: Array,
});

const emits = defineEmits(["cancelRequest"]);
</script>

<template>
  <Card v-for="(request, i) in props.requests" :key="i">
    <template #content>
      <div class="flex relative">
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
        <Button @click="emits('cancelRequest', request)" v-if="request.status !== 'cancel'" label="Отказать" size="small" outlined severity="danger" />
        <Button v-if="request.status !== 'cancel'" label="Принять" size="small" outlined severity="success" />
      </div>
    </template>
  </Card>
</template>
