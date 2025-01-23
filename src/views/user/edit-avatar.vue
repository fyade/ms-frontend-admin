<script setup lang="ts">
import ImageCrop from "@/components/imageCrop/imageCrop.vue";
import { updUser } from "@/api/module/main/sysManage/user.ts";
import { useUserStore } from "@/store/module/user.ts";

const userStore = useUserStore();

const uploadSuccess = (fileName: string) => {
  updUser({id: userStore.userinfo.id, avatar: fileName}).then(res => {
    if (res) {
      ElMessage.success('头像上传成功。')
      userStore.refreshSelfInfo()
    } else {
      ElMessage.error('头像上传失败。')
    }
  })
}
</script>

<template>
  <ImageCrop @upload-success="uploadSuccess"/>
</template>

<style scoped lang="scss">

</style>