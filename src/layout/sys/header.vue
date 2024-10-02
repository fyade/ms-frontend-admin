<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { RouteRecordNormalized, useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useRouterStore } from "@/store/module/router.ts";
import { toPath } from "@/utils/baseUtils.ts";
import { useUserStore } from '@/store/module/user';
import { fileBaseUrl } from "@/api/request.ts";
import { useSysStore } from "@/store/module/sys.ts";

const route = useRoute()
const router = useRouter()
const routerStore = useRouterStore();
const userStore = useUserStore()
const sysStore = useSysStore();

const list = ref<RouteRecordNormalized[]>([])

watch(() => route.path, () => {
  const menus = routerStore.allMenus2.find(item => item.path === route.path)
  if (menus) {
    list.value = menus.ar
  }
}, {
  immediate: true
})
</script>

<template>
  <div class="header">
    <div class="left">
      <span>logo</span>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item class="el-breadcrumb-item" to="/">控制台主页</el-breadcrumb-item>
        <el-breadcrumb-item class="el-breadcrumb-item" :to="`/${sysStore.getCurrentSystem.path}`">
          {{ sysStore.getCurrentSystem.name }}首页
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
      <router-link to="/user">
        <el-space>
          <el-image v-if="userStore.userinfo.avatar" style="width: 30px;height: 30px;border-radius: 8px;"
                    :src="fileBaseUrl+userStore.userinfo.avatar" fit="contain"></el-image>
          <SvgIcon v-else name="user" color="#000000"/>
          {{ userStore.userinfo.nickname }}
        </el-space>
      </router-link>
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