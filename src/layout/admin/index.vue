<script setup lang="ts">
import Header from "@/layout/admin/header.vue";
import Aside from "@/layout/admin/aside.vue";
import { RouteRecordRaw, useRoute } from "vue-router";
import { useAdminRouterStore } from "@/store/module/adminRouter.ts";
import { Ref, ref, VueElement } from "vue";
import { routePathsPrefixs, routerPinList } from "@/router";

const route = useRoute()
const adminRouterStore = useAdminRouterStore();
const aside: Ref<InstanceType<typeof Aside> | null> = ref<InstanceType<typeof Aside> | null>(null)

const gotoMenu = (path: string) => {
  aside.value && aside.value.gotoMenu(path)
}
const deleteMenu = (index: number) => {
  if (route.path === `${routePathsPrefixs.admin}/${adminRouterStore.getMenuList()[index].path}`) {
    aside.value && aside.value.gotoMenu(`${routePathsPrefixs.admin}/home`)
  }
  adminRouterStore.deleteMenu(index)
}

const contextMenu = (info: RouteRecordRaw, index: number) => [
  [
    {
      label: '关闭此标签页',
      operate: () => {
        if (routerPinList.indexOf(`${routePathsPrefixs.admin}/${info.path}`) > -1) {
          return
        }
        deleteMenu(index)
      }
    },
    {
      label: '关闭左侧标签页',
      operate: () => {
        if (adminRouterStore.getMenuList().slice(0, index).findIndex(item => `${routePathsPrefixs.admin}/${item.path}` === route.path) > -1) {
          aside.value && aside.value.gotoMenu(`${routePathsPrefixs.admin}/home`)
        }
        adminRouterStore.deleteLeftMenu(index)
      }
    },
    {
      label: '关闭右侧标签页',
      operate: () => {
        if (adminRouterStore.getMenuList().slice(index + 1, adminRouterStore.getMenuList().length).findIndex(item => `${routePathsPrefixs.admin}/${item.path}` === route.path) > -1) {
          aside.value && aside.value.gotoMenu(`${routePathsPrefixs.admin}/home`)
        }
        adminRouterStore.deleteRightMenu(index)
      }
    },
    {
      label: '关闭其他标签页',
      operate: () => {
        if (route.path !== `${routePathsPrefixs.admin}/${info.path}`) {
          aside.value && aside.value.gotoMenu(`${routePathsPrefixs.admin}/home`)
        }
        adminRouterStore.deleteOtherMenu(index, routerPinList.indexOf(`${routePathsPrefixs.admin}/${info.path}`) > -1)
      }
    }
  ]
]
</script>

<template>
  <RightClickMenu style="height: 100%;">
    <div class="layout-admin">
      <el-container>
        <el-header style="padding: 0;height: 50px;">
          <Header/>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <Aside ref="aside"/>
          </el-aside>
          <el-main class="content">
            <div class="header">
              <RightClickMenu
                  v-for="(item,index) in adminRouterStore.getMenuList()"
                  :key="item.name"
                  :menus="contextMenu(item,index)">
                <el-tag
                    type="info"
                    :effect="`${routePathsPrefixs.admin}/${item.path}`===route.path?'light':'plain'"
                    :closable="routerPinList.indexOf(`${routePathsPrefixs.admin}/${item.path}`)===-1"
                    @click="gotoMenu(`${routePathsPrefixs.admin}/${item.path}`)"
                    @close="deleteMenu(index)"
                    style="cursor: pointer;"
                >
                  {{ item.name }}
                </el-tag>
              </RightClickMenu>
            </div>
            <div class="main">
              <router-view #default="{Component}">
                <keep-alive :include="adminRouterStore.getMenuListNames()">
                  <component :is="Component" :key="route.path"/>
                </keep-alive>
              </router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </RightClickMenu>
</template>

<style scoped lang="scss">
.layout-admin {
  width: 100%;
  height: 100%;

  > * {
    width: 100%;
    height: 100%;
  }
}

.content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: auto;
  padding: 0;

  > .header {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: none;
    padding: 8px;
    border-bottom: 1px solid #eee;
    height: 30px;
  }

  > .main {
    flex: auto;
    padding: 8px;
    overflow: auto;
  }
}
</style>