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

export default defineComponent({
  setup(props, {emit}) {
    const removeCategory = () => {
      props.form.category = null;
    };

    const create = () => {
      emit('create');
    };

    const uploadFiles = async (data) => {
      await props.uploader(data.files);
    };

    const progress = (...data) => console.log(data);

    const {getFilePublicPath} = useFilesStore();

    return {uploadFiles, getFilePublicPath, removeCategory, create, progress, props};
  },
  components: {
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
    <label>Описание задачи</label>
    <Textarea v-model="props.form.description" :invalid="props.validator.description.$errors.length"
              placeholder="Опишите задачу подробно"/>
    <span v-if="props.validator.description.$errors.length" class="text-danger">
      {{ props.validator.description.$errors[0].$message }}
    </span>
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

  <span class="font-semibold block mb-2">Файлы</span>

  <div class="mb-4 flex flex-col justify-start">
    <label>Заставка <span class="text-danger">*</span></label>

    <FileUpload
        v-if="props.statusLoaders.loadMainTemplate === 'denied'"
        :disabled="statusLoading"
        customUpload
        @uploader="uploadFiles"
        class="justify-start"
        mode="basic"
        name="file[]"
        url="http://127.0.0.1:8000/api/telegram/files/upload"
        accept="image/*"
        :maxFileSize="1000000"
        @upload="uploadFiles"
        :auto="true"
        chooseLabel="Загрузить основное фото"
        @progress="progress"
    />

    <ProgressBar
        v-if="props.statusLoaders.loadMainTemplate === 'process'"
        :value="props.progressLoaders.progressLoadMainTemplate"
    />

    <Image
        :src="getFilePublicPath(props.imagesPaths.mainTemplatePath)"
        v-if="props.statusLoaders.loadMainTemplate === 'complete'"
    />

    <span v-if="props.validator.mainImage.$errors.length" class="text-danger">
      {{ props.validator.mainImage.$errors[0].$message }}
    </span>
  </div>

  <div class="flex justify-end">
    <Button label="Отменить" severity="secondary"/>
    <Button @click="create" label="Создать" class="ml-2"/>
  </div>
</template>