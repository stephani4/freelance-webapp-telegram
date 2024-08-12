<template>
  <div class="mb-4">
    <label for="name" class="font-semibold w-24">
      Название задачи <span class="text-danger">*</span>
    </label>
    <InputText v-model="props.form.name" :invalid="validator.name.$errors.length" id="name" class="flex-auto w-[100%]" autocomplete="off" />
    <span v-if="validator.name.$errors.length" class="text-danger">
      {{ validator.name.$errors[0].$message }}
    </span>
  </div>

  <div class="mb-4 flex flex-col">
    <label for="slug" class="font-semibold w-24">
      Описание
      <span class="text-danger">*</span>
    </label>
    <Textarea v-model="props.form.description" :invalid="validator.description.$errors.length" id="slug" class="flex-auto" autocomplete="off" />
  </div>

  <div class="mb-4">
    <label for="slug" class="font-semibold w-24">
      Цена, руб
      <span class="text-danger">*</span>
    </label>
    <InputNumber v-model="props.form.price" :invalid="validator.price.$errors.length" id="slug" class="flex-auto w-[100%]" autocomplete="off" />
  </div>

  <div class="mb-4">
    <label for="slug" class="font-semibold w-24">
      Категория задачи
      <span class="text-danger">*</span>
    </label>
    <Select
        v-if="props.children.length"
        v-model="props.form.category"
        :invalid="validator.category.$errors.length"
        :options="props.children"
        optionLabel="name"
        placeholder="Выберите категорию задачи"
        class="w-full mb-2" />

    <slot name="selectedCategory"></slot>
  </div>

  <div class="mb-4">
    <label for="slug" class="font-semibold w-24">
      Дата окончания выполнения
      <span class="text-danger">*</span>
    </label>
    <DatePicker v-model="props.form.date" :invalid="validator.date.$errors.length" class="w-[100%]" />
  </div>

  <div class="flex justify-end gap-2">
    <Button @click="emits('cancel')" type="button" label="Отменить" severity="secondary"></Button>
    <Button @click="emits('create')" type="button" label="Создать"></Button>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, watch} from "vue";

import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import DatePicker from "primevue/datepicker";
import Select from "primevue/select";

const emits = defineEmits(['cancel', 'create']);
const props = defineProps({
  children: {
    type: Array,
    required: true,
  },
  form: {
    type: Object,
    required: true
  },
  validator: {
    type: Object,
    required: true,
  }
});
</script>
