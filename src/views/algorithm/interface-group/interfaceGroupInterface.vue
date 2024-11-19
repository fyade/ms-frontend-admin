<script setup lang="ts">
import { reactive, ref } from "vue"
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { InterfaceDto, InterfaceUpdDto } from "@/type/module/algorithm/interface.ts";
import { interfaceApi } from "@/api/module/algorithm/interface.ts";
import { interfaceDict } from "@/dict/module/algorithm/interface.ts";
import { interfaceInterfaceGroupApi, interfaceInterfaceGroupUpdIGI } from "@/api/module/algorithm/interfaceInterfaceGroup.ts"
import { InterfaceGroupDto } from "@/type/module/algorithm/interfaceGroup.ts";
import { interfaceInterfaceGroupDict } from "@/dict/module/algorithm/interfaceInterfaceGroup.ts";
import { InterfaceInterfaceGroupDto, InterfaceInterfaceGroupUpdDto } from "@/type/module/algorithm/interfaceInterfaceGroup.ts";
import { interfaceGroupDict } from "@/dict/module/algorithm/interfaceGroup.ts";

const props = defineProps({
  selectInterfaceGroupInfo: {
    type: InterfaceGroupDto,
    required: true
  }
});

const interfaceInterfaceGroupState = reactive<State2<InterfaceInterfaceGroupDto, InterfaceInterfaceGroupUpdDto>>({
  dialogForm: {
    id: -1,
    interfaceId: -1,
    interfaceGroupId: -1,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {},
})
const interfaceInterfaceGroupDFormRules: FormRules = {
  interfaceId: [{required: true, trigger: 'change'}],
  interfaceGroupId: [{required: true, trigger: 'change'}],
}
const interfaceInterfaceGroupConfig = new TablePageConfig({
  bulkOperation: true,
  selectParam: {
    interfaceGroupId: props.selectInterfaceGroupInfo.id
  },
  selectListCallback: () => {
    const interfaceIds = interfaceInterfaceGroupTableData.value.map(item => item.interfaceId);
    interfaceApi.selectByIds(interfaceIds).then(res => {
      interfacesOfSelectInterfaceGroup.value = res
    })
  },
})

const {
  dialogFormRef: interfaceInterfaceGroupDialogFormRef,
  dialogFormsRef: interfaceInterfaceGroupDialogFormsRef,
  filterFormRef: interfaceInterfaceGroupFilterFormRef,
  filterFormVisible1: interfaceInterfaceGroupFilterFormVisible1,
  filterFormVisible: interfaceInterfaceGroupFilterFormVisible,
  dialogVisible: interfaceInterfaceGroupDialogVisible,
  dialogLoadingRef: interfaceInterfaceGroupDialogLoadingRef,
  dialogButtonLoadingRef: interfaceInterfaceGroupDialogButtonLoadingRef,
  tableLoadingRef: interfaceInterfaceGroupTableLoadingRef,
  switchLoadingRef: interfaceInterfaceGroupSwitchLoadingRef,
  activeTabName: interfaceInterfaceGroupActiveTabName,
  tableData: interfaceInterfaceGroupTableData,
  pageParam: interfaceInterfaceGroupPageParam,
  total: interfaceInterfaceGroupTotal,
  multipleSelection: interfaceInterfaceGroupMultipleSelection,
  dialogType: interfaceInterfaceGroupDialogType,
  refresh: interfaceInterfaceGroupRefresh,
  dCan: interfaceInterfaceGroupDCan,
  dCon: interfaceInterfaceGroupDCon,
  fEnter: interfaceInterfaceGroupFEnter,
  fCon: interfaceInterfaceGroupFCon,
  fCan: interfaceInterfaceGroupFCan,
  gRefresh: interfaceInterfaceGroupGRefresh,
  gIns: interfaceInterfaceGroupGIns,
  gUpd: interfaceInterfaceGroupGUpd,
  gDel: interfaceInterfaceGroupGDel,
  gExport: interfaceInterfaceGroupGExport,
  gImport: interfaceInterfaceGroupGImport,
  gChangeFilterFormVisible: interfaceInterfaceGroupGChangeFilterFormVisible,
  tUpd: interfaceInterfaceGroupTUpd,
  tDel: interfaceInterfaceGroupTDel,
  handleSelectionChange: interfaceInterfaceGroupHandleSelectionChange,
  pageChange: interfaceInterfaceGroupPageChange,
  dfIns: interfaceInterfaceGroupDfIns,
  dfDel: interfaceInterfaceGroupDfDel,
  ifRequired: interfaceInterfaceGroupIfRequired,
} = funcTablePage<InterfaceInterfaceGroupDto, InterfaceInterfaceGroupUpdDto>({
  state: interfaceInterfaceGroupState,
  dFormRules: interfaceInterfaceGroupDFormRules,
  config: interfaceInterfaceGroupConfig,
  api: interfaceInterfaceGroupApi,
  dict: interfaceInterfaceGroupDict,
})

const interfaceState = reactive<State2<InterfaceDto, InterfaceUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    icon: '',
    orderNum: final.DEFAULT_ORDER_NUM,
    ifDisabled: final.N,
    ifPublic: final.N,
    perms: '',
    url: '',
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    label: '',
    ifDisabled: '',
    ifPublic: '',
    perms: '',
  },
})
const interfaceDFormRules: FormRules = {
  label: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
  ifDisabled: [{required: true, trigger: 'change'}],
  ifPublic: [{required: true, trigger: 'change'}],
  perms: [{required: true, trigger: 'change'}],
  url: [{required: true, trigger: 'change'}],
}
const interfaceConfig = new TablePageConfig({
  bulkOperation: true,
  getDataOnMounted: false,
})

