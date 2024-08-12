<script setup lang="ts">
import { ref } from 'vue';
import {useAuthStore} from "@/stores/auth";
import {useProfileStore} from "@/stores/profile";

import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import SettingsCard from '@/components/SettingsCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AlertSuccess from "@/components/Alerts/AlertSuccess.vue"

const pageTitle = ref('Информация о себе');

const {user} = useAuthStore();
const {updateProfile} = useProfileStore();
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />

      <AlertSuccess :title="'Обновление профиля'" :description="'Данные успешно обновлены'" />

      <!-- Breadcrumb End -->
      <SettingsCard @toggleUpdate="updateProfile" :user="user" />
    </div>
  </DefaultLayout>
</template>
