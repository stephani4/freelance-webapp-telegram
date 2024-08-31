<script setup lang="ts">
import {defineProps, defineEmits, ref, onMounted, toRefs, watch} from "vue";
import Popover from "primevue/popover";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";

const emits = defineEmits(["updateUserRoles"]);

const op = ref();

const toggle = (event) => {
  op.value.toggle(event);
};

const selectedRoles = ref([]);
const props = defineProps({
  user: Object,
  roles: Array,
  users: Array,
});

watch(selectedRoles, () => {
  emits('updateUserRoles', {
    user: props.user,
    roles: selectedRoles.value
  });
});

onMounted(() => {
  props.user.roles.forEach((role) => selectedRoles.value.push(role.id));
});
</script>

<template>
  <Button @click="toggle" size="small" outlined v-tooltip.left="'Изменение ролей пользователя'">
    <i class="pi pi-shield"></i>
  </Button>

  <Popover ref="op">
    <template v-for="(role, i) in roles">
      <div class="flex flex-column">
        <div>
          <Checkbox
              v-model="selectedRoles"
              :value="role.id"
          />

          <label class="ml-2">{{ role.ru_name }}</label>
        </div>
      </div>
    </template>
  </Popover>
</template>
