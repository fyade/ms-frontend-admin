<script setup lang="ts">
import Aside from "@/layout/sys/aside.vue";
import { useRoute } from "vue-router";
import { useRouterStore } from "@/store/module/router.ts";
import { Ref, ref, watch } from "vue";
import { homerouter, routerPinList } from "@/router";
import PublicIndex from "@/layout/publicIndex.vue";

const route = useRoute()
const routerStore = useRouterStore();
const aside: Ref<InstanceType<typeof Aside> | null> = ref<InstanceType<typeof Aside> | null>(null)

const gotoMenu = (path: string) => {
  aside.value && aside.value.gotoMenu(path)
}
const deleteMenu = (index: number) => {
  if (route.path === routerStore.getMenuList()[index].path) {
    aside.value && aside.value.gotoMenu(homerouter)
  }
  routerStore.deleteMenu(index)
}

const contextMenu = (info: any, index: number) => [
  [
    {
      label: '关闭此标签页',
      operate: () => {
        if (routerPinList.indexOf(info.path) > -1) {
          return
        }
        deleteMenu(index)
      }
    },
    {
      label: '关闭左侧标签页',
      operate: () => {
        if (routerStore.getMenuList().slice(0, index).findIndex(item => item.path === route.path) > -1) {
          aside.value && aside.value.gotoMenu(homerouter)
        }
        routerStore.deleteLeftMenu(index)
      }
    },
    {
      label: '关闭右侧标签页',
      operate: () => {
        if (routerStore.getMenuList().slice(index + 1, routerStore.getMenuList().length).findIndex(item => item.path === route.path) > -1) {
          aside.value && aside.value.gotoMenu(homerouter)
        }
        routerStore.deleteRightMenu(index)
      }
    },
    {
      label: '关闭其他标签页',
      operate: () => {
        if (route.path !== info.path) {
          aside.value && aside.value.gotoMenu(homerouter)
        }
        routerStore.deleteOtherMenu(index, routerPinList.indexOf(info.path) > -1)
      }
    },
    {
      label: '关闭全部标签页',
      operate: () => {
        if (routerPinList.indexOf(route.path) === -1) {
          aside.value && aside.value.gotoMenu(homerouter)
        }
        routerStore.deleteAllMenu()
      }
    }
  ]
]
</script>

<template>
  <PublicIndex>
    <el-container style="height: calc(100% - 50px)">
      <el-aside width="200px">
        <Aside ref="aside"/>
      </el-aside>
      <el-main class="content">
        <div class="header">
          <el-scrollbar>
            <div class="header2">
              <RightClickMenu
                  v-for="(item,index) in routerStore.getMenuList()"
                  :key="item.name"
                  :menus="contextMenu(item,index)"
              >
                <el-tag
                    type="info"
                    :effect="item.path===route.path?'light':'plain'"
                    :closable="routerPinList.indexOf(item.path)===-1"
                    @click="gotoMenu(item.path)"
                    @close="deleteMenu(index)"
                    style="cursor: pointer;"
                >
                  {{ item.meta ? item.meta.label : item.name }}
                </el-tag>
              </RightClickMenu>
            </div>
          </el-scrollbar>
        </div>
        <div class="main">
          <el-scrollbar always view-style="height: 100%;">
            <div class="main2">
              <router-view #default="{Component}">
                <keep-alive :include="routerStore.getMenuListNames">
                  <component :is="Component" :key="route.path"/>
                </keep-alive>
              </router-view>
            </div>
          </el-scrollbar>
        </div>
      </el-main>
    </el-container>
  </PublicIndex>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: auto;
  padding: 0;

  .header {
    border-bottom: 1px solid #eee;
  }

  .header2 {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: none;
    padding: 8px;
    height: 30px;
    //overflow: auto hidden;
  }

  > .main {
    flex: auto;
    padding: 8px;
    padding-right: 0;
    overflow: auto;
  }

  .main2 {
    height: 100%;
    padding-right: 12px;
  }
}
</style>