<script lang="ts">
export default {
  name: 'main:sysManage:dept'
}
</script>

<script setup lang="ts">
import { computed, provide, reactive, ref } from "vue";
import { cascaderProps2, CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { DeptDto, DeptUpdDto } from "@/type/module/main/sysManage/dept.ts";
import { deptApi } from "@/api/module/main/sysManage/dept.ts";
import { deptDict } from "@/dict/module/main/sysManage/dept.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import DeptUser from "@/views/main/sysManage/dept/deptUser.vue";
import DeptPermission from "@/views/main/sysManage/dept/deptPermission.vue";
import { deptPermissionApi, deptPermissionUpdDP } from "@/api/module/main/sysManage/deptPermission.ts";
import DeptSystem from "@/views/main/sysManage/dept/deptSystem.vue";

const state = reactive<State2<DeptDto, DeptUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    ifAdmin: final.N,
    ifDisabled: final.N,
    parentId: final.DEFAULT_PARENT_ID,
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {},
})
const dFormRules: FormRules = {
  label: [{required: true, trigger: 'change'}],
  ifAdmin: [{required: true, trigger: 'change'}],
  ifDisabled: [{required: true, trigger: 'change'}],
  parentId: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  pageQuery: false,
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
} = funcTablePage<DeptDto, DeptUpdDto>({
  state,
  dFormRules,
  config,
  api: deptApi,
  dict: deptDict,
})

const expandRowKeys = ref<string[]>([])
const tableData2 = computed(() => {
  return arr2ToDiguiObj(tableData.value)
})
const gIns2 = () => {
  state.dialogForm.parentId = final.DEFAULT_PARENT_ID
  gIns()
}
const tIns = (id: number) => {
  state.dialogForm.parentId = id
  gIns()
}

// 选择的部门信息
let selectDept: DeptDto = new DeptDto()
const drawer = ref(false)
const manageUser = (row: DeptDto) => {
  selectDept = row
  drawer.value = true
}

// 部门权限
const drawer2 = ref(false)
const selectPermission = ref<number[]>([])
const managePermission = (row: DeptDto) => {
  selectDept = row
  deptPermissionApi.selectAll({deptId: selectDept.id}).then(res => {
    selectPermission.value = res.map(item => item.permissionId)
    drawer2.value = true
  })
}
const drawerConfirmDeptPermission = () => {
  const param = {
    deptId: selectDept.id,
    permissionId: selectPermission.value
  }
  deptPermissionUpdDP(param).then(res => {
    if (res) {
      drawer2.value = false
      gRefresh()
    }
  })
}
const drawerCancelDeptPermission = () => {
  drawer2.value = false
}
provide('changeSelectPermission', selectPermission)

// 分配系统
const drawer3 = ref(false)
const setSystem = (dept: DeptDto) => {
  selectDept = dept
  drawer3.value = true
}
</script>

