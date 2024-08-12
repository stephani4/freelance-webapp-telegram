<script lang="ts">
import { defineComponent, defineProps } from 'vue'
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Badge from "primevue/badge";

export default defineComponent({
  setup(props) {
    const getBadgeSeverity = (status) => {
      if (status === 'draft') {
        return 'secondary'
      }
    };

    return {
      props,
      getBadgeSeverity
    };
  },
  components: {
    DataTable,
    Column,
    Badge,
  },
  props: {
    statuses: Object,
    name: String,
    tasks: Array,
    total: Number,
  }
})
</script>

<template>
  <div
      class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <div class="flex justify-between items-center mb-2">
      <h4 class="text-xl font-semibold text-black dark:text-white">{{ props.name }}</h4>
      <slot name="control"></slot>
    </div>

    <DataTable class="dark:bg-boxdark" :value="props.tasks" paginator :rows="props.total" tableStyle="min-width: 50rem">
      <Column field="id" header="Номер" style="width: 25%">
        <template #body="{ data }">
          {{ data.id }}
        </template>
      </Column>

      <Column field="name" header="Название" style="width: 25%">
        <template #body="{ data }">
          {{ data.name }}
        </template>
      </Column>

      <Column field="status" header="Статус" style="width: 25%">
        <template #body="{ data }">
          <Badge :value="statuses[data.status]" :severity="getBadgeSeverity(data.status)" />
        </template>
      </Column>

      <Column field="price" header="Цена" style="width: 25%">
        <template #body="{ data }">
          {{ data.price }} руб.
        </template>
      </Column>

      <Column field="actions" header="Действия" style="width: 25%">
        <template #body="{ data }">
          {{ data.price }} руб.
        </template>
      </Column>
    </DataTable>
  </div>
</template>
