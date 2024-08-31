<script lang="ts">
import {defineComponent, watch, ref} from 'vue';

import Tabs from "primevue/tabs";
import Tab from "primevue/tab";
import TabList from "primevue/tablist";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";

import Badge from "primevue/badge";
import Card from "primevue/card";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import EditMyTaskForm from "@/components/Forms/EditMyTaskForm.vue";
import TaskRequestsCard from "@/components/Cards/TaskRequestsCard.vue";

import {useTasksStore} from "@/stores/tasks";
import {useTaskFilesStore} from "@/stores/task-files-store";
import {useServiceCategoriesStore} from "@/stores/serviceCategories";
import {storeToRefs} from "pinia";

export default defineComponent({
  setup() {
    const pageTitle = ref('Редактирование задачи');
    const taskStore = useTasksStore();
    const taskFileStore = useTaskFilesStore();
    const serviceCategoriesStore = useServiceCategoriesStore();

    const statusLoaders = taskFileStore.statusLoaders;
    const progressLoaders = taskFileStore.progressLoaders;

    const taskForm = taskStore.form;
    const taskFormV = taskStore.v;

    const {childCategories} = storeToRefs(serviceCategoriesStore);

    const uploadFiles = async (files) => {
      await taskFileStore.uploadFilesTemplate(files);
    };

    // Отклонение запроса
    const cancelRequest = async (request) => {
      await taskStore.cancelTaskRequest(taskForm.id, request.id);
    };

    // Обновление задачи
    const update = async () => {
      await taskStore.updateTask();
    };

    return {
      taskForm,
      taskFormV,
      statusLoaders,
      progressLoaders,
      pageTitle,
      childCategories,

      update,
      uploadFiles,
      cancelRequest,
    };
  },
  components: {
    Tab,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Badge,
    BreadcrumbDefault,
    EditMyTaskForm,
    TaskRequestsCard,
    DefaultLayout,
    Card,
  },
  async beforeRouteEnter(to, from, next) {
    const {params} = to;
    const {loadTask} = useTasksStore();
    const {loadThreeCategories, loadChildrenByParent} = useServiceCategoriesStore();
    await loadChildrenByParent(1);
    await loadThreeCategories();
    await loadTask(params.id);
    next();
  }
})
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :page-name="pageTitle" :pageTitle="pageTitle"/>

    <Tabs value="0" scrollable>
      <TabList>
        <Tab value="0">
          Задача
        </Tab>
        <Tab value="1">
          Запросы <Badge :value="taskForm.requests.filter(request => request.status === 'default').length" />
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <Card>
            <template #content>
              <EditMyTaskForm
                  @update="update"
                  :form="taskForm"
                  :categories="childCategories"
                  :validator="taskFormV"
                  :statusLoaders="statusLoaders"
                  :progressLoaders="progressLoaders"
                  :uploader="uploadFiles"
                  :mode="`edit`"
              />
            </template>
          </Card>
        </TabPanel>
        <TabPanel value="1">
          <TaskRequestsCard
              @cancelRequest="cancelRequest"
              :requests="taskForm.requests"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </DefaultLayout>
</template>
