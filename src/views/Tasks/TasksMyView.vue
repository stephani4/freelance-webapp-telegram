<script>
import {defineComponent, ref} from 'vue';
import {useTasksStore} from "@/stores/tasks";
import {useStatusesStore} from "@/stores/statuses";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TaskCardList from "@/components/CardLists/TaskCardList.vue";
import Card from "primevue/card";
import Button from "primevue/button";

export default defineComponent({
  setup() {
    const {myTasks}   = useTasksStore();
    const {statuses}  = useStatusesStore();
    const pageTitle   = ref('Мои задачи');

    return {
      myTasks,
      statuses,
      pageTitle,
    };
  },
  components: {
    TaskCardList,
    BreadcrumbDefault,
    DefaultLayout,
    Button,
    Card,
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadMyTasks} = useTasksStore();
      await loadMyTasks();
    } catch (error) {
      alert(JSON.stringify(error.response))
    }

    next();
  }
})
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :page-name="pageTitle" :pageTitle="pageTitle">
      <template v-slot:actions>
        <Button as="router-link" :to="{name: 'tasks-create'}" rounded outlined size="small" label="Разместить заказ" />
      </template>
    </BreadcrumbDefault>

    <template v-if="!myTasks.list.length">
      <Card>
        <template #content>
          <div class="flex flex-col justify-center">
            <span class="font-semibold text-center">
              У вас еще нет заказов. <br>
            </span>

            <span class="text-center mb-2">Создайте ваш первый заказ</span>

            <div class="flex justify-center">
              <Button as="router-link" :to="{name: 'tasks-create'}" outlined label="Создать" />
            </div>
          </div>
        </template>
      </Card>
    </template>

    <TaskCardList
        v-if="myTasks.list.length"
        :statuses="statuses"
        :tasks="myTasks.list"
        :total="myTasks.total"
        :mode="`my`"
    />
  </DefaultLayout>
</template>
