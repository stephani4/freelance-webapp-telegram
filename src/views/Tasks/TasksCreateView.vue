<script lang="ts">
import {defineComponent, ref, reactive, watch} from 'vue';
import {storeToRefs} from "pinia";

import Card from "primevue/card";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import EditMyTaskForm from "@/components/Forms/EditMyTaskForm.vue";
import Button from "primevue/button";

import {useRouter} from "vue-router";
import {useTasksStore} from "@/stores/tasks";
import {useServiceCategoriesStore} from "@/stores/serviceCategories";
import {useFilesStore} from "@/stores/files";

export default defineComponent({
  setup() {
    const progressLoaders = reactive({
      progressLoadMainTemplate: 0,
    });

    const statusLoaders = reactive({
      loadMainTemplate: 'denied',
    });

    const imagesPaths = reactive({
      mainTemplatePath: '',
    });

    const pageTitle = ref('Создание задачи');

    const router = useRouter();
    const storeTask = useTasksStore();

    const createTask = storeTask.createTask;
    const resetFormToDefaultState = storeTask.resetFormToDefaultState;

    const fileStore = useFilesStore();
    const {payload} = fileStore;
    const {statusFileUpload} = storeToRefs(fileStore);

    const {form, v} = storeToRefs(storeTask);

    const uploadFilesTemplate = async (files) => {
      statusLoaders.loadMainTemplate = 'process';
      await fileStore.uploadFiles(
          files[0],
          'single',
          ({loaded, total}) => progressLoaders.progressLoadMainTemplate = (loaded / total) * 100
      );

      form.value.mainImage = payload.files.id;
      imagesPaths.mainTemplatePath = payload.path;

      statusLoaders.loadMainTemplate = 'complete';
    };

    const createTaskHandler = async () => {
      try {
        v.value.$touch();

        if (v.value.$invalid) return;

        // Создаем задачу
        const taskID = await createTask();

        // Переходим на страницу задач
        await router.push({name: 'tasks-my'});

        // Очищаем форму
        resetFormToDefaultState();

        // Сбрасываем валидатор
        v.value.$reset();
      } catch (e) {
        console.error(e.message);
      }
    }

    const storeServiceCategories = useServiceCategoriesStore();
    const {childCategories} = storeToRefs(storeServiceCategories);

    const progress = (data) => console.log(data);

    watch(
        () => form.value.category,
        async () => {
          if (form.value.category) {
            await storeServiceCategories.loadChildrenByParent(form.value.category.id);
          } else {
            await storeServiceCategories.loadChildrenByParent(1);
          }
        }
    )

    return {
      v,
      form,
      payload,
      pageTitle,
      childCategories,
      statusFileUpload,
      progressLoaders,
      statusLoaders,
      imagesPaths,

      progress,
      createTask,
      uploadFilesTemplate,
      createTaskHandler,
    };
  },
  components: {
    BreadcrumbDefault,
    EditMyTaskForm,
    DefaultLayout,
    Button,
    Card,
  },
  async beforeRouteEnter(to, from, next) {
    const {loadThreeCategories, loadChildrenByParent} = useServiceCategoriesStore();
    await loadChildrenByParent(1);
    await loadThreeCategories();
    next();
  }
})
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :page-name="pageTitle" :pageTitle="pageTitle"/>

    <Card>
      <template #content>
        <EditMyTaskForm
            @onUploadProgress="progress"
            @create="createTaskHandler"
            :imagesPaths="imagesPaths"
            :categories="childCategories"
            :uploader="uploadFilesTemplate"
            :statusLoading="statusFileUpload"
            :statusLoaders="statusLoaders"
            :progressLoaders="progressLoaders"
            :payload="payload"
            :validator="v"
            :form="form"
        />
      </template>
    </Card>
  </DefaultLayout>
</template>
