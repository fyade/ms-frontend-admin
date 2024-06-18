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
  <div class="svgicon" :style="{
    position: 'relative',
    width: `${props.size}px`,
    height: `${props.size}px`,
  }">
    <svg aria-hidden="true" class="icon" :style="{
      position: 'absolute',
      left: '0px',
      top: '30px',
      display: 'block',
      fontSize: `${props.size}px`,
      color: props.color,
      filter: `drop-shadow(100px 0 0 ${props.color})`,
      transform: 'translate(-100px, -30px)'
  }">
      <use :href="symbolId" :fill="props.color"/>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.svgicon {
  overflow: hidden;

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
}
</style>