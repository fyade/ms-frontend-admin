<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { RouteRecordNormalized, RouteRecordRaw, useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useRouterStore } from "@/store/module/router.ts";
import { toPath } from "@/utils/baseUtils.ts";
import { useUserStore } from '@/store/module/user';
import { fileBaseUrl } from "@/api/request.ts";
import { useSysStore } from "@/store/module/sys.ts";

const props = defineProps({
  ifShowBreadcrumb: {
    type: Boolean,
    default: true
  }
});

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const sysStore = useSysStore();

const list = ref<(RouteRecordNormalized | RouteRecordRaw)[]>([])

const routes = ref<RouteRecordNormalized[]>([])
const ifShowFirstBreadcrumb = ref(false)
if (props.ifShowBreadcrumb) {
  const routerStore = useRouterStore();
  watch(() => route.path, () => {
    const menus = routerStore.allMenus2.find(item => item.path === route.path)
    if (menus) {
      ifShowFirstBreadcrumb.value = true
      list.value = menus.ar
    } else {
      ifShowFirstBreadcrumb.value = false
      list.value = []
      if (routes.value.length === 0) {
        routes.value = router.getRoutes()
      }
      const paths = route.path.split('/').filter(t => t).map(t => `/${t}`);
      for (let i = 0; i < paths.length; i++) {
        if (list.value.length === 0) {
          const find = routes.value.find(item => item.path === paths[i]);
          if (find) {
            list.value.push(find)
          }
        } else {
          const children = list.value[list.value.length - 1].children;
          if (children) {
            const find1 = children.find(item => item.path === paths[i].replace('/', ''));
            if (find1) {
              list.value.push(find1)
            }
          }
        }
      }
    }
  }, {
    immediate: true
  })
}
</script>

<template>
  <div class="header">
    <div class="left">
      <span>logo</span>
      <el-breadcrumb v-if="props.ifShowBreadcrumb" :separator-icon="ArrowRight">
        <el-breadcrumb-item class="el-breadcrumb-item" to="/">控制台主页</el-breadcrumb-item>
        <el-breadcrumb-item
            v-if="ifShowFirstBreadcrumb"
            class="el-breadcrumb-item"
            :to="`/${sysStore.getCurrentSystem.path}`"
        >
          {{ sysStore.getCurrentSystem.name }}
        </el-breadcrumb-item>
        <el-breadcrumb-item
            class="el-breadcrumb-item"
            v-for="(item, index) in list"
            :key="index"
            :to="`/${toPath(...list.slice(0, index + 1).map(itm => itm.path.indexOf('/') === 0 ? itm.path.replace('/', '') : itm.path))}`"
        >
          {{ item.meta ? item.meta.label : item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="center"></div>
    <div class="right">
      <el-space>
        <div>
          <el-dropdown>
            <div style="display: flex;align-items: center;gap: 8px;">
              <el-image
                  style="width: 30px;height: 30px;border-radius: 8px;"
                  v-if="userStore.userinfo.avatar"
                  :src="sysStore.urlAddAuth(fileBaseUrl+userStore.userinfo.avatar)"
                  fit="contain"
              ></el-image>
              <SvgIcon v-else name="user" color="#000000"/>
              {{ userStore.userinfo.nickname }}
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div @click="router.push('/user')">个人中心</div>
                </el-dropdown-item>
                <el-dropdown-item @click="userStore.logOut">登出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-space>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 10px * 2);
  height: calc(100% - 1px);
  border-bottom: 1px solid #ddd;
  padding: 0 10px;

  a {
    color: #000;
  }

  > * {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  > .left {
  }

  > .center {
  }

  > .right {
    > * {
      cursor: pointer;
    }
  }
}
</style>