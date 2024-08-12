<script lang="ts">
import {ref, defineComponent, watch, computed} from 'vue'
import {useTasksStore} from "@/stores/tasks";
import {useServiceCategoriesStore} from "@/stores/serviceCategories";
import {useToast} from "primevue/usetoast";

import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TableThree from '@/components/Tables/TableThree.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TableTasks from "@/components/Tables/TableTasks.vue";
import BaseModal from "@/components/Modals/BaseModal.vue";
import CreateCategoryForm from "@/components/Forms/TaskCreateForm.vue";
import Toast from "primevue/toast";
import Chip from "primevue/chip";

export default defineComponent({
  setup() {
    const toast = useToast();

    const {v, taskForm, tasksBase, createTask} = useTasksStore();
    const {
      childCategories,
      isLoadSubCategories,
      loadChildrenByParent
    } = useServiceCategoriesStore();

    const pageName = computed(() => {
      return `Список заказов - новых заказов за сутки: ${tasksBase.countByDate}`
    });

    const removeSelectCategory = async (event) => {
      taskForm.category = 0;
      await loadChildrenByParent(1);
    };

    const createVisibleModal = ref(false);

    const toCreateTask = async () => {
      const resultCreate = await createTask(taskForm);
      if (!resultCreate) return;

      createVisibleModal.value = false;
      toast.add({ severity: 'success', summary: 'Создание задачи', detail: 'Задача успешно создана', life: 3000 });
    };

    const pageTitle = ref('Список заказов');

    watch(
        () => taskForm.category,
        async (parent) => {
          if (parent) {
            await loadChildrenByParent(parent.id);
          }
        }
    );

    loadChildrenByParent(1)
        .then()
        .catch(e => e);

    return {
      v,
      taskForm,
      tasksBase,
      pageTitle,
      pageName,
      createVisibleModal,
      childCategories,
      loadChildrenByParent,
      removeSelectCategory,
      toCreateTask,
    };
  },
  components: {
    BaseModal,
    CreateCategoryForm,
    BreadcrumbDefault,
    TableTasks,
    TableThree,
    DefaultLayout,
    Toast,
    Chip
  },
  async beforeRouteEnter(to, from, next) {
    const {loadBaseTasks} = useTasksStore();
    await loadBaseTasks();

    next();
  }
});
</script>

<template>
  <DefaultLayout>
    <Toast />

    <BaseModal
        @changeVisible="(value) => createVisibleModal = value"
        :visible="createVisibleModal"
        header="Создание задачи"
    >
      <template v-slot:bodyModal>
        <CreateCategoryForm
            @create="toCreateTask"
            @cancel="createVisibleModal = false"
            :validator="v"
            :children="childCategories"
            :form="taskForm"
        >
          <template v-slot:selectedCategory>
            <span v-if="taskForm.category">
              <Chip @remove="removeSelectCategory" :label="taskForm.category.name" removable />
            </span>
          </template>
        </CreateCategoryForm>
      </template>
    </BaseModal>

    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageName="pageTitle" :pageTitle="pageTitle"/>
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-10">
      <TableTasks :name="pageName">
        <template v-slot:control>
          <!-- Extracting component classes: -->
          <button
              @click="createVisibleModal = true"
              class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
            +
          </button>
        </template>
      </TableTasks>
    </div>
  </DefaultLayout>
</template>
