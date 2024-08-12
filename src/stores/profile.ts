import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import {update} from "@/services/profile/update";

export const useProfileStore = defineStore('profile', () => {
  const updateProfile = async (data: Object): Promise<object> => {
    const response = await update(data);
    return response.data;
  };

  return { updateProfile };
})
