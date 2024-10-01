import { defineStore } from 'pinia'
import { computed, ComputedRef, Ref, ref } from "vue";
import router, { routerPinList } from "@/router";
import { diguiObjToArr2 } from "@/utils/baseUtils.ts";
import { ifWebsiteLink } from "@/utils/LinkUtils.ts";
import { RouteRecordName, RouteRecordNormalized } from "vue-router";
import { useSysStore } from "@/store/module/sys.ts";
import { final } from "@/utils/base.ts";

export interface allMenus2I {
  path: string
  name: RouteRecordName
  meta: RouteRecordNormalized['meta']
  ar: RouteRecordNormalized[]
}

const sysStore = useSysStore();

export const useRouterStore = defineStore('routerStore', () => {
  // const allMenus1: RouteRecordNormalized[] = routes.filter(item => item.path === '/');
  const allMenus1: RouteRecordNormalized[] = router.getRoutes().filter(item => {
    return (item.meta && item.meta.asideMenu) && item.meta.sysPerms === sysStore.getCurrentSystem && item.meta.parentId === final.DEFAULT_PARENT_ID
  }).sort((m1, m2) => m1.meta.orderNum - m2.meta.orderNum)
  const allMenus2 = diguiObjToArr2<RouteRecordNormalized>(allMenus1).map(ar => {
    const meta = ar[ar.length - 1].meta;
    meta.fullPath = ar.map(item => item.path).join('/')
    return {
      path: ar.map((item, index) => (item.path.startsWith('/') || (index === 0 || ar[index - 1].path.endsWith('/'))) ? item.path : `/${item.path}`).join(''),
      name: ar[ar.length - 1].name || '',
      meta: meta,
      ar: ar
    }
  });
  const menuList: Ref<allMenus2I[]> = ref(allMenus2.filter(item => routerPinList.indexOf(item.path) > -1))
  const addMenu = (menu: allMenus2I) => {
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
  const deleteAllMenu = () => {
    const pinNum = menuList.value.filter(item => routerPinList.indexOf(item.path) > -1).length
    menuList.value.splice(pinNum, menuList.value.length - pinNum)
  }
  const getMenuList = () => {
    return menuList.value
  }
  const getMenuListNames = computed(() => {
    return menuList.value.map(item => item.name) as string[]
  })
  return {
    addMenu,
    deleteMenu,
    deleteLeftMenu,
    deleteRightMenu,
    deleteOtherMenu,
    deleteAllMenu,
    getMenuList,
    getMenuListNames,
    allMenus1,
    allMenus2
  }
})
