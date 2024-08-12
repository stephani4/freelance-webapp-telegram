<script setup lang="ts">
import {onMounted, ref, computed} from "vue";
import {useUsers} from "@/stores/users";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import TableUsers from "@/components/Tables/Admin/TableUsers.vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import Popover from "primevue/popover";
import Checkbox from 'primevue/checkbox';
import Button from "primevue/button";

const selectedUser = ref('');

const usersStore = useUsers();
const usersPagination = usersStore.usersPaginate;
const usersLoader = usersStore.loadUsersList;

const op = ref();
const viewRolesPopover = ({event, data}) => {
  selectedUser.value = data.id;
  op.value.toggle(event);
};

const selectedUserRole = computed(() => {
  if (!selectedUser.value) return false;
  return usersPagination.list.find(user => user.id === selectedUser.value);
});

const pageTitle = "Все пользователи";

onMounted(async () => {
  await usersLoader();
});
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault
        :page-name="pageTitle"
        :pageTitle="pageTitle"
    />

    <div class="flex justify-end mb-2">
      <Button outlined severity="info" rounded size="small" icon="pi pi-save" />
    </div>

    <TableUsers
        @toggleViewRoles="viewRolesPopover"
        :users="usersPagination"
    />

    <Popover ref="op">
      <template v-if="selectedUserRole">
        <template v-for="(role, i) in selectedUserRole.roles">
          <Checkbox :inputId="role.id" name="category" :value="role.id" />
          <label :for="role.id">&nbsp;{{ role.name }}</label>
        </template>
      </template>
    </Popover>
  </DefaultLayout>
</template>
