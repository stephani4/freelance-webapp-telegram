<script setup lang="ts">
import {defineProps, defineEmits} from "vue";
import Paginator from "primevue/paginator";
import TaskCard from "@/components/Cards/TaskCard.vue"

const emits = defineEmits(['toggleAccept']);
const accept = (data) => {
  emits('toggleAccept', data);
};

const props = defineProps({
  tasks: Array,
  statuses: Object,
  total: Number,
  mode: String
});
</script>

<template>
  <div class="grid grid-cols-1 gap-2 md:grid-cols-4">
    <TaskCard
        @toggleAccept="accept"
        v-for="(task, i) in props.tasks"
        :task="task"
        :mode="props.mode"
        :statuses="props.statuses"
        class="mb-3"
    />
  </div>
  <Paginator :rows="10" :totalRecords="props.total"/>
</template>
