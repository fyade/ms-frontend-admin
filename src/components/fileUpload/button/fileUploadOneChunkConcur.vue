<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref } from "vue";
import { fileUploadOneChunk_check, fileUploadOneChunk_merge, fileUploadOneChunk_upload } from "@/api/fileUpload.ts";
import SparkMd5 from "spark-md5";
import { removeElementsByIndices } from "@/utils/ObjectUtils.ts";
import { CHUNK_SIZE } from "~/config/config.ts";
import { Upload } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus"
import { FileUploadInterfaceOneChunkConcur } from "@/type/demo/fileUpload.ts";
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
const state = reactive<FileUploadInterfaceOneChunkConcur>({
  currentStage: 'o',
  dictStage: {
    o: '无上传任务',
    a: '等待选择文件',
    b: '文件扫描中',
    c: '文件上传中',
    e: '文件合并中',
    d: '文件上传完成',
  },
  chunkNum: 0,
  chunkTotal: 0,
  fileMd5: '',
  fileSize: 0,
  fileNewName: '',
  progress_total: 0,
  progress_started: 0,
  progress_ended: 0,
})

const upload6 = async () => {
  state.currentStage = 'a'
  state.chunkNum = 0
  state.chunkTotal = 0
  const filepicks = []
  try {
    filepicks.push(...await selectFiles())
  } catch (e) {
    state.currentStage = 'o'
    return
  }
  state.currentStage = 'b'
  isLoading.value = true
  const file = filepicks[0]
  // 开始
  state.chunkTotal = Math.ceil(file.size / CHUNK_SIZE)
  const chunks = createChunks(file)
  state.fileMd5 = await hash(chunks)
  // 上传前检查
  const res1 = await fileUploadOneChunk_check({
    fileName: file.name,
    fileMd5: state.fileMd5,
    fileSize: state.fileSize,
    chunkNum: state.chunkTotal
  })
  if (res1.merge) {
    uploadSuccess()
    return
  }
  const indexs = removeElementsByIndices(new Array(chunks.length).fill(null).map((item, i) => i), ...res1.uploadedIndexs)
  const newChunks = removeElementsByIndices(chunks, ...res1.uploadedIndexs);
  // 开始分片上传
  state.currentStage = 'c'
  state.fileNewName = res1.fileNewName
  state.progress_started = 0
  state.progress_ended = 0
  state.progress_total = newChunks.length
  await startUpload(indexs, newChunks)
  // 分片上传完成，合并分片
  state.currentStage = 'e'
  try {
    await fileUploadOneChunk_merge({
      fileNewName: state.fileNewName,
      fileMd5: state.fileMd5
    })
  } catch (e) {
    uploadFail(`${file.name}合并失败。`)
  }
  // 分片合并完成
  uploadSuccess()
}
/**
 * 创建分片
 * @param file
 */
const createChunks = (file: File): Blob[] => {
  let res = []
  for (let i = 0; i < file.size; i += CHUNK_SIZE) {
    res.push(file.slice(i, i + CHUNK_SIZE))
  }
  return res
}
/**
 * 增量算法获取文件md5
 * @param chunks
 */
const hash = (chunks: Blob[]): Promise<string> => {
  return new Promise((resolve) => {
    state.fileSize = 0
    const spark = new SparkMd5();
    const _read = (i: number) => {
      if (i >= chunks.length) {
        state.chunkNum = 0
        resolve(spark.end())
        return
      }
      const blob = chunks[i];
      state.chunkNum = i + 1
      state.fileSize += blob.size
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target) {
          const bytes = e.target.result;
          spark.append(bytes)
          _read(i + 1)
        }
      }
      reader.readAsArrayBuffer(blob)
    }
    _read(0)
  })
}
/**
 * 开始分片上传
 * @param indexs
 * @param chunks
 */
const startUpload = (indexs: number[], chunks: Blob[]): Promise<null> => {
  return new Promise(async (resolve) => {
    fileUploadRequests.splice(0, fileUploadRequests.length)
    for (let i = 0; i < chunks.length; i++) {
      fileUploadRequests.push(uploading(indexs[i], chunks[i]))
    }
    await concurRequest2(fileUploadRequests, {
      downloadProgress: (progress: ProgressI) => {
        state.progress_started = progress.started.length
        state.progress_ended = progress.ended.length
      }
    })
    resolve(null)
  })
}
/**
 * 上传
 * @param chunkIndex
 * @param blob
 */
const uploading = (chunkIndex: number, blob: Blob) => {
  const fd = new FormData()
  fd.append('file', blob)
  // 上传当前分片
  const obj = {
    fileMd5: state.fileMd5,
    fileNewName: state.fileNewName,
    chunkIndex: chunkIndex,
    file: fd
  }
  return () => fileUploadOneChunk_upload(obj)
}
/**
 * 上传完成
 */
const uploadSuccess = () => {
  state.currentStage = 'd'
  state.chunkNum = 0
  isLoading.value = false
  emit('uploadSuccess')
}
/**
 * 上传失败
 */
const uploadFail = (msg?: string) => {
  state.currentStage = 'a'
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
  <el-button :loading="isLoading" :disabled="isDisabled" theme="primary" @click="upload6" :icon="Upload">
    <span>单文件并发分片上传</span>
    <template v-if="isDisabled">&nbsp;
      <span>({{
          ['a', 'b', 'e'].indexOf(state.currentStage) > -1 ? state.dictStage[state.currentStage] :
              `${state.progress_started}/${state.progress_ended}/${state.progress_total}`
        }})</span>
    </template>
  </el-button>
</template>

<style scoped lang="scss"></style>
