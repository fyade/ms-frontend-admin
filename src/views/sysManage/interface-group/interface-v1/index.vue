<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { cascaderProps2, CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.ts"
import { State, t_config, t_FuncMap } from "@/type/tablePage.ts"
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { MORE, ONE } from "@/type/utils/base.ts"
import { interfaceDto } from "@/type/api/sysManage/interface.ts";
import {
  interfaceSel,
  interfaceSelById,
  interfaceSelByIds,
  interfaceSelAll,
  interfaceIns,
  interfaceUpd,
  interfaceInss,
  interfaceUpds,
  interfaceDel,
} from "@/api/module/sysManage/interface.ts"
import { interfaceGroupDto } from "@/type/api/sysManage/interfaceGroup.ts";
import {
  interfaceGroupSel,
  interfaceGroupSelById,
  interfaceGroupSelByIds,
  interfaceGroupSelAll,
  interfaceGroupIns,
  interfaceGroupUpd,
  interfaceGroupInss,
  interfaceGroupUpds,
  interfaceGroupDel,
} from "@/api/module/sysManage/interfaceGroup.ts"
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import { copyObject } from "@/utils/ObjectUtils.ts";

const interfaceState = reactive<State<interfaceDto>>({
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
const interfaceActiveTabName = ref<ONE | MORE>(final.one)
const interfaceConfig: t_config = reactive({
  selectParam: {}, // 查询参数（补充
  getDataOnMounted: false, // 页面加载时获取数据，默认true
  pageQuery: true, // 分页，默认true
  watchDialogVisible: true, // 监听dialogVisible变化，默认true
  /**
   * dialogVisible变化时的回调，可不传
   * @param visible 变化后的值
   */
  dialogVisibleCallback: (visible: boolean) => {
  },
  /**
   * selectList回调，可不传
   */
  selectListCallback: () => {
  },
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
  /**
   * 修改单个前的查询的回调，可不传，one2More为true时调这个
   */
  beforeUpdateOneCallback1: (res: any[]) => {
  },
  /**
   * 修改单个前的查询的回调，可不传，one2More为false时调这个
   */
  beforeUpdateOneCallback2: (res: any) => {
  }
})

const interfaceFunc: t_FuncMap = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: any) => {
    return interfaceSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: any) => {
    return interfaceSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return interfaceSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return interfaceSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return interfaceIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    return interfaceUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: any[]) => {
    return interfaceInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: any[]) => {
    return interfaceUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return interfaceDel(ids)
  }
}

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

const interfaceGroupState = reactive<State<interfaceGroupDto>>({
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
    parentId: final.DEFAULT_PARENT_ID,
    orderNum: final.DEFAULT_ORDER_NUM,
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
    parentId: [{required: true, trigger: 'change'}],
    orderNum: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    label: '接口组名',
    parentId: '父级接口组',
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
const interfaceGroupState2 = reactive({
  orderNum: 0
})
const interfaceGroupDialogFormRef = ref<FormInstance | null>(null)
const interfaceGroupDialogFormsRef = ref(null)
const interfaceGroupFilterFormRef = ref(null)
const interfaceGroupDialogVisible = ref(false)
const interfaceGroupDialogLoadingRef = ref(false)
const interfaceGroupTableLoadingRef = ref(false)
const interfaceGroupSwitchLoadingRef = ref(false)
const interfaceGroupActiveTabName = ref<ONE | MORE>(final.one)
const interfaceGroupConfig: t_config = reactive({
  selectParam: {}, // 查询参数（补充
  getDataOnMounted: true, // 页面加载时获取数据，默认true
  pageQuery: false, // 分页，默认true
  watchDialogVisible: true, // 监听dialogVisible变化，默认true
  /**
   * dialogVisible变化时的回调，可不传
   * @param visible 变化后的值
   */
  dialogVisibleCallback: (visible: boolean) => {
  },
  /**
   * selectList回调，可不传
   */
  selectListCallback: () => {
  },
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
  /**
   * 修改单个前的查询的回调，可不传，one2More为true时调这个
   */
  beforeUpdateOneCallback1: (res: any[]) => {
  },
  /**
   * 修改单个前的查询的回调，可不传，one2More为false时调这个
   */
  beforeUpdateOneCallback2: (res: any) => {
  }
})

const interfaceGroupFunc: t_FuncMap = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: any) => {
    return interfaceGroupSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: any) => {
    return interfaceGroupSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return interfaceGroupSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return interfaceGroupSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return interfaceGroupIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    return interfaceGroupUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: any[]) => {
    return interfaceGroupInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: any[]) => {
    return interfaceGroupUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return interfaceGroupDel(ids)
  }
}

const {
  refresh: interfaceGroupRefresh,
  dCan: interfaceGroupDCan,
  dCon: interfaceGroupDCon,
  fEnter: interfaceGroupFEnter,
  fCon: interfaceGroupFCon,
  fCan: interfaceGroupFCan,
  gRefresh: interfaceGroupGRefresh,
  gIns: interfaceGroupGIns,
  gUpd: interfaceGroupGUpd,
  gDel: interfaceGroupGDel,
  gExport: interfaceGroupGExport,
  gImport: interfaceGroupGImport,
  tUpd: interfaceGroupTUpd,
  tDel: interfaceGroupTDel,
  handleSelectionChange: interfaceGroupHandleSelectionChange,
  pageChange: interfaceGroupPageChange,
  dfIns: interfaceGroupDfIns,
  dfDel: interfaceGroupDfDel,
  ifRequired: interfaceGroupIfRequired
} = funcTablePage({
  config: interfaceGroupConfig,
  state: interfaceGroupState,
  state2: interfaceGroupState2,
  dialogFormRef: interfaceGroupDialogFormRef,
  dialogFormsRef: interfaceGroupDialogFormsRef,
  filterFormRef: interfaceGroupFilterFormRef,
  dialogVisible: interfaceGroupDialogVisible,
  dialogLoadingRef: interfaceGroupDialogLoadingRef,
  tableLoadingRef: interfaceGroupTableLoadingRef,
  switchLoadingRef: interfaceGroupSwitchLoadingRef,
  activeTabName: interfaceGroupActiveTabName,
  func: interfaceGroupFunc
})

const interfaceGroupExpandRowKeys = ref<any[]>([])
const interfaceGroupTableData2 = computed(() => {
  return arr2ToDiguiObj(interfaceGroupState.list)
})
const interfaceGroupGIns2 = () => {
  interfaceGroupState.dialogForm.parentId = final.DEFAULT_PARENT_ID
  interfaceGroupGIns()
}
const interfaceGroupTIns = (id: any) => {
  interfaceGroupState.dialogForm.parentId = id
  interfaceGroupGIns()
}

const selectInterfaceGroup = reactive<interfaceGroupDto>({
  id: -1,
  label: '',
  parentId: final.DEFAULT_PARENT_ID,
  orderNum: final.DEFAULT_ORDER_NUM,
  remark: '',
})
const interfaceManageModel = ref<boolean>(false)
const manageInterfaceInInterfaceGroup = (row: interfaceGroupDto) => {
  copyObject(selectInterfaceGroup, row)
  interfaceManageModel.value = true
}
const cancelManageInterfaceInInterfaceGroup = () => {
  interfaceManageModel.value = false
}
</script>

<template>
  <!--接口管理-->
  <el-dialog
      v-model="interfaceManageModel"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title="接口管理"
  >
    <!--弹框-->
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
                <!--<el-input v-model="interfaceState.dialogForm['icon']" :placeholder="interfaceState.dict['icon']"/>-->
                <IconSelect v-model="interfaceState.dialogForm['icon']" :placeholder="interfaceState.dict['icon']"/>
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
                <!--<el-input v-model="interfaceState.dialogForm['ifDisabled']"-->
                <!--          :placeholder="interfaceState.dict['ifDisabled']"/>-->
                <el-radio-group v-model="interfaceState.dialogForm['ifDisabled']">
                  <el-radio :label="final.Y">是</el-radio>
                  <el-radio :label="final.N">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="interfaceState.dict['ifPublic']" prop="ifPublic">
                <!--<el-input v-model="interfaceState.dialogForm['ifPublic']"-->
                <!--          :placeholder="interfaceState.dict['ifPublic']"/>-->
                <el-radio-group v-model="interfaceState.dialogForm['ifPublic']">
                  <el-radio :label="final.Y">是</el-radio>
                  <el-radio :label="final.N">否</el-radio>
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
          <!--    <el-radio :label="final.Y">是</el-radio>-->
          <!--    <el-radio :label="final.N">否</el-radio>-->
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
                  <!--<el-input v-model="interfaceState.dialogForms[$index]['icon']"-->
                  <!--          :placeholder="interfaceState.dict['icon']"/>-->
                  <IconSelect v-model="interfaceState.dialogForms[$index]['icon']"
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
            <el-table-column prop="ifDisabled" :label="interfaceState.dict['ifDisabled']" width="300">
              <template #header>
                <span :class="interfaceIfRequired('ifDisabled')?'tp-table-header-required':''">{{
                    interfaceState.dict['ifDisabled']
                  }}</span>
              </template>
              <template #default="{$index}">
                <div
                    :class="interfaceState.dialogForms_error?.[`${$index}-ifDisabled`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <!--<el-input v-model="interfaceState.dialogForms[$index]['ifDisabled']"-->
                  <!--          :placeholder="interfaceState.dict['ifDisabled']"/>-->
                  <el-checkbox v-model="interfaceState.dialogForms[$index]['ifDisabled']" :true-label="final.Y"
                               :false-label="final.N"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="ifPublic" :label="interfaceState.dict['ifPublic']" width="300">
              <template #header>
                <span :class="interfaceIfRequired('ifPublic')?'tp-table-header-required':''">{{
                    interfaceState.dict['ifPublic']
                  }}</span>
              </template>
              <template #default="{$index}">
                <div
                    :class="interfaceState.dialogForms_error?.[`${$index}-ifPublic`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <!--<el-input v-model="interfaceState.dialogForms[$index]['ifPublic']"-->
                  <!--          :placeholder="interfaceState.dict['ifPublic']"/>-->
                  <el-checkbox v-model="interfaceState.dialogForms[$index]['ifPublic']" :true-label="final.Y"
                               :false-label="final.N"/>
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
    >
      <!--在此下方添加表单项-->
      <!--<el-form-item :label="interfaceState.dict['']" prop="">-->
      <!--  <el-input v-model="interfaceState.filterForm['']" :placeholder="interfaceState.dict['']"/>-->
      <!--</el-form-item>-->
      <!--在此上方添加表单项-->
      <el-form-item>
        <el-button type="primary" @click="interfaceFCon">筛选</el-button>
        <el-button @click="interfaceFCan">重置</el-button>
      </el-form-item>
    </el-form>

    <!--操作按钮-->
    <div>
      <!--<el-button-group>-->
      <el-button type="primary" plain :icon="Refresh" @click="interfaceGRefresh">刷新接口</el-button>
      <el-button type="primary" plain :icon="Plus" @click="interfaceGIns">新增接口</el-button>
      <el-button type="success" plain :icon="Edit"
                 :disabled="interfaceConfig.bulkOperation?interfaceState.multipleSelection.length===0:interfaceState.multipleSelection.length!==1"
                 @click="interfaceGUpd">修改接口
      </el-button>
      <el-button type="danger" plain :icon="Delete" :disabled="interfaceState.multipleSelection.length===0"
                 @click="interfaceGDel()">删除接口
      </el-button>
      <el-button type="warning" plain :icon='Download' :disabled='interfaceState.multipleSelection.length===0'
                 @click="interfaceGExport()">导出接口
      </el-button>
      <el-button type="warning" plain :icon='Upload' @click="interfaceGImport">上传接口</el-button>
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
      <el-table-column prop="label" :label="interfaceState.dict['label']" width="120"/>
      <el-table-column prop="orderNum" :label="interfaceState.dict['orderNum']" width="120"/>
      <el-table-column prop="ifDisabled" :label="interfaceState.dict['ifDisabled']" width="120"/>
      <el-table-column prop="ifPublic" :label="interfaceState.dict['ifPublic']" width="120"/>
      <el-table-column prop="perms" :label="interfaceState.dict['perms']" width="120"/>
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
          <el-button link type="primary" size="small" @click="interfaceTUpd(row.id)">修改</el-button>
          <el-button link type="danger" size="small" @click="interfaceTDel(row.id)">删除</el-button>
        </template>
      </el-table-column>
      <template #append>
        <span>此表格的多选<span class="underline">不支持</span>{{
            `跨分页保存，当前已选 ${interfaceState.multipleSelection.length} 条数据。`
          }}</span>
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
      <el-button plain @click="cancelManageInterfaceInInterfaceGroup">取消</el-button>
    </template>
  </el-dialog>

  <!--弹框-->
  <el-dialog
      :width="interfaceGroupActiveTabName===final.more ? CONFIG.dialog_width_wider : CONFIG.dialog_width"
      v-model="interfaceGroupDialogVisible"
      :title="interfaceGroupState.dialogType.label"
      draggable
      append-to-body
  >
    <el-tabs v-if="interfaceGroupConfig.bulkOperation" v-model="interfaceGroupActiveTabName">
      <el-tab-pane :disabled="interfaceGroupState.dialogType.value===final.upd" label="操作单个"
                   :name="final.one"></el-tab-pane>
      <el-tab-pane :disabled="interfaceGroupState.dialogType.value===final.upd" label="操作多个"
                   :name="final.more"></el-tab-pane>
    </el-tabs>
    <template v-if="interfaceGroupActiveTabName===final.one">
      <el-form
          ref="interfaceGroupDialogFormRef"
          v-loading="interfaceGroupDialogLoadingRef"
          :model="interfaceGroupState.dialogForm"
          :label-width="CONFIG.dialog_form_label_width"
          :rules="interfaceGroupState.dFormRules"
      >
        <!--<el-row>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--</el-row>-->
        <el-form-item v-if="interfaceGroupState.dialogType.value!==final.ins" :label="interfaceGroupState.dict['id']"
                      prop="id">
          <span>{{ interfaceGroupState.dialogForm['id'] }}</span>
        </el-form-item>
        <!--
        第一个input添加如下属性
        v-focus
        -->
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="interfaceGroupState.dict['label']" prop="label">
              <el-input v-model="interfaceGroupState.dialogForm['label']"
                        :placeholder="interfaceGroupState.dict['label']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="interfaceGroupState.dict['parentId']" prop="parentId">
              <!--<el-input-number v-model="interfaceGroupState.dialogForm['parentId']" controls-position="right"/>-->
              <el-cascader
                  v-model="interfaceGroupState.dialogForm['parentId']"
                  :options="interfaceGroupTableData2"
                  :props="cascaderProps2"
                  clearable
                  :value-on-clear="final.DEFAULT_PARENT_ID"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="interfaceGroupState.dict['orderNum']" prop="orderNum">
              <el-input-number v-model="interfaceGroupState.dialogForm['orderNum']" controls-position="right"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="interfaceGroupState.dict['remark']" prop="remark">
              <el-input v-model="interfaceGroupState.dialogForm['remark']"
                        :placeholder="interfaceGroupState.dict['remark']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--在此上方添加表单项-->
        <!--<el-form-item :label="interfaceGroupState.dict['orderNum']" prop='orderNum'>-->
        <!--  <el-input-number v-model="interfaceGroupState.dialogForm['orderNum']" controls-position="right"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="interfaceGroupState.dict['ifDefault']" prop='ifDefault'>-->
        <!--  <el-switch v-model="interfaceGroupState.dialogForm['ifDefault']" :active-value='final.Y' :inactive-value='final.N'/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="interfaceGroupState.dict['ifDisabled']" prop='ifDisabled'>-->
        <!--  <el-radio-group v-model="interfaceGroupState.dialogForm['ifDisabled']">-->
        <!--    <el-radio :label="final.Y">是</el-radio>-->
        <!--    <el-radio :label="final.N">否</el-radio>-->
        <!--  </el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="interfaceGroupState.dict['ifDisabled']" prop="ifDisabled">-->
        <!--  <el-switch v-model="interfaceGroupState.dialogForm['ifDisabled']" :active-value="final.N" :inactive-value="final.Y"/>-->
        <!--</el-form-item>-->
        <!--上方几个酌情使用-->
      </el-form>
    </template>
    <template v-if="interfaceGroupActiveTabName===final.more">
      <el-form
          ref="interfaceGroupDialogFormsRef"
          v-loading="interfaceGroupDialogLoadingRef"
      >
        <el-table
            :data="interfaceGroupState.dialogForms"
            v-if="interfaceGroupState.dialogForms"
        >
          <el-table-column type="index" width="50">
            <template #header>
              #
            </template>
          </el-table-column>
          <!--在此下方添加表格列-->
          <el-table-column prop="label" :label="interfaceGroupState.dict['label']" width="300">
            <template #header>
              <span :class="interfaceGroupIfRequired('label')?'tp-table-header-required':''">{{
                  interfaceGroupState.dict['label']
                }}</span>
            </template>
            <template #default="{$index}">
              <div
                  :class="interfaceGroupState.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="interfaceGroupState.dialogForms[$index]['label']"
                          :placeholder="interfaceGroupState.dict['label']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="parentId" :label="interfaceGroupState.dict['parentId']" width="300">
            <template #header>
              <span :class="interfaceGroupIfRequired('parentId')?'tp-table-header-required':''">{{
                  interfaceGroupState.dict['parentId']
                }}</span>
            </template>
            <template #default="{$index}">
              <div
                  :class="interfaceGroupState.dialogForms_error?.[`${$index}-parentId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <!--<el-input-number v-model="interfaceGroupState.dialogForms[$index]['parentId']" controls-position="right"/>-->
                <el-cascader
                    v-model="interfaceGroupState.dialogForms[$index]['parentId']"
                    :options="interfaceGroupTableData2"
                    :props="cascaderProps2"
                    clearable
                    :value-on-clear="final.DEFAULT_PARENT_ID"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="interfaceGroupState.dict['orderNum']" width="300">
            <template #header>
              <span :class="interfaceGroupIfRequired('orderNum')?'tp-table-header-required':''">{{
                  interfaceGroupState.dict['orderNum']
                }}</span>
            </template>
            <template #default="{$index}">
              <div
                  :class="interfaceGroupState.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="interfaceGroupState.dialogForms[$index]['orderNum']"
                                 controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="interfaceGroupState.dict['remark']" width="300">
            <template #header>
              <span :class="interfaceGroupIfRequired('remark')?'tp-table-header-required':''">{{
                  interfaceGroupState.dict['remark']
                }}</span>
            </template>
            <template #default="{$index}">
              <div
                  :class="interfaceGroupState.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="interfaceGroupState.dialogForms[$index]['remark']"
                          :placeholder="interfaceGroupState.dict['remark']"/>
              </div>
            </template>
          </el-table-column>
          <!--在此上方添加表格列-->
          <el-table-column fixed="right" label="操作" min-width="120">
            <template v-if="interfaceGroupState.dialogType.value===final.ins" #default="{$index}">
              <el-button link type="danger" size="small" @click="interfaceGroupDfDel($index)">删除</el-button>
            </template>
          </el-table-column>
          <template v-if="interfaceGroupState.dialogType.value===final.ins" #append>
            <el-button text type="primary" plain :icon="Plus" @click="interfaceGroupDfIns">新增</el-button>
          </template>
        </el-table>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="interfaceGroupDCan">取消</el-button>
        <el-button type="primary" @click="interfaceGroupDCon">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!--顶部筛选表单-->
  <el-form
      class="demo-form-inline"
      v-if="Object.keys(interfaceGroupState.filterForm).length>0"
      ref="interfaceGroupFilterFormRef"
      :model="interfaceGroupState.filterForm"
      :inline="true"
      @keyup.enter="interfaceGroupFEnter"
  >
    <!--在此下方添加表单项-->
    <!--<el-form-item :label="interfaceGroupState.dict['']" prop="">-->
    <!--  <el-input v-model="interfaceGroupState.filterForm['']" :placeholder="interfaceGroupState.dict['']"/>-->
    <!--</el-form-item>-->
    <!--在此上方添加表单项-->
    <el-form-item>
      <el-button type="primary" @click="interfaceGroupFCon">筛选</el-button>
      <el-button @click="interfaceGroupFCan">重置</el-button>
    </el-form-item>
  </el-form>

  <!--操作按钮-->
  <div>
    <!--<el-button-group>-->
    <el-button type="primary" plain :icon="Refresh" @click="interfaceGroupGRefresh">刷新接口组</el-button>
    <el-button type="primary" plain :icon="Plus" @click="interfaceGroupGIns2">新增接口组</el-button>
    <el-button type="success" plain :icon="Edit"
               :disabled="interfaceGroupConfig.bulkOperation?interfaceGroupState.multipleSelection.length===0:interfaceGroupState.multipleSelection.length!==1"
               @click="interfaceGroupGUpd">修改接口组
    </el-button>
    <el-button type="danger" plain :icon="Delete" :disabled="interfaceGroupState.multipleSelection.length===0"
               @click="interfaceGroupGDel()">删除接口组
    </el-button>
    <el-button type="warning" plain :icon='Download' :disabled='interfaceGroupState.multipleSelection.length===0'
               @click="interfaceGroupGExport()">导出接口组
    </el-button>
    <el-button type="warning" plain :icon='Upload' @click="interfaceGroupGImport">上传接口组</el-button>
    <!--</el-button-group>-->
  </div>

  <!--数据表格-->
  <el-table
      v-loading="interfaceGroupTableLoadingRef"
      :data="interfaceGroupTableData2"
      :expand-row-keys="interfaceGroupExpandRowKeys"
      row-key="id"
      :default-expand-all="true"
      @selection-change="interfaceGroupHandleSelectionChange"
  >
    <el-table-column fixed type="selection" width="55"/>
    <!--<el-table-column fixed prop="id" :label="interfaceGroupState.dict['id']" width="180"/>-->
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="label" :label="interfaceGroupState.dict['label']" width="240"/>
    <!--<el-table-column prop="parentId" :label="interfaceGroupState.dict['parentId']" width="120"/>-->
    <el-table-column prop="orderNum" :label="interfaceGroupState.dict['orderNum']" width="120"/>
    <el-table-column prop="remark" :label="interfaceGroupState.dict['remark']" width="120"/>
    <!--在此上方添加表格列-->
    <!--<el-table-column prop="createBy" :label="interfaceGroupState.dict['createBy']" width="120"/>-->
    <!--<el-table-column prop="updateBy" :label="interfaceGroupState.dict['updateBy']" width="120"/>-->
    <!--<el-table-column prop="createTime" :label="interfaceGroupState.dict['createTime']" width="220"/>-->
    <!--<el-table-column prop="updateTime" :label="interfaceGroupState.dict['updateTime']" width="220"/>-->
    <!--<el-table-column prop="deleted" :label="interfaceGroupState.dict['deleted']" width="60"/>-->
    <!--上方几个酌情使用-->
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{row}">
        <el-button link type="primary" size="small" @click="interfaceGroupTIns(row.id)">新增</el-button>
        <el-button link type="primary" size="small" @click="interfaceGroupTUpd(row.id)">修改</el-button>
        <el-button link type="primary" size="small" @click="manageInterfaceInInterfaceGroup(row)">接口管理</el-button>
        <el-button link type="danger" size="small" @click="interfaceGroupTDel(row.id)">删除</el-button>
      </template>
    </el-table-column>
    <template #append>
      <span>此表格的多选<span class="underline">不支持</span>{{
          `跨分页保存，当前已选 ${interfaceGroupState.multipleSelection.length} 条数据。`
        }}</span>
    </template>
  </el-table>

  <!--分页-->
  <Pagination
      v-if="interfaceGroupState.total!==-1"
      :total="Number(interfaceGroupState.total)"
      :page-num="interfaceGroupState.pageParam.pageNum"
      :page-size="interfaceGroupState.pageParam.pageSize"
      @page-change="interfaceGroupPageChange"
  />
</template>

<style scoped lang="scss">
</style>
