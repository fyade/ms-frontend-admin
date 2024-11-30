<script setup lang="ts">
import { reactive, ref } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { DicDataDto, DicDataUpdDto } from "@/type/module/main/sysManage/dicData.ts";
import { dicDataApi } from "@/api/module/main/sysManage/dicData.ts";
import { dicDataDict } from "@/dict/module/main/sysManage/dicData.ts";
import { dicTypeApi } from "@/api/module/main/sysManage/dicType.ts";
import { DicTypeDto } from "@/type/module/main/sysManage/dicType.ts";
import { dicTypeDict } from "@/dict/module/main/sysManage/dicType.ts";

const props = defineProps({
  dicType: {
    type: DicTypeDto,
    required: true
  }
})

const state = reactive<State2<DicDataDto, DicDataUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    value: '',
    dicTypeId: props.dicType.id,
    ifDefault: final.N,
    ifDisabled: final.N,
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    label: '',
    value: '',
    ifDefault: '',
    ifDisabled: '',
  },
})
const dFormRules: FormRules = {
  label: [{required: true, trigger: 'change'}],
  value: [{required: true, trigger: 'change'}],
  dicTypeId: [{required: true, trigger: 'change'}],
  ifDefault: [{required: true, trigger: 'change'}],
  ifDisabled: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig<DicDataDto>({
  selectParam: {
    dicTypeId: props.dicType.id
  },
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
} = funcTablePage<DicDataDto, DicDataUpdDto>({
  state,
  dFormRules,
  config,
  api: dicDataApi,
  dict: dicDataDict,
})

const allDicTypes = ref<DicTypeDto[]>([])
dicTypeApi.selectAll({}).then(res => {
  allDicTypes.value = res
})
</script>

<template>
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
        <el-form-item v-if="dialogType.value!==final.ins" :label="dicDataDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--
        第一个input添加如下属性
        v-focus
        -->
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="dicDataDict.label" prop="label">
              <el-input v-model="state.dialogForm.label" :placeholder="dicDataDict.label"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="dicDataDict.value" prop="value">
              <el-input v-model="state.dialogForm.value" :placeholder="dicDataDict.value"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="dicDataDict.ifDefault" prop="ifDefault">
              <el-radio-group v-model="state.dialogForm.ifDefault">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="dicDataDict.ifDisabled" prop="ifDisabled">
              <el-radio-group v-model="state.dialogForm.ifDisabled">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="dicDataDict.orderNum" prop="orderNum">
              <el-input-number v-model="state.dialogForm.orderNum" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="dicDataDict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="dicDataDict.remark"/>
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
          <el-table-column prop="label" :label="dicDataDict.label" width="300">
            <template #header>
              <span :class="ifRequired('label')?'tp-table-header-required':''">{{ dicDataDict.label }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].label" :placeholder="dicDataDict.label"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="value" :label="dicDataDict.value" width="300">
            <template #header>
              <span :class="ifRequired('value')?'tp-table-header-required':''">{{ dicDataDict.value }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-value`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].value" :placeholder="dicDataDict.value"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifDefault" :label="dicDataDict.ifDefault" width="70">
            <template #header>
              <span :class="ifRequired('ifDefault')?'tp-table-header-required':''">{{ dicDataDict.ifDefault }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifDefault`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifDefault" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifDisabled" :label="dicDataDict.ifDisabled" width="70">
            <template #header>
              <span :class="ifRequired('ifDisabled')?'tp-table-header-required':''">{{ dicDataDict.ifDisabled }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifDisabled`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifDisabled" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="dicDataDict.orderNum" width="300">
            <template #header>
              <span :class="ifRequired('orderNum')?'tp-table-header-required':''">{{ dicDataDict.orderNum }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].orderNum" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="dicDataDict.remark" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ dicDataDict.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].remark" :placeholder="dicDataDict.remark"/>
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

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">字典类型信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="dicTypeDict.name">
          {{ props.dicType.name }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="dicTypeDict.type">
          {{ props.dicType.type }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">字典数据列表</el-text>
  </el-divider>

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
      <el-form-item :label="dicDataDict.label" prop="label">
        <el-input v-model="state.filterForm.label" :placeholder="dicDataDict.label"/>
      </el-form-item>
      <el-form-item :label="dicDataDict.value" prop="value">
        <el-input v-model="state.filterForm.value" :placeholder="dicDataDict.value"/>
      </el-form-item>
      <el-form-item :label="dicDataDict.ifDefault" prop="ifDefault">
        <el-select v-model="state.filterForm.ifDefault" :placeholder="dicDataDict.ifDefault" clearable filterable>
          <el-option label="是" :value="final.Y"/>
          <el-option label="否" :value="final.N"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="dicDataDict.ifDisabled" prop="ifDisabled">
        <el-select v-model="state.filterForm.ifDisabled" :placeholder="dicDataDict.ifDisabled" clearable filterable>
          <el-option label="是" :value="final.Y"/>
          <el-option label="否" :value="final.N"/>
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
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
      <el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>
      <el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd">修改</el-button>
      <el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除</el-button>
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
      <!--<el-table-column fixed prop="id" :label="dicDataDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="label" :label="dicDataDict.label" width="120"/>
      <el-table-column prop="value" :label="dicDataDict.value" width="120"/>
      <el-table-column prop="ifDefault" :label="dicDataDict.ifDefault" width="120"/>
      <el-table-column prop="ifDisabled" :label="dicDataDict.ifDisabled" width="120"/>
      <el-table-column prop="orderNum" :label="dicDataDict.orderNum" width="120"/>
      <el-table-column prop="remark" :label="dicDataDict.remark" width="200"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="dicDataDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="dicDataDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="dicDataDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="dicDataDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="dicDataDict.deleted" width="60"/>-->
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
