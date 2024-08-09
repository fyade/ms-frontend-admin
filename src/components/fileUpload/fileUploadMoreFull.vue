<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { fileUploadOneFull } from "@/api/fileUpload.ts";
import { unitConversion_storage } from "@/utils/NumberUtils";
import { CHUNK_SIZE } from "../../../config/config";
import { Upload } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus"
import { selectFiles } from "@/utils/FileUtils.ts";

let pageNotUnmounted = true
onBeforeUnmount(() => {
  pageNotUnmounted = false
})
const emit = defineEmits(['uploadSuccess', 'uploadFail']);
const isDisabled = ref(false)
const isLoading = ref(false)

const upload2 = async () => {
  isDisabled.value = true
  const filepicks = []
  try {
    filepicks.push(...await selectFiles(true))
  } catch (e) {
    isDisabled.value = false
    return
  }
  isLoading.value = true
  for (let i = 0; i < filepicks.length; i++) {
    if (pageNotUnmounted) {
      const file = filepicks[i]
      if (file.size > CHUNK_SIZE) {
        // MessagePlugin.error(file.name + '文件大小超过' + unitConversion_storage(CHUNK_SIZE) + '。')
        ElMessage.warning(file.name + '文件大小超过' + unitConversion_storage(CHUNK_SIZE) + '。')
      } else {
        const fd = new FormData();
        fd.append('file', file)
        try {
          await fileUploadOneFull(fd, file.name);
        } catch (e) {
          uploadFail(`${file.name}上传失败。`)
        }
      }
    }
  }
  uploadSuccess()
}
const uploadSuccess = () => {
  isDisabled.value = false
  isLoading.value = false
  emit('uploadSuccess')
}
const uploadFail = (msg?: string) => {
  isDisabled.value = false
  isLoading.value = false
  // MessagePlugin.error({
  //   closeBtn: true,
  //   content: msg,
  //   duration: 0
  // })
  ElMessage.warning(msg)
  emit('uploadFail', msg)
}
</script>

<template>
  <el-button :loading="isLoading" :disabled="isDisabled" theme="primary" @click="upload2" :icon="Upload">
    多文件完整上传
  </el-button>
</template>

<style scoped lang="scss">
</style>
