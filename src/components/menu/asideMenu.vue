<script setup lang="ts">
import { CONFIG } from "@/utils/base.ts";

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  parentPath: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: {}
  }
});
const emits = defineEmits(['gotoMenu']);

const menuclick = (item: any) => {
  emits('gotoMenu', item.index || item)
}
</script>

<template>
  <div
      v-for="(item, index) in props.items as any[]"
      :key="index"
      :style="style"
  >
    <template v-if="item.children && item.children?.length > 0">
      <el-sub-menu
          :index="`${props.parentPath}/${item.path}`.replace(/\/{2,}/g, '/')"
      >
        <template #title>
          <el-space>
            <SvgIcon :name="item.meta.icon" :color="CONFIG.icon_white"/>
            <span>{{ item.meta ? item.meta.label : item.name }}</span>
          </el-space>
        </template>
        <AsideMenu
            :style="{backgroundColor: '#1f2d3d'}"
            :items="item.children"
            :parent-path="`${props.parentPath}/${item.path}`"
            @gotoMenu="menuclick"
        ></AsideMenu>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item
          :index="`${props.parentPath}/${item.path}`.replace(/\/{2,}/g, '/')"
          @click="menuclick"
      >
        <el-space>
          <SvgIcon :name="item.meta.icon" :color="CONFIG.icon_white"/>
          <span>{{ item.meta ? item.meta.label : item.name }}</span>
        </el-space>
      </el-menu-item>
    </template>
  </div>
</template>

<style scoped>

</style>