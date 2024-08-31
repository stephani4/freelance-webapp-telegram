<script lang="ts">
import {defineComponent, defineEmits} from "vue";
import {useFilesStore} from "@/stores/files";

import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import Button from "primevue/button";
import DatePicker from "primevue/datepicker";
import Chip from "primevue/chip";
import FileUpload from "primevue/fileupload";
import ProgressBar from 'primevue/progressbar';
import Image from 'primevue/image';
import FilesList from '@/components/Lists/FilesList.vue';

export default defineComponent({
  setup(props, {emit}) {
    const removeCategory = () => {
      props.form.category = null;
    };

    const updateOrCreate = () => {
      emit(props.mode === 'edit' ? 'update' : 'create');
    };

    const uploadFiles = async (data) => {
      await props.uploader(data.files);
    };

    const progress = (...data) => console.log(data);

    const {getFilePublicPath} = useFilesStore();

    return {uploadFiles, getFilePublicPath, removeCategory, updateOrCreate, progress, props};
  },
  components: {
    FilesList,
    ProgressBar,
    Select,
    Textarea,
    InputText,
    InputNumber,
    DatePicker,
    FileUpload,
    Button,
    Chip,
    Image,
  },
  props: {
    form: Object,
    categories: Array,
    validator: Object,
    uploader: Function,
    statusLoading: Boolean,
    statusLoaders: Object,
    progressLoaders: Object,
    imagesPaths: Object,
    mode: String,
  }
});
</script>

<template>
  <span class="font-semibold block mb-2">Описание задачи</span>
  <div class="mb-4 flex flex-col">
    <label>Название задачи</label>
    <InputText v-model="props.form.name" :invalid="props.validator.name.$errors.length"
               placeholder="Укажите информативное название"/>
    <span v-if="props.validator.name.$errors.length" class="text-danger">
      {{ props.validator.name.$errors[0].$message }}
    </span>
  </div>
  <div class="mb-4 flex flex-col">
    <label>Детальное описание задачи</label>
    <Textarea
        v-model="props.form.description"
        :invalid="props.validator.description.$errors.length"
        placeholder="Опишите задачу подробно"
        class="mb-2"
    />
    <span v-if="props.validator.description.$errors.length" class="text-danger">
      {{ props.validator.description.$errors[0].$message }}
    </span>

    <template v-if="props.form.files.length">
      <FilesList :files="props.form.files" />
    </template>

    <FileUpload
        v-if="props.statusLoaders.loadFiles === 'denied'"
        :disabled="statusLoading"
        @uploader="uploadFiles"
        @upload="uploadFiles"
        customUpload
        class="justify-start"
        mode="basic"
        multiple
        name="file[]"
        url="http://127.0.0.1:8000/api/telegram/files/upload"
        accept="image/*"
        :maxFileSize="1000000 * 3"
        :auto="true"
        @progress="progress"
        chooseLabel="Прикрепить файлы"
    />

    <ProgressBar
        v-if="props.statusLoaders.loadFiles === 'process'"
        :value="props.progressLoaders.progressLoadFiles"
    />
  </div>
  <div class="mb-4 flex flex-col">
    <label>Цена, руб</label>
    <InputNumber v-model="props.form.price" :invalid="props.validator.price.$errors.length"
                 placeholder="Укажите стоимость задачи"/>
    <span v-if="props.validator.price.$errors.length" class="text-danger">
      {{ props.validator.price.$errors[0].$message }}
    </span>
  </div>
  <div class="mb-4 flex flex-col">
    <label>Категория</label>
    <Select v-if="categories.length" v-model="props.form.category" :invalid="props.validator.category.$errors.length"
            :options="categories" optionLabel="name" placeholder="Выберите категорию"/>
    <span v-if="props.validator.category.$errors.length" class="text-danger">
      {{ props.validator.category.$errors[0].$message }}
    </span>
    <div class="mt-2">
      <Chip v-if="props.form.category" :label="props.form.category.name" @remove="removeCategory" removable/>
    </div>
  </div>
  <div class="mb-4 flex flex-col">
    <label>Дата окончания выполнения</label>
    <DatePicker v-model="props.form.completeAt" :invalid="props.validator.completeAt.$errors.length"
                placeholder="Укажите дату окончания задания"/>
    <span v-if="props.validator.completeAt.$errors.length" class="text-danger">
      {{ props.validator.completeAt.$errors[0].$message }}
    </span>
  </div>

  <div class="flex justify-end">
    <Button label="Отменить" severity="secondary"/>
    <Button @click="updateOrCreate" :label="props.mode === 'edit' ? 'Обновить' : 'Создать'" class="ml-2"/>
  </div>
</template>