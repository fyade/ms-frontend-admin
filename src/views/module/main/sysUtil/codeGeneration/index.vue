<script lang="ts">
export default {
  name: 'main:sysUtil:codeGeneration'
}
</script>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search, DArrowRight, DocumentCopy } from "@element-plus/icons-vue";
import { CodeGenTableDto, CodeGenTableUpdDto } from "@/type/module/main/sysUtil/codeGenTable.ts";
import { codeGenTableApi } from "@/api/module/main/sysUtil/codeGenTable.ts";
import { codeGenTableDict } from "@/dict/module/main/sysUtil/codeGenTable.ts";
import { ChooseTableTableInterface } from "@/type/module/main/sysUtil/codeGeneration.ts";
import { genCode, genCodeZip, getDbInfo } from "@/api/module/main/sysUtil/codeGeneration.ts";
import Column from "@/views/module/main/sysUtil/codeGeneration/column.vue";
import { SysDto } from "@/type/module/main/sysManage/sys.ts";
import { sysApi } from "@/api/module/main/sysManage/sys.ts";
import { TypeOM } from "@/type/utils/base.ts";

const state = reactive<State2<CodeGenTableDto, CodeGenTableUpdDto>>({
  dialogForm: {
    id: -1,
    tableName: '',
    tableDescr: '',
    entityName: '',
    tableRemark: '',
    businessName: '',
    moduleName: '',
    businessNameCn: '',
    moduleNameCn: '',
    sysId: void 0,
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    sysId: void 0,
    tableName: '',
    tableDescr: '',
    entityName: '',
    tableRemark: '',
    businessName: '',
    moduleName: '',
  },
})
const dFormRules: FormRules = {
  tableName: [{required: true, trigger: 'change'}],
  tableDescr: [{required: true, trigger: 'change'}],
  entityName: [{required: true, trigger: 'change'}],
  moduleName: [{required: true, trigger: 'change'}],
  moduleNameCn: [{required: true, trigger: 'change'}],
  sysId: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true,
  changeActiveTabNameCallback: newVal => {
    changeActiveTabName(newVal)
  },
  activeTabMoreInsCallback: () => {
    activeTabMoreIns()
  },
  activeTabMoreDelCallback: index => {
    activeTabMoreDel(index)
  },
  selectListCallback: () => {
    getAllSyss()
  }
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
} = funcTablePage<CodeGenTableDto, CodeGenTableUpdDto>({
  state,
  dFormRules,
  config,
  api: codeGenTableApi,
  dict: codeGenTableDict,
})

const allSyss = ref<SysDto[]>([])
const getAllSyss = () => {
  allSyss.value = []
  sysApi.selectAll({}).then(res => {
    allSyss.value = res
  })
}

const tablesList = ref<ChooseTableTableInterface[]>([])
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
    state.dialogForm.tableDescr = table.tableNameCn
  } else {
    state.dialogForm.tableDescr = ''
  }
}
const tableNameChange2 = ($index: number) => {
  const table = tablesList.value.find(item => item.tableNameEn === state.dialogForms![$index].tableName)
  if (table) {
    state.dialogForms![$index].tableDescr = table.tableNameCn
  } else {
    state.dialogForms![$index].tableDescr = ''
  }
}

const selectTableId = ref<number>(-1)
const selectTableNameEn = ref<string>('')
const drawer = ref(false)
const setColumnInfo = (rowid: number) => {
  const row = tableData.value.find(item => item.id === rowid)
  if (!row) {
    return
  }
  selectTableId.value = rowid
  selectTableNameEn.value = row.tableName
  drawer.value = true
}

const dialog3Visible = ref(false)

interface CodeView {
  fileName: string
  filePath: string
  canCopy: boolean
  code: string
}