const {
  dialogFormRef: interfaceDialogFormRef,
  dialogFormsRef: interfaceDialogFormsRef,
  filterFormRef: interfaceFilterFormRef,
  filterFormVisible1: interfaceFilterFormVisible1,
  filterFormVisible: interfaceFilterFormVisible,
  dialogVisible: interfaceDialogVisible,
  dialogLoadingRef: interfaceDialogLoadingRef,
  dialogButtonLoadingRef: interfaceDialogButtonLoadingRef,
  tableLoadingRef: interfaceTableLoadingRef,
  switchLoadingRef: interfaceSwitchLoadingRef,
  activeTabName: interfaceActiveTabName,
  tableData: interfaceTableData,
  pageParam: interfacePageParam,
  total: interfaceTotal,
  multipleSelection: interfaceMultipleSelection,
  dialogType: interfaceDialogType,
  refresh: interfaceRefresh,
  dCan: interfaceDCan,
  dCon: interfaceDCon,
  fEnter: interfaceFEnter,
  fCon: interfaceFCon,
  fCan: interfaceFCan,
  gRefresh: interfaceGRefresh,
  gIns: interfaceGIns,
  gUpd: interfaceGUpd,
  gDel: interfaceGDel,
  gExport: interfaceGExport,
  gImport: interfaceGImport,
  gChangeFilterFormVisible: interfaceGChangeFilterFormVisible,
  tUpd: interfaceTUpd,
  tDel: interfaceTDel,
  handleSelectionChange: interfaceHandleSelectionChange,
  pageChange: interfacePageChange,
  dfIns: interfaceDfIns,
  dfDel: interfaceDfDel,
  ifRequired: interfaceIfRequired,
} = funcTablePage<InterfaceDto, InterfaceUpdDto>({
  state: interfaceState,
  dFormRules: interfaceDFormRules,
  config: interfaceConfig,
  api: interfaceApi,
  dict: interfaceDict,
})

