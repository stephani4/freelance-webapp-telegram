<script setup lang="ts">
import {defineProps, defineEmits, computed} from "vue";
import {useAuthStore} from "@/stores/auth";


import Paginator from "primevue/paginator";
import TaskCard from "@/components/Cards/TaskCard.vue"
import {useUrlGeneratorStore} from "@/stores/url-helper";

const emits = defineEmits(['toggleAccept', 'toggleSendRequest' ]);
const accept = (data) => {
  emits('toggleAccept', data);
};

const urlGenerator = useUrlGeneratorStore();

const request = (task) => {
  emits('toggleSendRequest', task);
};

const props = defineProps({
  tasks: Array,
  statuses: Object,
  total: Number,
  mode: String
});

</script>

<template>
  <div class="grid">
    <TaskCard
        v-for="(task, i) in props.tasks"
        :urlFactory="mode === 'my' ? urlGenerator.taskUrlEdit : urlGenerator.taskUrlEdit"
        :task="task"
        :mode="props.mode"
        :statuses="props.statuses"
        @toggleAccept="accept"
        @toggleSendRequest="request"
        class="mb-3"
    />
  </div>
  <Paginator :rows="10" :totalRecords="props.total"/>
</template>
