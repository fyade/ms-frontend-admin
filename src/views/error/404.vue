<script setup lang="ts">
import router from "@/router";

const backHome = () => {
  router.push('/')
}
</script>

<template>
  404
  <el-button @click="backHome">返回首页</el-button>
</template>

<style scoped>

</style>