const selectInterfaceModel = ref(false)
const interfacesOfSelectInterfaceGroup = ref<InterfaceDto[]>([])
const beforeAddInterface = () => {
  selectInterfaceModel.value = true
  interfaceRefresh()
}
const gdelInterfaceInterfaceGroup = () => {
  const delIds = interfaceInterfaceGroupTableData.value.filter(item => interfaceInterfaceGroupMultipleSelection.value.map(item => item.id).indexOf(item.interfaceId) > -1).map(item => item.id);
  delInterfaceInterfaceGroup(delIds)
}
const tdelInterfaceInterfaceGroup = (interfaceId: number) => {
  const delIds = interfaceInterfaceGroupTableData.value.filter(item => item.interfaceId === interfaceId).map(item => item.id);
  delInterfaceInterfaceGroup(delIds)
}
const delInterfaceInterfaceGroup = (delIds: number[]) => {
  ElMessageBox.confirm(
      `此操作将删除选中的 ${delIds.length} 条数据，且无法撤销，请确认是否继续？`,
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        draggable: true
      }
  ).then(() => {
    interfaceInterfaceGroupApi.deleteList(...delIds).then(res => {
      if (res) {
        interfaceInterfaceGroupRefresh()
      }
    })
  })
}
const cancelAddInterfaceInterfaceGroup = () => {
  selectInterfaceModel.value = false
}
const confirmAddInterfaceInterfaceGroup = () => {
  const selectInterfaceIds = interfaceMultipleSelection.value.map(item => item.id);
  const data = {
    interfaceGroupId: props.selectInterfaceGroupInfo.id,
    interfaceId: selectInterfaceIds
  }
  interfaceInterfaceGroupUpdIGI(data).then(res => {
    if (res) {
      selectInterfaceModel.value = false
      interfaceInterfaceGroupRefresh()
    }
  })
}
</script>

