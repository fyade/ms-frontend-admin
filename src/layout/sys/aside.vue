<script setup lang="ts">
import { useRouterStore } from "@/store/module/router.ts";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const go = (url: string) => {
  const index = menuList.findIndex(item => item.path === url)
  if (index > -1) {
    onselectmenu(index)
  } else {
    router.push(url)
  }
}

const routerStore = useRouterStore();

const menuList = routerStore.allMenus
const route = useRoute()
const router = useRouter()
onMounted(() => {
  const path = route.path
  const index = menuList.findIndex(item => item.path === path)
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
  router.push(menuList[i].path)
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
  const index = menuList.findIndex(item => item.path === path)
  if (index > -1) {
    indexBgSelect.value = index
    indexBgHover.value = index
  }
}
const addToStore = (i: number) => {
  routerStore.addMenu(menuList[i])
}

defineExpose({
  gotoMenu
})
</script>
<template>
  <el-menu class="el">
    <el-menu-item @click="go('/index')">index</el-menu-item>
    <el-menu-item @click="go('/sys/menu')">sys/menu</el-menu-item>
    <el-menu-item @click="go('/sys/role')">sys/role</el-menu-item>
    <el-menu-item @click="go('/sys/permission')">sys/permission</el-menu-item>
    <el-menu-item @click="go('/sys/user-role')">sys/user-role</el-menu-item>
    <el-menu-item @click="go('/sys/role-permission')">sys/role-permission</el-menu-item>
  </el-menu>
</template>

<style scoped>
.el {
  height: 100%;
}
</style>