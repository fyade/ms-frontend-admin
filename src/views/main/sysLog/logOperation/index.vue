<script lang="ts">
export default {
  name: 'main:sysLog:logOperation'
}
</script>

<script setup lang="ts">
import { reactive } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { LogOperationDto, LogOperationUpdDto } from "@/type/module/main/sysLog/logOperation.ts";
import { logOperationApi } from "@/api/module/main/sysLog/logOperation.ts";
import { logOperationDict } from "@/dict/module/main/sysLog/logOperation.ts";
import { formatDate } from "@/utils/TimeUtils.ts";
import { interfaceDict } from "@/dict/module/algorithm/interface.ts";

const state = reactive<State2<LogOperationDto, LogOperationUpdDto>>({
  dialogForm: {
    id: -1,
    reqId: '',
    perms: '',
    userId: '',
    reqParam: '',
    oldValue: '',
    operateType: '',
    ifSuccess: '',
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    reqId: '',
    perms: '',
    userId: '',
    ifSuccess: '',
  },
})
const dFormRules: FormRules = {
  reqId: [{required: true, trigger: 'change'}],
  perms: [{required: true, trigger: 'change'}],
  userId: [{required: true, trigger: 'change'}],
  reqParam: [{required: true, trigger: 'change'}],
  oldValue: [{required: true, trigger: 'change'}],
  operateType: [{required: true, trigger: 'change'}],
  ifSuccess: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true,
})

