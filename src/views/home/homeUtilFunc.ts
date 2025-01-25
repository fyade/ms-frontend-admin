import { SysDto } from "@/type/module/main/sysManage/sys.ts";
import { getButtons, getPages } from "@/api/common/sys.ts";
import { RouteRecordNormalized, RouteRecordRaw } from "vue-router";
import { deepClone } from "@/utils/ObjectUtils.ts";
import { MenuDto } from "@/type/module/main/sysManage/menu.ts";
import { final, T_COMP, T_MENU } from "@/utils/base.ts";
import { arr2ToDiguiObj, diguiRun } from "@/utils/baseUtils.ts";
import { useSysStore } from "@/store/module/sys.ts";
import { useRouterStore } from "@/store/module/router.ts";
import router from "@/router";
import { splitUrlByX } from "@/utils/RegularUtils.ts";

const sysStore = useSysStore();
const routerStore = useRouterStore();

// 引入资源
const modules = {
  ...import.meta.glob(`../../views/**/**/**/**/**.vue`),
  ...import.meta.glob(`../../views/**/**/**/**.vue`),
}
export const goToSystem = async (
    dto: SysDto,
    {
      pushPath = null,
      errorCallback = null,
    }: {
      pushPath?: string | null
      errorCallback?: Function | null
    } = {}
) => {
  try {
    const res = await getPages(dto.id)
    const res2 = await getButtons(dto.id)
    const buttonPerms = res2.map(item => item.perms);
    sysStore.setVisibleButtons(dto.perms, buttonPerms)
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
          const component = await modules[`../module/${dto.path}${item.component}`]()
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
      const routes = router.getRoutes();
      const fixs = permissions.filter(item => item.ifFixed === final.Y).map(item => item.perms);
      const fixedMenus: string[] = []
      diguiRun(permissionsObj, obj => {
        if (fixs.includes(obj.perms)) {
          const find = routes.find(item => item.name === obj.perms);
          if (find) {
            fixedMenus.push(find.path)
          }
        }
      })
      routerStore.setFixedMenus(dto.perms, fixedMenus)
    }
    sysStore.setCurrentSystem(dto)
    routerStore.reloadAllMenu()
    routerStore.deleteAllMenu()
    if (pushPath) {
      try {
        const strs = splitUrlByX(pushPath);
        if (strs.length > 1) {
          let arr: RouteRecordRaw[] | void = []
          for (let i = 1; i < strs.length; i++) {
            const find: RouteRecordNormalized | RouteRecordRaw | void = i === 1 ?
                router.getRoutes().find(item => item.path === `/${dto.path}${strs[1]}`) :
                arr?.find(item => `${item.path}` === strs[i].replace('/', ''))
            if (find) {
              if (i === strs.length - 1) {
                router.push(pushPath)
                return;
              }
              arr = find.children
            } else {
              router.push(`/${dto.path}`)
              return;
            }
          }
        }
        router.push(`/${dto.path}`)
        return;
      } catch (e) {
        router.push(`/${dto.path}`)
        return;
      }
    }
    router.push(`/${dto.path}`)
    return;
  } catch (e) {
    if (errorCallback) {
      errorCallback()
    }
    console.error(e);
    ElMessage.error({
      message: '系统发生故障，请检查菜单是否有错误，若无法解决，请查看开发文档或联系开发者。',
      duration: 0,
      showClose: true
    })
  }
  return
}
