<script lang="ts">
export default {
  name: 'demo:fileUpload'
}
</script>

<script setup lang="ts">
import { nextTick, onMounted, reactive, Ref, ref } from 'vue';
import { downloadFullFile, selList } from "@/api/fileUpload.ts";
import { final, PAGINATION } from '@/utils/base';
import { unitConversion_storage } from '@/utils/NumberUtils';
import { fileBaseUrl } from '@/api/request';
import FileUploadOneFull from '@/components/fileUpload/fileUploadOneFull.vue';
import FileUploadMoreFull from '@/components/fileUpload/fileUploadMoreFull.vue';
import FileUploadOneChunk from '@/components/fileUpload/fileUploadOneChunk.vue';
import FileUploadMoreChunk from '@/components/fileUpload/fileUploadMoreChunk.vue';
import FileUploadMoreFullConcur from '@/components/fileUpload/fileUploadMoreFullConcur.vue';
import FileUploadOneChunkConcur from '@/components/fileUpload/fileUploadOneChunkConcur.vue';
import FileUploadMoreChunkConcur from '@/components/fileUpload/fileUploadMoreChunkConcur.vue';
import { FormInstance, Instance, SpaceInstance } from "element-plus";
import { State } from "@/type/tablePage.ts";
import { fileDto, fileDto2 } from "@/type/demo/file.ts";
import { AxiosProgressEvent } from "axios";

const btnGroup = ref<SpaceInstance | null>(null)

onMounted(() => {
  init()
  nextTick(() => {
    setTableHeight()
  })
})

const setTableHeight = () => {
  if (btnGroup.value && form2.value && paginationref.value) {
    tableHeight.value = document.body.clientHeight - 50 - 150 - (btnGroup.value.$el.clientHeight + form2.value.$el.clientHeight + paginationref.value.clientHeight)
  }
}

const state = reactive({
  list: [],
  total: 0,
  downloadProgress: 0
})
const init = () => {
  state.list = []
  selectedRowKeys.value = []
  loading.value = true
  selList({...pageParam, ...formData2}).then(res => {
    state.list = res.list
    state.total = res.total
  }).finally(() => {
    loading.value = false
  })
}

const form2 = ref<FormInstance | null>(null)
const formData2 = reactive({
  filterSame: final.Y
})
const onFilter = () => {
  init()
}
const onCancelFilter = () => {
  filterFormReset()
  init()
}
const filterFormReset = () => {
  form2.value?.resetFields()
}


const tableHeight = ref(0)
const selectedRowKeys = ref([])
const loading = ref(false)
const downloadProgresses = reactive<Record<string, number>>({})
const onlineView = (row: fileDto2) => {
  window.open(`${fileBaseUrl}${row.file_new_name}`)
}
const download = async (row: fileDto2) => {
  downloadProgresses[row.id] = 0
  downloadFullFile(row.file_new_name, row.file_name, (evt: AxiosProgressEvent) => {
    const downloadProgress = Number(((evt.progress || 0) * 100).toFixed(2))
    downloadProgresses[row.id] = downloadProgress
    if (evt.progress === 1) {
      delete downloadProgresses[row.id]
    }
  })
}

const paginationref = ref<HTMLElement | null>(null)
const pageParam = reactive({
  ...PAGINATION
})
const onChange = (currentPage: number, pageSize: number) => {
  pageParam.pageNum = currentPage
  pageParam.pageSize = pageSize
  init()
}
</script>

<template>
  <el-space ref="btnGroup" wrap>
    <FileUploadOneFull @uploadSuccess="init"/>
    <FileUploadMoreFull @uploadSuccess="init"/>
    <FileUploadOneChunk @uploadSuccess="init"/>
    <FileUploadMoreChunk @uploadSuccess="init"/>
    <FileUploadMoreFullConcur @uploadSuccess="init"/>
    <FileUploadOneChunkConcur @uploadSuccess="init"/>
    <FileUploadMoreChunkConcur @uploadSuccess="init"/>
  </el-space>

  <!--筛选表单-->
  <br/>
  <br/>
  <el-form ref="form2" layout="inline" :model="formData2" resetType="initial" :colon="true">
    <!--<el-form-item label="一级区划" name="position1">-->
    <!--  <el-input v-model="formData2.position1" placeholder="请输入内容" clearable></el-input>-->
    <!--</el-form-item>-->
    <el-form-item label="过滤相同文件" name="filterSame">
      <el-switch :custom-value="[final.Y, final.N]" v-model="formData2.filterSame"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-space size="small">
        <el-button theme="primary" @click="onFilter">筛选</el-button>
        <el-button theme="default" variant="base" @click="onCancelFilter">重置</el-button>
      </el-space>
    </el-form-item>
  </el-form>

  <br/>
  <el-table row-key="id" :data="state.list" :loading="loading" :selected-row-keys="selectedRowKeys"
            :max-height="`${tableHeight}px`" select-on-row-click>
    <el-table-column prop="file_name" label="文件名" width="200"/>
    <el-table-column prop="file_md5" label="文件md5" width="200"/>
    <el-table-column prop="file_size" label="文件大小" width="100">
      <template #default="{ row }">
        <span>{{ unitConversion_storage(row.file_size) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="if_chunk" label="是否分片" width="100"/>
    <el-table-column prop="chunk_num" label="分片数量" width="100">
      <template #default="{ row }">
        <span>{{ row.chunk_num }}</span>
        <span v-if="row.uploadedCount">(已传{{ row.uploadedCount }})</span>
      </template>
    </el-table-column>
    <el-table-column prop="if_merge" label="是否合并" width="100"/>
    <el-table-column prop="if_first" label="是否首传" width="100"/>
    <el-table-column prop="if_finished" label="是否完成" width="100"/>
    <el-table-column prop="remark" label="备注" width="180"/>
    <el-table-column fixed="right" label="操作" min-width="200">
      <template #default="{ row }">
        <el-button variant="text" theme="primary" @click="onlineView(row)">在线查看</el-button>
        <el-button :disabled="Object.keys(downloadProgresses).indexOf(row.id) > -1" variant="text"
                   theme="primary" @click="download(row)">
          下载
          <template v-if="Object.keys(downloadProgresses).indexOf(row.id) > -1">({{
              downloadProgresses[row.id]
            }}%)
          </template>
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <br/>
  <div ref="paginationref">
    <el-pagination v-model="pageParam.pageNum" v-model:pageSize="pageParam.pageSize" :total="state.total" show-jumper
                   @change="onChange"/>
  </div>
</template>

<style scoped></style>