const {
  dialogFormRef,
  dialogFormsRef,
  filterFormRef,
  dialogVisible,
  dialogLoadingRef,
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
  tUpd,
  tDel,
  handleSelectionChange,
  pageChange,
  dfIns,
  dfDel,
  ifRequired,
} = funcTablePage<LogOperationDto, LogOperationUpdDto>({
  state,
  dFormRules,
  config,
  api: logOperationApi,
  dict: logOperationDict,
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
        <el-form-item v-if="dialogType.value!==final.ins" :label="logOperationDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--
        第一个input添加如下属性
        v-focus
        -->
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="logOperationDict.reqId" prop="reqId">
              <el-input v-model="state.dialogForm.reqId" :placeholder="logOperationDict.reqId"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="logOperationDict.perms" prop="perms">
              <el-input v-model="state.dialogForm.perms" :placeholder="logOperationDict.perms"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="logOperationDict.userId" prop="userId">
              <el-input v-model="state.dialogForm.userId" :placeholder="logOperationDict.userId"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="logOperationDict.reqParam" prop="reqParam">
              <el-input v-model="state.dialogForm.reqParam" :placeholder="logOperationDict.reqParam"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="logOperationDict.oldValue" prop="oldValue">
              <el-input v-model="state.dialogForm.oldValue" :placeholder="logOperationDict.oldValue"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="logOperationDict.operateType" prop="operateType">
              <el-input v-model="state.dialogForm.operateType" :placeholder="logOperationDict.operateType"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="logOperationDict.ifSuccess" prop="ifSuccess">
              <el-radio-group v-model="state.dialogForm.ifSuccess">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="logOperationDict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="logOperationDict.remark"/>
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
          <el-table-column prop="reqId" :label="logOperationDict.reqId" width="300">
            <template #header>
              <span :class="ifRequired('reqId')?'tp-table-header-required':''">{{ logOperationDict.reqId }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-reqId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].reqId" :placeholder="logOperationDict.reqId"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="perms" :label="logOperationDict.perms" width="300">
            <template #header>
              <span :class="ifRequired('perms')?'tp-table-header-required':''">{{ logOperationDict.perms }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-perms`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].perms" :placeholder="logOperationDict.perms"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="userId" :label="logOperationDict.userId" width="300">
            <template #header>
              <span :class="ifRequired('userId')?'tp-table-header-required':''">{{ logOperationDict.userId }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-userId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].userId" :placeholder="logOperationDict.userId"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="reqParam" :label="logOperationDict.reqParam" width="300">
            <template #header>
              <span :class="ifRequired('reqParam')?'tp-table-header-required':''">{{ logOperationDict.reqParam }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-reqParam`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].reqParam" :placeholder="logOperationDict.reqParam"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="oldValue" :label="logOperationDict.oldValue" width="300">
            <template #header>
              <span :class="ifRequired('oldValue')?'tp-table-header-required':''">{{ logOperationDict.oldValue }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-oldValue`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].oldValue" :placeholder="logOperationDict.oldValue"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="operateType" :label="logOperationDict.operateType" width="300">
            <template #header>
              <span :class="ifRequired('operateType')?'tp-table-header-required':''">{{ logOperationDict.operateType }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-operateType`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].operateType" :placeholder="logOperationDict.operateType"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifSuccess" :label="logOperationDict.ifSuccess" width="70">
            <template #header>
              <span :class="ifRequired('ifSuccess')?'tp-table-header-required':''">{{ logOperationDict.ifSuccess }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifSuccess`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifSuccess" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="logOperationDict.remark" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ logOperationDict.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].remark" :placeholder="logOperationDict.remark"/>
              </div>
            </template>
          </el-table-column>
          <!--在此上方添加表格列-->
          <el-table-column fixed="right" label="操作" min-width="120">
            <template v-if="dialogType.value===final.ins" #default="{$index}">
              <el-button link type="danger" size="small" @click="dfDel($index)">删除</el-button>
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
        <el-button @click="dCan">取消</el-button>
        <el-button type="primary" @click="dCon">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!--顶部筛选表单-->
  <div class="zs-filter-form" v-if="Object.keys(state.filterForm).length>0">
    <el-form
        class="demo-form-inline"
        ref="filterFormRef"
        :model="state.filterForm"
        :inline="true"
        @keyup.enter="fEnter"
        @submit.prevent
    >
      <!--在此下方添加表单项-->
      <el-form-item :label="logOperationDict.reqId" prop="reqId">
        <el-input v-model="state.filterForm.reqId" :placeholder="logOperationDict.reqId"/>
      </el-form-item>
      <el-form-item :label="logOperationDict.perms" prop="perms">
        <el-input v-model="state.filterForm.perms" :placeholder="logOperationDict.perms"/>
      </el-form-item>
      <el-form-item :label="logOperationDict.userId" prop="userId">
        <el-input v-model="state.filterForm.userId" :placeholder="logOperationDict.userId"/>
      </el-form-item>
      <el-form-item :label="logOperationDict.ifSuccess" prop="ifSuccess">
        <!--<el-input v-model="state.filterForm.ifSuccess" :placeholder="logOperationDict.ifSuccess"/>-->
        <el-select v-model="state.filterForm.ifSuccess" :placeholder="logOperationDict.ifSuccess" clearable filterable>
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
    <!--<el-button-group>-->
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
    <!--<el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>-->
    <!--<el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd">修改</el-button>-->
    <!--<el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除</el-button>-->
    <el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>
    <!--<el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>-->
    <!--</el-button-group>-->
  </div>

  <div class="zs-table-data">
    <!--数据表格-->
    <el-table
        v-loading="tableLoadingRef"
        :data="tableData"
        @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55"/>
      <!--<el-table-column fixed prop="id" :label="logOperationDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="reqId" :label="logOperationDict.reqId" width="180"/>
      <el-table-column prop="perms" :label="logOperationDict.perms" width="240"/>
      <el-table-column prop="userId" :label="logOperationDict.userId" width="120"/>
      <el-table-column prop="reqParam" :label="logOperationDict.reqParam" width="360">
        <template #default="{row}">
          <div style="max-height: 100px;overflow: auto;">
            <div>query参数：{{ JSON.parse(row.reqParam).query }}</div>
            <div>body参数：{{ JSON.parse(row.reqParam).body }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="oldValue" :label="logOperationDict.oldValue" width="120"/>
      <el-table-column prop="operateType" :label="logOperationDict.operateType" width="120"/>
      <el-table-column prop="ifSuccess" :label="logOperationDict.ifSuccess" width="120"/>
      <el-table-column prop="remark" :label="logOperationDict.remark" width="120"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="logOperationDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="logOperationDict.updateBy" width="120"/>-->
      <el-table-column prop="createTime" :label="logOperationDict.createTime" width="220">
        <template #default="{row}">
          {{ formatDate(new Date(row.createTime)) }}
        </template>
      </el-table-column>
      <!--<el-table-column prop="updateTime" :label="logOperationDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="logOperationDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <!--<el-table-column fixed="right" label="操作" min-width="120">-->
      <!--  <template #default="{row}">-->
      <!--    <el-button link type="primary" size="small" @click="tUpd(row.id)">修改</el-button>-->
      <!--    <el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>-->
      <!--  </template>-->
      <!--</el-table-column>-->
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
