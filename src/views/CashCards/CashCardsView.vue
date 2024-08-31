<script lang="ts">
import {defineComponent, ref} from 'vue';
import {storeToRefs} from "pinia";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'

import {useCashCardsStore} from "@/stores/cash-cards";

export default defineComponent({
  setup() {
    const pageTitle = ref('Кошелёк');

    const cashCardsStore = useCashCardsStore();
    const {cards} = storeToRefs(cashCardsStore);

    return {
      cards,
      pageTitle,
    };
  },
  components: {
    BreadcrumbDefault,
    DefaultLayout,
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const cashCardsStore = useCashCardsStore();
      await cashCardsStore.loadCards();
    } catch (e) {
      alert(JSON.stringify(e.response));
    }
    next();
  }
})
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :page-name="pageTitle" :pageTitle="pageTitle">

    </BreadcrumbDefault>
  </DefaultLayout>
</template>
