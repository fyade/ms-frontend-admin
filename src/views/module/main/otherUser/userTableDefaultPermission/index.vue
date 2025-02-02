<script lang="ts">
export default {
  name: 'main:otherUser:userTableDefaultPermission'
}
</script>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { CONFIG, final, T_DEPT, T_ROLE, T_UG, TUTDPType, uTDPTypeDict } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { UserTableDefaultPermissionDto, UserTableDefaultPermissionUpdDto } from "@/type/module/main/otherUser/userTableDefaultPermission.ts";
import { userTableDefaultPermissionApi } from "@/api/module/main/otherUser/userTableDefaultPermission.ts";
import { userTableDefaultPermissionDict } from "@/dict/module/main/otherUser/userTableDefaultPermission.ts";
import UserTableRole from "@/views/module/main/otherUser/userTableDefaultPermission/userTableRole.vue";
import { RoleDto } from "@/type/module/main/sysManage/role.ts";
import { DeptDto } from "@/type/module/main/sysManage/dept.ts";
import { UserGroupDto } from "@/type/module/algorithm/userGroup.ts";
import UserTableDept from "@/views/module/main/otherUser/userTableDefaultPermission/userTableDept.vue";
import UserTableUserGroup from "@/views/module/main/otherUser/userTableDefaultPermission/userTableUserGroup.vue";
import { roleApi } from "@/api/module/main/sysManage/role.ts";
import { deptApi } from "@/api/module/main/sysManage/dept.ts";
import { userGroupApi } from "@/api/module/algorithm/userGroup.ts";

