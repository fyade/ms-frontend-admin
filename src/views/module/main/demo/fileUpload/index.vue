<script lang="ts">
export default {
  name: 'main:demo:fileUpload'
}
</script>

<script setup lang="ts">
import { reactive } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { downloadFullFile, fileUploadApi } from "@/api/common/fileUpload.ts";
import { fileUploadDict } from "@/dict/common/file.ts";
import { fileBaseUrl } from "@/api/request.ts";
import { unitConversion_storage } from "@/utils/NumberUtils.ts";
import { FileUploadDto, FileUploadUpdDto } from "@/type/common/file.ts";
import { AxiosProgressEvent } from "axios";
import { useSysStore } from "@/store/module/sys.ts";

const sysStore = useSysStore();

const state = reactive<State2<FileUploadDto, FileUploadUpdDto>>({
  dialogForm: {
    id: '',
    fileName: '',
    fileNewName: '',
    fileSize: 0,
    fileMd5: '',
    ifChunk: '',
    chunkNum: 0,
    ifMerge: '',
    ifFirst: '',
    ifFinished: '',
    module: '',
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {},
})
const dFormRules: FormRules = {
  fileName: [{required: true, trigger: 'change'}],
  fileNewName: [{required: true, trigger: 'change'}],
  fileSize: [{required: true, trigger: 'change'}],
  fileMd5: [{required: true, trigger: 'change'}],
  ifChunk: [{required: true, trigger: 'change'}],
  chunkNum: [{required: true, trigger: 'change'}],
  ifMerge: [{required: true, trigger: 'change'}],
  ifFirst: [{required: true, trigger: 'change'}],
  ifFinished: [{required: true, trigger: 'change'}],
  module: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true,
})

const {
  dialogFormRef,
  dialogFormsRef,
  filterFormRef,
  filterFormVisible1,
  filterFormVisible,
  dialogVisible,
  dialogLoadingRef,
  dialogButtonLoadingRef,
  tableLoadingRef,
  switchLoadingRef,
  activeTabName,
  tableData,
  pageParam,
  total,
  multipleSelection,
  dialogType,
  refresh,
  dCan,
  dCon,
  fEnter,
  fCon,
  fCan,
  gRefresh,
  gIns,
  gUpd,
  gDel,
  gExport,
  gImport,
  gChangeFilterFormVisible,
  tUpd,
  tDel,
  handleSelectionChange,
  pageChange,
  dfIns,
  dfDel,
  ifRequired,
} = funcTablePage<FileUploadDto, FileUploadUpdDto>({
  state,
  dFormRules,
  config,
  api: fileUploadApi,
  dict: fileUploadDict,
})

const downloadProgresses = reactive<Record<string, number>>({})
const onlineView = (row: FileUploadDto) => {
  window.open(sysStore.urlAddAuth(`${fileBaseUrl}${row.fileNewName}`))
}
const download = async (row: FileUploadDto) => {
  downloadProgresses[row.id] = 0
  downloadFullFile(row.fileNewName, row.fileName, (evt: AxiosProgressEvent) => {
    const downloadProgress = Number(((evt.progress || 0) * 100).toFixed(2))
    downloadProgresses[row.id] = downloadProgress
    if (evt.progress === 1) {
      delete downloadProgresses[row.id]
    }
  })
}
</script>

