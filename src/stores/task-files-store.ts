import {reactive, ref} from "vue";
import {defineStore, storeToRefs} from "pinia";
import {useFilesStore} from "@/stores/files";
import {useTasksStore} from "@/stores/tasks";

export const useTaskFilesStore = defineStore('task-files', () => {
   const fileStore = useFilesStore();
   const taskStore = useTasksStore();

   const {form} = storeToRefs(taskStore);
   const payload = fileStore.payload;

   const statusLoaders = reactive({
      loadFiles: 'denied',
   });

   const progressLoaders = reactive({
      progressLoadFiles: 0,
   });

   const uploadFilesTemplate = async (files) => {
      statusLoaders.loadFiles = 'process';
      await fileStore.uploadFiles(
          files,
          'multiple',
          ({loaded, total}) => progressLoaders.progressLoadFiles = (loaded / total) * 100
      );


      payload.files.forEach(file => {
         console.log(form)
         form.value.files.push(file);
      });

      statusLoaders.loadFiles = 'denied';
      progressLoaders.progressLoadFiles = 0;
   };

   return {
      statusLoaders,
      progressLoaders,
      uploadFilesTemplate,
   }
});