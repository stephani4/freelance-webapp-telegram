<script setup lang="ts">
import {defineProps, defineEmits} from "vue";
import Tree from 'primevue/tree';

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  }
});

const emits = defineEmits(['toggleCreateCategory', 'toggleEditCategory']);

const editCategory = (id) => {
  emits('toggleEditCategory', id);
};

const createCategory = (category) => {
  emits('toggleCreateCategory', category);
};
</script>

<template>
  <Tree :value="props.categories" class="w-full">
    <template #default="slotProps">
      <a @click="editCategory(slotProps.node.id)" href="javascript:void(0)">{{ slotProps.node.name }}</a>
      &nbsp
      <button @click="createCategory(slotProps.node)" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> + </button>
    </template>
  </Tree>
</template>
