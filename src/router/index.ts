import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/module/user.ts";
import { usePageStore } from "@/store/module/page.ts";

export const routePathsPrefixs = {
  admin: '/admin'
}
export const routerPinList = [
  '/admin/home'
]
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    name: '管理',
    component: () => import('@/layout/admin/index.vue'),
    children: [
      {
        path: '',
        redirect: 'admin/home'
      },
      {
        path: 'home',
        name: '概述',
        component: () => import('@/views/admin/home/index.vue')
      },
      {
        path: 'menu',
        name: '菜单',
        component: () => import('@/views/admin/menu/index.vue')
      },
      {
        path: 'role',
        name: '角色',
        component: () => import('@/views/admin/role/index.vue')
      },
      {
        path: 'permission',
        name: '权限',
        component: () => import('@/views/admin/permission/index.vue')
      },
      {
        path: 'user-role',
        name: '用户角色',
        component: () => import('@/views/admin/user-role/index.vue')
      },
      {
        path: 'role-permission',
        name: '角色权限',
        component: () => import('@/views/admin/role-permission/index.vue')
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
  let pageStore = usePageStore();
  pageStore.init()
  if (!userStore.ifLogin && whitelist.indexOf(to.path) === -1) {
    next('/login')
  } else {
    next()
  }
})

export default router
