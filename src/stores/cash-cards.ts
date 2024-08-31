import {ref} from 'vue';
import {defineStore} from 'pinia';
import {loadMyCards} from '@/services/cash-cards/load-my-cards';

export const useCashCardsStore = defineStore('cash-cards', () => {
   const cards = ref([]);
   const loadCards = async () => {
       cards.value = await loadMyCards();
   };

   return {
       cards,
       loadCards,
   }
});