<script lang="ts">

import {ref, defineComponent, watch, computed} from 'vue';
import {storeToRefs} from "pinia";
import {useTasksStore} from "@/stores/tasks";
import {useStatusesStore} from "@/stores/statuses";
import {usePeriodExecutionStore} from "@/stores/period-execution";

import TaskRequestForm from "@/components/Forms/TaskRequestForm.vue";
import BaseModal from "@/components/Modals/BaseModal.vue";
import SidebarFilterTasks from "@/components/Sidebar/SidebarFilterTasks.vue";
import TaskCardList from "@/components/CardLists/TaskCardList.vue";
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Button from "primevue/button";
import Toast from "primevue/toast";
import Chip from "primevue/chip";
import Badge from "primevue/badge";

export default defineComponent({
  name: 'TasksView',

  setup(props, {emit}) {
    const visibleFilter = ref(false);
    const visibleRequestModal = ref(false);

    const pageTitle = "Биржа заказов";

    const taskStore = useTasksStore();
    const statusesStore = useStatusesStore();
    const periodExecutionStore = usePeriodExecutionStore();

    const taskRequestForm = taskStore.taskRequestForm;
    const taskRequestFormV = taskStore.taskRequestFormV;
    const {selectedTaskRequest} = storeToRefs(taskStore);

    const activeTasks     = taskStore.activeTasks;
    const filterTasks     = taskStore.filterTasks;
    const statuses        = statusesStore.statuses;
    const executions      = periodExecutionStore.executions;

    const sendTaskRequest = async () => {
      const validate = await taskRequestFormV.$validate();

      if (!validate || !selectedTaskRequest.value.id) return;

      const response = await taskStore.sendTaskRequest(selectedTaskRequest.value.id);
      visibleRequestModal.value = false;
    };

    const openModalTaskRequest = (task) => {
      selectedTaskRequest.value = task;
      visibleRequestModal.value = true;
    };

    const loadActiveTasks = async () => {
      await taskStore.loadActiveTasks();
      visibleFilter.value = false;
    };

    return {
      filterTasks,
      visibleFilter,
      pageTitle,
      activeTasks,
      statuses,

      visibleRequestModal,

      executions,
      taskRequestForm,
      taskRequestFormV,
      selectedTaskRequest,
      openModalTaskRequest,

      loadActiveTasks,
      sendTaskRequest,
    }
  },
  components: {
    BaseModal,
    TaskRequestForm,
    SidebarFilterTasks,
    BreadcrumbDefault,
    DefaultLayout,
    TaskCardList,
    Button,
    Badge,
    Toast,
    Chip,
  },
  async beforeRouteEnter(to, from, next) {
    const {loadActiveTasks} = useTasksStore();
    const {loadStatuses} = useStatusesStore();

    await loadActiveTasks();
    await loadStatuses();

    next();
  },
});
</script>

<template>
  <DefaultLayout>
    <BaseModal
        :header="`Запрос на выполнение заказа`"
        :visible="visibleRequestModal"
        @changeVisible="visibleRequestModal = !visibleRequestModal"
    >
      <template v-slot:bodyModal>
        <TaskRequestForm
            @submit="sendTaskRequest"
            :validator="taskRequestFormV"
            :executions="executions"
            :form="taskRequestForm"
        />
      </template>
    </BaseModal>

    <SidebarFilterTasks
        @toggleSearch="loadActiveTasks"
        @toggleVisible="(value) => visibleFilter = value"
        :visible="visibleFilter"
        :filterTasks="filterTasks"
    />

    <Toast/>

    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageName="pageTitle" :pageTitle="pageTitle">
      <template v-slot:badge>
        <Badge :value="activeTasks.total"></Badge>
      </template>
    </BreadcrumbDefault>
    <!-- Breadcrumb End -->

    <!-- Filter Button Start -->
    <div class="flex justify-end mb-2">
      <Button @click="visibleFilter = true" icon="pi pi-filter" aria-label="Фильтр" rounded outlined/>
    </div>
    <!-- Filter Button End -->

    <!-- Task List Start -->
    <TaskCardList
        @toggleSendRequest="openModalTaskRequest"
        :mode="`actives`"
        :tasks="activeTasks.list"
        :total="activeTasks.total"
        :statuses="statuses"
    />
    <!-- Task List End -->
  </DefaultLayout>
</template>
