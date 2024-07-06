<script setup lang="ts">
import { CONFIG } from "@/utils/base.ts";
</script>

<template>
  <router-view
      :style="{
        '--theme-color-menu-bg-active': `${CONFIG.theme_color_menu_bg_active}`,
        '--theme-color-menu-color': `${CONFIG.theme_color_menu_color}`
      }"
  />
</template>

<style scoped lang="scss">
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
