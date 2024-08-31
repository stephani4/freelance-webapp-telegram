<script setup lang="ts">
import {onMounted, ref, computed} from "vue";
import {storeToRefs} from "pinia";

import {useUsers} from "@/stores/users";
import {useRolesStore} from "@/stores/roles";
import {useToast} from "primevue/usetoast";

import Toast from "primevue/toast";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import TableUsers from "@/components/Tables/Admin/TableUsers.vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";

import Button from "primevue/button";

const selectedUser = ref('');
const usersStore = useUsers();
const rolesStore = useRolesStore();
const toast = useToast();

const updateUserRoleChanges = usersStore.updateUserRoleChanges;
const usersPagination       = usersStore.usersPaginate;
const usersLoader           = usersStore.loadUsersList;

const saveUserRoles = async () => {
  await usersStore.updateUserRoles();
  toast.add({ severity: 'info', summary: 'Успешно обновлено', detail: 'Успешно обновлено', life: 3000 });
};

const loadRoles = rolesStore.loadRoles;
const {roles} = storeToRefs(rolesStore);

const op = ref();
const viewRolesPopover = ({event, data}) => {
  selectedUser.value = data.id;
  op.value.toggle(event);
};

const pageTitle = "Все пользователи";

onMounted(async () => {
  await usersLoader();
  await loadRoles();
});
</script>

<template>
  <DefaultLayout>
    <Toast />
    <BreadcrumbDefault
        :page-name="pageTitle"
        :pageTitle="pageTitle"
    />

    <div class="flex justify-end mb-2">
      <Button @click="saveUserRoles" outlined severity="info" rounded size="small" icon="pi pi-save" />
    </div>

    <TableUsers
        @updateUserRoles="updateUserRoleChanges"
        @toggleViewRoles="viewRolesPopover"
        :users="usersPagination"
        :roles="roles"
    />
  </DefaultLayout>
</template>
