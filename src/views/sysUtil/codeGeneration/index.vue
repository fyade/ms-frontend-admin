<script lang="ts">
export default {
  name: 'sysUtil:codeGeneration'
}
</script>
<script setup lang="ts">
import { reactive, ref } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.js"
import { State, t_config, t_FuncMap } from "@/type/tablePage.ts";
import type { FormRules } from 'element-plus'
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { MORE, ONE } from "@/type/utils/base.ts";
import {
  codeGenTableDel,
  codeGenTableIns,
  codeGenTableInss,
  codeGenTableSelMore,
  codeGenTableSelOne,
  codeGenTableSelPage,
  codeGenTableUpd,
  codeGenTableUpds,
  genCode,
  genCodeZip,
  getDbInfo
} from "@/api/module/sysUtil/codeGeneration.ts";
import { chooseTableTableIntre } from "@/type/api/sysUtil/codeGeneration.ts";
import SetColumn from "@/views/sysUtil/codeGeneration/setColumn.vue";
import Tooltip from "@/components/tooltip/tooltip.vue";
import DicData from "@/views/sysManage/dict/dicData.vue";

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
    tableName: '',
    tableDescr: '',
    entityName: '',
    tableRemark: '',
    businessName: '',
    moduleName: '',
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
    tableName: [{required: true, trigger: 'change'}],
    tableDescr: [{required: true, trigger: 'change'}],
    entityName: [{required: true, trigger: 'change'}],
    businessName: [{required: true, trigger: 'change'}],
    moduleName: [{required: true, trigger: 'change'}],
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
    tableName: '表名称',
    tableDescr: '表描述',
    entityName: '实体类名',
    tableRemark: '表备注',
    businessName: '生成业务名',
    moduleName: '生成模块名',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    tableName: '',
    tableDescr: '',
    entityName: '',
    tableRemark: '',
    businessName: '',
    moduleName: '',
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
  selectParam: {}, // 查询参数（补充
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
    return codeGenTableSelPage(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return codeGenTableSelOne(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return codeGenTableSelMore(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return codeGenTableIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    return codeGenTableUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: any[]) => {
    return codeGenTableInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: any[]) => {
    return codeGenTableUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return codeGenTableDel(ids)
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
  gExport,
  gImport,
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

const tablesList = ref<chooseTableTableIntre[]>([])
tablesList.value = []
const getDbInfos = () => {
  getDbInfo().then(res => {
    tablesList.value = res
  })
}
getDbInfos()

const tableNameChange = (val: string) => {
  const table = tablesList.value.find(item => item.tableNameEn === val)
  if (table) {
    state.dialogForm['tableDescr'] = table.tableNameCn
  } else {
    state.dialogForm['tableDescr'] = ''
  }
}
const tableNameChange2 = ($index: number) => {
  const table = tablesList.value.find(item => item.tableNameEn === (state.dialogForms as any[])[$index]['tableName'])
  if (table) {
    (state.dialogForms as any[])[$index]['tableDescr'] = table.tableNameCn
  } else {
    (state.dialogForms as any[])[$index]['tableDescr'] = ''
  }
}

const selectTableId = ref<any>()
const selectTableNameEn = ref<any>()
const drawer = ref(false)
const setColumnInfo = (rowid: number) => {
  const row: any = state.list.find((item: any) => item.id === rowid)
  if (!row) {
    return
  }
  selectTableId.value = rowid
  selectTableNameEn.value = row.tableName
  drawer.value = true
}

const dialog3Visible = ref(false)
const codeViewState = reactive({
  fileNames: {},
  filePaths: {},
  codes: {}
})
const activeNameOfCodeView = ref('')
const codeView = (rowId: any) => {
  codeViewState.fileNames = {}
  codeViewState.filePaths = {}
  codeViewState.codes = {}
  genCode(rowId).then(res => {
    Object.keys(codeViewState).forEach(key0 => {
      Object.keys(res.cgRes[key0]).forEach(key1 => {
        codeViewState[key0][key1] = res.cgRes[key0][key1]
      })
    })
    dialog3Visible.value = true
  })
}
const codeViewZip = (rowId: any) => {
  genCodeZip(rowId).then(res => {
  })
}
const copyCode = async (key: string) => {
  const code = codeViewState.codes[key]
  await navigator.clipboard.writeText(code)
  ElMessage.success('复制成功。')
}
const copyFileName = async (key: string) => {
  const code = codeViewState.fileNames[key]
  await navigator.clipboard.writeText(code)
  ElMessage.success('复制成功。')
}

const gRefresh2 = () => {
  getDbInfos()
  gRefresh()
}
</script>

<template>
  <!--代码预览-->
  <el-dialog
      :width="CONFIG.dialog_width_wider"
      v-model="dialog3Visible"
      title="代码预览"
      draggable
      append-to-body
  >
    <el-tabs>
      <el-tab-pane v-for="key in Object.keys(codeViewState.fileNames)" :label="codeViewState.fileNames[key]">
        <div>文件路径：{{ codeViewState.filePaths[key] }}/{{ codeViewState.fileNames[key] }}</div>
        <div>
          <el-divider content-position="left">
            <el-space wrap>
              代码内容⬇
              <el-button text bg @click="copyFileName(key)">复制文件名</el-button>
              <el-button text bg @click="copyCode(key)">复制代码</el-button>
            </el-space>
          </el-divider>
          <pre>{{ codeViewState.codes[key] }}</pre>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>

  <el-dialog
      v-model="drawer"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title="列字段设置"
  >
    <SetColumn
        :table-id="selectTableId"
        :table-name-en="selectTableNameEn"
    />
    <template #footer>
      <el-button plain @click="drawer=false">取消</el-button>
    </template>
  </el-dialog>

  <!--弹框-->
  <el-dialog
      :width="activeTabName===final.more ? CONFIG.dialog_width_wider : CONFIG.dialog_width"
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
            <el-form-item :label="state.dict['tableName']" prop="tableName">
              <!--<el-input v-model="state.dialogForm['tableName']" :placeholder="state.dict['tableName']"/>-->
              <el-select v-model="state.dialogForm['tableName']" :placeholder="state.dict['tableName']" clearable
                         filterable @change="tableNameChange">
                <el-option
                    v-for="item in tablesList"
                    :key="item.tableNameEn"
                    :label="item.tableNameEn"
                    :value="item.tableNameEn"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['tableDescr']" prop="tableDescr">
              <el-input disabled v-model="state.dialogForm['tableDescr']" :placeholder="state.dict['tableDescr']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['entityName']" prop="entityName">
              <el-input v-model="state.dialogForm['entityName']" :placeholder="state.dict['entityName']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['orderNum']" prop="orderNum">
              <el-input-number v-model="state.dialogForm['orderNum']" :placeholder="state.dict['orderNum']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['businessName']" prop="businessName">
              <template #label>
                <Tooltip content="这里需使用小驼峰命名法。">
                  {{ state.dict['businessName'] }}
                </Tooltip>
              </template>
              <el-input v-model="state.dialogForm['businessName']" :placeholder="state.dict['businessName']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['moduleName']" prop="moduleName">
              <template #label>
                <Tooltip content="这里需使用小驼峰命名法。">
                  {{ state.dict['moduleName'] }}
                </Tooltip>
              </template>
              <el-input v-model="state.dialogForm['moduleName']" :placeholder="state.dict['moduleName']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="state.dict['tableRemark']" prop="tableRemark">
              <el-input v-model="state.dialogForm['tableRemark']" :placeholder="state.dict['tableRemark']"/>
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
            :data="state.dialogForms"
            v-if="state.dialogForms"
        >
          <el-table-column type="index" width="50">
            <template #header>
              #
            </template>
          </el-table-column>
          <!--<el-table-column prop="" :label="state.dict['']" width="300">-->
          <!--  <template #header>-->
          <!--    <span :class="ifRequired('')?'tp-table-header-required':''">{{ state.dict[''] }}</span>-->
          <!--  </template>-->
          <!--  <template #default="{$index}">-->
          <!--    <div :class="state.dialogForms_error?.[`${$index}-`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">-->
          <!--      <el-input v-model="state.dialogForms[$index]['']" :placeholder="state.dict['']"/>-->
          <!--    </div>-->
          <!--  </template>-->
          <!--</el-table-column>-->
          <!--在此下方添加表格列-->
          <el-table-column prop="tableName" :label="state.dict['tableName']" width="300">
            <template #header>
              <span :class="ifRequired('tableName')?'tp-table-header-required':''">{{ state.dict['tableName'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-tableName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <!--<el-input v-model="state.dialogForms[$index]['tableName']" :placeholder="state.dict['tableName']"/>-->
                <el-select v-model="state.dialogForms[$index]['tableName']" :placeholder="state.dict['tableName']"
                           clearable filterable @change="tableNameChange2($index)">
                  <el-option
                      v-for="item in tablesList"
                      :key="item.tableNameEn"
                      :label="item.tableNameEn"
                      :value="item.tableNameEn"
                  />
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tableDescr" :label="state.dict['tableDescr']" width="300">
            <template #header>
              <span :class="ifRequired('tableDescr')?'tp-table-header-required':''">{{
                  state.dict['tableDescr']
                }}</span>
            </template>
            <template #default="{$index}">
              <div
                  :class="state.dialogForms_error?.[`${$index}-tableDescr`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input disabled v-model="state.dialogForms[$index]['tableDescr']"
                          :placeholder="state.dict['tableDescr']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="entityName" :label="state.dict['entityName']" width="300">
            <template #header>
              <span :class="ifRequired('entityName')?'tp-table-header-required':''">{{
                  state.dict['entityName']
                }}</span>
            </template>
            <template #default="{$index}">
              <div
                  :class="state.dialogForms_error?.[`${$index}-entityName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['entityName']" :placeholder="state.dict['entityName']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="state.dict['orderNum']" width="200">
            <template #header>
              <span :class="ifRequired('orderNum')?'tp-table-header-required':''">{{ state.dict['orderNum'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index]['orderNum']" :placeholder="state.dict['orderNum']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="businessName" :label="state.dict['businessName']" width="300">
            <template #header>
              <Tooltip content="这里需使用小驼峰命名法。">
                <span :class="ifRequired('businessName')?'tp-table-header-required':''">
                  {{ state.dict['businessName'] }}
                </span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div
                  :class="state.dialogForms_error?.[`${$index}-businessName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['businessName']"
                          :placeholder="state.dict['businessName']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="moduleName" :label="state.dict['moduleName']" width="300">
            <template #header>
              <Tooltip content="这里需使用小驼峰命名法。">
                <span :class="ifRequired('moduleName')?'tp-table-header-required':''">
                  {{ state.dict['moduleName'] }}
                </span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div
                  :class="state.dialogForms_error?.[`${$index}-moduleName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['moduleName']" :placeholder="state.dict['moduleName']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tableRemark" :label="state.dict['tableRemark']" width="300">
            <template #header>
              <span :class="ifRequired('tableRemark')?'tp-table-header-required':''">{{
                  state.dict['tableRemark']
                }}</span>
            </template>
            <template #default="{$index}">
              <div
                  :class="state.dialogForms_error?.[`${$index}-tableRemark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['tableRemark']" :placeholder="state.dict['tableRemark']"/>
              </div>
            </template>
          </el-table-column>
          <!--在此上方添加表格列-->
          <el-table-column fixed="right" label="操作" min-width="200">
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
    <el-form-item :label="state.dict['tableName']" prop="tableName">
      <el-input v-model="state.filterForm['tableName']" :placeholder="state.dict['tableName']"/>
    </el-form-item>
    <el-form-item :label="state.dict['tableDescr']" prop="tableDescr">
      <el-input v-model="state.filterForm['tableDescr']" :placeholder="state.dict['tableDescr']"/>
    </el-form-item>
    <el-form-item :label="state.dict['entityName']" prop="entityName">
      <el-input v-model="state.filterForm['entityName']" :placeholder="state.dict['entityName']"/>
    </el-form-item>
    <el-form-item :label="state.dict['tableRemark']" prop="tableRemark">
      <el-input v-model="state.filterForm['tableRemark']" :placeholder="state.dict['tableRemark']"/>
    </el-form-item>
    <el-form-item :label="state.dict['businessName']" prop="businessName">
      <el-input v-model="state.filterForm['businessName']" :placeholder="state.dict['businessName']"/>
    </el-form-item>
    <el-form-item :label="state.dict['moduleName']" prop="moduleName">
      <el-input v-model="state.filterForm['moduleName']" :placeholder="state.dict['moduleName']"/>
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
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh2">刷新表</el-button>
    <el-button type="primary" plain :icon="Plus" @click="gIns">新增表</el-button>
    <el-button type="success" plain :icon="Edit"
               :disabled="config.bulkOperation?state.multipleSelection.length===0:state.multipleSelection.length!==1"
               @click="gUpd">修改表
    </el-button>
    <el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel()">删除表
    </el-button>
    <el-button type="warning" plain :icon="Download" :disabled="state.multipleSelection.length===0" @click="gExport()">
      导出
    </el-button>
    <el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>
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
      v-loading="tableLoadingRef"
      :data="state.list"
      @selection-change="handleSelectionChange"
  >
    <el-table-column fixed type="selection" width="55"/>
    <!--<el-table-column fixed prop="id" :label="state.dict['id']" width="180"/>-->
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="tableName" :label="state.dict['tableName']" width="200"/>
    <el-table-column prop="tableDescr" :label="state.dict['tableDescr']" width="180"/>
    <el-table-column prop="entityName" :label="state.dict['entityName']" width="180"/>
    <el-table-column prop="orderNum" :label="state.dict['orderNum']" width="120"/>
    <el-table-column prop="businessName" :label="state.dict['businessName']" width="180"/>
    <el-table-column prop="moduleName" :label="state.dict['moduleName']" width="180"/>
    <el-table-column prop="tableRemark" :label="state.dict['tableRemark']" width="150"/>
    <!--在此上方添加表格列-->
    <!--<el-table-column prop="createBy" :label="state.dict['createBy']" width="120"/>-->
    <!--<el-table-column prop="updateBy" :label="state.dict['updateBy']" width="120"/>-->
    <!--<el-table-column prop="createTime" :label="state.dict['createTime']" width="220"/>-->
    <!--<el-table-column prop="updateTime" :label="state.dict['updateTime']" width="220"/>-->
    <!--<el-table-column prop="deleted" :label="state.dict['deleted']" width="60"/>-->
    <!--上方几个酌情使用-->
    <el-table-column fixed="right" label="操作" min-width="200">
      <template #default="{row}">
        <el-button link type="primary" size="small" @click="tUpd(row.id)">修改表</el-button>
        <el-button link type="primary" size="small" @click="setColumnInfo(row.id)">列字段设置</el-button>
        <el-button link type="primary" size="small" @click="codeView(row.id)">代码预览</el-button>
        <!--<el-button link type="primary" size="small" @click="codeViewZip(row.id)">代码生成</el-button>-->
        <el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>
      </template>
    </el-table-column>
    <template #append>
      <div class="el-table-append-box">
        <span>此表格的多选<span
            class="underline">不支持</span>{{ `跨分页保存，当前已选 ${state.multipleSelection.length} 条数据。` }}</span>
      </div>
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