const codeViewState = ref<CodeView[]>([])
const activeNameOfCodeView = ref('')
const codeView = (rowId: number) => {
  codeViewState.value = []
  genCode(rowId).then(res => {
    for (const key0 in codeViewState) {
      if (res.cgRes) {
        codeViewState.value = res.cgRes
      }
    }
    dialog3Visible.value = true
  })
}
const codeViewZip = (rowId: number) => {
  genCodeZip(rowId).then(res => {
  })
}
const copyCode = async (index: number) => {
  const code = codeViewState.value[index].code
  await navigator.clipboard.writeText(code)
  ElMessage.success('复制成功。')
}
const copyFileName = async (index: number) => {
  const code = codeViewState.value[index].fileName
  await navigator.clipboard.writeText(code)
  ElMessage.success('复制成功。')
}

const gRefresh2 = () => {
  getDbInfos()
  gRefresh()
}

const A = 'a', B = 'b'
type AB = 'a' | 'b'
const dialogFormTableNameType = ref<AB>(A)
const dialogFormTableNameTypes = ref<AB[]>([A])
const changeActiveTabName = (newVal: TypeOM) => {
  if (newVal === final.one) {
    dialogFormTableNameType.value = A
  } else if (newVal === final.more) {
  }
}
const activeTabMoreIns = () => {
  dialogFormTableNameTypes.value.push(A)
}
const activeTabMoreDel = (index: number) => {
  dialogFormTableNameTypes.value.splice(index, 1)
}

