<script setup>
import {defineProps, defineEmits} from "vue";
import moment from "moment";

import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const normalizeDate = (date) => moment(new Date(date)).format("YYYY-MM-DD HH:mm:ss");

const emits = defineEmits(["toggleViewRoles"]);

const toggleViewRoles = (data) => emits('toggleViewRoles', data);

const props = defineProps({
  users: Object,
});
</script>

<template>
  <DataTable :value="props.users.list" paginator :rows="10" tableStyle="min-width: 50rem">
    <Column field="name" header="Имя"></Column>
    <Column field="specialty" header="Специальность"></Column>
    <Column field="role" header="Текущая роль"></Column>
    <Column field="created_at" header="Дата регистрации">
      <template #body="{data}">{{ normalizeDate(data.created_at) }}</template>
    </Column>
    <Column field="actions" header="">
      <template #body="{data}">
        <Button @click="(event) => toggleViewRoles({event, data})" size="small" outlined v-tooltip.left="'Изменение ролей пользователя'">
          <i class="pi pi-shield"></i>
        </Button>
      </template>
    </Column>
  </DataTable>
</template>
