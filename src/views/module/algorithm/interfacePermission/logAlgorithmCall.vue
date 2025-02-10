<script setup lang="ts">
import { reactive, ref } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { LogAlgorithmCallDto, LogAlgorithmCallUpdDto } from "@/type/module/algorithm/logAlgorithmCall.ts";
import { logAlgorithmCallApi } from "@/api/module/algorithm/logAlgorithmCall.ts";
import { logAlgorithmCallDict } from "@/dict/module/algorithm/logAlgorithmCall.ts";
import { formatDate } from "@/utils/TimeUtils.ts";

const props = defineProps({
  selectUGPId: {
    type: Number,
    required: true
  }
})

const state = reactive<State2<LogAlgorithmCallDto, LogAlgorithmCallUpdDto>>({
  dialogForm: {
    id: -1,
    userGroupPermissionId: -1,
    pperms: '',
    perms: '',
    userId: '',
    callIp: '',
    ifSuccess: '',
    loginRole: '',
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    pperms: '',
    perms: '',
    userId: '',
    loginRole: '',
    callIp: '',
  },
})
const dFormRules: FormRules = {
  userGroupPermissionId: [{required: true, trigger: 'change'}],
  pperms: [{required: true, trigger: 'change'}],
  perms: [{required: true, trigger: 'change'}],
  userId: [{required: true, trigger: 'change'}],
  callIp: [{required: true, trigger: 'change'}],
  ifSuccess: [{required: true, trigger: 'change'}],
  loginRole: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true,
  selectParam: {
    userGroupPermissionId: props.selectUGPId,
    createTime: {
      between: {
        type: 'date',
        value: [null, null]
      } as {
        type: string
        value: [null, null] | [Date, Date]
      }
    }
  },
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
} = funcTablePage<LogAlgorithmCallDto, LogAlgorithmCallUpdDto>({
  state,
  dFormRules,
  config,
  api: logAlgorithmCallApi,
  dict: logAlgorithmCallDict,
})