const gUpd2 = () => {
  dialogFormTableNameTypes.value = []
  for (let i = 0; i < multipleSelection.value.length; i++) {
    dialogFormTableNameTypes.value.push(A)
  }
  gUpd()
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
      <el-tab-pane v-for="(item, index) in codeViewState" :key="index" :label="item.fileName">
        <div>文件路径：{{ item.filePath }}/{{ item.fileName }}</div>
        <div>
          <el-divider content-position="left">
            <el-space wrap>
              文件路径⬆
              <el-button v-if="item.canCopy" text bg :icon="DocumentCopy" @click="copyFileName(index)">复制文件名</el-button>
              代码内容⬇
              <el-button v-if="item.canCopy" text bg :icon="DocumentCopy" @click="copyCode(index)">复制代码</el-button>
            </el-space>
          </el-divider>
          <pre>{{ item.code }}</pre>
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
    <Column
        :table-id="selectTableId"
        :table-name-en="selectTableNameEn"
    />
    <template #footer>
      <el-button plain @click="drawer=false">取消</el-button>
    </template>
  </el-dialog>

  <!--弹窗-->
  <el-dialog
      :width="activeTabName===final.more ? CONFIG.dialog_width_wider : CONFIG.dialog_width"
      v-model="dialogVisible"
      :title="dialogType.label"
      draggable
      append-to-body
  >
    <el-tabs v-if="config.bulkOperation" v-model="activeTabName">
      <el-tab-pane :disabled="dialogType.value===final.upd" label="操作单个" :name="final.one"></el-tab-pane>
      <el-tab-pane :disabled="dialogType.value===final.upd" label="操作多个" :name="final.more"></el-tab-pane>
    </el-tabs>
    <template v-if="activeTabName===final.one">
      <el-form
          ref="dialogFormRef"
          v-loading="dialogLoadingRef"
          :model="state.dialogForm"
          :label-width="CONFIG.dialog_form_label_width"
          :rules="dFormRules"
      >
        <!--<el-row>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--</el-row>-->
        <el-form-item v-if="dialogType.value!==final.ins" :label="codeGenTableDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--
        第一个input添加如下属性
        v-focus
        -->
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="24">
            <el-form-item :label="codeGenTableDict.sysId" prop="sysId">
              <el-select v-model="state.dialogForm.sysId" :placeholder="codeGenTableDict.sysId" clearable filterable>
                <el-option v-for="item in allSyss" :key="item.id" :value="item.id" :label="item.name"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="表选择方式">
              <el-radio-group v-model="dialogFormTableNameType">
                <el-radio :value="A">从数据库中选择表</el-radio>
                <el-radio :value="B">自定义表</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="codeGenTableDict.tableName" prop="tableName">
              <template v-if="dialogFormTableNameType===A">
                <el-select
                    v-model="state.dialogForm.tableName"
                    :placeholder="codeGenTableDict.tableName"
                    clearable
                    filterable
                    @change="tableNameChange"
                >
                  <el-option
                      v-for="item in tablesList"
                      :key="item.tableNameEn"
                      :label="item.tableNameEn"
                      :value="item.tableNameEn"
                  />
                </el-select>
              </template>
              <template v-else-if="dialogFormTableNameType===B">
                <el-input v-model="state.dialogForm.tableName" :placeholder="codeGenTableDict.tableName"/>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="codeGenTableDict.tableDescr" prop="tableDescr">
              <template v-if="dialogFormTableNameType===A">
                <el-input disabled v-model="state.dialogForm.tableDescr" :placeholder="codeGenTableDict.tableDescr"/>
              </template>
              <template v-else-if="dialogFormTableNameType===B">
                <el-input v-model="state.dialogForm.tableDescr" :placeholder="codeGenTableDict.tableDescr"/>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="codeGenTableDict.entityName" prop="entityName">
              <el-input v-model="state.dialogForm.entityName" :placeholder="codeGenTableDict.entityName"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="codeGenTableDict.orderNum" prop="orderNum">
              <el-input-number v-model="state.dialogForm.orderNum" :placeholder="codeGenTableDict.orderNum"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="codeGenTableDict.businessName" prop="businessName">
              <template #label>
                <Tooltip content="这里需使用小驼峰命名法。">
                  {{ codeGenTableDict.businessName }}
                </Tooltip>
              </template>
              <el-input v-model="state.dialogForm.businessName" :placeholder="codeGenTableDict.businessName"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="codeGenTableDict.moduleName" prop="moduleName">
              <template #label>
                <Tooltip content="这里需使用小驼峰命名法。">
                  {{ codeGenTableDict.moduleName }}
                </Tooltip>
              </template>
              <el-input v-model="state.dialogForm.moduleName" :placeholder="codeGenTableDict.moduleName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="codeGenTableDict.businessNameCn" prop="businessNameCn">
              <el-input v-model="state.dialogForm.businessNameCn" :placeholder="codeGenTableDict.businessNameCn"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="codeGenTableDict.moduleNameCn" prop="moduleNameCn">
              <el-input v-model="state.dialogForm.moduleNameCn" :placeholder="codeGenTableDict.moduleNameCn"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="codeGenTableDict.tableRemark" prop="tableRemark">
              <el-input type="textarea" v-model="state.dialogForm.tableRemark" :placeholder="codeGenTableDict.tableRemark"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--在此上方添加表单项-->
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
          <!--在此下方添加表格列-->
          <el-table-column prop="sysId" :label="codeGenTableDict.sysId" width="300">
            <template #header>
              <span :class="ifRequired('sysId')?'tp-table-header-required':''">{{ codeGenTableDict.sysId }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-sysId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-form-item :label="codeGenTableDict.sysId" prop="sysId">
                  <el-select v-model="state.dialogForms[$index].sysId" :placeholder="codeGenTableDict.sysId" clearable filterable>
                    <el-option v-for="item in allSyss" :key="item.id" :value="item.id" :label="item.name"/>
                  </el-select>
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="表选择方式" width="300">
            <template #default="{$index}">
              <div>
                <el-radio-group v-model="dialogFormTableNameTypes[$index]">
                  <el-radio :value="A">从数据库中选择表</el-radio>
                  <el-radio :value="B">自定义表</el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tableName" :label="codeGenTableDict.tableName" width="300">
            <template #header>
              <span :class="ifRequired('tableName')?'tp-table-header-required':''">{{ codeGenTableDict.tableName }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-tableName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <template v-if="dialogFormTableNameTypes[$index]===A">
                  <el-select
                      v-model="state.dialogForms[$index].tableName"
                      :placeholder="codeGenTableDict.tableName"
                      clearable
                      filterable
                      @change="tableNameChange2($index)"
                  >
                    <el-option
                        v-for="item in tablesList"
                        :key="item.tableNameEn"
                        :label="item.tableNameEn"
                        :value="item.tableNameEn"
                    />
                  </el-select>
                </template>
                <template v-else-if="dialogFormTableNameTypes[$index]===B">
                  <el-input v-model="state.dialogForms[$index].tableName" :placeholder="codeGenTableDict.tableName"/>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tableDescr" :label="codeGenTableDict.tableDescr" width="300">
            <template #header>
              <span :class="ifRequired('tableDescr')?'tp-table-header-required':''">{{ codeGenTableDict.tableDescr }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-tableDescr`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <template v-if="dialogFormTableNameTypes[$index]===A">
                  <el-input disabled v-model="state.dialogForms[$index].tableDescr" :placeholder="codeGenTableDict.tableDescr"/>
                </template>
                <template v-else-if="dialogFormTableNameTypes[$index]===B">
                  <el-input v-model="state.dialogForms[$index].tableDescr" :placeholder="codeGenTableDict.tableDescr"/>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="entityName" :label="codeGenTableDict.entityName" width="300">
            <template #header>
              <span :class="ifRequired('entityName')?'tp-table-header-required':''">{{ codeGenTableDict.entityName }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-entityName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].entityName" :placeholder="codeGenTableDict.entityName"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="codeGenTableDict.orderNum" width="200">
            <template #header>
              <span :class="ifRequired('orderNum')?'tp-table-header-required':''">{{ codeGenTableDict.orderNum }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].orderNum" :placeholder="codeGenTableDict.orderNum"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="businessName" :label="codeGenTableDict.businessName" width="300">
            <template #header>
              <Tooltip content="这里需使用小驼峰命名法。">
                <span :class="ifRequired('businessName')?'tp-table-header-required':''">
                  {{ codeGenTableDict.businessName }}
                </span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-businessName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].businessName" :placeholder="codeGenTableDict.businessName"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="moduleName" :label="codeGenTableDict.moduleName" width="300">
            <template #header>
              <Tooltip content="这里需使用小驼峰命名法。">
                <span :class="ifRequired('moduleName')?'tp-table-header-required':''">
                  {{ codeGenTableDict.moduleName }}
                </span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-moduleName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].moduleName" :placeholder="codeGenTableDict.moduleName"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="businessNameCn" :label="codeGenTableDict.businessNameCn" width="300">
            <template #header>
              <Tooltip content="这里需使用小驼峰命名法。">
                <span :class="ifRequired('businessNameCn')?'tp-table-header-required':''">
                  {{ codeGenTableDict.businessNameCn }}
                </span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-businessNameCn`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].businessNameCn" :placeholder="codeGenTableDict.businessNameCn"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="moduleNameCn" :label="codeGenTableDict.moduleNameCn" width="300">
            <template #header>
              <Tooltip content="这里需使用小驼峰命名法。">
                <span :class="ifRequired('moduleNameCn')?'tp-table-header-required':''">
                  {{ codeGenTableDict.moduleNameCn }}
                </span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-moduleNameCn`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].moduleNameCn" :placeholder="codeGenTableDict.moduleNameCn"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tableRemark" :label="codeGenTableDict.tableRemark" width="300">
            <template #header>
              <span :class="ifRequired('tableRemark')?'tp-table-header-required':''">{{ codeGenTableDict.tableRemark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-tableRemark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].tableRemark" :placeholder="codeGenTableDict.tableRemark"/>
              </div>
            </template>
          </el-table-column>
          <!--在此上方添加表格列-->
          <el-table-column fixed="right" label="操作" min-width="120">
            <template v-if="dialogType.value===final.ins" #default="{$index}">
              <el-button link type="danger" size="small" :icon="Delete" @click="dfDel($index)">删除</el-button>
            </template>
          </el-table-column>
          <template v-if="dialogType.value===final.ins" #append>
            <el-button text type="primary" plain :icon="Plus" @click="dfIns">新增</el-button>
          </template>
        </el-table>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="dialogButtonLoadingRef" @click="dCan">取消</el-button>
        <el-button type="primary" :disabled="dialogButtonLoadingRef" @click="dCon">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!--顶部筛选表单-->
  <div class="zs-filter-form" v-show="filterFormVisible1 && filterFormVisible">
    <el-form
        class="demo-form-inline"
        ref="filterFormRef"
        :model="state.filterForm"
        :inline="true"
        @keyup.enter="fEnter"
        @submit.prevent
    >
      <!--在此下方添加表单项-->
      <el-form-item :label="codeGenTableDict.sysId" prop="sysId">
        <el-select v-model="state.filterForm.sysId" :placeholder="codeGenTableDict.sysId" clearable filterable>
          <el-option v-for="item in allSyss" :key="item.id" :value="item.id" :label="item.name"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="codeGenTableDict.tableName" prop="tableName">
        <el-input v-model="state.filterForm.tableName" :placeholder="codeGenTableDict.tableName"/>
      </el-form-item>
      <el-form-item :label="codeGenTableDict.tableDescr" prop="tableDescr">
        <el-input v-model="state.filterForm.tableDescr" :placeholder="codeGenTableDict.tableDescr"/>
      </el-form-item>
      <el-form-item :label="codeGenTableDict.entityName" prop="entityName">
        <el-input v-model="state.filterForm.entityName" :placeholder="codeGenTableDict.entityName"/>
      </el-form-item>
      <el-form-item :label="codeGenTableDict.tableRemark" prop="tableRemark">
        <el-input v-model="state.filterForm.tableRemark" :placeholder="codeGenTableDict.tableRemark"/>
      </el-form-item>
      <el-form-item :label="codeGenTableDict.businessName" prop="businessName">
        <el-input v-model="state.filterForm.businessName" :placeholder="codeGenTableDict.businessName"/>
      </el-form-item>
      <el-form-item :label="codeGenTableDict.moduleName" prop="moduleName">
        <el-input v-model="state.filterForm.moduleName" :placeholder="codeGenTableDict.moduleName"/>
      </el-form-item>
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
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh2">刷新表</el-button>
      <el-button type="primary" plain :icon="Plus" @click="gIns">新增表</el-button>
      <el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd2">修改表</el-button>
      <el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除表</el-button>
      <el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>
      <el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>
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
      <!--<el-table-column fixed prop="id" :label="codeGenTableDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="tableName" :label="codeGenTableDict.tableName" width="240"/>
      <el-table-column prop="tableDescr" :label="codeGenTableDict.tableDescr" width="180"/>
      <el-table-column prop="entityName" :label="codeGenTableDict.entityName" width="180"/>
      <el-table-column prop="orderNum" :label="codeGenTableDict.orderNum" width="120"/>
      <el-table-column prop="businessName" :label="codeGenTableDict.businessName" width="180"/>
      <el-table-column prop="moduleName" :label="codeGenTableDict.moduleName" width="180"/>
      <el-table-column prop="businessNameCn" :label="codeGenTableDict.businessNameCn" width="180"/>
      <el-table-column prop="moduleNameCn" :label="codeGenTableDict.moduleNameCn" width="180"/>
      <el-table-column prop="tableRemark" :label="codeGenTableDict.tableRemark" width="150"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="codeGenTableDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="codeGenTableDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="codeGenTableDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="codeGenTableDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="codeGenTableDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <el-table-column fixed="right" label="操作" min-width="140">
        <template #default="{row}">
          <div class="zs-table-data-operate-button-row">
            <el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改表</el-button>
            <!--<el-button link type="primary" size="small" @click="codeViewZip(row.id)">代码生成</el-button>-->
            <el-button link type="danger" size="small" :icon="Delete" @click="tDel(row.id)">删除</el-button>
            <el-dropdown>
              <el-button link type="primary" size="small" :icon="DArrowRight">更多</el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item><el-button link type="info" size="small" :icon="Edit" @click="setColumnInfo(row.id)">列字段设置</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button link type="info" size="small" :icon="Edit" @click="codeView(row.id)">代码预览</el-button></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
