<script setup lang="ts">
import { nextTick, reactive } from "vue";
import eventBus from "@/utils/eventBus.ts";
import { MenusT } from "@/type/components/rightClickMenu.ts";

class StateReaC {
  show: boolean = false
  left: number = 0
  top: number = 0
}

const stateRea = reactive(new StateReaC())
const props = defineProps({
  menus: {
    type: Array as () => MenusT[][],
    default: () => []
  }
});

const rightClick = (payload: MouseEvent) => {
  if (props.menus.length > 0) {
    payload.preventDefault()
    eventBus.emit('right-click-close')
    nextTick(() => {
      stateRea.left = payload.clientX
      stateRea.top = payload.clientY
      stateRea.show = true
    })
  } else {
    eventBus.emit('right-click-close')
  }
}
const handlerRightClick = (func: Function) => {
  stateRea.show = false
  func()
}
const hiddenRightClick = () => {
  stateRea.show = false
}
const leftClick = () => {
  eventBus.emit('right-click-close')
}

eventBus.on('right-click-close', hiddenRightClick)
</script>

<template>
  <div class="right-click-container" @contextmenu.stop="rightClick" @click="leftClick">
    <slot></slot>
    <div
        class="right-container"
        :style="{
          left: `${stateRea.left}px`,
          top: `${stateRea.top}px`
        }"
        v-if="stateRea.show"
    >
      <div v-for="(item, index) in menus" :key="index">
        <div class="line" v-if="item.length > 1 && index !== 0"></div>
        <div class="menu" v-for="(itm, i) in item" :key="`${index}-${i}`" @click="handlerRightClick(itm.operate)">
          {{ itm.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.right-click-container {
  > .right-container {
    position: fixed;
    z-index: 5000;
    box-shadow: 0 2px 10px 3px #ddd;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;

    > div {
      padding: 6px 0;

      > .line {
        margin: 4px 0;
        height: 2px;
        background-color: #ddd;
      }

      > .menu {
        padding: 0 10px;
        height: 24px;
        line-height: 24px;
        cursor: pointer;
        font-size: 14px;

        &:hover {
          background-color: #eee;
        }
      }
    }
  }
}
</style>