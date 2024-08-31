<script setup lang="ts" inherit-attrs="false">
import {defineProps, computed, defineEmits} from "vue";
import {useAuthStore} from "@/stores/auth";

import {useFilesStore} from "@/stores/files";
import moment from 'moment';

import Card from "primevue/card";
import Badge from "primevue/badge";
import Button from "primevue/button";
import Breadcrumb from "primevue/breadcrumb";

const authStore = useAuthStore();
const fileStore = useFilesStore();

const getFilePublicPath = fileStore.getFilePublicPath;
const user = computed(() => authStore.user);

const emits = defineEmits(['toggleAccept', 'toggleSendRequest']);

const getBadgeSeverity = (status) => {
  if (status === 'draft') {
    return 'secondary';
  }

  if (status === 'moderate') {
    return 'warn';
  }
};

const props = defineProps({
  urlFactory: Function,
  statuses: Object,
  mode: String,
  task: Object,
});

const normalizeDate = (date: Date, mask = 'DD.MM.YYYY HH:mm:ss') => {
  const mom = moment(date);
  return mom.format(mask);
};

const dateCreate = computed(() => {
  if (!props.task) return '--';
  return normalizeDate(new Date(props.task.created_at));
});

const dateDeadLine = computed(() => {
  if (!props.task) return '--';
  return normalizeDate(new Date(props.task.complete_at), 'DD.MM.YYYY');
});

const getBadgeText = (status): string => {
  return props.statuses[status];
};

const breadcrumbs = computed(() => {
  return [
      ...props.task.service_category.ancestors.reverse(),
      props.task.service_category,
  ];
})
</script>

<template>
  <Card style="overflow: hidden" class="pt-2">
    <template #header>
      <div class="h-max relative">
        <div class="absolute top-[0px] right-[15px]">
          <Badge :severity="getBadgeSeverity(props.task.status)">
            <template v-if="props.task.status === 'moderate'">
              <i class="pi pi-stopwatch" style="font-size: 0.8rem"></i>&nbsp;
            </template>
            {{ getBadgeText(props.task.status) }}
          </Badge>
        </div>
      </div>

    </template>
    <template #title>
      <div class="flex flex-col">
        <Breadcrumb class="m-0 mb-2 p-0" style="padding: 0 !important;" :model="breadcrumbs">
          <template #item="{ item }">
            <p class="text-sm" href="javascript:void(0)">
              {{ item.name }}
            </p>
          </template>
          <template #separator> / </template>
        </Breadcrumb>

        <div class="flex">
          <router-link :to="props.urlFactory(props.task)" class="font-semibold mb-2 mr-2">
          {{ props.task.name }}
          </router-link>

          <span class="text-sm">{{ props.task.price }} руб.</span>
        </div>
      </div>
    </template>
    <template #subtitle>
      <p class="m-0 mb-3 font-light">
        {{ props.task.description }}
      </p>

      <div class="grid">
        <div class="col-5"></div>
        <div class="col-7">
          <p>Заказчик: {{props.task.user.name}}</p>
          <p>Размещено заказов: {{ props.task.user.tasks_count }}</p>
        </div>
      </div>

      <div class="flex flex-col justify-end">
        <p>Создана: {{dateCreate}}</p>
        <p>Дедлайн: {{dateDeadLine}}</p>
        <p>Подано предложений: {{ props.task.requests_count }}</p>
      </div>
    </template>

    <template #footer>
      <div class="flex mt-1">
        <template v-if="props.task.status === 'accept' && user.id !== task.user.id">
          <Button v-if="!props.task.requests.length" @click="emits('toggleSendRequest', props.task)" label="Откликнуться" class="w-100" outlined />
          <template v-else>
            <div class="flex flex-col">
              <span class="block font-bold">Вы уже откликнулись.</span>
              <p>Будьте готовы, с Вами может связаться заказчик.</p>
            </div>
          </template>
        </template>

        <template v-if="props.task.status === 'draft'">
          <Button as="router-link" :to="{name: 'tasks-my-edit', params: {id: props.task.id}}" label="Заполнить задачу"
                  class="w-100" outlined severity="warn"/>
        </template>

        <template v-if="props.task.status === 'moderate' && mode === 'moderate'">
          <Button @click="emits('toggleAccept', props.task.id)" class="w-100" outlined severity="success" label="Принять">
            Принять
          </Button>
        </template>
      </div>
    </template>
  </Card>
</template>