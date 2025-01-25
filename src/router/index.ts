import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/module/user.ts";
import { ifWebsiteLink } from "@/utils/LinkUtils.ts";

export const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'workbench-home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/',
    name: '/',
    redirect: '/home',
    meta: {
      label: '控制台主页'
    },
    component: () => import('@/layout/sys/index.vue'),
    children: []
  },
  {
    path: '/user',
    name: '/user',
    meta: {
      label: '个人中心'
    },
    component: () => import('@/layout/user/index.vue'),
    redirect: '/user/info',
    children: [
      {
        path: 'info',
        meta: {
          icon: 'info',
          label: '我的资料',
        },
        component: () => import('@/views/user/info.vue')
      },
      {
        path: 'edit-avatar',
        meta: {
          icon: 'avatar',
          label: '修改头像',
        },
        component: () => import('@/views/user/edit-avatar.vue')
      },
      {
        path: 'edit-psd',
        meta: {
          icon: 'electronic-locks-open',
          label: '修改密码',
        },
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
    component: () => import('@/views/redirect/index.vue')
  },
  {
    path: '/404',
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
