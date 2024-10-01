<script setup lang="ts">
import { reactive, ref } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.ts"
import { State, t_config } from "@/type/tablePage.ts"
import { ElMessageBox, FormRules } from 'element-plus'
import { Delete, Plus, Refresh } from "@element-plus/icons-vue";
import { MORE, ONE, typeOM } from "@/type/utils/base.ts"
import { interfaceDto, interfaceUpdDto } from "@/type/api/main/sysManage/interface.ts";
import { interfaceFunc, } from "@/api/module/main/sysManage/interface.ts"
import { interfaceInterfaceGroupDto } from "@/type/api/main/sysManage/interfaceInterfaceGroup.ts";
import {
  interfaceInterfaceGroupFunc,
  interfaceInterfaceGroupUpdIGI,
} from "@/api/module/main/sysManage/interfaceInterfaceGroup.ts"

const props = defineProps({
  selectInterfaceGroupInfo: {
    type: Object,
    required: true
  }
});

const interfaceInterfaceGroupState = reactive<State<interfaceInterfaceGroupDto>>({
  dialogType: {
    value: '',
    label: ''
  },
  // 这个是弹出框表单
  // 格式: {
  //   id: '',
  //   parentId: final.DEFAULT_PARENT_ID,
  //   orderNum: final.DEFAULT_ORDER_NUM,
  //   ...
  // }
  dialogForm: {
    id: -1,
    interfaceId: -1,
    interfaceGroupId: -1,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  // 这个是弹出框表单校验
  // 格式: {
  //   name: [{ required: true, trigger: 'change' }],
  //   ...
  // }
  dFormRules: {
    interfaceId: [{required: true, trigger: 'change'}],
    interfaceGroupId: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    interfaceId: '接口',
    interfaceGroupId: '接口组',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {},
  list: [],
  multipleSelection: [],
  total: -1,
  pageParam: {
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  }
})
const interfaceInterfaceGroupState2 = reactive({
  orderNum: 0
})
const interfaceInterfaceGroupDialogFormRef = ref(null)
const interfaceInterfaceGroupDialogFormsRef = ref(null)
const interfaceInterfaceGroupFilterFormRef = ref(null)
const interfaceInterfaceGroupDialogVisible = ref(false)
const interfaceInterfaceGroupDialogLoadingRef = ref(false)
const interfaceInterfaceGroupTableLoadingRef = ref(false)
const interfaceInterfaceGroupSwitchLoadingRef = ref(false)
const interfaceInterfaceGroupActiveTabName = ref<typeOM>(final.one)
const interfaceInterfaceGroupConfig: t_config = reactive({
  selectParam: {
    interfaceGroupId: props.selectInterfaceGroupInfo.id
  }, // 查询参数（补充
  /**
   * selectList回调，可不传
   */
  selectListCallback: () => {
    const interfaceIds = interfaceInterfaceGroupState.list.map(item => item.interfaceId);
    interfaceFunc.selectByIds(interfaceIds).then(res => {
      interfacesOfSelectInterfaceGroup.value = res
    })
  },
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
})

const {
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
  tUpd: interfaceInterfaceGroupTUpd,
  tDel: interfaceInterfaceGroupTDel,
  handleSelectionChange: interfaceInterfaceGroupHandleSelectionChange,
  pageChange: interfaceInterfaceGroupPageChange,
  dfIns: interfaceInterfaceGroupDfIns,
  dfDel: interfaceInterfaceGroupDfDel,
  ifRequired: interfaceInterfaceGroupIfRequired
} = funcTablePage({
  config: interfaceInterfaceGroupConfig,
  state: interfaceInterfaceGroupState,
  state2: interfaceInterfaceGroupState2,
  dialogFormRef: interfaceInterfaceGroupDialogFormRef,
  dialogFormsRef: interfaceInterfaceGroupDialogFormsRef,
  filterFormRef: interfaceInterfaceGroupFilterFormRef,
  dialogVisible: interfaceInterfaceGroupDialogVisible,
  dialogLoadingRef: interfaceInterfaceGroupDialogLoadingRef,
  tableLoadingRef: interfaceInterfaceGroupTableLoadingRef,
  switchLoadingRef: interfaceInterfaceGroupSwitchLoadingRef,
  activeTabName: interfaceInterfaceGroupActiveTabName,
  func: interfaceInterfaceGroupFunc
})

const interfaceState = reactive<State<interfaceDto, interfaceUpdDto>>({
  dialogType: {
    value: '',
    label: ''
  },
  // 这个是弹出框表单
  // 格式: {
  //   id: '',
  //   parentId: final.DEFAULT_PARENT_ID,
  //   orderNum: final.DEFAULT_ORDER_NUM,
  //   ...
  // }
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
  // 这个是弹出框表单校验
  // 格式: {
  //   name: [{ required: true, trigger: 'change' }],
  //   ...
  // }
  dFormRules: {
    label: [{required: true, trigger: 'change'}],
    orderNum: [{required: true, trigger: 'change'}],
    ifDisabled: [{required: true, trigger: 'change'}],
    ifPublic: [{required: true, trigger: 'change'}],
    perms: [{required: true, trigger: 'change'}],
    url: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    label: '接口名',
    icon: '图标',
    ifPublic: '是否公共接口',
    perms: '权限标识',
    url: '请求url',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    label: '',
    ifDisabled: '',
    ifPublic: '',
    perms: '',
  },
  list: [],
  multipleSelection: [],
  total: -1,
  pageParam: {
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  }
})
const interfaceState2 = reactive({
  orderNum: 0
})
const interfaceDialogFormRef = ref(null)
const interfaceDialogFormsRef = ref(null)
const interfaceFilterFormRef = ref(null)
const interfaceDialogVisible = ref(false)
const interfaceDialogLoadingRef = ref(false)
const interfaceTableLoadingRef = ref(false)
const interfaceSwitchLoadingRef = ref(false)
const interfaceActiveTabName = ref<typeOM>(final.one)
const interfaceConfig: t_config = reactive({
  getDataOnMounted: false, // 页面加载时获取数据，默认true
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
})

const {
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
  tUpd: interfaceTUpd,
  tDel: interfaceTDel,
  handleSelectionChange: interfaceHandleSelectionChange,
  pageChange: interfacePageChange,
  dfIns: interfaceDfIns,
  dfDel: interfaceDfDel,
  ifRequired: interfaceIfRequired
} = funcTablePage({
  config: interfaceConfig,
  state: interfaceState,
  state2: interfaceState2,
  dialogFormRef: interfaceDialogFormRef,
  dialogFormsRef: interfaceDialogFormsRef,
  filterFormRef: interfaceFilterFormRef,
  dialogVisible: interfaceDialogVisible,
  dialogLoadingRef: interfaceDialogLoadingRef,
  tableLoadingRef: interfaceTableLoadingRef,
  switchLoadingRef: interfaceSwitchLoadingRef,
  activeTabName: interfaceActiveTabName,
  func: interfaceFunc
})

const selectInterfaceModel = ref(false)
const interfacesOfSelectInterfaceGroup = ref<interfaceDto[]>([])
const beforeAddInterface = () => {
  selectInterfaceModel.value = true
  interfaceRefresh()
}
const gdelInterfaceInterfaceGroup = () => {
  const delIds = interfaceInterfaceGroupState.list.filter(item => interfaceInterfaceGroupState.multipleSelection.map(item => item.id).indexOf(item.interfaceId) > -1).map(item => item.id);
  delInterfaceInterfaceGroup(delIds)
}
const tdelInterfaceInterfaceGroup = (interfaceId: number) => {
  const delIds = interfaceInterfaceGroupState.list.filter(item => item.interfaceId === interfaceId).map(item => item.id);
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
    interfaceInterfaceGroupFunc.deleteList(...delIds).then(res => {
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
  const selectInterfaceIds = interfaceState.multipleSelection.map(item => item.id);
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
        <el-form-item label="接口组id">
          <el-input disabled v-model="props.selectInterfaceGroupInfo.id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="接口组名">
          <el-input disabled v-model="props.selectInterfaceGroupInfo.label"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <!--接口列表-->
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">接口列表</el-text>
  </el-divider>

  <!--顶部筛选表单-->
  <el-form
      class="demo-form-inline"
      v-if="Object.keys(interfaceInterfaceGroupState.filterForm).length>0"
      ref="interfaceInterfaceGroupFilterFormRef"
      :model="interfaceInterfaceGroupState.filterForm"
      :inline="true"
      @keyup.enter="interfaceInterfaceGroupFEnter"
      @submit.prevent
  >
    <!--在此下方添加表单项-->
    <!--<el-form-item :label="state.dict['']" prop="">-->
    <!--  <el-input v-model="state.filterForm['']" :placeholder="state.dict['']"/>-->
    <!--</el-form-item>-->
    <!--在此上方添加表单项-->
    <el-form-item>
      <el-button type="primary" @click="interfaceInterfaceGroupFCon">筛选</el-button>
      <el-button @click="interfaceInterfaceGroupFCan">重置</el-button>
    </el-form-item>
  </el-form>

  <!--操作按钮-->
  <div>
    <!--<el-button-group>-->
    <el-button type="primary" plain :icon="Refresh" @click="interfaceInterfaceGroupGRefresh">刷新</el-button>
    <el-button type="primary" plain :icon="Plus" @click="beforeAddInterface">添加接口</el-button>
    <!--<el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>-->
    <!--<el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?state.multipleSelection.length===0:state.multipleSelection.length!==1" @click="gUpd">修改</el-button>-->
    <el-button type="danger" plain :icon="Delete" :disabled="interfaceInterfaceGroupState.multipleSelection.length===0"
               @click="gdelInterfaceInterfaceGroup">移除接口
    </el-button>
    <!--<el-button type="warning" plain :icon='Download' :disabled='state.multipleSelection.length===0' @click="gExport()">导出</el-button>-->
    <!--<el-button type="warning" plain :icon='Upload' @click="gImport">上传</el-button>-->
    <!--</el-button-group>-->
  </div>

  <!--数据表格-->
  <el-table
      v-loading="interfaceInterfaceGroupTableLoadingRef"
      :data="interfacesOfSelectInterfaceGroup"
      @selection-change="interfaceInterfaceGroupHandleSelectionChange"
  >
    <el-table-column fixed type="selection" width="55"/>
    <!--<el-table-column fixed prop="id" :label="state.dict['id']" width="180"/>-->
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="label" :label="interfaceState.dict['label']" width="240"/>
    <el-table-column prop="orderNum" :label="interfaceState.dict['orderNum']" width="120"/>
    <el-table-column prop="ifDisabled" :label="interfaceState.dict['ifDisabled']" width="120"/>
    <el-table-column prop="ifPublic" :label="interfaceState.dict['ifPublic']" width="120"/>
    <el-table-column prop="perms" :label="interfaceState.dict['perms']" width="240"/>
    <el-table-column prop="url" :label="interfaceState.dict['url']" width="240"/>
    <el-table-column prop="remark" :label="interfaceState.dict['remark']" width="120"/>
    <!--在此上方添加表格列-->
    <!--<el-table-column prop="createBy" :label="state.dict['createBy']" width="120"/>-->
    <!--<el-table-column prop="updateBy" :label="state.dict['updateBy']" width="120"/>-->
    <!--<el-table-column prop="createTime" :label="state.dict['createTime']" width="220"/>-->
    <!--<el-table-column prop="updateTime" :label="state.dict['updateTime']" width="220"/>-->
    <!--<el-table-column prop="deleted" :label="state.dict['deleted']" width="60"/>-->
    <!--上方几个酌情使用-->
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{row}">
        <el-button link type="danger" size="small" @click="tdelInterfaceInterfaceGroup(row.id)">删除</el-button>
      </template>
    </el-table-column>
    <template #append>
      <div class="el-table-append-box">
        <span>此表格的多选<span class="underline">不支持</span>{{
            `跨分页保存，当前已选 ${interfaceInterfaceGroupState.multipleSelection.length} 条数据。`
          }}</span>
      </div>
    </template>
  </el-table>

  <!--分页-->
  <Pagination
      v-if="interfaceInterfaceGroupState.total!==-1"
      :total="Number(interfaceInterfaceGroupState.total)"
      :page-num="interfaceInterfaceGroupState.pageParam.pageNum"
      :page-size="interfaceInterfaceGroupState.pageParam.pageSize"
      @page-change="interfaceInterfaceGroupPageChange"
  />

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
        :title="interfaceState.dialogType.label"
        draggable
        append-to-body
    >
      <el-tabs v-if="interfaceConfig.bulkOperation" v-model="interfaceActiveTabName">
        <el-tab-pane :disabled="interfaceState.dialogType.value===final.upd" label="操作单个"
                     :name="final.one"></el-tab-pane>
        <el-tab-pane :disabled="interfaceState.dialogType.value===final.upd" label="操作多个"
                     :name="final.more"></el-tab-pane>
      </el-tabs>
      <template v-if="interfaceActiveTabName===final.one">
        <el-form
            ref="interfaceDialogFormRef"
            v-loading="interfaceDialogLoadingRef"
            :model="interfaceState.dialogForm"
            :label-width="CONFIG.dialog_form_label_width"
            :rules="interfaceState.dFormRules"
        >
          <!--<el-row>-->
          <!--  <el-col :span="12"></el-col>-->
          <!--  <el-col :span="12"></el-col>-->
          <!--</el-row>-->
          <el-form-item v-if="interfaceState.dialogType.value!==final.ins" :label="interfaceState.dict['id']" prop="id">
            <span>{{ interfaceState.dialogForm['id'] }}</span>
          </el-form-item>
          <!--
          第一个input添加如下属性
          v-focus
          -->
          <!--在此下方添加表单项-->
          <el-row>
            <el-col :span="12">
              <el-form-item :label="interfaceState.dict['label']" prop="label">
                <el-input v-model="interfaceState.dialogForm['label']" :placeholder="interfaceState.dict['label']"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="interfaceState.dict['icon']" prop="icon">
                <el-input v-model="interfaceState.dialogForm['icon']" :placeholder="interfaceState.dict['icon']"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="interfaceState.dict['orderNum']" prop="orderNum">
                <el-input-number v-model="interfaceState.dialogForm['orderNum']" controls-position="right"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="interfaceState.dict['ifDisabled']" prop="ifDisabled">
                <el-radio-group v-model="interfaceState.dialogForm['ifDisabled']">
                  <el-radio :value="final.Y">是</el-radio>
                  <el-radio :value="final.N">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="interfaceState.dict['ifPublic']" prop="ifPublic">
                <el-radio-group v-model="interfaceState.dialogForm['ifPublic']">
                  <el-radio :value="final.Y">是</el-radio>
                  <el-radio :value="final.N">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="interfaceState.dict['perms']" prop="perms">
                <el-input v-model="interfaceState.dialogForm['perms']" :placeholder="interfaceState.dict['perms']"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="interfaceState.dict['url']" prop="url">
                <el-input v-model="interfaceState.dialogForm['url']" :placeholder="interfaceState.dict['url']"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="interfaceState.dict['remark']" prop="remark">
                <el-input v-model="interfaceState.dialogForm['remark']" :placeholder="interfaceState.dict['remark']"/>
              </el-form-item>
            </el-col>
          </el-row>
          <!--在此上方添加表单项-->
          <!--<el-form-item :label="interfaceState.dict['orderNum']" prop='orderNum'>-->
          <!--  <el-input-number v-model="interfaceState.dialogForm['orderNum']" controls-position="right"/>-->
          <!--</el-form-item>-->
          <!--<el-form-item :label="interfaceState.dict['ifDefault']" prop='ifDefault'>-->
          <!--  <el-switch v-model="interfaceState.dialogForm['ifDefault']" :active-value='final.Y' :inactive-value='final.N'/>-->
          <!--</el-form-item>-->
          <!--<el-form-item :label="interfaceState.dict['ifDisabled']" prop='ifDisabled'>-->
          <!--  <el-radio-group v-model="interfaceState.dialogForm['ifDisabled']">-->
          <!--    <el-radio :value="final.Y">是</el-radio>-->
          <!--    <el-radio :value="final.N">否</el-radio>-->
          <!--  </el-radio-group>-->
          <!--</el-form-item>-->
          <!--<el-form-item :label="interfaceState.dict['ifDisabled']" prop="ifDisabled">-->
          <!--  <el-switch v-model="interfaceState.dialogForm['ifDisabled']" :active-value="final.N" :inactive-value="final.Y"/>-->
          <!--</el-form-item>-->
          <!--上方几个酌情使用-->
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
            <el-table-column prop="label" :label="interfaceState.dict['label']" width="300">
              <template #header>
                <span :class="interfaceIfRequired('label')?'tp-table-header-required':''">{{
                    interfaceState.dict['label']
                  }}</span>
              </template>
              <template #default="{$index}">
                <div
                    :class="interfaceState.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="interfaceState.dialogForms[$index]['label']"
                            :placeholder="interfaceState.dict['label']"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="icon" :label="interfaceState.dict['icon']" width="300">
              <template #header>
                <span :class="interfaceIfRequired('icon')?'tp-table-header-required':''">{{
                    interfaceState.dict['icon']
                  }}</span>
              </template>
              <template #default="{$index}">
                <div
                    :class="interfaceState.dialogForms_error?.[`${$index}-icon`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="interfaceState.dialogForms[$index]['icon']"
                            :placeholder="interfaceState.dict['icon']"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="orderNum" :label="interfaceState.dict['orderNum']" width="300">
              <template #header>
                <span :class="interfaceIfRequired('orderNum')?'tp-table-header-required':''">{{
                    interfaceState.dict['orderNum']
                  }}</span>
              </template>
              <template #default="{$index}">
                <div
                    :class="interfaceState.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input-number v-model="interfaceState.dialogForms[$index]['orderNum']" controls-position="right"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="ifDisabled" :label="interfaceState.dict['ifDisabled']" width="70">
              <template #header>
                <span :class="interfaceIfRequired('ifDisabled')?'tp-table-header-required':''">{{
                    interfaceState.dict['ifDisabled']
                  }}</span>
              </template>
              <template #default="{$index}">
                <div
                    :class="interfaceState.dialogForms_error?.[`${$index}-ifDisabled`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-checkbox v-model="interfaceState.dialogForms[$index]['ifDisabled']" :true-value="final.Y"
                               :false-value="final.N"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="ifPublic" :label="interfaceState.dict['ifPublic']" width="70">
              <template #header>
                <span :class="interfaceIfRequired('ifPublic')?'tp-table-header-required':''">{{
                    interfaceState.dict['ifPublic']
                  }}</span>
              </template>
              <template #default="{$index}">
                <div
                    :class="interfaceState.dialogForms_error?.[`${$index}-ifPublic`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-checkbox v-model="interfaceState.dialogForms[$index]['ifPublic']" :true-value="final.Y"
                               :false-value="final.N"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="perms" :label="interfaceState.dict['perms']" width="300">
              <template #header>
                <span :class="interfaceIfRequired('perms')?'tp-table-header-required':''">{{
                    interfaceState.dict['perms']
                  }}</span>
              </template>
              <template #default="{$index}">
                <div
                    :class="interfaceState.dialogForms_error?.[`${$index}-perms`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="interfaceState.dialogForms[$index]['perms']"
                            :placeholder="interfaceState.dict['perms']"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="url" :label="interfaceState.dict['url']" width="300">
              <template #header>
                <span
                    :class="interfaceIfRequired('url')?'tp-table-header-required':''">{{ interfaceState.dict['url'] }}</span>
              </template>
              <template #default="{$index}">
                <div
                    :class="interfaceState.dialogForms_error?.[`${$index}-url`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="interfaceState.dialogForms[$index]['url']"
                            :placeholder="interfaceState.dict['url']"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="remark" :label="interfaceState.dict['remark']" width="300">
              <template #header>
                <span :class="interfaceIfRequired('remark')?'tp-table-header-required':''">{{
                    interfaceState.dict['remark']
                  }}</span>
              </template>
              <template #default="{$index}">
                <div
                    :class="interfaceState.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="interfaceState.dialogForms[$index]['remark']"
                            :placeholder="interfaceState.dict['remark']"/>
                </div>
              </template>
            </el-table-column>
            <!--在此上方添加表格列-->
            <el-table-column fixed="right" label="操作" min-width="120">
              <template v-if="interfaceState.dialogType.value===final.ins" #default="{$index}">
                <el-button link type="danger" size="small" @click="interfaceDfDel($index)">删除</el-button>
              </template>
            </el-table-column>
            <template v-if="interfaceState.dialogType.value===final.ins" #append>
              <el-button text type="primary" plain :icon="Plus" @click="interfaceDfIns">新增</el-button>
            </template>
          </el-table>
        </el-form>
      </template>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="interfaceDCan">取消</el-button>
        <el-button type="primary" @click="interfaceDCon">确认</el-button>
      </span>
      </template>
    </el-dialog>

    <!--顶部筛选表单-->
    <el-form
        class="demo-form-inline"
        v-if="Object.keys(interfaceState.filterForm).length>0"
        ref="interfaceFilterFormRef"
        :model="interfaceState.filterForm"
        :inline="true"
        @keyup.enter="interfaceFEnter"
        @submit.prevent
    >
      <!--在此下方添加表单项-->
      <el-form-item :label="interfaceState.dict['label']" prop="label">
        <el-input v-model="interfaceState.filterForm['label']" :placeholder="interfaceState.dict['label']"/>
      </el-form-item>
      <el-form-item :label="interfaceState.dict['ifDisabled']" prop="ifDisabled">
        <!--<el-input v-model="interfaceState.filterForm['ifDisabled']" :placeholder="interfaceState.dict['ifDisabled']"/>-->
        <el-select v-model="interfaceState.filterForm['ifDisabled']" :placeholder="interfaceState.dict['ifDisabled']"
                   clearable
                   filterable>
          <el-option label="是" :value="final.Y"/>
          <el-option label="否" :value="final.N"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="interfaceState.dict['ifPublic']" prop="ifPublic">
        <!--<el-input v-model="interfaceState.filterForm['ifPublic']" :placeholder="interfaceState.dict['ifPublic']"/>-->
        <el-select v-model="interfaceState.filterForm['ifPublic']" :placeholder="interfaceState.dict['ifPublic']"
                   clearable filterable>
          <el-option label="是" :value="final.Y"/>
          <el-option label="否" :value="final.N"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="interfaceState.dict['perms']" prop="perms">
        <el-input v-model="interfaceState.filterForm['perms']" :placeholder="interfaceState.dict['perms']"/>
      </el-form-item>
      <!--在此上方添加表单项-->
      <el-form-item>
        <el-button type="primary" @click="interfaceFCon">筛选</el-button>
        <el-button @click="interfaceFCan">重置</el-button>
      </el-form-item>
    </el-form>

    <!--操作按钮-->
    <div>
      <!--<el-button-group>-->
      <el-button type="primary" plain :icon="Refresh" @click="interfaceGRefresh">刷新</el-button>
      <!--<el-button type="primary" plain :icon="Plus" @click="interfaceGIns">新增</el-button>-->
      <!--<el-button type="success" plain :icon="Edit" :disabled="interfaceConfig.bulkOperation?interfaceState.multipleSelection.length===0:interfaceState.multipleSelection.length!==1" @click="interfaceGUpd">修改</el-button>-->
      <!--<el-button type="danger" plain :icon="Delete" :disabled="interfaceState.multipleSelection.length===0" @click="interfaceGDel()">删除</el-button>-->
      <!--<el-button type="warning" plain :icon='Download' :disabled='interfaceState.multipleSelection.length===0' @click="interfaceGExport()">导出</el-button>-->
      <!--<el-button type="warning" plain :icon='Upload' @click="interfaceGImport">上传</el-button>-->
      <!--</el-button-group>-->
    </div>

    <!--数据表格-->
    <el-table
        v-loading="interfaceTableLoadingRef"
        :data="interfaceState.list"
        @selection-change="interfaceHandleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55"/>
      <!--<el-table-column fixed prop="id" :label="interfaceState.dict['id']" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="label" :label="interfaceState.dict['label']" width="240"/>
      <el-table-column prop="orderNum" :label="interfaceState.dict['orderNum']" width="120"/>
      <el-table-column prop="ifDisabled" :label="interfaceState.dict['ifDisabled']" width="120"/>
      <el-table-column prop="ifPublic" :label="interfaceState.dict['ifPublic']" width="120"/>
      <el-table-column prop="perms" :label="interfaceState.dict['perms']" width="240"/>
      <el-table-column prop="url" :label="interfaceState.dict['url']" width="240"/>
      <el-table-column prop="remark" :label="interfaceState.dict['remark']" width="120"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="interfaceState.dict['createBy']" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="interfaceState.dict['updateBy']" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="interfaceState.dict['createTime']" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="interfaceState.dict['updateTime']" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="interfaceState.dict['deleted']" width="60"/>-->
      <!--上方几个酌情使用-->
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="{row}">
          <!--<el-button link type="primary" size="small" @click="interfaceTUpd(row.id)">修改</el-button>-->
          <!--<el-button link type="danger" size="small" @click="interfaceTDel(row.id)">删除</el-button>-->
        </template>
      </el-table-column>
      <template #append>
        <div class="el-table-append-box">
        <span>此表格的多选<span class="underline">不支持</span>{{
            `跨分页保存，当前已选 ${interfaceState.multipleSelection.length} 条数据。`
          }}</span>
        </div>
      </template>
    </el-table>

    <!--分页-->
    <Pagination
        v-if="interfaceState.total!==-1"
        :total="Number(interfaceState.total)"
        :page-num="interfaceState.pageParam.pageNum"
        :page-size="interfaceState.pageParam.pageSize"
        @page-change="interfacePageChange"
    />

    <template #footer>
      <el-button plain @click="cancelAddInterfaceInterfaceGroup">取消</el-button>
      <el-button type="primary" plain @click="confirmAddInterfaceInterfaceGroup">提交</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
