<script setup lang="ts">
import { useRouterStore } from "@/store/module/router.ts";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import AsideMenu from "@/layout/sys/asideMenu.vue";
import { useSysConfigStore } from "@/store/module/sysConfig.ts";

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

const sysConfigStore = useSysConfigStore();
const changeMenuCollapse = () => {
  sysConfigStore.setMenuCollapse(!sysConfigStore.getMenuCollapse())
}

defineExpose({
  gotoMenu
})
</script>
<template>
  <div :class="`el ${ sysConfigStore.getMenuCollapse() ? 'menuCollapseTrue' : '' }`">
    <el-menu
        :default-active="defaultActive"
        :collapse="sysConfigStore.getMenuCollapse()"
        :unique-opened="true"
        :collapse-transition="false"
        router
        style="border-right: 0;"
    >
      <el-scrollbar>
        <AsideMenu
            :menus="allMenus1"
            @gotoMenu="go"
        ></AsideMenu>
      </el-scrollbar>
    </el-menu>
    <div class="bottom">
      <div class="row">
        <div @click="changeMenuCollapse">
          <SvgIcon :name="sysConfigStore.getMenuCollapse()?'indent-right':'indent-left'" color="#000" style="cursor: pointer;"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-right: 1px solid #ddd;
  overflow: hidden;

  &.menuCollapseTrue {
    :deep(.el-sub-menu__icon-arrow) {
      display: none;
    }
  }

  > * {
    &:first-child {
      flex: 1;
      overflow: hidden auto;
    }
  }

  > .bottom {
    flex: 0;

    > .row {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 40px;
    }
  }
}
</style>