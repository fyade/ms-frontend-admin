<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef } from "vue";

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

const offsetNumber = ref(200)
const el = useTemplateRef<HTMLElement>('el')
nextTick(() => {
  offsetNumber.value = props.size
  if (el.value) {
    // 0这个值太过极限，取一个大一点点的10
    if (el.value.getBoundingClientRect().x + props.size - offsetNumber.value <= 10) {
      offsetNumber.value = -offsetNumber.value
    }
  }
})
</script>

<template>
  <div ref="el" class="svgicon" :id="`svg-icon-${props.name}`" :style="{
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
      filter: `drop-shadow(${offsetNumber}px 0 0 ${props.color})`,
      transform: `translate(${-offsetNumber}px, -30px)`
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