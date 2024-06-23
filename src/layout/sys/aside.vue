<script setup lang="ts">
import { useRouterStore } from "@/store/module/router.ts";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import AsideMenu from "@/components/menu/asideMenu.vue";
import { CONFIG } from "@/utils/base.ts";

const defaultActive = ref('')
const go = (url: string) => {
  defaultActive.value = url
  const index = allMenus2.findIndex(item => item.path === url)
  if (index > -1) {
    onselectmenu(index)
  } else {
    router.push(url)
  }
}

const routerStore = useRouterStore();

const allMenus1 = routerStore.allMenus1
const allMenus2 = routerStore.allMenus2
const route = useRoute()
const router = useRouter()
onMounted(() => {
  const path = route.path
  const index = allMenus2.findIndex(item => item.path === path)
  if (index > -1) {
    indexBgSelect.value = index
    indexBgHover.value = index
    addToStore(index)
    defaultActive.value = allMenus2[index].path
  }
})
watch(route, () => {
  defaultActive.value = route.path
})

const indexBgHover = ref(0)
const indexBgSelect = ref(0)
const show = ref(true)

const onmouseenter = (i: number) => {
  indexBgHover.value = i
}
const onselectmenu = (i: number) => {
  addToStore(i)
  indexBgSelect.value = i
  router.push(allMenus2[i].path)
}
const onmouseleave = () => {
  indexBgHover.value = indexBgSelect.value
}
const changeShow = () => {
  show.value = !show.value
}

const gotoMenu = (newPath: string) => {
  if (newPath === route.path) {
    return
  }
  router.push(newPath)
  const path = newPath
  const index = allMenus2.findIndex(item => item.path === path)
  if (index > -1) {
    indexBgSelect.value = index
    indexBgHover.value = index
  }
}
const addToStore = (i: number) => {
  routerStore.addMenu(allMenus2[i])
}

defineExpose({
  gotoMenu
})
</script>
<template>
  <div
      class="el"
      :style="{
        '--theme-color-menu-bg-active': `${CONFIG.theme_color_menu_bg_active}`,
        '--theme-color-menu-color': `${CONFIG.theme_color_menu_color}`
      }"
  >
    <el-menu
        :default-active="defaultActive"
        :collapse="false"
        :unique-opened="true"
        router
    >
      <AsideMenu
          :menus="allMenus1"
          @gotoMenu="go"
      ></AsideMenu>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.el {
  height: 100%;
  overflow: hidden auto;

  > * {
    height: 100%;
  }
}
</style>