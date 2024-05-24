<script setup lang="ts">
import { reactive, ref } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.js"
import { State, t_config, t_FuncMap } from "@/type/tablePage.ts";
import type { FormRules } from 'element-plus'
import { Delete, Edit, Plus, Refresh } from "@element-plus/icons-vue";
import { MORE, ONE } from "@/type/utils/base.ts";
import {
  codeGenColumnDel,
  codeGenColumnIns, codeGenColumnInss,
  codeGenColumnSelMore,
  codeGenColumnSelOne,
  codeGenColumnSelPage, codeGenColumnUpd, codeGenColumnUpds
} from "@/api/module/sysUtil/codeGeneration.ts";

const props = defineProps({
  tableId: {
    require: true,
    type: Number
  }
})

const state = reactive<State>({
  dialogType: {
    value: '',
    label: ''
  },
  // 这个是弹出框表单
  // 格式: {
  //   id: '',
  //   ifDefault: final.IS_DEFAULT_YES,
  //   ifDisabled: final.DISABLED_NO,
  //   parentId: final.DEFAULT_PARENT_ID,
  //   ...
  // }
  dialogForm: {
    id: '',
    tableId: props.tableId,
    colName: '',
    colDescr: '',
    mysqlType: '',
    tsType: '',
    tsName: '',
    ifIns: '',
    ifUpd: '',
    ifSelOne: '',
    ifSelMore: '',
    ifRequired: '',
    formType: '',
    selType: '',
    orderNum: final.DEFAULT_ORDER_NUM
  },
  dialogForms: [],
  dialogForms_error: {},
  // 这个是弹出框表单校验
  // 格式: {
  //   name: [{ required: true, trigger: 'change' }],
  //   ...
  // }
  dFormRules: {
    colName: [{required: true, trigger: 'change'}],
    colDescr: [{required: true, trigger: 'change'}],
    mysqlType: [{required: true, trigger: 'change'}],
    tsType: [{required: true, trigger: 'change'}],
    tsName: [{required: true, trigger: 'change'}],
    ifIns: [{required: true, trigger: 'change'}],
    ifUpd: [{required: true, trigger: 'change'}],
    ifSelOne: [{required: true, trigger: 'change'}],
    ifSelMore: [{required: true, trigger: 'change'}],
    ifRequired: [{required: true, trigger: 'change'}],
    selType: [{required: true, trigger: 'change'}],
    formType: [{required: true, trigger: 'change'}],
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
    colName: '列名',
    colDescr: '字段描述',
    mysqlType: 'mysql类型',
    tsType: 'ts类型',
    tsName: 'ts属性',
    ifIns: '是否增',
    ifUpd: '是否改',
    ifSelOne: '是否查1',
    ifSelMore: '是否查n',
    ifRequired: '是否必填',
    selType: '查询方式',
    formType: '表单类型',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    colName: '',
    colDescr: '',
    mysqlType: '',
    tsType: '',
    tsName: '',
    selType: '',
    formType: '',
  },
  list: [],
  multipleSelection: [],
  total: -1,
  pageParam: {
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  }
})
const state2 = reactive({
  orderNum: 0
})
const dialogFormRef = ref(null)
const dialogFormsRef = ref(null)
const filterFormRef = ref(null)
const dialogVisible = ref(false)
const dialogLoadingRef = ref(false)
const tableLoadingRef = ref(false)
const switchLoadingRef = ref(false)
const activeTabName = ref<ONE | MORE>(final.one)
const config: t_config = reactive({
  selectParam: {
    tableId: props.tableId
  }, // 查询参数（补充
  getDataOnMounted: true, // 页面加载时获取数据，默认true
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

const func: t_FuncMap = {
  /**
   * 查询列表
   * @param params
   */
  selectList: (params: any) => {
    return codeGenColumnSelPage(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return codeGenColumnSelOne(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return codeGenColumnSelMore(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return codeGenColumnIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    return codeGenColumnUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: any[]) => {
    return codeGenColumnInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: any[]) => {
    return codeGenColumnUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return codeGenColumnDel(ids)
  }
}

const {
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
  tUpd,
  tDel,
  handleSelectionChange,
  pageChange,
  dfIns,
  dfDel,
  ifRequired
} = funcTablePage({
  config,
  state,
  state2,
  dialogFormRef,
  dialogFormsRef,
  filterFormRef,
  dialogVisible,
  dialogLoadingRef,
  tableLoadingRef,
  switchLoadingRef,
  activeTabName,
  func
})
</script>

<template>
  <!--弹框-->
  <el-dialog
      :width="activeTabName===final.more ? 'calc(100% - 50px)' : CONFIG.dialog_width"
      v-model="dialogVisible"
      :title="state.dialogType.label"
      draggable
      append-to-body
  >
    <el-tabs v-if="config.bulkOperation" v-model="activeTabName">
      <el-tab-pane :disabled="state.dialogType.value===final.upd" label="操作单个" :name="final.one"></el-tab-pane>
      <el-tab-pane :disabled="state.dialogType.value===final.upd" label="操作多个" :name="final.more"></el-tab-pane>
    </el-tabs>
    <template v-if="activeTabName===final.one">
      <el-form
          ref="dialogFormRef"
          v-loading="dialogLoadingRef"
          :model="state.dialogForm"
          :label-width="CONFIG.dialog_form_label_width"
          :rules="state.dFormRules"
      >
        <!--<el-row>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--</el-row>-->
        <el-form-item v-if="state.dialogType.value!==final.ins" :label="state.dict['id']" prop="id">
          <span>{{ state.dialogForm['id'] }}</span>
        </el-form-item>
        <!--
        第一个input添加如下属性
        v-focus
        -->
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['colName']" prop="colName">
              <el-input v-model="state.dialogForm['colName']" :placeholder="state.dict['colName']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['colDescr']" prop="colDescr">
              <el-input v-model="state.dialogForm['colDescr']" :placeholder="state.dict['colDescr']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['mysqlType']" prop="mysqlType">
              <el-input v-model="state.dialogForm['mysqlType']" :placeholder="state.dict['mysqlType']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['tsType']" prop="tsType">
              <el-input v-model="state.dialogForm['tsType']" :placeholder="state.dict['tsType']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['tsName']" prop="tsName">
              <el-input v-model="state.dialogForm['tsName']" :placeholder="state.dict['tsName']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['ifIns']" prop="ifIns">
              <el-input v-model="state.dialogForm['ifIns']" :placeholder="state.dict['ifIns']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['ifUpd']" prop="ifUpd">
              <el-input v-model="state.dialogForm['ifUpd']" :placeholder="state.dict['ifUpd']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['ifSelOne']" prop="ifSelOne">
              <el-input v-model="state.dialogForm['ifSelOne']" :placeholder="state.dict['ifSelOne']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['ifSelMore']" prop="ifSelMore">
              <el-input v-model="state.dialogForm['ifSelMore']" :placeholder="state.dict['ifSelMore']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['ifRequired']" prop="ifRequired">
              <el-input v-model="state.dialogForm['ifRequired']" :placeholder="state.dict['ifRequired']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['selType']" prop="selType">
              <el-input v-model="state.dialogForm['selType']" :placeholder="state.dict['selType']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['formType']" prop="formType">
              <el-input v-model="state.dialogForm['formType']" :placeholder="state.dict['formType']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="state.dict['orderNum']" prop="orderNum">
              <el-input-number v-model="state.dialogForm['orderNum']" :placeholder="state.dict['orderNum']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--在此上方添加表单项-->
        <!--<el-form-item :label="state.dict['orderNum']" prop="orderNum">-->
        <!--  <el-input-number v-model="state.dialogForm['orderNum']" controls-position="right"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="state.dict['ifDefault']" prop="ifDefault">-->
        <!--  <el-switch v-model="state.dialogForm['ifDefault']" :active-value="final.IS_DEFAULT_YES"-->
        <!--             :inactive-value="final.IS_DEFAULT_NO"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="state.dict['ifDisabled']" prop="ifDisabled">-->
        <!--  <el-radio-group v-model="state.dialogForm['ifDisabled']">-->
        <!--    <el-radio :label="final.Y">是</el-radio>-->
        <!--    <el-radio :label="final.N">否</el-radio>-->
        <!--  </el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="state.dict['ifDisabled']" prop="ifDisabled">-->
        <!--  <el-switch v-model="state.dialogForm['ifDisabled']" :active-value="final.DISABLED_NO"-->
        <!--             :inactive-value="final.DISABLED_YES"/>-->
        <!--</el-form-item>-->
        <!--上方几个酌情使用-->
      </el-form>
    </template>
    <template v-if="activeTabName===final.more">
      <el-form
          ref="dialogFormsRef"
          v-loading="dialogLoadingRef"
      >
        <el-table
            style="width: 100%"
            :data="state.dialogForms"
            v-if="state.dialogForms"
        >
          <el-table-column type="index" width="50">
            <template #header>
              #
            </template>
          </el-table-column>
          <!--在此下方添加表格列-->
          <el-table-column prop="colName" :label="state.dict['colName']" width="300">
            <template #header>
              <span :class="ifRequired('colName')?'tp-table-header-required':''">{{ state.dict['colName'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-colName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['colName']" :placeholder="state.dict['colName']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="colDescr" :label="state.dict['colDescr']" width="300">
            <template #header>
              <span :class="ifRequired('colDescr')?'tp-table-header-required':''">{{ state.dict['colDescr'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-colDescr`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['colDescr']" :placeholder="state.dict['colDescr']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="mysqlType" :label="state.dict['mysqlType']" width="300">
            <template #header>
              <span :class="ifRequired('mysqlType')?'tp-table-header-required':''">{{ state.dict['mysqlType'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-mysqlType`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['mysqlType']" :placeholder="state.dict['mysqlType']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tsType" :label="state.dict['tsType']" width="300">
            <template #header>
              <span :class="ifRequired('tsType')?'tp-table-header-required':''">{{ state.dict['tsType'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-tsType`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['tsType']" :placeholder="state.dict['tsType']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tsName" :label="state.dict['tsName']" width="300">
            <template #header>
              <span :class="ifRequired('tsName')?'tp-table-header-required':''">{{ state.dict['tsName'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-tsName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['tsName']" :placeholder="state.dict['tsName']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifIns" :label="state.dict['ifIns']" width="300">
            <template #header>
              <span :class="ifRequired('ifIns')?'tp-table-header-required':''">{{ state.dict['ifIns'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifIns`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['ifIns']" :placeholder="state.dict['ifIns']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifUpd" :label="state.dict['ifUpd']" width="300">
            <template #header>
              <span :class="ifRequired('ifUpd')?'tp-table-header-required':''">{{ state.dict['ifUpd'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifUpd`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['ifUpd']" :placeholder="state.dict['ifUpd']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifSelOne" :label="state.dict['ifSelOne']" width="300">
            <template #header>
              <span :class="ifRequired('ifSelOne')?'tp-table-header-required':''">{{ state.dict['ifSelOne'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifSelOne`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['ifSelOne']" :placeholder="state.dict['ifSelOne']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifSelMore" :label="state.dict['ifSelMore']" width="300">
            <template #header>
              <span :class="ifRequired('ifSelMore')?'tp-table-header-required':''">{{ state.dict['ifSelMore'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifSelMore`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['ifSelMore']" :placeholder="state.dict['ifSelMore']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifRequired" :label="state.dict['ifRequired']" width="300">
            <template #header>
              <span :class="ifRequired('ifRequired')?'tp-table-header-required':''">{{ state.dict['ifRequired'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifRequired`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['ifRequired']" :placeholder="state.dict['ifRequired']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="formType" :label="state.dict['formType']" width="300">
            <template #header>
              <span :class="ifRequired('formType')?'tp-table-header-required':''">{{ state.dict['formType'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-formType`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['formType']" :placeholder="state.dict['formType']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="selType" :label="state.dict['selType']" width="300">
            <template #header>
              <span :class="ifRequired('selType')?'tp-table-header-required':''">{{ state.dict['selType'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-selType`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['selType']" :placeholder="state.dict['selType']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="state.dict['orderNum']" width="300">
            <template #header>
              <span :class="ifRequired('orderNum')?'tp-table-header-required':''">{{ state.dict['orderNum'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index]['orderNum']" :placeholder="state.dict['orderNum']"/>
              </div>
            </template>
          </el-table-column>
          <!--在此上方添加表格列-->
          <el-table-column fixed="right" label="操作" min-width="120">
            <template v-if="state.dialogType.value===final.ins" #default="{$index}">
              <el-button link type="danger" size="small" @click="dfDel($index)">删除</el-button>
            </template>
          </el-table-column>
          <template v-if="state.dialogType.value===final.ins" #append>
            <el-button text type="primary" plain :icon="Plus" @click="dfIns">新增</el-button>
          </template>
        </el-table>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dCan">取消</el-button>
        <el-button type="primary" @click="dCon">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!--顶部筛选表单-->
  <el-form
      class="demo-form-inline"
      v-if="Object.keys(state.filterForm).length>0"
      ref="filterFormRef"
      :model="state.filterForm"
      :inline="true"
      @keyup.enter="fEnter"
  >
    <!--在此下方添加表单项-->
    <el-form-item :label="state.dict['colName']" prop="colName">
      <el-input v-model="state.filterForm['colName']" :placeholder="state.dict['colName']"/>
    </el-form-item>
    <el-form-item :label="state.dict['colDescr']" prop="colDescr">
      <el-input v-model="state.filterForm['colDescr']" :placeholder="state.dict['colDescr']"/>
    </el-form-item>
    <el-form-item :label="state.dict['mysqlType']" prop="mysqlType">
      <el-input v-model="state.filterForm['mysqlType']" :placeholder="state.dict['mysqlType']"/>
    </el-form-item>
    <el-form-item :label="state.dict['tsType']" prop="tsType">
      <el-input v-model="state.filterForm['tsType']" :placeholder="state.dict['tsType']"/>
    </el-form-item>
    <el-form-item :label="state.dict['tsName']" prop="tsName">
      <el-input v-model="state.filterForm['tsName']" :placeholder="state.dict['tsName']"/>
    </el-form-item>
    <el-form-item :label="state.dict['selType']" prop="selType">
      <el-input v-model="state.filterForm['selType']" :placeholder="state.dict['selType']"/>
    </el-form-item>
    <el-form-item :label="state.dict['formType']" prop="formType">
      <el-input v-model="state.filterForm['formType']" :placeholder="state.dict['formType']"/>
    </el-form-item>
    <!--在此上方添加表单项-->
    <el-form-item>
      <el-button type="primary" @click="fCon">筛选</el-button>
      <el-button @click="fCan">重置</el-button>
    </el-form-item>
  </el-form>

  <!--操作按钮-->
  <div>
    <!--<el-button-group>-->
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新列</el-button>
    <el-button type="primary" plain :icon="Plus" @click="gIns">新增列</el-button>
    <el-button type="success" plain :icon="Edit" :disabled="state.multipleSelection.length!==1" @click="gUpd">修改列
    </el-button>
    <el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel()">删除列
    </el-button>
    <!--<el-button type="warning" plain :icon="Download" :disabled="state.multipleSelection.length===0">导出</el-button>-->
    <!--<el-button type="warning" plain :icon="Upload">上传</el-button>-->
    <!--</el-button-group>-->
    <!--<el-button-group>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gMoveUp">上移</el-button>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gMoveDown">下移</el-button>-->
    <!--</el-button-group>-->
    <!--<el-button-group>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledToNo">启用</el-button>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledToYes">禁用</el-button>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledShift">切换</el-button>-->
    <!--</el-button-group>-->
  </div>

  <!--数据表格-->
  <el-table
      style="width: 100%"
      v-loading="tableLoadingRef"
      :data="state.list"
      @selection-change="handleSelectionChange"
  >
    <el-table-column fixed type="selection" width="55"/>
    <!--<el-table-column fixed prop="id" :label="state.dict['id']" width="180"/>-->
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="colName" :label="state.dict['colName']" width="120"/>
    <el-table-column prop="colDescr" :label="state.dict['colDescr']" width="120"/>
    <el-table-column prop="mysqlType" :label="state.dict['mysqlType']" width="120"/>
    <el-table-column prop="tsType" :label="state.dict['tsType']" width="120"/>
    <el-table-column prop="tsName" :label="state.dict['tsName']" width="120"/>
    <el-table-column prop="ifIns" :label="state.dict['ifIns']" width="120"/>
    <el-table-column prop="ifUpd" :label="state.dict['ifUpd']" width="120"/>
    <el-table-column prop="ifSelOne" :label="state.dict['ifSelOne']" width="120"/>
    <el-table-column prop="ifSelMore" :label="state.dict['ifSelMore']" width="120"/>
    <el-table-column prop="ifRequired" :label="state.dict['ifRequired']" width="120"/>
    <el-table-column prop="selType" :label="state.dict['selType']" width="120"/>
    <el-table-column prop="formType" :label="state.dict['formType']" width="120"/>
    <el-table-column prop="orderNum" :label="state.dict['orderNum']" width="120"/>
    <!--在此上方添加表格列-->
    <!--<el-table-column prop="createBy" :label="state.dict['createBy']" width="120"/>-->
    <!--<el-table-column prop="updateBy" :label="state.dict['updateBy']" width="120"/>-->
    <!--<el-table-column prop="createTime" :label="state.dict['createTime']" width="220"/>-->
    <!--<el-table-column prop="updateTime" :label="state.dict['updateTime']" width="220"/>-->
    <!--<el-table-column prop="deleted" :label="state.dict['deleted']" width="60"/>-->
    <!--上方几个酌情使用-->
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{row}">
        <el-button link type="primary" size="small" @click="tUpd(row.id)">修改</el-button>
        <el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>
      </template>
    </el-table-column>
    <template #append>
      <span>此表格的多选<span
          class="underline">不支持</span>{{ `跨分页保存，当前已选 ${state.multipleSelection.length} 条数据。` }}</span>
    </template>
  </el-table>

  <!--分页-->
  <Pagination
      v-if="state.total!==-1"
      :total="Number(state.total)"
      :page-num="state.pageParam.pageNum"
      :page-size="state.pageParam.pageSize"
      @page-change="pageChange"
  />
</template>

<style scoped>

</style>