<template>
  <!--管理用户-->
  <el-dialog
      v-model="drawer"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title="管理用户"
  >
    <DeptUser
        :select-dept="selectDept"
    />
    <template #footer>
      <el-button plain @click="drawer=false">取消</el-button>
    </template>
  </el-dialog>

  <!--分配系统-->
  <el-dialog
      v-model="drawer3"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      title="分配系统"
      destroy-on-close
  >
    <DeptSystem
        :select-dept="selectDept"
    />
    <template #footer>
      <el-button plain @click="drawer3=false">取消</el-button>
    </template>
  </el-dialog>

  <!--分配权限-->
  <el-dialog
      v-model="drawer2"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title="分配权限"
  >
    <DeptPermission
        :select-dept="selectDept"
    />
    <template #footer>
      <el-button plain @click="drawerCancelDeptPermission">取消</el-button>
      <el-button type="primary" plain @click="drawerConfirmDeptPermission">提交</el-button>
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
        <el-form-item v-if="dialogType.value!==final.ins" :label="deptDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--
        第一个input添加如下属性
        v-focus
        -->
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="deptDict.label" prop="label">
              <el-input v-model="state.dialogForm.label" :placeholder="deptDict.label"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="deptDict.ifAdmin" prop="ifAdmin">
              <el-radio-group v-model="state.dialogForm.ifAdmin">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="deptDict.ifDisabled" prop="ifDisabled">
              <el-radio-group v-model="state.dialogForm.ifDisabled">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="deptDict.parentId" prop="parentId">
              <!--<el-input-number v-model="state.dialogForm.parentId" controls-position="right"/>-->
              <el-cascader
                  v-model="state.dialogForm.parentId"
                  :options="tableData2"
                  :props="cascaderProps2"
                  clearable
                  :value-on-clear="final.DEFAULT_PARENT_ID"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="deptDict.orderNum" prop="orderNum">
              <el-input-number v-model="state.dialogForm.orderNum" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="deptDict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="deptDict.remark"/>
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
          <el-table-column prop="label" :label="deptDict.label" width="300">
            <template #header>
              <span :class="ifRequired('label')?'tp-table-header-required':''">{{ deptDict.label }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].label" :placeholder="deptDict.label"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifAdmin" :label="deptDict.ifAdmin" width="100">
            <template #header>
              <span :class="ifRequired('ifAdmin')?'tp-table-header-required':''">{{ deptDict.ifAdmin }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifAdmin`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifAdmin" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifDisabled" :label="deptDict.ifDisabled" width="70">
            <template #header>
              <span :class="ifRequired('ifDisabled')?'tp-table-header-required':''">{{ deptDict.ifDisabled }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifDisabled`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifDisabled" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="parentId" :label="deptDict.parentId" width="240">
            <template #header>
              <span :class="ifRequired('parentId')?'tp-table-header-required':''">{{ deptDict.parentId }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-parentId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <!--<el-input-number v-model="state.dialogForms[$index].parentId" controls-position="right"/>-->
                <el-cascader
                    v-model="state.dialogForms[$index].parentId"
                    :options="tableData2"
                    :props="cascaderProps2"
                    clearable
                    :value-on-clear="final.DEFAULT_PARENT_ID"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="deptDict.orderNum" width="200">
            <template #header>
              <span :class="ifRequired('orderNum')?'tp-table-header-required':''">{{ deptDict.orderNum }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].orderNum" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="deptDict.remark" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ deptDict.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].remark" :placeholder="deptDict.remark"/>
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
      <!--<el-form-item :label="deptDict." prop="">-->
      <!--  <el-input v-model="state.filterForm." :placeholder="deptDict."/>-->
      <!--</el-form-item>-->
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
    <el-button type="primary" plain :icon="Plus" @click="gIns2">新增</el-button>
    <el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd">修改</el-button>
    <el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除</el-button>
    <el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>
    <el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>
    <!--</el-button-group>-->
  </div>

  <div class="zs-table-data">
    <!--数据表格-->
    <el-table
        v-loading="tableLoadingRef"
        :data="tableData2"
        :expand-row-keys="expandRowKeys"
        row-key="id"
        :default-expand-all="true"
        @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55"/>
      <!--<el-table-column fixed prop="id" :label="deptDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="label" :label="deptDict.label" width="240"/>
      <el-table-column prop="ifAdmin" :label="deptDict.ifAdmin" width="150"/>
      <el-table-column prop="ifDisabled" :label="deptDict.ifDisabled" width="120"/>
      <!--<el-table-column prop="parentId" :label="deptDict.parentId" width="120"/>-->
      <el-table-column prop="orderNum" :label="deptDict.orderNum" width="120"/>
      <el-table-column prop="remark" :label="deptDict.remark" width="120"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="deptDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="deptDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="deptDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="deptDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="deptDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <el-table-column fixed="right" label="操作" min-width="200">
        <template #default="{row}">
          <el-button link type="primary" size="small" @click="tIns(row.id)">新增</el-button>
          <el-button link type="primary" size="small" @click="tUpd(row.id)">修改</el-button>
          <el-button link type="primary" size="small" @click="manageUser(row)">管理用户</el-button>
          <el-button link type="primary" size="small" @click="setSystem(row)">分配系统</el-button>
          <el-button link type="primary" size="small" @click="managePermission(row)">分配权限</el-button>
          <el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>
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
