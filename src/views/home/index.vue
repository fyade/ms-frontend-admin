<script setup lang="ts">
import { useSysStore } from "@/store/module/sys.ts";

const sysStore = useSysStore();
</script>

<template>
  <div>
    <p>前端版本：{{ sysStore.version.qd }}</p>
    <p>后端版本：{{ sysStore.version.hd }}</p>
  </div>
</template>

<style scoped>

</style>