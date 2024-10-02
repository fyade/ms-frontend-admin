<script setup lang="ts">
import { useSysStore } from "@/store/module/sys.ts";
import { getPermissions, getSystems } from "@/api/sys.ts";
import { sysDto } from "@/type/api/main/sysManage/sys.ts";
import { ref } from "vue";
import { deepClone } from "@/utils/ObjectUtils.ts";
import { menuDto, T_COMP, T_MENU } from "@/type/api/main/sysManage/menu.ts";
import { final } from "@/utils/base.ts";
import { RouteRecordNormalized } from "vue-router";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import router from "@/router";
import { ElNotification, NotificationHandle } from "element-plus";
import { useRouterStore } from "@/store/module/router.ts";

const sysStore = useSysStore();

const allSystems = ref<sysDto[]>([])
const getData = () => {
  allSystems.value = []
  getSystems().then(res => {
    allSystems.value = res
  })
}
getData()

const modules = {
  ...import.meta.glob(`../../views/**/**/**/**.vue`),
  ...import.meta.glob(`../../views/**/**/**.vue`),
}
const goToSystem = async (dto: sysDto) => {
  const notification: NotificationHandle = ElNotification({
    title: '提示',
    message: '系统资源加载中。。。',
    type: 'success',
    showClose: false,
    duration: 0,
  });
  const res = await getPermissions(dto.id)
  try {
    if (router.getRoutes().findIndex(item => item.name === `/${dto.path}`) === -1) {
      const permissions = (await Promise.all((deepClone<menuDto[]>(res).filter(item => {
        return [T_MENU, T_COMP].indexOf(item.type) > -1 && item.ifVisible === final.Y
      }) as unknown as (RouteRecordNormalized & menuDto & { component: any })[]).map(async item => {
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
    notification.close()
    sysStore.setCurrentSystem(dto)
    const routerStore = useRouterStore();
    routerStore.deleteAllMenu()
    router.push(`/${dto.path}`)
  } catch (e) {
    console.error(e);
    ElMessage.error({
      message: '系统发生故障，请检查菜单是否有错误，若无法解决，请查看开发文档或联系开发者。',
      duration: 0,
      showClose: true
    })
    notification.close()
  }
}
</script>

<template>
  <!--<div>-->
  <!--  <p>前端版本：{{ sysStore.version.qd }}</p>-->
  <!--  <p>后端版本：{{ sysStore.version.hd }}</p>-->
  <!--</div>-->
  <el-row :gutter="20">
    <el-col v-for="item in allSystems" :key="item.id" :span="6">
      <el-card @click="goToSystem(item)">{{ item.name }}</el-card>
    </el-col>
  </el-row>

</template>

<style scoped>

</style>