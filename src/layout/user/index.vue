<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import PublicIndex from "@/layout/publicIndex.vue";
import { CONFIG } from "@/utils/base.ts";
import { useRoute } from 'vue-router';

const route = useRoute()
const defaultActive = ref('')
watch(route, () => {
  defaultActive.value = route.path
}, {
  immediate: true
})

const menus = [
  {
    index: '/user/info',
    icon: 'info',
    label: '我的资料'
  },
  {
    index: '/user/edit-psd',
    icon: 'electronic-locks-open',
    label: '修改密码'
  }
]
const menuIndex = computed(() => {
  return menus.findIndex(itm => itm.index === defaultActive.value)
})
</script>

<template>
  <PublicIndex>
    <el-container class="el">
      <el-aside class="left" width="200px" :style="{
        '--theme-color-menu-bg-active': `${CONFIG.theme_color_menu_bg_active}`,
        '--theme-color-menu-color': `${CONFIG.theme_color_menu_color}`
      }">
        <el-menu :default-active="defaultActive" :collapse="false" :unique-opened="true" router>
          <el-menu-item v-for="(item, index) in menus" :index="item.index" style="z-index: 1;" :style="{
            color: index === menuIndex ? '#fff' : '#000'
          }">
            <el-space class="elSpace">
              <SvgIcon :name="item.icon"
                :color="index === menuIndex ? CONFIG.icon_white : CONFIG.theme_color_menu_bg_active" />
              <span>{{ item.label }}</span>
            </el-space>
            <div v-if="index === menuIndex" class="bg" style="position: absolute;padding: 3px 0">
              <div class="r0"></div>
              <div class="r1"></div>
              <div class="r2"></div>
            </div>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="right">
        <router-view />
      </el-main>
    </el-container>
  </PublicIndex>
</template>

<style scoped lang="scss">
.el {
  display: flex;
  justify-content: center;
  height: 100%;

  >.left {
    flex: none;
    width: 200px;
    height: 100%;

    >* {
      height: 100%;
    }
  }

  >.right {
    flex: auto;
    padding: 8px;
    min-width: 600px;
    max-width: 1000px;
  }
}

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

  >.r0,
  .r2 {
    flex: none;
    width: var(--padding);
    height: var(--padding);
    background-color: transparent;
    overflow: hidden;
    background-clip: padding-box;
  }

  >.r0 {
    background-image: radial-gradient(circle at 0 0, transparent var(--padding), var(--theme-color-menu-bg-active) var(--padding));
  }

  >.r2 {
    background-image: radial-gradient(circle at 0 var(--padding), transparent var(--padding), var(--theme-color-menu-bg-active) var(--padding));
  }

  >.r1 {
    flex: auto;
    width: 100%;
    background-color: var(--theme-color-menu-bg-active);
    border-radius: var(--padding) 0 0 var(--padding);
  }
}
</style>