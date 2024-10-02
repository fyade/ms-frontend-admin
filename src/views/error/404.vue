<script setup lang="ts">
import router from "@/router";

const backHome = () => {
  router.push('/')
}
</script>

<template>
  <p>404</p>
  <p></p>
  <el-button @click="backHome">返回主页</el-button>
</template>

<style scoped>

</style>