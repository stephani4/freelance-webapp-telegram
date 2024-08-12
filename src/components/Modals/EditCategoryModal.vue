<template>
  <Dialog v-model:visible="visible" modal header="Редактирование подкатегории" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Заполните форму категории</span>
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">
        Название <span class="text-danger">*</span>
      </label>
      <InputText v-model="form.name" id="name" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="slug" class="font-semibold w-24">Слаг</label>
      <InputText v-model="form.slug" id="slug" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center justify-between mb-4">
      <label for="show" class="font-semibold">Показать</label>
      <Checkbox v-model="form.show" :binary="true"  />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Отменить" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Обновить" @click="createCategory"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, reactive, computed, watch} from "vue";
import Dialog from 'primevue/dialog';
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import Checkbox from "primevue/checkbox";

const form = reactive({
  name: '',
  slug: '',
  show: true,
});

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  filledCategory: {
    type: Object,
    required: true
  }
});

watch(
    () => props.filledCategory,
    () => {
      const keys = Object.keys(props.filledCategory);
      console.log('asd')
      for (let key of keys) {
        form[key] = props.filledCategory[key];
      }
    },
    {
      deep: true
    }
)

const emits = defineEmits(['changeVisible', 'createCategory']);

const visible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emits('changeVisible',value);
  }
});

const createCategory = () => {
  const defaults = {
    name: '',
    slug: '',
    show: true,
  };

  emits('createCategory', {...form});

  for (let key in defaults) {
    form[key] = defaults[key];

  }
};
</script>