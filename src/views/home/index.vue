<script setup lang="ts">
import { getSystems } from "@/api/common/sys.ts";
import { SysDto } from "@/type/module/main/sysManage/sys.ts";
import { onBeforeUnmount, ref } from "vue";
import Header from "@/layout/sys/header.vue";
import { Refresh } from "@element-plus/icons-vue";
import { goToSystem } from "@/views/home/homeUtilFunc.ts";
import { LoadingInstance } from "element-plus/es/components/loading/src/loading";
import { ElLoading } from "element-plus";

let loading: LoadingInstance | null
let intervalTimers: number[] = []
onBeforeUnmount(() => {
  if (loading) {
    loading.close()
  }
  intervalTimers.forEach(timer => clearInterval(timer))
})

// 服务器监控
const serverMonitor = () => {
  // const interval = setInterval(() => {
  //   getSysInfo().then(res => {
  //   })
  // }, 1000);
  // intervalTimers.push(interval)
}
serverMonitor()

// 我的资源
const systemsLoading = ref(false)
const allSystems = ref<SysDto[]>([])
const getData = () => {
  systemsLoading.value = true
  allSystems.value = []
  getSystems().then(res => {
    allSystems.value = res
  }).finally(() => {
    systemsLoading.value = false
  })
}
getData()

const goToSystem2 = (item: SysDto) => {
  loading = ElLoading.service({
    lock: true,
    text: '系统资源加载中，请稍候。。。',
    background: 'rgba(0, 0, 0, .7)',
  });
  goToSystem(item)
}
</script>

<template>
  <div class="el">
    <Header style="height: 60px;background-color: #fff;" :if-show-breadcrumb="false"/>
    <div class="box">
      <!--我的资源-->
      <div class="wdzy">
        <el-divider content-position="left">
          <div style="display: flex;gap: 12px;align-items: center;">
            <span>我的资源</span>
            <el-button :disabled="systemsLoading" size="small" :icon="Refresh" circle plain @click="getData"/>
          </div>
        </el-divider>
        <div class="boxs" v-loading="systemsLoading">
          <el-card shadow="hover" v-for="item in allSystems" :key="item.id" @click="goToSystem2(item)">
            {{ item.name }}
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.el {
  min-height: 100vh;
  background-color: var(--theme-color-main-bg);

  > .box {
    margin: 0 auto;
    padding: 20px 0;
    max-width: 1200px;
  }

  .wdzy {
    padding: 20px;
    background-color: #fff;

    > .boxs {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      width: 100%;
      min-height: 60px;

      > * {
        cursor: pointer;
        height: 60px;
      }
    }
  }
}
</style>
