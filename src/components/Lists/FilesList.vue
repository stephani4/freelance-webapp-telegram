<script setup lang="ts">
import {defineProps} from "vue";
import FilePdfBox from "vue-material-design-icons/FilePdfBox.vue";
import FileJpgBox from "vue-material-design-icons/FileJpgBox.vue";

const props = defineProps({
  files: Array
});
</script>

<template>
  <ul style="list-decoration: none;">
    <li v-for="(file, i) in props.files">
      <FileJpgBox :size="40" v-if="file.format === 'jpg'"/>
      {{ file.path.length > 20 ? file.path.substr(0, 20) + '...' : file.path }}
    </li>
 </ul>
</template>



