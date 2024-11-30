<script lang="ts">
export default {
  name: 'main:sysUtil:api'
}
</script>

<script setup lang="ts">
import { baseURL } from "@/api/request.ts";
</script>

<template>
  <iframe :src="`${baseURL}/api`" style="width: 100%;height: calc(100vh - 120px);border: 0;"/>
</template>

<style scoped lang="scss">

</style>