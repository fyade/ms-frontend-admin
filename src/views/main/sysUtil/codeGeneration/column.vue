<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import { CONFIG, final, publicDict, PublicDictInterface } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { CodeGenColumnDto, CodeGenColumnUpdDto } from "@/type/module/main/sysUtil/codeGenColumn.ts";
import { codeGenColumnApi } from "@/api/module/main/sysUtil/codeGenColumn.ts";
import { codeGenColumnDict } from "@/dict/module/main/sysUtil/codeGenColumn.ts";
import { ChooseTableTableColInterface, ChooseTableTableColInterfaceDict, ChooseTableTableInterface } from "@/type/module/main/sysUtil/codeGeneration.ts";
import { getDbInfo } from "@/api/module/main/sysUtil/codeGeneration.ts";
import { deepClone } from "@/utils/ObjectUtils.ts";
import { toCamelCase } from "@/utils/baseUtils.ts";
import { TypeOM } from "@/type/utils/base.ts";

const props = defineProps({
  tableId: {
    require: true,
    type: Number
  },
  tableNameEn: {
    require: true,
    type: String
  }
})

const state = reactive<State2<CodeGenColumnDto, CodeGenColumnUpdDto>>({
  dialogForm: {
    id: -1,
    tableId: props.tableId as number,
    colName: '',
    colDescr: '',
    mysqlType: '',
    tsType: '',
    tsName: '',
    ifIns: final.N,
    ifUpd: final.N,
    ifSelOne: final.N,
    ifSelMore: final.N,
    ifRequired: final.N,
    selType: '',
    formType: '',
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    colName: '',
    colDescr: '',
    mysqlType: '',
    tsType: '',
    tsName: '',
    formType: '',
    selType: '',
  },
})
const dFormRules: FormRules = {
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
}
const config = new TablePageConfig({
  bulkOperation: true,
  selectParam: {
    tableId: props.tableId
  },
  pageQuery: false,
  changeActiveTabNameCallback: newVal => {
    changeActiveTabName(newVal)
  },
  activeTabMoreInsCallback: () => {
    activeTabMoreIns()
  },
  activeTabMoreDelCallback: index => {
    activeTabMoreDel(index)
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
} = funcTablePage<CodeGenColumnDto, CodeGenColumnUpdDto>({
  state,
  dFormRules,
  config,
  api: codeGenColumnApi,
  dict: codeGenColumnDict,
})

const tsTypeDicts = [
  {label: 'string', value: 'string'},
  {label: 'number', value: 'number'},
]
const formTypeDicts = [
  {label: '文本框', value: 'input'},
  {label: '文本框-数字', value: 'inputNumber'},
  {label: '文本域', value: 'textarea'},
  {label: '单选框（是与否）', value: 'radio'},
  // {label: '复选框', value: 'checkbox'},
]
const selTypeDicts = [
  {label: '=', value: 'equals'},
  {label: '%=%', value: 'like'},
]

const tablesList = ref<ChooseTableTableInterface[]>([])
tablesList.value = []
getDbInfo().then(res => {
  tablesList.value = res
})

const dialog2Visible = ref(false)
const tableCols = ref<ChooseTableTableColInterface[]>([])
const tableColsDict = ChooseTableTableColInterfaceDict
const multipleSelection1 = ref<ChooseTableTableColInterface[]>([])
const adict = {
  ...publicDict
}

interface AdictInterface extends PublicDictInterface {
}

const selCol = () => {
  const selectTable = tablesList.value.find(item => item.tableNameEn === props.tableNameEn)
  if (selectTable) {
    tableCols.value = selectTable.cols
  } else {
    tableCols.value = []
  }
  dialog2Visible.value = true
}
const d1Can = () => {
  dialog2Visible.value = false
}
const ifInsIgnoreKeys = ['id', 'create_by', 'update_by', 'create_time', 'update_time', 'deleted']
const ifUpdIgnoreKeys = ['id', 'create_by', 'update_by', 'create_time', 'update_time', 'deleted']
const ifSelOneIgnoreKeys = ['id', 'create_by', 'update_by', 'create_time', 'update_time', 'deleted']
const ifSelMoreIgnoreKeys = ['id', 'create_by', 'update_by', 'create_time', 'update_time', 'deleted']
const ifRequiredIgnoreKeys = ['id', 'remark', 'create_by', 'update_by', 'create_time', 'update_time', 'deleted']
const d1Con = () => {
  if (multipleSelection1.value.length > 1) {
    activeTabName.value = final.more
  }
  if (activeTabName.value === final.more) {
    state.dialogForms = []
    multipleSelection1.value.forEach((row, rowIndex) => {
      const obj = deepClone<CodeGenColumnDto>(toRaw(state.dialogForm))
      obj.colName = row.colName
      obj.colDescr = adict[toCamelCase<keyof AdictInterface>(row.colName)] || ''
      obj.mysqlType = row.colType
      obj.tsType = (['Int'].indexOf(row.colType) > -1 ? tsTypeDicts.find(item => item.value === 'number')?.value : tsTypeDicts.find(item => item.value !== 'number')?.value) || ''
      obj.tsName = toCamelCase(row.colName)
      obj.ifIns = ifInsIgnoreKeys.includes(row.colName) ? final.N : final.Y
      obj.ifUpd = ifUpdIgnoreKeys.includes(row.colName) ? final.N : final.Y
      obj.ifSelOne = ifSelOneIgnoreKeys.includes(row.colName) ? final.N : final.Y
      obj.ifSelMore = ifSelMoreIgnoreKeys.includes(row.colName) ? final.N : final.Y
      obj.ifRequired = ifRequiredIgnoreKeys.includes(row.colName) ? final.N : row.ifMust ? final.Y : final.N
      obj.formType = formTypeDicts.find(item => item.value === 'input')?.value || ''
      obj.selType = selTypeDicts.find(item => item.value === 'like')?.value || ''
      if (state.dialogForms) {
        state.dialogForms.push(obj)
      }
      dialogFormTableNameTypes.value[rowIndex] = A
    })
  }
  if (activeTabName.value === final.one) {
    const row = deepClone<ChooseTableTableColInterface>(toRaw(multipleSelection1.value[0]))
    state.dialogForm.colName = row.colName
    state.dialogForm.colDescr = adict[toCamelCase<keyof AdictInterface>(row.colName)] || ''
    state.dialogForm.mysqlType = row.colType
    state.dialogForm.tsType = (['Int'].indexOf(row.colType) > -1 ? tsTypeDicts.find(item => item.value === 'number')?.value : tsTypeDicts.find(item => item.value !== 'number')?.value) as string
    state.dialogForm.tsName = toCamelCase(row.colName)
    state.dialogForm.ifIns = final.Y
    state.dialogForm.ifUpd = final.Y
    state.dialogForm.ifSelOne = final.Y
    state.dialogForm.ifSelMore = final.Y
    state.dialogForm.ifRequired = row.ifMust ? final.Y : final.N
    state.dialogForm.formType = formTypeDicts.find(item => item.value === 'input')?.value as string
    state.dialogForm.selType = selTypeDicts.find(item => item.value === 'like')?.value as string
  }
  dialog2Visible.value = false
}
const handleSelectionChange1 = (val: ChooseTableTableColInterface[]) => {
  multipleSelection1.value = val
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
  <!--弹窗-->
  <el-dialog
      :width="CONFIG.dialog_width_wider"
      v-model="dialog2Visible"
      title="选择列"
      draggable
      append-to-body
  >
    <el-table :data="tableCols" @selection-change="handleSelectionChange1">
      <el-table-column fixed type="selection" width="55"/>
      <el-table-column prop="colName" :label="tableColsDict.colName" width="180"/>
      <el-table-column prop="colType" :label="tableColsDict.colType" width="180"/>
      <el-table-column prop="ifMust" :label="tableColsDict.ifMust" width="180"/>
      <el-table-column prop="colRemark" :label="tableColsDict.colRemark" width="360"/>
      <el-table-column prop="colInfo" :label="tableColsDict.colInfo" width="360"/>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="d1Can">取消</el-button>
        <el-button type="primary" @click="d1Con">确认</el-button>
      </span>
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
        <el-form-item v-if="dialogType.value!==final.ins" :label="codeGenColumnDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--
        第一个input添加如下属性
        v-focus
        -->
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="列选择方式">
              <el-radio-group v-model="dialogFormTableNameType">
                <el-radio :value="A">从数据库中选择列</el-radio>
                <el-radio :value="B">自定义列</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="codeGenColumnDict.colName" prop="colName">
              <template v-if="dialogFormTableNameType===A">
                <el-input disabled v-model="state.dialogForm.colName" :placeholder="codeGenColumnDict.colName">
                  <template #append>
                    <el-button @click="selCol">选择</el-button>
                  </template>
                </el-input>
              </template>
              <template v-else-if="dialogFormTableNameType===B">
                <el-input v-model="state.dialogForm.colName" :placeholder="codeGenColumnDict.colName"/>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="codeGenColumnDict.colDescr" prop="colDescr">
              <el-input v-model="state.dialogForm.colDescr" :placeholder="codeGenColumnDict.colDescr"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="codeGenColumnDict.mysqlType" prop="mysqlType">
              <template v-if="dialogFormTableNameType===A">
                <el-input disabled v-model="state.dialogForm.mysqlType" :placeholder="codeGenColumnDict.mysqlType"/>
              </template>
              <template v-else-if="dialogFormTableNameType===B">
                <el-input v-model="state.dialogForm.mysqlType" :placeholder="codeGenColumnDict.mysqlType"/>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="codeGenColumnDict.tsType" prop="tsType">
              <el-select v-model="state.dialogForm.tsType" :placeholder="codeGenColumnDict.tsType" clearable filterable>
                <el-option v-for="item in tsTypeDicts" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="codeGenColumnDict.tsName" prop="tsName">
              <el-input v-model="state.dialogForm.tsName" :placeholder="codeGenColumnDict.tsName"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="codeGenColumnDict.ifIns" prop="ifIns">
              <template #label>
                <Tooltip content="若选是，则在[新增及修改表单]中会显示">
                  {{ codeGenColumnDict.ifIns }}
                </Tooltip>
              </template>
              <el-radio-group v-model="state.dialogForm.ifIns">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="codeGenColumnDict.ifUpd" prop="ifUpd">
              <template #label>
                <Tooltip content="若选是，则在[]中会显示">
                  {{ codeGenColumnDict.ifUpd }}
                </Tooltip>
              </template>
              <el-radio-group v-model="state.dialogForm.ifUpd">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="codeGenColumnDict.ifSelOne" prop="ifSelOne">
              <template #label>
                <Tooltip content="若选是，则在[]中会显示">
                  {{ codeGenColumnDict.ifSelOne }}
                </Tooltip>
              </template>
              <el-radio-group v-model="state.dialogForm.ifSelOne">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="codeGenColumnDict.ifSelMore" prop="ifSelMore">
              <template #label>
                <Tooltip content="若选是，则在[筛选表单]中会显示">
                  {{ codeGenColumnDict.ifSelMore }}
                </Tooltip>
              </template>
              <el-radio-group v-model="state.dialogForm.ifSelMore">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="codeGenColumnDict.ifRequired" prop="ifRequired">
              <template #label>
                <Tooltip content="若选是，则在[新增及修改表单]中会有必填校验">
                  {{ codeGenColumnDict.ifRequired }}
                </Tooltip>
              </template>
              <el-radio-group v-model="state.dialogForm.ifRequired">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="codeGenColumnDict.formType" prop="formType">
              <el-select v-model="state.dialogForm.formType" :placeholder="codeGenColumnDict.formType" clearable filterable>
                <el-option v-for="item in formTypeDicts" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="codeGenColumnDict.selType" prop="selType">
              <el-select v-model="state.dialogForm.selType" :placeholder="codeGenColumnDict.selType" clearable filterable>
                <el-option v-for="item in selTypeDicts" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="codeGenColumnDict.orderNum" prop="orderNum">
              <el-input-number v-model="state.dialogForm.orderNum" :placeholder="codeGenColumnDict.orderNum"/>
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
          <el-table-column fixed type="index" width="50">
            <template #header>
              #
            </template>
          </el-table-column>
          <!--在此下方添加表格列-->
          <el-table-column fixed label="列选择方式" width="200">
            <template #default="{$index}">
              <div>
                <el-radio-group v-model="dialogFormTableNameTypes[$index]">
                  <el-radio :value="A">从数据库中选择列</el-radio>
                  <el-radio :value="B">自定义列</el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed prop="colName" :label="codeGenColumnDict.colName" width="200">
            <template #header>
              <span :class="ifRequired('colName')?'tp-table-header-required':''">{{ codeGenColumnDict.colName }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-colName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <template v-if="dialogFormTableNameTypes[$index]===A">
                  <el-input disabled v-model="state.dialogForms[$index].colName" :placeholder="codeGenColumnDict.colName">
                    <template #append>
                      <el-button @click="selCol">选择</el-button>
                    </template>
                  </el-input>
                </template>
                <template v-else-if="dialogFormTableNameTypes[$index]===B">
                  <el-input v-model="state.dialogForms[$index].colName" :placeholder="codeGenColumnDict.colName"/>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed prop="colDescr" :label="codeGenColumnDict.colDescr" width="200">
            <template #header>
              <span :class="ifRequired('colDescr')?'tp-table-header-required':''">{{ codeGenColumnDict.colDescr }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-colDescr`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].colDescr" :placeholder="codeGenColumnDict.colDescr"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="mysqlType" :label="codeGenColumnDict.mysqlType" width="200">
            <template #header>
              <span :class="ifRequired('mysqlType')?'tp-table-header-required':''">{{ codeGenColumnDict.mysqlType }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-mysqlType`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <template v-if="dialogFormTableNameTypes[$index]===A">
                  <el-input disabled v-model="state.dialogForms[$index].mysqlType" :placeholder="codeGenColumnDict.mysqlType"/>
                </template>
                <template v-else-if="dialogFormTableNameTypes[$index]===B">
                  <el-input v-model="state.dialogForms[$index].mysqlType" :placeholder="codeGenColumnDict.mysqlType"/>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tsType" :label="codeGenColumnDict.tsType" width="200">
            <template #header>
              <span :class="ifRequired('tsType')?'tp-table-header-required':''">{{ codeGenColumnDict.tsType }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-tsType`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-select v-model="state.dialogForms[$index].tsType" :placeholder="codeGenColumnDict.tsType" clearable filterable>
                  <el-option v-for="item in tsTypeDicts" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tsName" :label="codeGenColumnDict.tsName" width="200">
            <template #header>
              <span :class="ifRequired('tsName')?'tp-table-header-required':''">{{ codeGenColumnDict.tsName }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-tsName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].tsName" :placeholder="codeGenColumnDict.tsName"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifIns" :label="codeGenColumnDict.ifIns" width="90">
            <template #header>
              <Tooltip content="若选是，则在[新增及修改表单]中会显示">
                <span :class="ifRequired('ifIns')?'tp-table-header-required':''">{{ codeGenColumnDict.ifIns }}</span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifIns`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifIns" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifUpd" :label="codeGenColumnDict.ifUpd" width="90">
            <template #header>
              <Tooltip content="若选是，则在[]中会显示">
                <span :class="ifRequired('ifUpd')?'tp-table-header-required':''">{{ codeGenColumnDict.ifUpd }}</span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifUpd`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifUpd" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifSelOne" :label="codeGenColumnDict.ifSelOne" width="90">
            <template #header>
              <Tooltip content="若选是，则在[]中会显示">
                <span :class="ifRequired('ifSelOne')?'tp-table-header-required':''">{{ codeGenColumnDict.ifSelOne }}</span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifSelOne`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifSelOne" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifSelMore" :label="codeGenColumnDict.ifSelMore" width="90">
            <template #header>
              <Tooltip content="若选是，则在[筛选表单]中会显示">
                <span :class="ifRequired('ifSelMore')?'tp-table-header-required':''">
                  {{ codeGenColumnDict.ifSelMore }}
                </span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifSelMore`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifSelMore" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifRequired" :label="codeGenColumnDict.ifRequired" width="90">
            <template #header>
              <Tooltip content="若选是，则在[新增及修改表单]中会有必填校验">
              <span :class="ifRequired('ifRequired')?'tp-table-header-required':''">
                {{ codeGenColumnDict.ifRequired }}
              </span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifRequired`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifRequired" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="formType" :label="codeGenColumnDict.formType" width="200">
            <template #header>
              <span :class="ifRequired('formType')?'tp-table-header-required':''">{{ codeGenColumnDict.formType }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-formType`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-select v-model="state.dialogForms[$index].formType" :placeholder="codeGenColumnDict.formType" clearable filterable>
                  <el-option v-for="item in formTypeDicts" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="selType" :label="codeGenColumnDict.selType" width="200">
            <template #header>
              <span :class="ifRequired('selType')?'tp-table-header-required':''">{{ codeGenColumnDict.selType }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-selType`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-select v-model="state.dialogForms[$index].selType" :placeholder="codeGenColumnDict.selType" clearable filterable>
                  <el-option v-for="item in selTypeDicts" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="codeGenColumnDict.orderNum" width="200">
            <template #header>
              <span :class="ifRequired('orderNum')?'tp-table-header-required':''">{{ codeGenColumnDict.orderNum }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].orderNum" :placeholder="codeGenColumnDict.orderNum"/>
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
      <el-form-item :label="codeGenColumnDict.colName" prop="colName">
        <el-input v-model="state.filterForm.colName" :placeholder="codeGenColumnDict.colName"/>
      </el-form-item>
      <el-form-item :label="codeGenColumnDict.colDescr" prop="colDescr">
        <el-input v-model="state.filterForm.colDescr" :placeholder="codeGenColumnDict.colDescr"/>
      </el-form-item>
      <el-form-item :label="codeGenColumnDict.mysqlType" prop="mysqlType">
        <el-input v-model="state.filterForm.mysqlType" :placeholder="codeGenColumnDict.mysqlType"/>
      </el-form-item>
      <el-form-item :label="codeGenColumnDict.tsType" prop="tsType">
        <el-select v-model="state.filterForm.tsType" :placeholder="codeGenColumnDict.tsType" clearable filterable>
          <el-option v-for="item in tsTypeDicts" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="codeGenColumnDict.tsName" prop="tsName">
        <el-input v-model="state.filterForm.tsName" :placeholder="codeGenColumnDict.tsName"/>
      </el-form-item>
      <el-form-item :label="codeGenColumnDict.formType" prop="formType">
        <el-select v-model="state.filterForm.formType" :placeholder="codeGenColumnDict.formType" clearable filterable>
          <el-option v-for="item in formTypeDicts" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="codeGenColumnDict.selType" prop="selType">
        <el-select v-model="state.filterForm.selType" :placeholder="codeGenColumnDict.selType" clearable filterable>
          <el-option v-for="item in selTypeDicts" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
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
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新列</el-button>
      <el-button type="primary" plain :icon="Plus" @click="gIns">新增列</el-button>
      <el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd2">修改列</el-button>
      <el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除列</el-button>
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
    <!--<el-table-column fixed prop="id" :label="state.dict.id" width="180"/>-->
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="colName" :label="codeGenColumnDict.colName" width="120"/>
    <el-table-column prop="colDescr" :label="codeGenColumnDict.colDescr" width="120"/>
    <el-table-column prop="mysqlType" :label="codeGenColumnDict.mysqlType" width="120"/>
    <el-table-column prop="tsType" :label="codeGenColumnDict.tsType" width="120">
      <template #default="{row}">
        {{ tsTypeDicts.find(item => item.value === row.tsType)?.label }}
      </template>
    </el-table-column>
    <el-table-column prop="tsName" :label="codeGenColumnDict.tsName" width="120"/>
    <el-table-column prop="ifIns" :label="codeGenColumnDict.ifIns" width="60"/>
    <el-table-column prop="ifUpd" :label="codeGenColumnDict.ifUpd" width="60"/>
    <el-table-column prop="ifSelOne" :label="codeGenColumnDict.ifSelOne" width="60"/>
    <el-table-column prop="ifSelMore" :label="codeGenColumnDict.ifSelMore" width="60"/>
    <el-table-column prop="ifRequired" :label="codeGenColumnDict.ifRequired" width="60"/>
    <el-table-column prop="formType" :label="codeGenColumnDict.formType" width="120">
      <template #default="{row}">
        {{ formTypeDicts.find(item => item.value === row.formType)?.label }}
      </template>
    </el-table-column>
    <el-table-column prop="selType" :label="codeGenColumnDict.selType" width="120">
      <template #default="{row}">
        {{ selTypeDicts.find(item => item.value === row.selType)?.label }}
      </template>
    </el-table-column>
    <el-table-column prop="orderNum" :label="codeGenColumnDict.orderNum" width="120"/>
    <!--在此上方添加表格列-->
    <!--<el-table-column prop="createBy" :label="codeGenColumnDict.createBy" width="120"/>-->
    <!--<el-table-column prop="updateBy" :label="codeGenColumnDict.updateBy" width="120"/>-->
    <!--<el-table-column prop="createTime" :label="codeGenColumnDict.createTime" width="220"/>-->
    <!--<el-table-column prop="updateTime" :label="codeGenColumnDict.updateTime" width="220"/>-->
    <!--<el-table-column prop="deleted" :label="codeGenColumnDict.deleted" width="60"/>-->
    <!--上方几个酌情使用-->
    <el-table-column fixed="right" label="操作" min-width="140">
      <template #default="{row}">
        <div class="zs-table-data-operate-button-row">
          <el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改</el-button>
          <el-button link type="danger" size="small" :icon="Delete" @click="tDel(row.id)">删除</el-button>
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
