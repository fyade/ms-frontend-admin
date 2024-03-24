<script setup lang="ts">
import { routePathsPrefixs, routes } from "@/router";
import { useAdminRouterStore } from "@/store/module/adminRouter.ts";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const go = (url: string) => {
  if (url.indexOf(routePathsPrefixs.admin) === -1) {
    router.push(url)
  } else {
    const index = menuList.findIndex(item => `${routePathsPrefixs.admin}/${item.path}` === url)
    onselectmenu(index)
  }
}

const adminRouterStore = useAdminRouterStore();

const menuList = routes?.find(item => item?.path === routePathsPrefixs.admin)?.children?.filter(item => !!!item.redirect) || []
const route = useRoute()
const router = useRouter()
onMounted(() => {
  const path = route.path.replace(`${routePathsPrefixs.admin}/`, '')
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
  router.push(`${routePathsPrefixs.admin}/${menuList[i].path}`)
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
  const path = newPath.replace(`${routePathsPrefixs.admin}/`, '')
  const index = menuList.findIndex(item => item.path === path)
  if (index > -1) {
    indexBgSelect.value = index
    indexBgHover.value = index
  }
}
const addToStore = (i: number) => {
  adminRouterStore.addMenu(menuList[i])
}

defineExpose({
  gotoMenu
})
</script>
<template>
  <el-menu class="el">
    <el-menu-item @click="go('/login')">login</el-menu-item>
    <el-menu-item @click="go('/admin/home')">admin/home</el-menu-item>
    <el-menu-item @click="go('/admin/menu')">admin/menu</el-menu-item>
    <el-menu-item @click="go('/admin/role')">admin/role</el-menu-item>
    <el-menu-item @click="go('/admin/permission')">admin/permission</el-menu-item>
    <el-menu-item @click="go('/admin/user-role')">admin/user-role</el-menu-item>
    <el-menu-item @click="go('/admin/role-permission')">admin/role-permission</el-menu-item>
  </el-menu>
</template>

<style scoped>
.el {
  height: 100%;
}
</style>