<template>
  <el-space style="margin-bottom: 12px;" wrap>
    <FileUploadOneFull @uploadSuccess="gRefresh"/>
    <FileUploadMoreFull @uploadSuccess="gRefresh"/>
    <FileUploadOneChunk @uploadSuccess="gRefresh"/>
    <FileUploadMoreChunk @uploadSuccess="gRefresh"/>
    <FileUploadMoreFullConcur @uploadSuccess="gRefresh"/>
    <FileUploadOneChunkConcur @uploadSuccess="gRefresh"/>
    <FileUploadMoreChunkConcur @uploadSuccess="gRefresh"/>
  </el-space>

  <!--顶部筛选表单-->
  <div class="zs-filter-form" v-show="filterFormVisible1 && filterFormVisible">
    <el-form
        class="demo-form-inline"
        ref="filterFormRef"
        :model="state.filterForm"
        :inline="true"
        @keyup.enter="fEnter"
    >
      <!--在此下方添加表单项-->
      <!--<el-form-item :label="fileUploadDict." prop="">-->
      <!--  <el-input v-model="state.filterForm." :placeholder="fileUploadDict."/>-->
      <!--</el-form-item>-->
      <!--在此上方添加表单项-->
      <el-form-item>
        <el-button type="primary" @click="fCon">筛选</el-button>
        <el-button @click="fCan">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!--操作按钮-->
  <div class="zs-button-row">
    <div>
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
      <!--<el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>-->
      <!--<el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd">修改</el-button>-->
      <!--<el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除</el-button>-->
      <!--<el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>-->
      <!--<el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>-->
    </div>
    <div>
      <el-button v-if="filterFormVisible1" plain :icon="Search" circle @click="gChangeFilterFormVisible"/>
    </div>
  </div>

  <div class="zs-table-data">
    <!--数据表格-->
    <el-table
        v-loading="tableLoadingRef"
        :data="tableData"
        @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55"/>
      <!--<el-table-column fixed prop="id" :label="fileUploadDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="fileName" :label="fileUploadDict.fileName" width="200"/>
      <!--<el-table-column prop="fileNewName" :label="fileUploadDict.fileNewName" width="120"/>-->
      <el-table-column prop="fileSize" :label="fileUploadDict.fileSize" width="100">
        <template #default="{row}">
          <span>{{ unitConversion_storage(row.fileSize) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fileMd5" :label="fileUploadDict.fileMd5" width="200"/>
      <el-table-column prop="ifChunk" :label="fileUploadDict.ifChunk" width="100"/>
      <el-table-column prop="chunkNum" :label="fileUploadDict.chunkNum" width="100">
        <template #default="{row}">
          <span>{{ row.chunkNum }}</span>
          <span v-if="row.uploadedCount">(已传{{ row.uploadedCount }})</span>
        </template>
      </el-table-column>
      <el-table-column prop="ifMerge" :label="fileUploadDict.ifMerge" width="100"/>
      <el-table-column prop="ifFirst" :label="fileUploadDict.ifFirst" width="100"/>
      <el-table-column prop="ifFinished" :label="fileUploadDict.ifFinished" width="100"/>
      <el-table-column prop="module" :label="fileUploadDict.module" width="120"/>
      <el-table-column prop="remark" :label="fileUploadDict.remark" width="100"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="fileUploadDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="fileUploadDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="fileUploadDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="fileUploadDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="fileUploadDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <el-table-column fixed="right" label="操作" min-width="140">
        <template #default="{row}">
          <div class="zs-table-data-operate-button-row">
            <!--<el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改</el-button>-->
            <!--<el-button link type="danger" size="small" :icon="Delete" @click="tDel(row.id)">删除</el-button>-->
            <el-button :disabled="row.ifFinished!==final.Y" variant="text" theme="primary" @click="onlineView(row)">在线查看</el-button>
            <!--<el-button :disabled="Object.keys(downloadProgresses).indexOf(row.id) > -1" variant="text" theme="primary" @click="download(row)">-->
            <!--  下载<template v-if="Object.keys(downloadProgresses).indexOf(row.id) > -1">({{ downloadProgresses[row.id] }}%)</template>-->
            <!--</el-button>-->
          </div>
        </template>
      </el-table-column>
      <template #append>
        <div class="el-table-append-box">
          <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${multipleSelection.length} 条数据。` }}</span>
        </div>
      </template>
    </el-table>

    <!--分页-->
    <Pagination
        v-if="config.pageQuery"
        :total="total"
        :page-num="pageParam.pageNum"
        :page-size="pageParam.pageSize"
        @page-change="pageChange"
    />
  </div>
</template>

<style scoped>
</style>
