<script lang="ts" setup>
import {ref, reactive, defineEmits} from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import Send from "vue-material-design-icons/Send.vue";
import PaperClip from "vue-material-design-icons/Paperclip.vue"

const message = ref(null);

const form = reactive({
  message: "",
});

const reset = () => {
  form.message = "";
};

const emits = defineEmits(['toggleSend']);

const handleSend = () => {
  emits('toggleSend', form);
  reset();
};

</script>

<template>
  <div class="flex justify-between gap-1">
    <Button size="small" severity="secondary" icon>
      <PaperClip />
    </Button>
    <InputText ref="message" v-model="form.message" class="w-full" size="small" placeholder="Введите сообщение.." />
    <Button @click="handleSend" size="small" severity="info" icon>
      <Send />
    </Button>
  </div>
</template>