const state = reactive<State2<UserTableDefaultPermissionDto, UserTableDefaultPermissionUpdDto>>({
  dialogForm: {
    id: -1,
    tableName: '',
    permType: '',
    permId: final.DEFAULT_PARENT_ID,
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    tableName: '',
  },
})
const dFormRules: FormRules = {
  tableName: [{required: true, trigger: 'change'}],
  permType: [{required: true, trigger: 'change'}],
  permId: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: false,
  selectListCallback: () => {
    selectAllPs()
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
} = funcTablePage<UserTableDefaultPermissionDto, UserTableDefaultPermissionUpdDto>({
  state,
  dFormRules,
  config,
  api: userTableDefaultPermissionApi,
  dict: userTableDefaultPermissionDict,
})

const allRolesOfThisPage = ref<RoleDto[]>([])
const allDeptsOfThisPage = ref<DeptDto[]>([])
const allUserGroupsOfThisPage = ref<UserGroupDto[]>([])
const selectAllPs = () => {
  roleApi.selectByIds(tableData.value.filter(item => item.permType === T_ROLE).map(item => item.permId)).then(res => {
    allRolesOfThisPage.value = res
  })
  deptApi.selectByIds(tableData.value.filter(item => item.permType === T_DEPT).map(item => item.permId)).then(res => {
    allDeptsOfThisPage.value = res
  })
  userGroupApi.selectByIds(tableData.value.filter(item => item.permType === T_UG).map(item => item.permId)).then(res => {
    allUserGroupsOfThisPage.value = res
  })
}

const drawer1 = ref(false)
const drawer2 = ref(false)
const drawer3 = ref(false)
const selectRole = ref<RoleDto|null>(null)
const selectDept = ref<DeptDto|null>(null)
const selectUserGroup = ref<UserGroupDto|null>(null)
const selectPerm = () => {
  if (state.dialogForm.permType === T_ROLE) {
    drawer1.value = true
  }
  if (state.dialogForm.permType === T_DEPT) {
    drawer2.value = true
  }
  if (state.dialogForm.permType === T_UG) {
    drawer3.value = true
  }
}
const chooseRole = (row: RoleDto) => {
  drawer1.value = false
  selectRole.value = row
  selectDept.value = null
  selectUserGroup.value = null
  state.dialogForm.permId = row.id
}
const chooseDept = (row: DeptDto) => {
  drawer2.value = false
  selectRole.value = null
  selectDept.value = row
  selectUserGroup.value = null
  state.dialogForm.permId = row.id
}
const chooseUserGroup = (row: UserGroupDto) => {
  drawer3.value = false
  selectRole.value = null
  selectDept.value = null
  selectUserGroup.value = row
  state.dialogForm.permId = row.id
}
</script>

<template>
  <!--角色-->
  <el-dialog
      v-model="drawer1"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title=""
  >
    <UserTableRole
        @choose="chooseRole"
    />
    <template #footer>
      <el-button plain @click="drawer1=false">取消</el-button>
    </template>
  </el-dialog>

  <!--部门-->
  <el-dialog
      v-model="drawer2"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title=""
  >
    <UserTableDept
        @choose="chooseDept"
    />
    <template #footer>
      <el-button plain @click="drawer2=false">取消</el-button>
    </template>
  </el-dialog>

  <!--用户组-->
  <el-dialog
      v-model="drawer3"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title=""
  >
    <UserTableUserGroup
        @choose="chooseUserGroup"
    />
    <template #footer>
      <el-button plain @click="drawer3=false">取消</el-button>
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
        <el-form-item v-if="dialogType.value!==final.ins" :label="userTableDefaultPermissionDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="userTableDefaultPermissionDict.tableName" prop="tableName">
              <el-input v-model="state.dialogForm.tableName" :placeholder="userTableDefaultPermissionDict.tableName"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="userTableDefaultPermissionDict.permType" prop="permType">
              <!--<el-input v-model="state.dialogForm.permType" :placeholder="userTableDefaultPermissionDict.permType"/>-->
              <el-radio-group v-model="state.dialogForm.permType">
                <el-radio :value="T_ROLE">{{ uTDPTypeDict[T_ROLE] }}</el-radio>
                <el-radio :value="T_DEPT">{{ uTDPTypeDict[T_DEPT] }}</el-radio>
                <el-radio :value="T_UG">{{ uTDPTypeDict[T_UG] }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="userTableDefaultPermissionDict.permId" prop="permId">
              <!--<el-input-number v-model="state.dialogForm.permId" controls-position="right"/>-->
              <div>
                <div v-if="state.dialogForm.permType === T_ROLE">
                  <div v-if="selectRole">
                    {{ selectRole.label }}
                  </div>
                  <div v-else>未选择</div>
                </div>
                <div v-if="state.dialogForm.permType === T_DEPT">
                  <div v-if="selectDept">
                    {{ selectDept.label }}
                  </div>
                  <div v-else>未选择</div>
                </div>
                <div v-if="state.dialogForm.permType === T_UG">
                  <div v-if="selectUserGroup">
                    {{ selectUserGroup.label }}
                  </div>
                  <div v-else>未选择</div>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;
              <el-button @click="selectPerm">点此选择</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <!--在此上方添加表单项-->
        <!--<el-form-item :label="userTableDefaultPermissionDict.orderNum" prop='orderNum'>-->
        <!--  <el-input-number v-model="state.dialogForm.orderNum" controls-position="right"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="userTableDefaultPermissionDict.ifDefault" prop='ifDefault'>-->
        <!--  <el-switch v-model="state.dialogForm.ifDefault" :active-value='final.Y' :inactive-value='final.N'/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="userTableDefaultPermissionDict.ifDisabled" prop='ifDisabled'>-->
        <!--  <el-radio-group v-model="state.dialogForm.ifDisabled">-->
        <!--    <el-radio :value="final.Y">是</el-radio>-->
        <!--    <el-radio :value="final.N">否</el-radio>-->
        <!--  </el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="userTableDefaultPermissionDict.ifDisabled" prop="ifDisabled">-->
        <!--  <el-switch v-model="state.dialogForm.ifDisabled" :active-value="final.N" :inactive-value="final.Y"/>-->
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
          <!--在此下方添加表格列-->
          <el-table-column prop="tableName" :label="userTableDefaultPermissionDict.tableName" width="300">
            <template #header>
              <span :class="ifRequired('tableName')?'tp-table-header-required':''">{{ userTableDefaultPermissionDict.tableName }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-tableName`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].tableName" :placeholder="userTableDefaultPermissionDict.tableName"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="permType" :label="userTableDefaultPermissionDict.permType" width="300">
            <template #header>
              <span :class="ifRequired('permType')?'tp-table-header-required':''">{{ userTableDefaultPermissionDict.permType }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-permType`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <!--<el-input v-model="state.dialogForms[$index].permType" :placeholder="userTableDefaultPermissionDict.permType"/>-->
                <el-radio-group v-model="state.dialogForms[$index].permType">
                  <el-radio :value="T_ROLE">{{ uTDPTypeDict[T_ROLE] }}</el-radio>
                  <el-radio :value="T_DEPT">{{ uTDPTypeDict[T_DEPT] }}</el-radio>
                  <el-radio :value="T_UG">{{ uTDPTypeDict[T_UG] }}</el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="permId" :label="userTableDefaultPermissionDict.permId" width="300">
            <template #header>
              <span :class="ifRequired('permId')?'tp-table-header-required':''">{{ userTableDefaultPermissionDict.permId }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-permId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].permId" controls-position="right"/>
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
      <el-form-item :label="userTableDefaultPermissionDict.tableName" prop="tableName">
        <el-input v-model="state.filterForm.tableName" :placeholder="userTableDefaultPermissionDict.tableName"/>
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
      <!--<el-table-column fixed prop="id" :label="userTableDefaultPermissionDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="tableName" :label="userTableDefaultPermissionDict.tableName" width="180"/>
      <el-table-column prop="permType" :label="userTableDefaultPermissionDict.permType" width="120">
        <template #default="{row}">
          {{ uTDPTypeDict[row.permType as TUTDPType] }}
        </template>
      </el-table-column>
      <el-table-column prop="permId" :label="userTableDefaultPermissionDict.permId" width="300">
        <template #default="{row}">
          <template v-if="row.permType===T_ROLE">
            {{ allRolesOfThisPage.find(item => item.id === row.permId)?.label }}
          </template>
          <template v-if="row.permType===T_DEPT">
            {{ allDeptsOfThisPage.find(item => item.id === row.permId)?.label }}
          </template>
          <template v-if="row.permType===T_UG">
            {{ allUserGroupsOfThisPage.find(item => item.id === row.permId)?.label }}
          </template>
        </template>
      </el-table-column>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createRole" :label="userTableDefaultPermissionDict.createRole" width="120"/>-->
      <!--<el-table-column prop="updateRole" :label="userTableDefaultPermissionDict.updateRole" width="120"/>-->
      <!--<el-table-column prop="createBy" :label="userTableDefaultPermissionDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="userTableDefaultPermissionDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="userTableDefaultPermissionDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="userTableDefaultPermissionDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="userTableDefaultPermissionDict.deleted" width="60"/>-->
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
