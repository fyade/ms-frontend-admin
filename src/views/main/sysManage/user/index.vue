<script lang="ts">
export default {
  name: 'main:sysManage:user'
}
</script>

<script setup lang="ts">
import { provide, reactive, Ref, ref } from "vue"
import { CONFIG, final, Operate } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { UserDto, UserDto2, UserDto_, UserUpdDto } from "@/type/module/main/sysManage/user.ts";
import { newUser, resetUserPsd, userApi } from "@/api/module/main/sysManage/user.ts";
import { userDict } from "@/dict/module/main/sysManage/user.ts";
import { deepClone } from "@/utils/ObjectUtils.ts";
import { fileBaseUrl } from "@/api/request.ts";
import UserDept from "@/views/main/sysManage/user/userDept.vue";
import { userDeptApi, userDeptUpdUD } from "@/api/module/main/sysManage/userDept.ts";
import { DeptDto } from "@/type/module/main/sysManage/dept.ts";
import { UserGroupDto } from "@/type/module/algorithm/userGroup.ts";
import { RoleDto } from "@/type/module/main/sysManage/role.ts";
import UserRole from "@/views/main/sysManage/user/userRole.vue";
import { userRoleApi, userRoleUpdUR } from "@/api/module/main/sysManage/userRole.ts";

