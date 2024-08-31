<script setup lang="ts">
import {defineProps, defineEmits} from "vue";

import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Select from "primevue/select";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";


const props = defineProps({
  form: Object,
  executions: Array,
  validator: Object,
});

const emits = defineEmits(["submit"]);

</script>

<template>
  <div class="flex flex-col mb-2">
    <span class="font-semibold block mb-2">Описание</span>
    <Textarea
        v-model="props.form.description"
        :invalid="validator.description.$errors.length"
        placeholder="Напишите, как будете решать задачу"
    />
    <span v-if="validator.description.$errors.length" class="text-danger">
      {{ validator.description.$errors[0].$message  }}
    </span>
  </div>

  <div class="flex flex-col mb-2">
    <span class="font-semibold block mb-2">Стоимость, за которую готовы выполнить задание</span>

    <InputGroup>
      <InputGroupAddon>
        Руб.
      </InputGroupAddon>
      <InputNumber
          v-model="props.form.price"
          :invalid="validator.price.$errors.length"
          placeholder="Стоимость"
      />
    </InputGroup>

    <span v-if="validator.price.$errors.length" class="text-danger">
      {{ validator.price.$errors[0].$message  }}
    </span>
  </div>

  <div class="flex flex-col mb-2">
    <span class="font-semibold block mb-2">Срок выполнения</span>
    <Select
        v-model="props.form.periodExecution"
        :invalid="validator.periodExecution.$errors.length"
        :options="props.executions"
        optionLabel="name"
        optionValue="value"
    />

    <span v-if="validator.periodExecution.$errors.length" class="text-danger">
      {{ validator.periodExecution.$errors[0].$message  }}
    </span>
  </div>

  <div class="flex justify-end">
    <Button @click="emits('submit')" severity="success" size="small">
      Предложить
    </Button>
  </div>
</template>
