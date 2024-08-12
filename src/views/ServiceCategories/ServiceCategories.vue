<script setup lang="ts">
import {onMounted, ref, reactive} from 'vue';
import {useServiceCategoriesStore} from "@/stores/serviceCategories";

import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TreeCategoriesList from "@/components/Lists/TreeCategoriesList.vue";
import CreateCategoryModal from "@/components/Modals/CreateCategoryModal.vue";
import EditCategoryModal from "@/components/Modals/EditCategoryModal.vue";

const {loadThreeCategories, createTreeCategory, categories, categoriesFlat} = useServiceCategoriesStore();
onMounted(async () => {
  await loadThreeCategories();
});

const pageTitle         = ref('Категории услуг');
const selectSupCategory = ref('');
const visible           = ref(false);
const visibleEdit       = ref(false);

const editCategory      = reactive({
  id: '',
  name: '',
  slug: '',
  show: ''
})

const setSelectSupCategory = ({id}) => {
  selectSupCategory.value = id;
  visible.value = true;
};

const createCategory = async (data) => {
  await createTreeCategory(selectSupCategory.value, data);
  await loadThreeCategories();

  selectSupCategory.value = '';
  visible.value = false;
};

const setEditCategory = (id) => {
  const category = categoriesFlat.value.find(({id: categoryID}) => id === categoryID);

  editCategory.id = category.id;
  editCategory.name = category.name;
  editCategory.slug = category.slug;
  editCategory.show = category.show;

  console.log(editCategory)

  visibleEdit.value = true;
};

const changeVisible = (value) => {
  visible.value = value;
};
</script>

<template>
  <CreateCategoryModal
      @createCategory="createCategory"
      @changeVisible="changeVisible"
      :visible="visible"
  />

  <EditCategoryModal
      @createCategory="createCategory"
      @changeVisible="(value) => visibleEdit = value"
      :filled-category="editCategory"
      :visible="visibleEdit"
  />
  <DefaultLayout>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" :page-name="pageTitle"/>
      <!-- Breadcrumb End -->

      <div class="card">
        <div class="card-body">
          <TreeCategoriesList
              @toggleEditCategory="setEditCategory"
              @toggleCreateCategory="setSelectSupCategory"
              :categories="categories"
          />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
