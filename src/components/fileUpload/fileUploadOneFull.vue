<script setup lang="ts">
import { ref } from "vue";
import { fileUploadOneFull } from "@/api/fileUpload";
import { unitConversion_storage } from "@/utils/NumberUtils";
import { CHUNK_SIZE } from "../../../config/config";
import { Upload } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus"
import { selectFiles } from "@/utils/FileUtils.ts";

const emit = defineEmits(['uploadSuccess', 'uploadFail']);
const isDisabled = ref(false)
const isLoading = ref(false)

const upload1 = async () => {
  isDisabled.value = true
  const filepicks = []
  try {
    filepicks.push(...await selectFiles())
  } catch (e) {
    isDisabled.value = false
    return
  }
  isLoading.value = true
  const file = filepicks[0]
  if (file.size > CHUNK_SIZE) {
    // MessagePlugin.error(file.name + '文件大小超过' + unitConversion_storage(CHUNK_SIZE) + '。')
    ElMessage.warning(file.name + '文件大小超过' + unitConversion_storage(CHUNK_SIZE) + '。')
    isDisabled.value = false
    isLoading.value = false
    return
  }
  const fd = new FormData();
  fd.append('file', file)
  fileUploadOneFull(fd, file.name).then(res => {
    uploadSuccess()
  }).catch(err => {
    uploadFail(`${file.name}上传失败。`)
  }).finally(() => {
    fd.delete('file')
  })
}
const uploadSuccess = () => {
  isDisabled.value = false
  isLoading.value = false
  emit('uploadSuccess')
}
const uploadFail = (msg?: string) => {
  isDisabled.value = false
  isLoading.value = false
  //   MessagePlugin.error({
  //     closeBtn: true,
  //     content: msg,
  //     duration: 0
  //   })
  ElMessage.warning(msg)
  emit('uploadFail', msg)
}
</script>

<template>
  <el-button :loading="isLoading" :disabled="isDisabled" theme="primary" @click="upload1" :icon="Upload">
    单文件完整上传
  </el-button>
</template>

<style scoped lang="scss"></style>
