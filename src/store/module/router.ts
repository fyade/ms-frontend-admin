import { defineStore } from 'pinia'
import { Ref, ref } from "vue";
import { routerPinList, routes } from "@/router";
import { diguiObjToArr2 } from "@/utils/baseUtils.ts";

export const useRouterStore = defineStore('routerStore', () => {
  const allMenus1: any[] = routes.filter(item => item.path === '/');
  const allMenus2 = diguiObjToArr2(allMenus1).map(ar => {
    return {
      path: ar.map((item: any, index: number) => (item.path.startsWith('/') || (index === 0 || ar[index - 1].path.endsWith('/'))) ? item.path : `/${item.path}`).join(''),
      name: ar[ar.length - 1].name,
      ar: ar
    }
  });
  const menuList: Ref<any[]> = ref(allMenus2.filter(item => routerPinList.indexOf(item.path) > -1))
  const addMenu = (menu: any) => {
    if (menuList.value.findIndex(men => men.name === menu.name) === -1) {
      menuList.value.push(menu)
    }
  }
  const deleteMenu = (index: number) => {
    menuList.value.splice(index, 1)
  }
  const deleteLeftMenu = (index: number) => {
    const pinNum = menuList.value.filter(item => routerPinList.indexOf(item.path) > -1).length
    menuList.value.splice(pinNum, index - pinNum)
  }
  const deleteRightMenu = (index: number) => {
    const pinNum = menuList.value.filter(item => routerPinList.indexOf(item.path) > -1).length
    const startIndex = index + 1 < pinNum ? pinNum : index + 1
    menuList.value.splice(startIndex, menuList.value.length - startIndex)
  }
  const deleteOtherMenu = (index: number, ifPin: boolean) => {
    const pinNum = menuList.value.filter(item => routerPinList.indexOf(item.path) > -1).length
    menuList.value.splice(pinNum, index - 1)
    menuList.value.splice(ifPin ? pinNum : (pinNum + 1), menuList.value.length - 1)
  }
  const getMenuList = () => {
    return menuList.value
  }
  const getMenuListNames = () => {
    return getMenuList().map((item: any) => item.name) as string[]
  }
  return {
    addMenu,
    deleteMenu,
    deleteLeftMenu,
    deleteRightMenu,
    deleteOtherMenu,
    getMenuList,
    getMenuListNames,
    allMenus1,
    allMenus2
  }
})
