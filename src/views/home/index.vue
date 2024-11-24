<script setup lang="ts">
import { useSysStore } from "@/store/module/sys.ts";
import { getPermissions, getSysInfo, getSystems } from "@/api/sys.ts";
import { SysDto } from "@/type/module/main/sysManage/sys.ts";
import { onBeforeUnmount, ref } from "vue";
import { deepClone } from "@/utils/ObjectUtils.ts";
import { MenuDto } from "@/type/module/main/sysManage/menu.ts";
import { final, T_COMP, T_MENU } from "@/utils/base.ts";
import { RouteRecordNormalized } from "vue-router";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import router from "@/router";
import { ElLoading, ElNotification, NotificationHandle } from "element-plus";
import { useRouterStore } from "@/store/module/router.ts";
import { LoadingInstance } from "element-plus/es/components/loading/src/loading";
import Header from "@/layout/sys/header.vue";

const sysStore = useSysStore();

let intervalTimers: number[] = []
let loading: LoadingInstance | null

// 服务器监控
const serverMonitor = () => {
  // const interval = setInterval(() => {
  //   getSysInfo().then(res => {
  //   })
  // }, 1000);
  // intervalTimers.push(interval)
}
serverMonitor()

// 我的资源
const allSystems = ref<SysDto[]>([])
const getData = () => {
  allSystems.value = []
  getSystems().then(res => {
    allSystems.value = res
  })
}
getData()

// 引入资源
const modules = {
  ...import.meta.glob(`../../views/**/**/**/**.vue`),
  ...import.meta.glob(`../../views/**/**/**.vue`),
}
const goToSystem = async (dto: SysDto) => {
  loading = ElLoading.service({
    lock: true,
    text: '系统资源加载中，请稍后。。。',
    background: 'rgba(0, 0, 0, .7)',
  });
  const res = await getPermissions(dto.id)
  try {
    if (router.getRoutes().findIndex(item => item.name === `/${dto.path}`) === -1) {
      const permissions = (await Promise.all((deepClone<MenuDto[]>(res).filter(item => {
        return [T_MENU, T_COMP].indexOf(item.type) > -1 && item.ifVisible === final.Y
      }) as unknown as (RouteRecordNormalized & MenuDto & { component: any })[]).map(async item => {
        item.meta = {
          ...item,
          asideMenu: true,
          sysPerms: dto.perms,
        }
        item.name = item.perms
        if (item.type === T_COMP) {
          const component = await modules[`../${dto.path}${item.component}`]()
          item.component = component.default
        } else {
          delete item.component
        }
        return item
      })))
      const permissionsObj = arr2ToDiguiObj(permissions, {ifDeepClone: false}).sort((m1, m2) => {
        return m1.orderNum - m2.orderNum
      })
      router.addRoute({
        path: `/${dto.path}`,
        name: `/${dto.path}`,
        meta: {
          label: `${dto.name}首页`
        },
        redirect: `/${dto.path}/${permissionsObj[0].path}`,
        component: () => import('@/layout/sys/index.vue'),
        children: []
      })
      for (let i = 0; i < permissionsObj.length; i++) {
        router.addRoute(`/${dto.path}`, permissionsObj[i])
      }
    }
    sysStore.setCurrentSystem(dto)
    const routerStore = useRouterStore();
    routerStore.reloadAllMenu1()
    routerStore.deleteAllMenu()
    router.push(`/${dto.path}`)
  } catch (e) {
    console.error(e);
    ElMessage.error({
      message: '系统发生故障，请检查菜单是否有错误，若无法解决，请查看开发文档或联系开发者。',
      duration: 0,
      showClose: true
    })
    if (loading) {
      loading.close()
    }
  }
}

onBeforeUnmount(() => {
  if (loading) {
    loading.close()
  }
  intervalTimers.forEach(timer => clearInterval(timer))
})
</script>

<template>
  <div class="el">
    <Header style="height: 60px;background-color: #fff;" :if-show-breadcrumb="false"/>
    <div class="box">
      <!--我的资源-->
      <div class="wdzy">
        <el-divider content-position="left">我的资源</el-divider>
        <div class="boxs">
          <el-card shadow="hover" v-for="item in allSystems" :key="item.id" @click="goToSystem(item)">
            {{ item.name }}
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.el {
  min-height: 100vh;
  background-color: var(--theme-color-main-bg);

  > .box {
    margin: 0 auto;
    padding: 20px 0;
    max-width: 1200px;
  }

  .wdzy {
    padding: 20px;
    background-color: #fff;

    > .boxs {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      width: 100%;

      > * {
        cursor: pointer;
      }
    }
  }
}
</style>
