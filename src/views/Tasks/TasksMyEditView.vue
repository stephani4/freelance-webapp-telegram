<script lang="ts">
import {defineComponent, ref} from 'vue';

import Card from "primevue/card";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import EditMyTaskForm from "@/components/Forms/EditMyTaskForm.vue";
import {useTasksStore} from "@/stores/tasks";

export default defineComponent({
  setup() {
    const pageTitle = ref('Редактирование задачи');
    const {taskForm} = useTasksStore();
    return {
      taskForm,
      pageTitle,
    };
  },
  components: {
    BreadcrumbDefault,
    EditMyTaskForm,
    DefaultLayout,
    Card,
  },
  async beforeRouteEnter(to, from, next) {
    const {params} = to;
    const {loadMyTask} = useTasksStore();
    await loadMyTask(params.id);
    next();
  }
})
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :page-name="pageTitle" :pageTitle="pageTitle"/>

    <Card>
      <template #content>
        <EditMyTaskForm :form="taskForm" />
      </template>
    </Card>
  </DefaultLayout>
</template>
