import { defineStore } from 'pinia'
import { Ref, ref } from "vue";
import { routePathsPrefixs, routerPinList, routes } from "@/router";
import { RouteRecordRaw } from "vue-router";

export const useAdminRouterStore = defineStore('adminRouter', () => {
  const menuList: Ref<RouteRecordRaw[]> = ref(routes.find(item => item?.path === routePathsPrefixs.admin)?.children?.filter(item => routerPinList.indexOf(`${routePathsPrefixs.admin}${item.path}`) > -1) || [])
  const addMenu = (menu: RouteRecordRaw) => {
    if (menuList.value.findIndex(men => men.name === menu.name) === -1) {
      menuList.value.push(menu)
    }
  }
  const deleteMenu = (index: number) => {
    menuList.value.splice(index, 1)
  }
  const deleteLeftMenu = (index: number) => {
    const pinNum = menuList.value.filter(item => routerPinList.indexOf(`${routePathsPrefixs.admin}/${item.path}`) > -1).length
    menuList.value.splice(pinNum, index - pinNum)
  }
  const deleteRightMenu = (index: number) => {
    const pinNum = menuList.value.filter(item => routerPinList.indexOf(`${routePathsPrefixs.admin}/${item.path}`) > -1).length
    const startIndex = index + 1 < pinNum ? pinNum : index + 1
    menuList.value.splice(startIndex, menuList.value.length - startIndex)
  }
  const deleteOtherMenu = (index: number, ifPin: boolean) => {
    const pinNum = menuList.value.filter(item => routerPinList.indexOf(`${routePathsPrefixs.admin}/${item.path}`) > -1).length
    menuList.value.splice(pinNum, index - 1)
    menuList.value.splice(ifPin ? pinNum : (pinNum + 1), menuList.value.length - 1)
  }
  const getMenuList = () => {
    return menuList.value
  }
  const getMenuListNames = () => {
    return menuList.value.map(item => item.name) as string[]
  }
  return {
    addMenu,
    deleteMenu,
    deleteLeftMenu,
    deleteRightMenu,
    deleteOtherMenu,
    getMenuList,
    getMenuListNames
  }
})