<template>
  <!--接口组信息-->
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">接口组信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="interfaceGroupDict.label">
          {{ props.selectInterfaceGroupInfo.label }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="interfaceGroupDict.baseURL">
          {{ props.selectInterfaceGroupInfo.baseURL }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <!--接口列表-->
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">接口列表</el-text>
  </el-divider>

  <!--顶部筛选表单-->
  <div class="zs-filter-form" v-show="interfaceInterfaceGroupFilterFormVisible1 && interfaceInterfaceGroupFilterFormVisible">
    <el-form
        class="demo-form-inline"
        ref="interfaceInterfaceGroupFilterFormRef"
        :model="interfaceInterfaceGroupState.filterForm"
        :inline="true"
        @keyup.enter="interfaceInterfaceGroupFEnter"
        @submit.prevent
    >
      <!--在此下方添加表单项-->
      <!--<el-form-item :label="interfaceInterfaceGroupDict." prop="">-->
      <!--  <el-input v-model="interfaceInterfaceGroupDict.filterForm." :placeholder="interfaceInterfaceGroupDict."/>-->
      <!--</el-form-item>-->
      <!--在此上方添加表单项-->
      <el-form-item>
        <el-button type="primary" @click="interfaceInterfaceGroupFCon">筛选</el-button>
        <el-button @click="interfaceInterfaceGroupFCan">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!--操作按钮-->
  <div class="zs-button-row">
    <div>
      <el-button type="primary" plain :icon="Refresh" @click="interfaceInterfaceGroupGRefresh">刷新</el-button>
      <el-button type="primary" plain :icon="Plus" @click="beforeAddInterface">添加接口</el-button>
      <!--<el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>-->
      <!--<el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?interfaceInterfaceGroupMultipleSelection.length===0:interfaceInterfaceGroupMultipleSelection.length!==1" @click="gUpd">修改</el-button>-->
      <el-button type="danger" plain :icon="Delete" :disabled="interfaceInterfaceGroupMultipleSelection.length===0" @click="gdelInterfaceInterfaceGroup">移除接口</el-button>
      <!--<el-button type="warning" plain :icon="Download" :disabled="interfaceInterfaceGroupMultipleSelection.length===0" @click="gExport()">导出</el-button>-->
      <!--<el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>-->
    </div>
    <div>
      <el-button v-if="interfaceInterfaceGroupFilterFormVisible1" plain :icon="Search" circle @click="interfaceInterfaceGroupGChangeFilterFormVisible"/>
    </div>
  </div>

  <div class="zs-table-data">
    <!--数据表格-->
    <el-table
        v-loading="interfaceInterfaceGroupTableLoadingRef"
        :data="interfacesOfSelectInterfaceGroup"
        @selection-change="interfaceInterfaceGroupHandleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55"/>
      <!--<el-table-column fixed prop="id" :label="interfaceDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="label" :label="interfaceDict.label" width="240"/>
      <el-table-column prop="orderNum" :label="interfaceDict.orderNum" width="120"/>
      <el-table-column prop="ifDisabled" :label="interfaceDict.ifDisabled" width="120"/>
      <el-table-column prop="ifPublic" :label="interfaceDict.ifPublic" width="120"/>
      <el-table-column prop="perms" :label="interfaceDict.perms" width="240"/>
      <el-table-column prop="url" :label="interfaceDict.url" width="240"/>
      <el-table-column prop="remark" :label="interfaceDict.remark" width="120"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="interfaceDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="interfaceDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="interfaceDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="interfaceDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="interfaceDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <el-table-column fixed="right" label="操作" min-width="140">
        <template #default="{row}">
          <div class="zs-table-data-operate-button-row">
            <el-button link type="danger" size="small" :icon="Delete" @click="tdelInterfaceInterfaceGroup(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
      <template #append>
        <div class="el-table-append-box">
          <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${interfaceInterfaceGroupMultipleSelection.length} 条数据。` }}</span>
        </div>
      </template>
    </el-table>

    <!--分页-->
    <Pagination
        v-if="interfaceInterfaceGroupConfig.pageQuery"
        :total="interfaceInterfaceGroupTotal"
        :page-num="interfaceInterfaceGroupPageParam.pageNum"
        :page-size="interfaceInterfaceGroupPageParam.pageSize"
        @page-change="interfaceInterfaceGroupPageChange"
    />
  </div>

  <!--所有接口的弹窗-->
  <el-dialog
      v-model="selectInterfaceModel"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
  >
    <!--弹窗-->
    <el-dialog
        :width="interfaceActiveTabName===final.more ? CONFIG.dialog_width_wider : CONFIG.dialog_width"
        v-model="interfaceDialogVisible"
        :title="interfaceDialogType.label"
        draggable
        append-to-body
    >
      <el-tabs v-if="interfaceConfig.bulkOperation" v-model="interfaceActiveTabName">
        <el-tab-pane :disabled="interfaceDialogType.value===final.upd" label="操作单个" :name="final.one"></el-tab-pane>
        <el-tab-pane :disabled="interfaceDialogType.value===final.upd" label="操作多个" :name="final.more"></el-tab-pane>
      </el-tabs>
      <template v-if="interfaceActiveTabName===final.one">
        <el-form
            ref="interfaceDialogFormRef"
            v-loading="interfaceDialogLoadingRef"
            :model="interfaceState.dialogForm"
            :label-width="CONFIG.dialog_form_label_width"
            :rules="interfaceDFormRules"
        >
          <!--<el-row>-->
          <!--  <el-col :span="12"></el-col>-->
          <!--  <el-col :span="12"></el-col>-->
          <!--</el-row>-->
          <el-form-item v-if="interfaceDialogType.value!==final.ins" :label="interfaceDict.id" prop="id">
            <span>{{ interfaceState.dialogForm.id }}</span>
          </el-form-item>
          <!--
          第一个input添加如下属性
          v-focus
          -->
          <!--在此下方添加表单项-->
          <el-row>
            <el-col :span="12">
              <el-form-item :label="interfaceDict.label" prop="label">
                <el-input v-model="interfaceState.dialogForm.label" :placeholder="interfaceDict.label"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="interfaceDict.icon" prop="icon">
                <el-input v-model="interfaceState.dialogForm.icon" :placeholder="interfaceDict.icon"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="interfaceDict.orderNum" prop="orderNum">
                <el-input-number v-model="interfaceState.dialogForm.orderNum" controls-position="right"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="interfaceDict.ifDisabled" prop="ifDisabled">
                <el-radio-group v-model="interfaceState.dialogForm.ifDisabled">
                  <el-radio :value="final.Y">是</el-radio>
                  <el-radio :value="final.N">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="interfaceDict.ifPublic" prop="ifPublic">
                <el-radio-group v-model="interfaceState.dialogForm.ifPublic">
                  <el-radio :value="final.Y">是</el-radio>
                  <el-radio :value="final.N">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="interfaceDict.perms" prop="perms">
                <el-input v-model="interfaceState.dialogForm.perms" :placeholder="interfaceDict.perms"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="interfaceDict.url" prop="url">
                <el-input v-model="interfaceState.dialogForm.url" :placeholder="interfaceDict.url"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="interfaceDict.remark" prop="remark">
                <el-input type="textarea" v-model="interfaceState.dialogForm.remark" :placeholder="interfaceDict.remark"/>
              </el-form-item>
            </el-col>
          </el-row>
          <!--在此上方添加表单项-->
        </el-form>
      </template>
      <template v-if="interfaceActiveTabName===final.more">
        <el-form
            ref="interfaceDialogFormsRef"
            v-loading="interfaceDialogLoadingRef"
        >
          <el-table
              :data="interfaceState.dialogForms"
              v-if="interfaceState.dialogForms"
          >
            <el-table-column type="index" width="50">
              <template #header>
                #
              </template>
            </el-table-column>
            <!--在此下方添加表格列-->
            <el-table-column prop="label" :label="interfaceDict.label" width="300">
              <template #header>
                <span :class="interfaceIfRequired('label')?'tp-table-header-required':''">{{ interfaceDict.label }}</span>
              </template>
              <template #default="{$index}">
                <div :class="interfaceState.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="interfaceState.dialogForms[$index].label" :placeholder="interfaceDict.label"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="icon" :label="interfaceDict.icon" width="300">
              <template #header>
                <span :class="interfaceIfRequired('icon')?'tp-table-header-required':''">{{ interfaceDict.icon }}</span>
              </template>
              <template #default="{$index}">
                <div :class="interfaceState.dialogForms_error?.[`${$index}-icon`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="interfaceState.dialogForms[$index].icon" :placeholder="interfaceDict.icon"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="orderNum" :label="interfaceDict.orderNum" width="300">
              <template #header>
                <span :class="interfaceIfRequired('orderNum')?'tp-table-header-required':''">{{ interfaceDict.orderNum }}</span>
              </template>
              <template #default="{$index}">
                <div :class="interfaceState.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input-number v-model="interfaceState.dialogForms[$index].orderNum" controls-position="right"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="ifDisabled" :label="interfaceDict.ifDisabled" width="70">
              <template #header>
                <span :class="interfaceIfRequired('ifDisabled')?'tp-table-header-required':''">{{ interfaceDict.ifDisabled }}</span>
              </template>
              <template #default="{$index}">
                <div :class="interfaceState.dialogForms_error?.[`${$index}-ifDisabled`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-checkbox v-model="interfaceState.dialogForms[$index].ifDisabled" :true-value="final.Y" :false-value="final.N"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="ifPublic" :label="interfaceDict.ifPublic" width="70">
              <template #header>
                <span :class="interfaceIfRequired('ifPublic')?'tp-table-header-required':''">{{ interfaceDict.ifPublic }}</span>
              </template>
              <template #default="{$index}">
                <div :class="interfaceState.dialogForms_error?.[`${$index}-ifPublic`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-checkbox v-model="interfaceState.dialogForms[$index].ifPublic" :true-value="final.Y" :false-value="final.N"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="perms" :label="interfaceDict.perms" width="300">
              <template #header>
                <span :class="interfaceIfRequired('perms')?'tp-table-header-required':''">{{ interfaceDict.perms }}</span>
              </template>
              <template #default="{$index}">
                <div :class="interfaceState.dialogForms_error?.[`${$index}-perms`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="interfaceState.dialogForms[$index].perms" :placeholder="interfaceDict.perms"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="url" :label="interfaceDict.url" width="300">
              <template #header>
                <span :class="interfaceIfRequired('url')?'tp-table-header-required':''">{{ interfaceDict.url }}</span>
              </template>
              <template #default="{$index}">
                <div :class="interfaceState.dialogForms_error?.[`${$index}-url`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="interfaceState.dialogForms[$index].url" :placeholder="interfaceDict.url"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="remark" :label="interfaceDict.remark" width="300">
              <template #header>
                <span :class="interfaceIfRequired('remark')?'tp-table-header-required':''">{{ interfaceDict.remark }}</span>
              </template>
              <template #default="{$index}">
                <div :class="interfaceState.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input type="textarea" v-model="interfaceState.dialogForms[$index].remark" :placeholder="interfaceDict.remark"/>
                </div>
              </template>
            </el-table-column>
            <!--在此上方添加表格列-->
            <el-table-column fixed="right" label="操作" min-width="120">
              <template v-if="interfaceDialogType.value===final.ins" #default="{$index}">
                <el-button link type="danger" size="small" :icon="Delete" @click="interfaceDfDel($index)">删除</el-button>
              </template>
            </el-table-column>
            <template v-if="interfaceDialogType.value===final.ins" #append>
              <el-button text type="primary" plain :icon="Plus" @click="interfaceDfIns">新增</el-button>
            </template>
          </el-table>
        </el-form>
      </template>
      <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="interfaceDialogButtonLoadingRef" @click="interfaceDCan">取消</el-button>
        <el-button type="primary" :disabled="interfaceDialogButtonLoadingRef" @click="interfaceDCon">确认</el-button>
      </span>
      </template>
    </el-dialog>

    <!--顶部筛选表单-->
    <div class="zs-filter-form" v-show="interfaceFilterFormVisible1 && interfaceFilterFormVisible">
      <el-form
          class="demo-form-inline"
          ref="interfaceFilterFormRef"
          :model="interfaceState.filterForm"
          :inline="true"
          @keyup.enter="interfaceFEnter"
          @submit.prevent
      >
        <!--在此下方添加表单项-->
        <el-form-item :label="interfaceDict.label" prop="label">
          <el-input v-model="interfaceState.filterForm.label" :placeholder="interfaceDict.label"/>
        </el-form-item>
        <el-form-item :label="interfaceDict.ifDisabled" prop="ifDisabled">
          <el-select v-model="interfaceState.filterForm.ifDisabled" :placeholder="interfaceDict.ifDisabled" clearable filterable>
            <el-option label="是" :value="final.Y"/>
            <el-option label="否" :value="final.N"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="interfaceDict.ifPublic" prop="ifPublic">
          <el-select v-model="interfaceState.filterForm.ifPublic" :placeholder="interfaceDict.ifPublic" clearable filterable>
            <el-option label="是" :value="final.Y"/>
            <el-option label="否" :value="final.N"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="interfaceDict.perms" prop="perms">
          <el-input v-model="interfaceState.filterForm.perms" :placeholder="interfaceDict.perms"/>
        </el-form-item>
        <!--在此上方添加表单项-->
        <el-form-item>
          <el-button type="primary" @click="interfaceFCon">筛选</el-button>
          <el-button @click="interfaceFCan">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--操作按钮-->
    <div class="zs-button-row">
      <div>
        <el-button type="primary" plain :icon="Refresh" @click="interfaceGRefresh">刷新</el-button>
        <!--<el-button type="primary" plain :icon="Plus" @click="interfaceGIns">新增</el-button>-->
        <!--<el-button type="success" plain :icon="Edit" :disabled="interfaceConfig.bulkOperation?interfaceMultipleSelection.length===0:interfaceMultipleSelection.length!==1" @click="interfaceGUpd">修改</el-button>-->
        <!--<el-button type="danger" plain :icon="Delete" :disabled="interfaceMultipleSelection.length===0" @click="interfaceGDel()">删除</el-button>-->
        <!--<el-button type="warning" plain :icon="Download" :disabled="interfaceMultipleSelection.length===0" @click="interfaceGExport()">导出</el-button>-->
        <!--<el-button type="warning" plain :icon="Upload" @click="interfaceGImport">上传</el-button>-->
      </div>
      <div>
        <el-button v-if="interfaceFilterFormVisible1" plain :icon="Search" circle @click="interfaceGChangeFilterFormVisible"/>
      </div>
    </div>

    <div class="zs-table-data">
      <!--数据表格-->
      <el-table
          v-loading="interfaceTableLoadingRef"
          :data="interfaceTableData"
          @selection-change="interfaceHandleSelectionChange"
      >
        <el-table-column fixed type="selection" width="55"/>
        <!--<el-table-column fixed prop="id" :label="interfaceDict.id" width="180"/>-->
        <!--上面id列的宽度改一下-->
        <!--在此下方添加表格列-->
        <el-table-column prop="label" :label="interfaceDict.label" width="240"/>
        <el-table-column prop="orderNum" :label="interfaceDict.orderNum" width="120"/>
        <el-table-column prop="ifDisabled" :label="interfaceDict.ifDisabled" width="120"/>
        <el-table-column prop="ifPublic" :label="interfaceDict.ifPublic" width="120"/>
        <el-table-column prop="perms" :label="interfaceDict.perms" width="240"/>
        <el-table-column prop="url" :label="interfaceDict.url" width="240"/>
        <el-table-column prop="remark" :label="interfaceDict.remark" width="120"/>
        <!--在此上方添加表格列-->
        <!--<el-table-column prop="createBy" :label="interfaceDict.createBy" width="120"/>-->
        <!--<el-table-column prop="updateBy" :label="interfaceDict.updateBy" width="120"/>-->
        <!--<el-table-column prop="createTime" :label="interfaceDict.createTime" width="220"/>-->
        <!--<el-table-column prop="updateTime" :label="interfaceDict.updateTime" width="220"/>-->
        <!--<el-table-column prop="deleted" :label="interfaceDict.deleted" width="60"/>-->
        <!--上方几个酌情使用-->
        <!--<el-table-column fixed="right" label="操作" min-width="140">-->
        <!--  <template #default="{row}">-->
        <!--    <div class="zs-table-data-operate-button-row">-->
        <!--      <el-button link type="primary" size="small" :icon="Edit" @click="interfaceTUpd(row.id)">修改</el-button>-->
        <!--      <el-button link type="danger" size="small" :icon="Delete" @click="interfaceTDel(row.id)">删除</el-button>-->
        <!--    </div>-->
        <!--  </template>-->
        <!--</el-table-column>-->
        <template #append>
          <div class="el-table-append-box">
            <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${interfaceMultipleSelection.length} 条数据。` }}</span>
          </div>
        </template>
      </el-table>

      <!--分页-->
      <Pagination
          v-if="interfaceConfig.pageQuery"
          :total="interfaceTotal"
          :page-num="interfacePageParam.pageNum"
          :page-size="interfacePageParam.pageSize"
          @page-change="interfacePageChange"
      />
    </div>

    <template #footer>
      <el-button plain @click="cancelAddInterfaceInterfaceGroup">取消</el-button>
      <el-button type="primary" plain @click="confirmAddInterfaceInterfaceGroup">提交</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
