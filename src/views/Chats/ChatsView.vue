<script>
import {defineComponent, ref} from "vue";
import {mapState} from "pinia";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import ChatsList from '@/components/Lists/ChatsList.vue'
import {useChatsStore} from "@/stores/chats";

export default defineComponent({
  setup(props, emit) {
    const chatsStore = useChatsStore();
    const chats = chatsStore.headerChats;

    const pageName = ref('Чаты');
    return {pageName, chats};
  },
  computed: {
    ...mapState(useChatsStore, ['headerChats'])
  },
  components: {
    DefaultLayout,
    ChatsList,
    BreadcrumbDefault,
  }
});
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault
        :pageTitle="pageName"
        :pageName="pageName"
    />

    <ChatsList :chats="chats" />
  </DefaultLayout>
</template>