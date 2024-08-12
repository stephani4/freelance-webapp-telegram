import { defineStore } from 'pinia'
import { reactive } from 'vue'
import load from "../services/statuses/load";

export const useStatusesStore = defineStore('statuses', () => {
  const statuses = reactive({});

  const updateStatuses = (list) => {
    const keys = Object.keys(list);
    keys.forEach(key => {
      statuses[key] = list[key];
    });
  };

  const loadStatuses = async () => {
    const statuses = await load();
    updateStatuses(statuses);
  }

  return { statuses, updateStatuses, loadStatuses };
});
