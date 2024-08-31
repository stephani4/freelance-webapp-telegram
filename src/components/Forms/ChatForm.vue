<script lang="ts" setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
</script>

<template>
  <div class="flex bg-white">
    <InputText class="w-100" size="small" placeholder="Введите сообщение.." />
    <Button class="w-1" size="small" severity="info" label="+" />
  </div>
</template>