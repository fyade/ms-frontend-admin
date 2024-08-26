<script setup lang="ts">
import { CONFIG, final } from "@/utils/base.ts";
import { computed } from "vue";
import { ifNull, ifUndefined, ifValid } from "@/utils/ObjectUtils.ts";
import { RouteRecordNormalized, useRoute } from "vue-router";
import { useSysConfigStore } from "@/store/module/sysConfig.ts";

const route = useRoute()
const props = defineProps({
  menus: {
    type: Array as () => RouteRecordNormalized[],
    required: true
  },
  parentPath: {
    type: String,
    default: ''
  }
});
const menus2 = computed(() => {
  return props.menus.toSorted((a, b) => {
    return (ifValid(a.meta.orderNum) && typeof a.meta.orderNum === 'number' ? a.meta.orderNum : 0) - (ifValid(b.meta.orderNum) && typeof b.meta.orderNum === 'number' ? b.meta.orderNum : 0)
  })
})
const emits = defineEmits(['gotoMenu']);

const menuClick = (path: string, ifLink: boolean = false, i = 0) => {
  if (ifLink) {
    openSite(path)
  } else {
    emits('gotoMenu', i > 0 ? path : `${props.parentPath}/${path}`.replace(/\/{2,}/g, '/'), ifLink, ++i)
  }
}
const openSite = (item: string) => window.open(item.replace('/http', 'http'))

const sysConfigStore = useSysConfigStore();
const ifParentMenuItem = (item: RouteRecordNormalized) => {
  return item.meta.parentId === final.DEFAULT_PARENT_ID || ifUndefined(item.meta.parentId) || ifNull(item.meta.parentId)
}
</script>

<template>
  <div
      class="asideMenu"
      v-for="(item, index) in menus2"
      :key="index"
  >
    <template v-if="item.children && item.children?.length > 0">
      <el-sub-menu
          class="elSubMenu"
          :index="`${props.parentPath}/${item.path}`.replace(/\/{2,}/g, '/')"
      >
        <template #title>
          <template v-if="sysConfigStore.getMenuCollapse()&&ifParentMenuItem(item)">
            <SvgIcon :name="item.meta.icon as string"
                     :color="item.meta&&item.meta.fullPath===route.path?CONFIG.icon_white:CONFIG.theme_color_menu_bg_active"/>
          </template>
          <el-space v-else class="elSpace">
            <SvgIcon :name="item.meta.icon as string"
                     :color="item.meta&&item.meta.fullPath===route.path?CONFIG.icon_white:CONFIG.theme_color_menu_bg_active"/>
            <span>{{ item.meta ? item.meta.label : item.name }}</span>
          </el-space>
          <div v-if="item.meta&&item.meta.fullPath===route.path" class="bg">
            <div class="r0"></div>
            <div class="r1"></div>
            <div class="r2"></div>
          </div>
        </template>
        <AsideMenu
            :menus="item.children as  RouteRecordNormalized[]"
            :parent-path="`${props.parentPath}/${item.path}`"
            @gotoMenu="menuClick"
        ></AsideMenu>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item
          class="elMenuItem"
          :index="item.meta.ifLink===final.Y?`${item.path}`:`${props.parentPath}/${item.path}`.replace(/\/{2,}/g, '/')"
          @click="menuClick(item.path, item.meta.ifLink===final.Y)"
      >
        <template v-if="item.meta.ifLink===final.Y">
          <a :href="item.path.replace('/http', 'http')" target="_blank"
             style="position: absolute;left: 0;display: block;padding: inherit;width: 100%;" @click.stop>
            <el-space class="elSpace">
              <SvgIcon :name="item.meta.icon as string"
                       :color="item.meta&&item.meta.fullPath===route.path?CONFIG.icon_white:CONFIG.theme_color_menu_bg_active"/>
              <span>{{ item.meta ? item.meta.label : item.name }}</span>
            </el-space>
            <div v-if="item.meta&&item.meta.fullPath===route.path" class="bg">
              <div class="r0"></div>
              <div class="r1"></div>
              <div class="r2"></div>
            </div>
          </a>
        </template>
        <template v-else>
          <el-space class="elSpace">
            <SvgIcon :name="item.meta.icon as string"
                     :color="item.meta&&item.meta.fullPath===route.path?CONFIG.icon_white:CONFIG.theme_color_menu_bg_active"/>
            <template
                v-if="!sysConfigStore.getMenuCollapse()||(sysConfigStore.getMenuCollapse()&&!ifParentMenuItem(item))">
              <span>{{ item.meta ? item.meta.label : item.name }}</span>
            </template>
          </el-space>
          <div v-if="item.meta&&item.meta.fullPath===route.path" class="bg">
            <div class="r0"></div>
            <div class="r1"></div>
            <div class="r2"></div>
          </div>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<style scoped lang="scss">
.asideMenu {
  a {
    color: #000;
  }

  .el-menu-item {
    .elSpace {
      z-index: 1;
    }

    .bg {
      --padding: 6px;
      position: absolute;
      z-index: 0;
      left: var(--padding);
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: calc(100% - var(--padding));
      height: 50px;
      transition: all .2s;

      > .r0, .r2 {
        flex: none;
        width: var(--padding);
        height: var(--padding);
        background-color: transparent;
        overflow: hidden;
        background-clip: padding-box;
      }

      > .r0 {
        background-image: radial-gradient(circle at 0 0, transparent var(--padding), var(--theme-color-menu-bg-active) var(--padding));
      }

      > .r2 {
        background-image: radial-gradient(circle at 0 var(--padding), transparent var(--padding), var(--theme-color-menu-bg-active) var(--padding));
      }

      > .r1 {
        flex: auto;
        width: 100%;
        background-color: var(--theme-color-menu-bg-active);
        border-radius: var(--padding) 0 0 var(--padding);
      }
    }

    &:hover {
      //background-color: transparent;
    }
  }

  .el-menu-item.is-active {
    position: relative;
    color: var(--theme-color-menu-color);

    > div {
      //z-index: 100;
    }
  }
}
</style>