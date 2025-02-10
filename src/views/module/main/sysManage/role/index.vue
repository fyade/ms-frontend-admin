<script lang="ts">
export default {
  name: 'main:sysManage:role'
}
</script>

<script setup lang="ts">
import { provide, reactive, ref } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search, DArrowRight } from "@element-plus/icons-vue";
import { RoleDto, RoleUpdDto } from "@/type/module/main/sysManage/role.ts";
import { roleApi } from "@/api/module/main/sysManage/role.ts";
import { roleDict } from "@/dict/module/main/sysManage/role.ts";
import { rolePermissionApi, rolePermissionUpdRp } from "@/api/module/main/sysManage/rolePermission.ts";
import RoleUser from "@/views/module/main/sysManage/role/roleUser.vue";
import RolePermission from "@/views/module/main/sysManage/role/rolePermission.vue";
import RoleSystem from "@/views/module/main/sysManage/role/roleSystem.vue";

const state = reactive<State2<RoleDto, RoleUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    ifAdmin: final.N,
    ifDisabled: final.N,
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    label: '',
    ifAdmin: '',
    ifDisabled: ''
  }
})
const dFormRules: FormRules = {
  label: [{required: true, trigger: 'change'}],
  ifAdmin: [{required: true, trigger: 'change'}],
  ifDisabled: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true
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
} = funcTablePage<RoleDto, RoleUpdDto>({
  state,
  dFormRules,
  config,
  api: roleApi,
  dict: roleDict,
})

// 选择的角色信息
const selectRoleInfo = ref<RoleDto>(new RoleDto())
const drawer2 = ref(false)
const selectPermission = ref<number[]>([])
const manageUser = (row: RoleDto) => {
  selectRoleInfo.value = row
  drawer2.value = true
}

// 角色权限
const drawer = ref(false)
const setPermission = (row: RoleDto) => {
  selectRoleInfo.value = row
  rolePermissionApi.selectAll({roleId: selectRoleInfo.value.id}).then(res => {
    selectPermission.value = res.map(item => item.permissionId)
    drawer.value = true
  })
}
const drawerCancelRolePermission = () => {
  drawer.value = false
}
const drawerConfirmRolePermission = () => {
  const param = {
    roleId: selectRoleInfo.value.id,
    permissionId: selectPermission.value
  }
  rolePermissionUpdRp(param).then(res => {
    if (res) {
      drawer.value = false
      gRefresh()
    }
  })
}
provide('changeSelectPermission', selectPermission)

// 分配系统
const drawer3 = ref(false)
const setSystem = (row: RoleDto) => {
  selectRoleInfo.value = row
  drawer3.value = true
}
</script>

<template>
  <!--管理用户-->
  <el-dialog
      v-model="drawer2"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      title="管理用户"
      destroy-on-close
  >
    <RoleUser
        :select-role="selectRoleInfo"
    />
    <template #footer>
      <el-button plain @click="drawer2=false">取消</el-button>
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
    <RoleSystem
        :select-role="selectRoleInfo"
    />
    <template #footer>
      <el-button plain @click="drawer3=false">取消</el-button>
    </template>
  </el-dialog>

  <!--角色权限-->
  <el-dialog
      v-model="drawer"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      title="分配权限"
      destroy-on-close
  >
    <RolePermission
        :select-role="selectRoleInfo"
    />
    <template #footer>
      <!--<el-button plain @click="drawer=false">取消</el-button>-->
      <el-button plain @click="drawerCancelRolePermission">取消</el-button>
      <el-button type="primary" plain @click="drawerConfirmRolePermission">提交</el-button>
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
        <el-row v-if="dialogType.value!==final.ins">
          <el-col :span="24">
            <el-form-item :label="roleDict.id" prop="id">
              <span>{{ state.dialogForm.id }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="roleDict.label" prop="label">
              <el-input v-model="state.dialogForm.label" :placeholder="roleDict.label"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="roleDict.orderNum" prop="orderNum">
              <el-input-number v-model="state.dialogForm.orderNum" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="roleDict.ifAdmin" prop="ifAdmin">
              <el-radio-group v-model="state.dialogForm.ifAdmin">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="roleDict.ifDisabled" prop="ifDisabled">
              <el-radio-group v-model="state.dialogForm.ifDisabled">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="roleDict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="roleDict.remark"/>
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
          <el-table-column prop="label" :label="roleDict.label" width="300">
            <template #header>
              <span :class="ifRequired('label')?'tp-table-header-required':''">{{ roleDict.label }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].label" :placeholder="roleDict.label"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="roleDict.orderNum" width="300">
            <template #header>
              <span :class="ifRequired('orderNum')?'tp-table-header-required':''">{{ roleDict.orderNum }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].orderNum" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifAdmin" :label="roleDict.ifAdmin" width="70">
            <template #header>
              <span :class="ifRequired('ifAdmin')?'tp-table-header-required':''">{{ roleDict.ifAdmin }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifAdmin`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifAdmin" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifDisabled" :label="roleDict.ifDisabled" width="70">
            <template #header>
              <span :class="ifRequired('ifDisabled')?'tp-table-header-required':''">{{ roleDict.ifDisabled }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifDisabled`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifDisabled" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="roleDict.remark" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ roleDict.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].remark" :placeholder="roleDict.remark"/>
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
      <el-form-item :label="roleDict.label" prop="label">
        <el-input v-model="state.filterForm.label" :placeholder="roleDict.label"/>
      </el-form-item>
      <el-form-item :label="roleDict.ifAdmin" prop="ifAdmin">
        <el-select v-model="state.filterForm.ifAdmin" :placeholder="roleDict.ifAdmin" clearable filterable>
          <el-option label="是" :value="final.Y"/>
          <el-option label="否" :value="final.N"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="roleDict.ifDisabled" prop="ifDisabled">
        <el-select v-model="state.filterForm.ifDisabled" :placeholder="roleDict.ifDisabled" clearable filterable>
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
      <!--<el-table-column fixed prop="id" :label="roleDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="label" :label="roleDict.label" width="120"/>
      <el-table-column prop="ifAdmin" :label="roleDict.ifAdmin" width="120"/>
      <el-table-column prop="ifDisabled" :label="roleDict.ifDisabled" width="120"/>
      <el-table-column prop="orderNum" :label="roleDict.orderNum" width="120"/>
      <el-table-column prop="remark" :label="roleDict.remark" width="200"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="roleDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="roleDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="roleDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="roleDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="roleDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <el-table-column fixed="right" label="操作" min-width="140">
        <template #default="{row}">
          <div class="zs-table-data-operate-button-row">
            <el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改</el-button>
            <el-button link type="danger" size="small" :icon="Delete" @click="tDel(row.id)">删除</el-button>
            <el-dropdown>
              <el-button link type="primary" size="small" :icon="DArrowRight">更多</el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item><el-button link type="info" size="small" :icon="Edit" @click="manageUser(row)">管理用户</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button link type="info" size="small" :icon="Edit" @click="setSystem(row)">分配系统</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button link type="info" size="small" :icon="Edit" @click="setPermission(row)">分配权限</el-button></el-dropdown-item>
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
