<script setup lang="ts">
import { useRoute } from "vue-router";
import router from "@/router";
import { getSystems } from "@/api/common/sys.ts";
import { ElLoading } from "element-plus";
import { LoadingInstance } from "element-plus/es/components/loading/src/loading";
import { goToSystem } from "@/views/home/homeUtilFunc.ts";
import { splitUrlByX } from "@/utils/RegularUtils.ts";
import { onBeforeUnmount } from "vue";

let loading: LoadingInstance | null
onBeforeUnmount(() => {
  if (loading) {
    loading.close()
  }
})

const route = useRoute()
const init = () => {
  const pushPath = route.path;
  const allPaths = splitUrlByX(pushPath);
  if (allPaths.length === 0) {
    router.push('/')
    return
  }
  loading = ElLoading.service({
    lock: true,
    text: '系统资源加载中，请稍候。。。',
    background: 'rgba(0, 0, 0, .7)',
  });
  getSystems().then(async res => {
    const find = res.find(item => `/${item.path}` === allPaths[0]);
    if (!find) {
      router.push('/')
    } else {
      goToSystem(find, {
        pushPath: allPaths.reduce((a, b) => `${a}${b}`),
        errorCallback: () => {
          router.push('/')
        },
      });
    }
  }).catch(() => {
    if (loading) {
      loading.close()
    }
  })
}
init()
</script>

<template>
  Loading...
</template>

<style scoped lang="scss">
</style>
