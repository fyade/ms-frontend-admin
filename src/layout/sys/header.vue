<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useRouterStore } from "@/store/module/router.ts";
import { toPath } from "@/utils/baseUtils.ts";
import { useUserStore } from '@/store/module/user';

const route = useRoute()
const router = useRouter()
const routerStore = useRouterStore();
const userStore = useUserStore()

const list = ref<any[]>([])

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
        <el-breadcrumb-item class="el-breadcrumb-item" to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item class="el-breadcrumb-item" v-for="(item, index) in list" :key="index"
          :to="`/${toPath(...list.slice(0, index + 1).map(itm => itm.path.indexOf('/') === 0 ? itm.path.replace('/', '') : itm.path))}`">
          {{ item.meta ? item.meta.label : item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="center"></div>
    <div class="right">
      <router-link to="/user">
        <el-space>
          <SvgIcon name="user" color="#000000" />
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

  >* {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  >.left {}

  >.center {}

  >.right {
    >* {
      cursor: pointer;
    }
  }
}
</style>