const state = reactive<State2<UserDto, UserUpdDto>>({
  dialogForm: {
    id: '',
    username: '',
    password: '123456'
  },
  filterForm: {
    username: '',
    nickname: ''
  },
})
const dFormRules: FormRules = {
  username: [{required: true, trigger: 'change'}],
  password: [{required: true, trigger: 'change'}]
}
const config = new TablePageConfig({
  selectParam: {
    ifWithRole: final.Y
  },
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
} = funcTablePage<UserDto, UserUpdDto>({
  state,
  dFormRules,
  config,
  api: userApi,
  dict: userDict,
})

// 重置密码
const defaultNewPsd = '123456'
const newPsd = reactive({
  id: '',
  password: ''
})
const newPsdRule = {
  password: [{required: true, trigger: 'change'}],
}
const newpsdDialog = ref(false)
const resetPsd = (id: string) => {
  newPsd.id = id
  newPsd.password = defaultNewPsd
  newpsdDialog.value = true
}
const npCan = () => {
  newpsdDialog.value = false
}
const npCon = () => {
  resetUserPsd(newPsd).then(res => {
    newpsdDialog.value = false
    ElMessage.success('密码已重置。')
  })
}
const dCon2 = () => {
  if (dialogFormRef.value) {
    dialogFormRef.value.validate((valid, fields) => {
      if (valid) {
        newUser({
          username: state.dialogForm.username as string,
          password: state.dialogForm.password as string
        }).then(res => {
          if (res) {
            ElMessage.success(Operate.success)
            dialogVisible.value = false
            refresh()
          }
        })
      } else {
        if (fields) {
          let arr: string[] = []
          Object.keys(fields).forEach(item => arr.push(userDict[item as keyof typeof userDict] as string))
          ElMessage.warning(`${arr.join('、')}不能为空。`)
        }
      }
    })
  }
}

// 用户角色
// const userRole: Ref<InstanceType<typeof UserRole> | null> = ref<InstanceType<typeof UserRole> | null>(null)
const drawer = ref(false)
const selectUser = ref<UserDto2>({
  id: '',
  username: '',
  nickname: ''
})
const selectRole = ref<number[]>([])
const manageRole = (row: UserDto_) => {
  selectUser.value = deepClone(row)
  userRoleApi.selectAll({userId: selectUser.value.id}).then(res => {
    selectRole.value = res.map(item => item.roleId)
    drawer.value = true
  })
}
const drawerConfirmUserRole = () => {
  const obj = {
    userId: selectUser.value.id,
    roleId: selectRole.value
  }
  userRoleUpdUR(obj).then(res => {
    if (res) {
      drawer.value = false
      gRefresh()
    }
  })
}
const drawerCancelUserRole = () => {
  drawer.value = false
}
provide('changeSelectRole', selectRole)

// 用户部门
// const userDept: Ref<InstanceType<typeof UserDept> | null> = ref<InstanceType<typeof UserDept> | null>(null)
const drawer2 = ref(false)
const selectDept = ref<number[]>([])
const manageDept = (row: UserDto_) => {
  selectUser.value = deepClone(row)
  userDeptApi.selectAll({userId: selectUser.value.id}).then(res => {
    selectDept.value = res.map(item => item.deptId)
    drawer2.value = true
  })
}
const drawerConfirmUserDept = () => {
  const param = {
    userId: selectUser.value.id,
    deptId: selectDept.value
  }
  userDeptUpdUD(param).then(res => {
    if (res) {
      drawer2.value = false
      gRefresh()
    }
  })
}
const drawerCancelUserDept = () => {
  drawer2.value = false
}
provide('changeSelectDept', selectDept)
</script>

<template>
  <!--用户角色-->
  <el-dialog
      v-model="drawer"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title="分配角色"
  >
    <UserRole
        :user="selectUser"
    />
    <template #footer>
      <el-button plain @click="drawerCancelUserRole">取消</el-button>
      <el-button type="primary" plain @click="drawerConfirmUserRole">提交</el-button>
    </template>
  </el-dialog>

  <!--用户部门-->
  <el-dialog
      v-model="drawer2"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title="分配部门"
  >
    <UserDept
        :user="selectUser"
    />
    <template #footer>
      <el-button plain @click="drawerCancelUserDept">取消</el-button>
      <el-button type="primary" plain @click="drawerConfirmUserDept">提交</el-button>
    </template>
  </el-dialog>

  <!--重置密码-->
  <el-dialog
      :width="CONFIG.dialog_width"
      v-model="newpsdDialog"
      title="重置密码"
      draggable
      append-to-body
  >
    <el-form
        :model="newPsd"
        :label-width="CONFIG.dialog_form_label_width"
        :rules="newPsdRule"
    >
      <el-form-item :label="userDict.id" prop="id">
        <span>{{ newPsd.id }}</span>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="newPsd.password" placeholder="新密码"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="npCan">取消</el-button>
        <el-button type="primary" @click="npCon">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!--弹窗-->
  <el-dialog
      :width="CONFIG.dialog_width"
      v-model="dialogVisible"
      :title="dialogType.label"
      draggable
      append-to-body
  >
    <el-form
        ref="dialogFormRef"
        v-loading="dialogLoadingRef"
        :model="state.dialogForm"
        :label-width="CONFIG.dialog_form_label_width"
        :rules="dFormRules"
    >
      <el-form-item v-if="dialogType.value!==final.ins" :label="userDict.id" prop="id">
        <span>{{ state.dialogForm.id }}</span>
      </el-form-item>
      <!--
      第一个input添加如下属性
      v-focus
      -->
      <!--在此下方添加表单项-->
      <el-row>
        <el-col :span="12">
          <el-form-item :label="userDict.username" prop="username">
            <el-input v-model="state.dialogForm.username" :placeholder="userDict.username"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="dialogType.value!==final.ins?userDict.password:'初始密码'" prop="password">
            <el-input v-model="state.dialogForm.password" :placeholder="userDict.password"/>
          </el-form-item>
        </el-col>
      </el-row>
      <!--在此上方添加表单项-->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dCan">取消</el-button>
        <el-button type="primary" @click="dCon2">确认</el-button>
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
      <el-form-item :label="userDict.username" prop="username">
        <el-input v-model="state.filterForm.username" :placeholder="userDict.username"/>
      </el-form-item>
      <el-form-item :label="userDict.nickname" prop="nickname">
        <el-input v-model="state.filterForm.nickname" :placeholder="userDict.nickname"/>
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
    <el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>
    <!--</el-button-group>-->
  </div>

  <div class="zs-table-data">
    <!--数据表格-->
    <el-table
        v-loading="tableLoadingRef"
        :data="tableData"
        @selection-change="handleSelectionChange"
    >
      <!--<el-table-column fixed type="selection" width="55"/>-->
      <el-table-column fixed prop="id" :label="userDict.id" width="80"/>
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="username" :label="userDict.username" width="120"/>
      <el-table-column prop="nickname" :label="userDict.nickname" width="120"/>
      <el-table-column prop="avatar" :label="userDict.avatar" width="120">
        <template #default="{row}">
          <el-image style="width: 50px;height: 50px;border-radius: 8px;" :src="fileBaseUrl+row.avatar" fit="contain">
            <template #error>
              <div></div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="roles" :label="userDict.roles" width="240">
        <template #default="{row}">
          <el-space wrap>
            <el-tag v-if="row.ifTopAdmin" type="success">超级管理员</el-tag>
            <el-tag v-for="item in row.roles as RoleDto[]" :key="item.id" type="primary">{{ item.label }}</el-tag>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column prop="depts" :label="userDict.depts" width="240">
        <template #default="{row}">
          <el-space wrap>
            <el-tag v-for="item in (row.depts as DeptDto[])" :key="item.id" type="primary">{{ item.label }}</el-tag>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column prop="ugs" :label="userDict.ugs" width="240">
        <template #default="{row}">
          <el-space wrap>
            <el-tag v-for="item in (row.ugs as UserGroupDto[])" :key="item.id" type="primary">{{ item.label }}</el-tag>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column prop="sex" :label="userDict.sex" width="120"/>
      <el-table-column prop="email" :label="userDict.email" width="120"/>
      <el-table-column prop="tel" :label="userDict.tel" width="120"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="userDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="userDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="userDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="userDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="userDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <el-table-column fixed="right" label="操作" min-width="200">
        <template #default="{row}">
          <!--<el-button link type="primary" size="small" @click="tUpd(row.id)">修改</el-button>-->
          <!--<el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>-->
          <el-button link type="primary" size="small" @click="resetPsd(row.id)">重置密码</el-button>
          <el-button link type="primary" size="small" @click="manageRole(row)">分配角色</el-button>
          <el-button link type="primary" size="small" @click="manageDept(row)">分配部门</el-button>
          <!--<el-button link type="primary" size="small" @click="manageUserGroup(row)">分配用户组</el-button>-->
        </template>
      </el-table-column>
      <!--<template #append>-->
      <!--  <div class="el-table-append-box">-->
      <!--    <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${multipleSelection.length} 条数据。` }}</span>-->
      <!--  </div>-->
      <!--</template>-->
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
