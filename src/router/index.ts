import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/module/user.ts";
import { ifWebsiteLink } from "@/utils/LinkUtils.ts";

export const homerouter = '/index'
export const routerPinList = [
  homerouter
]
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    redirect: '/index',
    meta: {
      label: '首页'
    },
    component: () => import('@/layout/sys/index.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          asideMenu: true,
          label: '总览',
          icon: 'workbench'
        },
        component: () => import('@/views/home/index.vue')
      },
      // {
      //   path: 'sys',
      //   name: 'sys',
      //   meta: {
      //     asideMenu: true,
      //     label: '系统管理'
      //   },
      //   children: [
      //     {
      //       path: 'user',
      //       name: 'user',
      //       meta: {
      //         asideMenu: true,
      //         label: '用户管理'
      //       },
      //       component: () => import('@/views/sys/user/index.vue')
      //     },
      //     {
      //       path: 'role',
      //       name: 'role',
      //       meta: {
      //         asideMenu: true,
      //         label: '角色管理'
      //       },
      //       component: () => import('@/views/sys/role/index.vue')
      //     },
      //     {
      //       path: 'menu',
      //       name: 'menu',
      //       meta: {
      //         asideMenu: true,
      //         label: '菜单管理'
      //       },
      //       component: () => import('@/views/sys/menu/index.vue')
      //     },
      //     {
      //       path: 'interface',
      //       name: 'interface',
      //       meta: {
      //         asideMenu: true,
      //         label: '接口管理'
      //       },
      //       component: () => import('@/views/sys/interface/index.vue')
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '/user',
    component: () => import('@/layout/user/index.vue'),
    redirect: '/user/info',
    children: [
      {
        path: 'info',
        component: () => import('@/views/user/info.vue')
      },
      {
        path: 'edit-avatar',
        component: () => import('@/views/user/edit-avatar.vue')
      },
      {
        path: 'edit-psd',
        component: () => import('@/views/user/edit-psd.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/user/login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const whitelist = ['/login']
router.beforeEach((to, from, next) => {
  if (ifWebsiteLink(to.path, '/')) {
    return
  }
  const userStore = useUserStore();
  if (!userStore.ifLogin && whitelist.indexOf(to.path) === -1) {
    next(`/login?redirect=${to.path}`)
  } else {
    next()
  }
})

export default router
