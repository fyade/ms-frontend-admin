import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/module/user.ts";

export const homerouter = '/index'
export const routerPinList = [
  homerouter
]
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '首页',
    redirect: '/index',
    component: () => import('@/layout/sys/index.vue'),
    children: [
      {
        path: 'index',
        name: '总览',
        component: () => import('@/views/sys/home/index.vue')
      },
      {
        path: 'sys',
        name: '系统管理',
        children: [
          {
            path: 'user',
            name: '用户管理',
            component: () => import('@/views/sys/user/index.vue')
          },
          {
            path: 'role',
            name: '角色管理',
            component: () => import('@/views/sys/role/index.vue')
          },
          {
            path: 'menu',
            name: '菜单管理',
            component: () => import('@/views/sys/menu/index.vue')
          },
          {
            path: 'interface',
            name: '接口管理',
            component: () => import('@/views/sys/interface/index.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/user/login.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const whitelist = ['/login']
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (!userStore.ifLogin && whitelist.indexOf(to.path) === -1) {
    next(`/login?redirect=${to.path}`)
  } else {
    next()
  }
})

export default router
