<script lang="ts">
export default {
  name: 'sysUtil:api'
}
</script>
<script setup lang="ts">
import { baseURL } from "@/api/request.ts";
</script>

<template>
  <iframe :src="`${baseURL}/api`" style="width: 100%;height: calc(100% - 4px);border: 0;"/>
</template>

<style scoped lang="scss">

</style>