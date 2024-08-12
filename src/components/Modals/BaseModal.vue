<template>
  <Dialog v-model:visible="visibleState" modal :header="props.header" :style="{ width: '25rem' }">
    <slot name="bodyModal"></slot>
  </Dialog>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, computed} from "vue";

import Dialog from "primevue/dialog";

const emits = defineEmits(['changeVisible']);
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  header: {
    type: String,
    required: true,
  }
});

const visibleState = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emits('changeVisible', value);
  }
})
</script>
