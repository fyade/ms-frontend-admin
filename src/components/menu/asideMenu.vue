<script setup lang="ts">
import { CONFIG, final } from "@/utils/base.ts";
import { computed } from "vue";
import { ifValid } from "@/utils/ObjectUtils.ts";

const props = defineProps({
  menus: {
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
const menus2 = computed(() => {
  return props.menus.sort((a: any, b: any) => {
    return (ifValid(a.meta.orderNum) && typeof a.meta.orderNum === 'number' ? a.meta.orderNum : 0) - (ifValid(b.meta.orderNum) && typeof b.meta.orderNum === 'number' ? b.meta.orderNum : 0)
  })
})
const emits = defineEmits(['gotoMenu']);

const menuClick = (path: any, ifLink: boolean = false) => {
  if (ifLink) {
    openSite(path)
  } else {
    emits('gotoMenu', `${props.parentPath}/${path}`.replace(/\/{2,}/g, '/'))
  }
}
const openSite = (item: string) => window.open(item.replace('/http', 'http'))
</script>

<template>
  <div
      v-for="(item, index) in menus2 as any[]"
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
            :menus="item.children"
            :parent-path="`${props.parentPath}/${item.path}`"
            @gotoMenu="menuClick"
        ></AsideMenu>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item
          :index="item.meta.ifLink===final.Y?`${item.path}`:`${props.parentPath}/${item.path}`.replace(/\/{2,}/g, '/')"
          @click="menuClick(item.path, item.meta.ifLink===final.Y)"
      >
        <template v-if="item.meta.ifLink===final.Y">
          <a :href="item.path.replace('/http', 'http')" target="_blank"
             style="position: absolute;left: 0;display: block;padding: inherit;width: 100%;color: #fff;" @click.stop>
            <el-space>
              <SvgIcon :name="item.meta.icon" :color="CONFIG.icon_white"/>
              <span>{{ item.meta ? item.meta.label : item.name }}</span>
            </el-space>
          </a>
        </template>
        <template v-else>
          <el-space>
            <SvgIcon :name="item.meta.icon" :color="CONFIG.icon_white"/>
            <span>{{ item.meta ? item.meta.label : item.name }}</span>
          </el-space>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<style scoped>

</style>