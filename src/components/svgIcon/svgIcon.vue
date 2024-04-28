<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 20
  },
  color: {
    type: String,
    default: '#ffffff'
  }
});
const symbolId = computed(() => `#${props.name}`)
</script>

<template>
  <svg aria-hidden="true" class="icon" :style="{
    fontSize: `${props.size}px`,
    color: props.color,
    filter: `drop-shadow(100px 0 0 ${props.color})`,
    transform: 'translateX(-100px)'
  }">
    <use :href="symbolId" :fill="props.color"/>
  </svg>
</template>

<style scoped lang="scss">
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  fill: currentColor;
  width: 1em;
  height: 1em;

  svg {
    fill: currentColor;
    width: 1em;
    height: 1em;
  }
}
</style>