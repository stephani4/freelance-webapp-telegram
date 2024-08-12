import {reactive, ref} from "vue";
import {defineStore} from "pinia";
import upload from "@/services/files/upload";

export const useFilesStore = defineStore('files', () => {
   const payload = reactive({});
   const statusFileUpload = ref(false);

   const getFilePublicPath = (filePath) => BACKEND_SERVER_URL + '/storage/' + filePath;

   const uploadFiles = async (files: (Array<File> | File), mode: String, onUploadProgress: Function = () => {}) => {
      statusFileUpload.value = true;

      const {payload: resource} = await upload(files, mode, onUploadProgress);

      statusFileUpload.value = false;
      Object.keys(resource).forEach(key => payload[key] = resource[key]);
   };

   return {uploadFiles, getFilePublicPath, statusFileUpload, payload};
});