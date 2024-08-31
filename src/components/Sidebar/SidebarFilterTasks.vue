<script setup lang="ts">
import {defineProps, defineEmits, computed} from "vue";
import Sidebar from "primevue/sidebar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Magnify from "vue-material-design-icons/Magnify.vue";

const props = defineProps({
  filterTasks: {
    type: Object,
  },
  visible: {
    type: Boolean,
  }
});

const emits = defineEmits(["toggleVisible", 'toggleSearch']);

const visibleProp = computed({
  get() {
    return props.visible
  },
  set(value) {
    emits("toggleVisible", value);
  }
});
</script>

<template>
  <Sidebar v-model:visible="visibleProp" header="Фильтр задач" position="right">
    <div class="flex flex-col mb-2">
      <label for="keywords">Ключевые слов</label>
      <InputText v-model="props.filterTasks.name" id="keywords" placeholder="Например: Сайт на wordpress" />
    </div>

    <div class="flex justify-end">
      <Button @click="emits('toggleSearch')" size="small" severity="info" style="gap: 0 !important;">
        <Magnify />Искать
      </Button>
    </div>
  </Sidebar>
</template>
