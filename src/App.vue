<script setup lang="ts">
import { CONFIG } from "@/utils/base.ts";
</script>

<template>
  <div
      class="el"
      :style="{
        '--theme-color-menu-bg-active': `${CONFIG.theme_color_menu_bg_active}`,
        '--theme-color-menu-bg-active-lighten': `${CONFIG.theme_color_menu_bg_active_lighten}`,
        '--theme-color-menu-color': `${CONFIG.theme_color_menu_color}`,
        '--theme-color-main-bg': `${CONFIG.theme_color_main_bg}`,
      }"
  >
    <router-view/>
  </div>
</template>

<style scoped>
.el {
  width: 100%;
  height: 100%;
}
</style>
