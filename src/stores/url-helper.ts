import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUrlGeneratorStore = defineStore('urlGenerator', () => {
  const taskUrlEdit = (task) => {
    return {
      name: 'tasks-my-edit',
      params: {id: task.id}
    }
  };

  const taskUrlView = (task) => {
    return `/tasks/${task.id}`;
  };

  return {
    taskUrlEdit,
    taskUrlView,
  }
});
