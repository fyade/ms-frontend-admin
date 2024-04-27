<script setup lang="ts">
import { PixiClass } from "@/class/pixiClass.ts";
import { onMounted } from "vue";

onMounted(() => {
  const element: HTMLElement | null = document.querySelector('#pixiapp');
  if (element) {
    const pixiClass = new PixiClass(element);
    pixiClass.drawPoint({x: 100, y: 100, radius: 30, fillAlpha: 0, lineWidth: 1, lineColor: 0xffffff})
    // pixiClass.drawRectByCenterPoint({
    //   centerX: 200,
    //   centerY: 100,
    //   width: 60,
    //   height: 60,
    //   fillAlpha: 0,
    //   lineWidth: 1,
    //   lineColor: 0xffffff
    // })
  }
})
</script>

<template>
  <div id="pixiapp"></div>
</template>

<style scoped>

</style>