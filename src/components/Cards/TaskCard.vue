<script setup lang="ts" inherit-attrs="false">
import moment from 'moment';
import {defineProps, computed, defineEmits} from "vue";
import {useFilesStore} from "@/stores/files";

import Card from "primevue/card";
import Badge from "primevue/badge";
import Button from "primevue/button";

const fileStore = useFilesStore();
const getFilePublicPath = fileStore.getFilePublicPath;

const emits = defineEmits(['toggleAccept']);

const getBadgeSeverity = (status) => {
  if (status === 'draft') {
    return 'secondary';
  }

  if (status === 'moderate') {
    return 'warn';
  }
};

const props = defineProps({
  task: Object,
  statuses: Object,
  mode: String
});

const normalizeDate = (date: Date) => {
  const mom = moment(date);
  return mom.format('DD.MM.YYYY HH:mm:ss');
};

const dateCreate = computed(() => {
  if (!props.task) return '--';
  return normalizeDate(new Date(props.task.created_at));
});

const dateDeadLine = computed(() => {
  if (!props.task) return '--';
  return normalizeDate(new Date(props.task.complete_at));
});

const getBadgeText = (status): string => {
  return props.statuses[status];
};

const mainTemplateImagePath = computed(() => {
  const file = props.task.files.find((file) => file.pivot.side === 'main');
  if (!file) return '';
  return getFilePublicPath(file.path);
});
</script>

<template>
  <Card v-bind:attrs="$attrs" style="overflow: hidden">
    <template #header>
      <div class="h-max relative">
        <img alt="user header" style="width: 100%" :src="mainTemplateImagePath"/>

        <div class="absolute top-[10px] right-[15px]">
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
      <div class="flex flex-wrap-reverse">
        <span class="font-semibold mb-2 mr-2">
          {{ props.task.name }}
        </span>

        <span class="text-sm">{{ props.task.price }} руб.</span>
      </div>
    </template>
    <template #subtitle>
      <p class="m-0 mb-3 font-light">
        {{ props.task.description }}
      </p>
      <div class="flex flex-col justify-end">
        <p>Создана: {{dateCreate}}</p>
        <p>Дедлайн: {{dateDeadLine}}</p>
      </div>
    </template>

    <template #footer>
      <div class="flex mt-1">
        <template v-if="props.task.status === statuses.draft">
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