const datePickerValue = ref('')
const shortcuts = [
  {
    text: '前一周',
    value: () => {
      const start = new Date()
      const end = new Date()
      start.setDate(start.getDate() - 7)
      return [start, end]
    },
  },
  {
    text: '前两周',
    value: () => {
      const start = new Date()
      const end = new Date()
      start.setDate(start.getDate() - 14)
      return [start, end]
    },
  },
  {
    text: '前一个月',
    value: () => {
      const start = new Date()
      const end = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    },
  },
  {
    text: '前三个月',
    value: () => {
      const start = new Date()
      const end = new Date()
      start.setMonth(start.getMonth() - 3)
      return [start, end]
    },
  },
  {
    text: '前半年',
    value: () => {
      const start = new Date()
      const end = new Date()
      start.setMonth(start.getMonth() - 6)
      return [start, end]
    },
  },
  {
    text: '前一年',
    value: () => {
      const start = new Date()
      const end = new Date()
      start.setFullYear(start.getFullYear() - 1)
      return [start, end]
    },
  },
]
const datePickerValueChange = (value: Date[]) => {
  if (value) {
    config!.selectParam!.createTime!.between!.value[0] = value[0]
    config!.selectParam!.createTime!.between!.value[1] = value[1]
  } else {
    config!.selectParam!.createTime!.between!.value[0] = null
    config!.selectParam!.createTime!.between!.value[1] = null
  }
}
const fCan2 = () => {
  datePickerValue.value = ''
  config!.selectParam!.createTime!.between!.value[0] = null
  config!.selectParam!.createTime!.between!.value[1] = null
  fCan()
}
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
        <el-form-item v-if="dialogType.value!==final.ins" :label="logAlgorithmCallDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="logAlgorithmCallDict.userGroupPermissionId" prop="userGroupPermissionId">
              <el-input-number v-model="state.dialogForm.userGroupPermissionId" controls-position="right"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="logAlgorithmCallDict.pperms" prop="pperms">
              <el-input v-model="state.dialogForm.pperms" :placeholder="logAlgorithmCallDict.pperms"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="logAlgorithmCallDict.perms" prop="perms">
              <el-input v-model="state.dialogForm.perms" :placeholder="logAlgorithmCallDict.perms"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="logAlgorithmCallDict.userId" prop="userId">
              <el-input v-model="state.dialogForm.userId" :placeholder="logAlgorithmCallDict.userId"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="logAlgorithmCallDict.callIp" prop="callIp">
              <el-input v-model="state.dialogForm.callIp" :placeholder="logAlgorithmCallDict.callIp"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="logAlgorithmCallDict.ifSuccess" prop="ifSuccess">
              <el-radio-group v-model="state.dialogForm.ifSuccess">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="logAlgorithmCallDict.loginRole" prop="loginRole">
              <el-input v-model="state.dialogForm.loginRole" :placeholder="logAlgorithmCallDict.loginRole"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="logAlgorithmCallDict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="logAlgorithmCallDict.remark"/>
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
          <el-table-column prop="userGroupPermissionId" :label="logAlgorithmCallDict.userGroupPermissionId" width="300">
            <template #header>
              <span :class="ifRequired('userGroupPermissionId')?'tp-table-header-required':''">{{ logAlgorithmCallDict.userGroupPermissionId }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-userGroupPermissionId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].userGroupPermissionId" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="pperms" :label="logAlgorithmCallDict.pperms" width="300">
            <template #header>
              <span :class="ifRequired('pperms')?'tp-table-header-required':''">{{ logAlgorithmCallDict.pperms }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-pperms`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].pperms" :placeholder="logAlgorithmCallDict.pperms"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="perms" :label="logAlgorithmCallDict.perms" width="300">
            <template #header>
              <span :class="ifRequired('perms')?'tp-table-header-required':''">{{ logAlgorithmCallDict.perms }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-perms`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].perms" :placeholder="logAlgorithmCallDict.perms"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="userId" :label="logAlgorithmCallDict.userId" width="300">
            <template #header>
              <span :class="ifRequired('userId')?'tp-table-header-required':''">{{ logAlgorithmCallDict.userId }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-userId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].userId" :placeholder="logAlgorithmCallDict.userId"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="callIp" :label="logAlgorithmCallDict.callIp" width="300">
            <template #header>
              <span :class="ifRequired('callIp')?'tp-table-header-required':''">{{ logAlgorithmCallDict.callIp }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-callIp`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].callIp" :placeholder="logAlgorithmCallDict.callIp"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifSuccess" :label="logAlgorithmCallDict.ifSuccess" width="70">
            <template #header>
              <span :class="ifRequired('ifSuccess')?'tp-table-header-required':''">{{ logAlgorithmCallDict.ifSuccess }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifSuccess`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifSuccess" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="loginRole" :label="logAlgorithmCallDict.loginRole" width="300">
            <template #header>
              <span :class="ifRequired('loginRole')?'tp-table-header-required':''">{{ logAlgorithmCallDict.loginRole }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-loginRole`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].loginRole" :placeholder="logAlgorithmCallDict.loginRole"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="logAlgorithmCallDict.remark" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ logAlgorithmCallDict.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].remark" :placeholder="logAlgorithmCallDict.remark"/>
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
    >
      <!--在此下方添加表单项-->
      <el-form-item :label="logAlgorithmCallDict.pperms" prop="pperms">
        <el-input v-model="state.filterForm.pperms" :placeholder="logAlgorithmCallDict.pperms"/>
      </el-form-item>
      <el-form-item :label="logAlgorithmCallDict.perms" prop="perms">
        <el-input v-model="state.filterForm.perms" :placeholder="logAlgorithmCallDict.perms"/>
      </el-form-item>
      <el-form-item :label="logAlgorithmCallDict.userId" prop="userId">
        <el-input v-model="state.filterForm.userId" :placeholder="logAlgorithmCallDict.userId"/>
      </el-form-item>
      <el-form-item :label="logAlgorithmCallDict.loginRole" prop="loginRole">
        <el-input v-model="state.filterForm.loginRole" :placeholder="logAlgorithmCallDict.loginRole"/>
      </el-form-item>
      <el-form-item :label="logAlgorithmCallDict.callIp" prop="callIp">
        <el-input v-model="state.filterForm.callIp" :placeholder="logAlgorithmCallDict.callIp"/>
      </el-form-item>
      <el-form-item :label="logAlgorithmCallDict.createTime" prop="createTime">
        <el-date-picker
            v-model="datePickerValue"
            type="datetimerange"
            :shortcuts="shortcuts"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
            @change="datePickerValueChange"
        />
      </el-form-item>
      <!--在此上方添加表单项-->
      <el-form-item>
        <el-button type="primary" @click="fCon">筛选</el-button>
        <el-button @click="fCan2">重置</el-button>
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
      <el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>
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
      <!--<el-table-column fixed prop="id" :label="logAlgorithmCallDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <!--<el-table-column prop="userGroupPermissionId" :label="logAlgorithmCallDict.userGroupPermissionId" width="120"/>-->
      <el-table-column prop="pperms" :label="logAlgorithmCallDict.pperms" width="180"/>
      <el-table-column prop="perms" :label="logAlgorithmCallDict.perms" width="180"/>
      <el-table-column prop="userId" :label="logAlgorithmCallDict.userId" width="120"/>
      <el-table-column prop="loginRole" :label="logAlgorithmCallDict.loginRole" width="120"/>
      <el-table-column prop="callIp" :label="logAlgorithmCallDict.callIp" width="120"/>
      <el-table-column prop="ifSuccess" :label="logAlgorithmCallDict.ifSuccess" width="120"/>
      <el-table-column prop="remark" :label="logAlgorithmCallDict.remark" width="120"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="logAlgorithmCallDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="logAlgorithmCallDict.updateBy" width="120"/>-->
      <el-table-column prop="createTime" :label="logAlgorithmCallDict.createTime" width="220">
        <template #default="{row}">
          {{ formatDate(new Date(row.createTime)) }}
        </template>
      </el-table-column>
      <!--<el-table-column prop="updateTime" :label="logAlgorithmCallDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="logAlgorithmCallDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <!--<el-table-column fixed="right" label="操作" min-width="140">-->
      <!--  <template #default="{row}">-->
      <!--    <div class="zs-table-data-operate-button-row">-->
      <!--      <el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改</el-button>-->
      <!--      <el-button link type="danger" size="small" :icon="Delete" @click="tDel(row.id)">删除</el-button>-->
      <!--    </div>-->
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
