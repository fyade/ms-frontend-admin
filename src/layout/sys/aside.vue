<script setup lang="ts">
import { useRouterStore } from "@/store/module/router.ts";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import Menu from "@/layout/menu.vue";

const go = (url: string) => {
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
  }
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
  <el-menu
      class="el"
  >
    <Menu
        :items="allMenus1[0].children"
        @gotoMenu="go"
    ></Menu>
  </el-menu>
</template>

<style scoped>
.el {
  height: 100%;
}
</style>