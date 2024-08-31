<script setup>
import {defineProps, defineEmits} from "vue";
import moment from "moment";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import UserRolesPopover from "@/components/Popovers/UserRolesPopover.vue";

const emits = defineEmits(["updateUserRoles"]);

const normalizeDate = (date) => moment(new Date(date)).format("YYYY-MM-DD HH:mm:ss");

const props = defineProps({
  users: Object,
  roles: Array,
});

const updateRoles = (userRoles) => {
  emits("updateUserRoles", userRoles);
};
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
        <UserRolesPopover
            @updateUserRoles="updateRoles"
            :roles="props.roles"
            :users="props.users.list"
            :user="data"
        />
      </template>
    </Column>
  </DataTable>
</template>
