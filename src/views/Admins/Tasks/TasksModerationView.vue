<script setup lang="ts">
import {ref, onMounted} from "vue";
import {storeToRefs, mapStores} from "pinia";
import {useTasksStore} from "@/stores/tasks";
import {useStatusesStore} from "@/stores/statuses";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import TaskCardList from "@/components/CardLists/TaskCardList.vue";

const {statuses, loadStatuses} = useStatusesStore();

const storeTasks = useTasksStore();
const {moderateTasks} = storeToRefs(storeTasks);

const pageTitle = ref('Модерация заказов');

const accept = async (id) => {
  const c = confirm('Действительно хотите подствердить задачу?');
  if (!c) return;

  await storeTasks.changeToAccept(id);
};

onMounted(async () => {
  await storeTasks.loadModerates();
  await loadStatuses();
});
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :page-name="pageTitle" :page-title="pageTitle"/>

    <TaskCardList
        @toggleAccept="accept"
        :mode="`moderate`"
        :tasks="moderateTasks.list"
        :total="moderateTasks.total"
        :statuses="statuses"
    />
  </DefaultLayout>
</template>
