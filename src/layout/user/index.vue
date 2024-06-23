<script setup lang="ts">
import PublicIndex from "@/layout/publicIndex.vue";
import { CONFIG } from "@/utils/base.ts";
</script>

<template>
  <PublicIndex>
    <el-container class="el">
      <el-aside class="left" width="200px">
        <el-menu
            :collapse="false"
            :unique-opened="true"
            router
        >
          <el-menu-item index="/user/info">
            <el-space>
              <SvgIcon name="info" :color="CONFIG.icon_black"/>
              <span>我的资料</span>
            </el-space>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="right">
        <router-view/>
      </el-main>
    </el-container>
  </PublicIndex>
</template>

<style scoped lang="scss">
.el {
  display: flex;
  justify-content: center;
  height: 100%;

  > .left {
    flex: none;
    width: 200px;
    height: 100%;

    > * {
      height: 100%;
    }
  }

  > .right {
    flex: auto;
    padding: 8px;
    min-width: 600px;
    max-width: 1000px;
  }
}
</style>