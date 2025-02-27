<script setup lang="ts">
import Header from "@/layout/sys/header.vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useRouterStore } from "@/store/module/router.ts";

const routerStore = useRouterStore();

const route = useRoute()
const allMenus2 = routerStore.allMenus2
watch(route, () => {
  if (allMenus2.findIndex(item => item.path === route.path) === -1) {
    routerStore.deleteAllMenu()
  }
}, {
  immediate: true
})
</script>

<template>
  <RightClickMenu style="height: 100%;">
    <div class="layout-public-index">
      <el-container>
        <el-header style="padding: 0;height: 50px;">
          <Header/>
        </el-header>
        <slot/>
      </el-container>
    </div>
  </RightClickMenu>
</template>

<style scoped>
.layout-public-index {
  width: 100%;
  height: 100%;

  > * {
    width: 100%;
    height: 100%;
  }
}

</style>