<script setup lang="ts">
import { useSysStore } from "@/store/module/sys.ts";

const sysStore = useSysStore();
</script>

<template>
  <div>
    <p>前端版本：{{ sysStore.version.qd }}</p>
    <p>后端版本：{{ sysStore.version.hd }}</p>
  </div>
  <div>在下方显示基本信息和有权限的系统。</div>
</template>

<style scoped>

</style>