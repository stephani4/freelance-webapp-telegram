import {ref} from "vue";
import {defineStore} from "pinia";
import load from "../services/service-categories/load";
import create from "../services/service-categories/create";
import children from "../services/service-categories/children";

export const useServiceCategoriesStore = defineStore('serviceCategories', () => {
    const categories = ref([]);
    const categoriesFlat = ref([]);
    const childCategories = ref([]);
    const isLoadSubCategories = ref(false);

    const loadThreeCategories = async () => {
        isLoadSubCategories.value = true;
        const response = await load();
        const {tree, treeFlat} = response.data;

        categories.value = [];
        categoriesFlat.value = [];

        tree.forEach(item => categories.value.push(item))
        treeFlat.forEach(item => categoriesFlat.value.push(item));
        isLoadSubCategories.value = false;
    };

    const loadChildrenByParent = async (parentID: number) => {
        childCategories.value = await children(parentID);
    };

    const createTreeCategory = async (subCategory: Number, data: Object) => await create(subCategory, data);

    return {
        categories,
        categoriesFlat,
        childCategories,
        isLoadSubCategories,

        loadThreeCategories,
        createTreeCategory,
        loadChildrenByParent
    }
});