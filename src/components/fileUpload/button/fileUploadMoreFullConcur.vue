<script setup lang="ts">
import { fileUploadOneFull } from "@/api/fileUpload.ts";
import { unitConversion_storage } from "@/utils/NumberUtils.ts";
import { CHUNK_SIZE } from "~/config/config.ts";
import { computed, onBeforeUnmount, reactive, ref } from "vue";
import { Upload } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus"
import { FileUploadInterfaceMoreFullConcur } from "@/type/demo/fileUpload.ts";
import { selectFiles } from "@/utils/FileUtils.ts";

interface ProgressI {
  started: number[],
  ended: number[],
  total: number
}

let pageNotUnmounted = true
onBeforeUnmount(() => {
  pageNotUnmounted = false
})
const fileUploadRequests: (() => Promise<null>)[] = []
const emit = defineEmits(['uploadSuccess', 'uploadFail']);
const isDisabled = computed(() => {
  return ['o', 'd'].indexOf(state.currentStage) === -1
})
const isLoading = ref(false)
const state = reactive<FileUploadInterfaceMoreFullConcur>({
  currentStage: 'o',
  dictStage: {
    o: '无上传任务',
    a: '等待选择文件',
    b: '文件扫描中',
    c: '文件上传中',
    e: '文件合并中',
    d: '文件上传完成',
  },
  total: 0,
  started: 0,
  ended: 0,
  beyondMaxSizeNum: 0
})
const upload5 = async () => {
  state.currentStage = 'a'
  const filepicks = []
  try {
    filepicks.push(...await selectFiles(true))
  } catch (e) {
    state.currentStage = 'o'
    return
  }
  isLoading.value = true
  state.total = filepicks.length
  state.currentStage = 'b'
  for (let i = 0; i < filepicks.length; i++) {
    const file = filepicks[i]
    if (file.size > CHUNK_SIZE) {
      state.beyondMaxSizeNum++
      // MessagePlugin.error(file.name + '文件大小超过' + unitConversion_storage(CHUNK_SIZE) + '。')
      ElMessage.warning(file.name + '文件大小超过' + unitConversion_storage(CHUNK_SIZE) + '。')
    } else {
      const fd = new FormData();
      fd.append('file', file)
      fileUploadRequests.push(() => fileUploadOneFull(fd, file.name))
    }
  }
  state.total -= state.beyondMaxSizeNum
  state.currentStage = 'c'
  await concurRequest2(fileUploadRequests, {
    downloadProgress: (progress: ProgressI) => {
      state.started = progress.started.length
      state.ended = progress.ended.length
    }
  })
  uploadSuccess()
}
const uploadSuccess = () => {
  state.currentStage = 'd'
  isLoading.value = false
  fileUploadRequests.splice(0, fileUploadRequests.length)
  emit('uploadSuccess')
}
const uploadFail = (msg?: string) => {
  state.currentStage = 'o'
  isLoading.value = false
  // MessagePlugin.error({
  //   closeBtn: true,
  //   content: msg,
  //   duration: 0
  // })
  ElMessage.warning(msg)
  emit('uploadFail', msg)
}

/**
 * 并发请求
 * @param promises
 * @param maxNum
 * @param downloadProgress
 */
function concurRequest2(promises: (() => Promise<null>)[],
                        {
                          maxNum = 4,
                          downloadProgress
                        }: {
                          maxNum?: number
                          downloadProgress?: Function
                        } = {}
): Promise<(string | boolean | null)[]> {
  const progress = {
    started: [] as number[],
    ended: [] as number[],
    total: promises.length
  }
  return new Promise((resolve) => {
    if (promises.length === 0) {
      resolve([])
    }
    let index = 0
    let count = 0
    const result: (string | boolean | null)[] = []

    async function request() {
      const i = index
      const pormis = promises[index]
      index++
      try {
        progress.started.push(i)
        result[i] = await (pormis)()
      } catch (err) {
        result[i] = err as string
      } finally {
        progress.ended.push(i)
        count++
        if (downloadProgress) {
          downloadProgress(progress)
        }
        if (count === promises.length) {
          resolve(result)
        }
        if (index < promises.length) {
          if (pageNotUnmounted) {
            request()
          }
        }
      }
    }

    for (let i = 0; i < Math.min(promises.length, maxNum); i++) {
      request()
    }
  })
}
</script>

<template>
  <el-button :loading="isLoading" :disabled="isDisabled" theme="primary" @click="upload5" :icon="Upload">
    <span>多文件并发完整上传</span>
    <template v-if="isDisabled">&nbsp;
      <span>(
        {{
          state.currentStage === 'a' ? state.dictStage[state.currentStage] :
              (['b', 'e'].indexOf(state.currentStage) > -1 ? state.dictStage[state.currentStage] :
                  `${state.started}/${state.ended}/${state.total}`)
        }}
        )</span>
    </template>
  </el-button>
</template>

<style scoped lang="scss"></style>
