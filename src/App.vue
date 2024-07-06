<script setup lang="ts">
import { CONFIG } from "@/utils/base.ts";
</script>

<template>
  <div
      class="el"
      :style="{
        '--theme-color-menu-bg-active': `${CONFIG.theme_color_menu_bg_active}`,
        '--theme-color-menu-color': `${CONFIG.theme_color_menu_color}`
      }"
  >
    <router-view/>
  </div>
</template>

<style scoped lang="scss">
.el {
  width: 100%;
  height: 100%;
}

//$thumb-bg-color: var(--theme-color-menu-bg-active);
//::-webkit-scrollbar {
//  width: 10px;
//  background-color: transparent;
//}
//
//::-webkit-scrollbar-thumb {
//  background-color: darken($thumb-bg-color, 50%);
//  border-radius: 5px;
//}
</style>
