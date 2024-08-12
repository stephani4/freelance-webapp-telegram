<script setup lang="ts">
const props = defineProps(['pageTitle', 'pageName'])
</script>

<template>
  <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex justify-between">
      <h2 class="text-title-md2 text-black dark:text-white">
        {{ props.pageName}}
      </h2>

      <slot name="actions"></slot>
    </div>

    <nav>
      <ol class="flex items-center gap-2">
        <li>
          <router-link class="font-medium" to="/"> Freelance Eazy / </router-link>
        </li>
        <li class="font-medium text-primary">{{ props.pageTitle }}</li>
      </ol>
    </nav>
  </div>
</template>
