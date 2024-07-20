<script lang="ts">
export default {
  name: 'sysManage:user'
}
</script>

<script setup lang="ts">
import { provide, reactive, Ref, ref } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.js"
import { State, t_config, t_FuncMap } from "@/type/tablePage.ts";
import { ElMessage, FormRules } from 'element-plus'
import { Plus, Refresh } from "@element-plus/icons-vue";
import { newUser, resetUserPsd, userSelList } from "@/api/module/sysManage/user.ts";
import UserRole from "./userRole.vue";
import { userDto, userDto2 } from "@/type/api/sysManage/user.ts";
import { userRoleUpdUR } from "@/api/module/sysManage/userRole.ts";
import { deepClone } from "@/utils/ObjectUtils.ts";
import { fileBaseUrl } from "@/api/request.ts";
import UserDept from "@/views/sysManage/user/userDept.vue";
import { userDeptUpdUD } from "@/api/module/sysManage/userDept.ts";
import { deptDto } from "@/type/api/sysManage/dept.ts";
import { userGroupDto } from "@/type/api/sysManage/userGroup.ts";
import UserUserGroup from "@/views/sysManage/user/userUserGroup.vue";
import { userUserGroupUpdUUG } from "@/api/module/sysManage/userUserGroup.ts";

const state = reactive({
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
    username: '',
    password: '123456'
  },
  // 这个是弹出框表单校验
  // 格式: {
  //   name: [{ required: true, trigger: 'change' }],
  //   ...
  // }
  dFormRules: {
    username: [{required: true, trigger: 'change'}],
    password: [{required: true, trigger: 'change'}]
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    username: '用户名',
    nickname: '昵称',
    password: '密码',
    avatar: '头像',
    sex: '性别',
    email: '邮箱',
    tel: '电话',
    roles: '角色',
    depts: '部门',
    ugs: '用户组',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    username: '',
    nickname: ''
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
const filterFormRef = ref(null)
const dialogVisible = ref(false)
const dialogLoadingRef = ref(false)
const tableLoadingRef = ref(false)
const switchLoadingRef = ref(false)
const config: t_config = reactive({
  selectParam: {
    ifWithRole: final.Y
  }, // 查询参数（补充
  getDataOnMounted: true, // 页面加载时获取数据，默认true
  pageQuery: true, // 分页，默认true
  watchDialogVisible: true, // 监听dialogVisible变化，默认true
  /**
   * dialogVisible变化时的回调函数，可不传
   * @param visible 变化后的值
   */
  dialogVisibleCallback: (visible: boolean) => {
  },
  selectListCallback: () => {
  }
})

const func: t_FuncMap = {
  /**
   * 查询列表
   * @param params
   */
  selectList: (params: any) => {
    return userSelList(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    // return func(id)
    return new Promise((resolve, reject) => {
      reject()
    })
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return newUser(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    // return func(obj)
    return new Promise((resolve, reject) => {
      reject()
    })
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    // return func(...ids)
    return new Promise((resolve, reject) => {
      reject()
    })
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
  tUpd,
  tDel,
  handleSelectionChange,
  pageChange
} = funcTablePage({
  config,
  state,
  state2,
  dialogFormRef,
  filterFormRef,
  dialogVisible,
  dialogLoadingRef,
  tableLoadingRef,
  switchLoadingRef,
  func
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
const resetPsd = (id: any) => {
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

// 用户角色
const userRole: Ref<InstanceType<typeof UserRole> | null> = ref<InstanceType<typeof UserRole> | null>(null)
const drawer = ref(false)
const selectUser = ref<userDto2>({
  id: '',
  username: '',
  nickname: ''
})
const selectRole = ref<any[]>([])
const manageRole = (row: any) => {
  selectUser.value = deepClone(row)
  selectRole.value = deepClone(row.roles)
  drawer.value = true
}
const drawerConfirmUserRole = () => {
  const obj = {
    userId: selectUser.value.id,
    roleId: selectRole.value.map(item => item.id)
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
const userDept: Ref<InstanceType<typeof UserDept> | null> = ref<InstanceType<typeof UserDept> | null>(null)
const drawer2 = ref(false)
const selectDept = ref<any[]>([])
const manageDept = (row: any) => {
  selectUser.value = deepClone(row)
  selectDept.value = deepClone(row.depts)
  drawer2.value = true
}
const drawerConfirmUserDept = () => {
  const param = {
    userId: selectUser.value.id,
    deptId: selectDept.value.map(item => item.id)
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

// 用户用户组
const userUserGroup: Ref<InstanceType<typeof UserUserGroup> | null> = ref<InstanceType<typeof UserUserGroup> | null>(null)
const drawer3 = ref(false)
const selectUserGroup = ref<any[]>([])
const manageUserGroup = (row: any) => {
  selectUser.value = deepClone(row)
  selectUserGroup.value = deepClone(row.ugs)
  drawer3.value = true
}
const drawerConfirmUserUserGroup = () => {
  const param = {
    userId: selectUser.value.id,
    userGroupId: selectUserGroup.value.map(item => item.id)
  }
  userUserGroupUpdUUG(param).then(res => {
    if (res) {
      drawer3.value = false
      gRefresh()
    }
  })
}
const drawerCancelUserUserGroup = () => {
  drawer3.value = false
}
provide('changeSelectUserGroup', selectUserGroup)
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
        ref="userRole"
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
        ref="userDept"
        :user="selectUser"
    />
    <template #footer>
      <el-button plain @click="drawerCancelUserDept">取消</el-button>
      <el-button type="primary" plain @click="drawerConfirmUserDept">提交</el-button>
    </template>
  </el-dialog>

  <!--用户用户组-->
  <el-dialog
      v-model="drawer3"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title="分配用户组"
  >
    <UserUserGroup
        ref="userUserGroup"
        :user="selectUser"
    />
    <template #footer>
      <el-button plain @click="drawerCancelUserUserGroup">取消</el-button>
      <el-button type="primary" plain @click="drawerConfirmUserUserGroup">提交</el-button>
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
      <el-form-item :label="state.dict['id']" prop="id">
        <span>{{ newPsd['id'] }}</span>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="newPsd['password']" placeholder="新密码"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="npCan">取消</el-button>
        <el-button type="primary" @click="npCon">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!--弹框-->
  <el-dialog
      :width="CONFIG.dialog_width"
      v-model="dialogVisible"
      :title="state.dialogType.label"
      draggable
      append-to-body
  >
    <el-form
        ref="dialogFormRef"
        v-loading="dialogLoadingRef"
        :model="state.dialogForm"
        :label-width="CONFIG.dialog_form_label_width"
        :rules="state.dFormRules"
    >
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
          <el-form-item :label="state.dict['username']" prop="username">
            <el-input v-model="state.dialogForm['username']" :placeholder="state.dict['username']"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="state.dialogType.value!==final.ins?state.dict['password']:'初始密码'" prop="password">
            <el-input v-model="state.dialogForm['password']" :placeholder="state.dict['password']"/>
          </el-form-item>
        </el-col>
      </el-row>
      <!--在此上方添加表单项-->
    </el-form>
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
    <el-form-item :label="state.dict['username']" prop="username">
      <el-input v-model="state.filterForm['username']" :placeholder="state.dict['username']"/>
    </el-form-item>
    <el-form-item :label="state.dict['nickname']" prop="nickname">
      <el-input v-model="state.filterForm['nickname']" :placeholder="state.dict['nickname']"/>
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
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
    <el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>
    <!--</el-button-group>-->
  </div>

  <!--数据表格-->
  <el-table
      v-loading="tableLoadingRef"
      :data="state.list"
      @selection-change="handleSelectionChange"
  >
    <!--<el-table-column fixed type="selection" width="55"/>-->
    <el-table-column fixed prop="id" :label="state.dict['id']" width="80"/>
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="username" :label="state.dict['username']" width="120"/>
    <el-table-column prop="nickname" :label="state.dict['nickname']" width="120"/>
    <el-table-column prop="avatar" :label="state.dict['avatar']" width="120">
      <template #default="{row}">
        <el-image style="width: 50px;height: 50px;border-radius: 8px;" :src="fileBaseUrl+row.avatar" fit="contain">
          <template #error>
            <div></div>
          </template>
        </el-image>
      </template>
    </el-table-column>
    <el-table-column prop="roles" :label="state.dict['roles']" width="240">
      <template #default="{row}">
        <el-space wrap>
          <el-tag v-if="row.ifTopAdmin" type="success">超级管理员</el-tag>
          <el-tag v-for="item in row.roles as any[]" :key="item.id" type="primary">{{ item.label }}</el-tag>
        </el-space>
      </template>
    </el-table-column>
    <el-table-column prop="depts" :label="state.dict['depts']" width="240">
      <template #default="{row}">
        <el-space wrap>
          <el-tag v-for="item in (row.depts as deptDto[])" :key="item.id" type="primary">{{ item.label }}</el-tag>
        </el-space>
      </template>
    </el-table-column>
    <el-table-column prop="ugs" :label="state.dict['ugs']" width="240">
      <template #default="{row}">
        <el-space wrap>
          <el-tag v-for="item in (row.ugs as userGroupDto[])" :key="item.id" type="primary">{{ item.label }}</el-tag>
        </el-space>
      </template>
    </el-table-column>
    <el-table-column prop="sex" :label="state.dict['sex']" width="120"/>
    <el-table-column prop="email" :label="state.dict['email']" width="120"/>
    <el-table-column prop="tel" :label="state.dict['tel']" width="120"/>
    <!--在此上方添加表格列-->
    <!--<el-table-column prop="createBy" :label="state.dict['createBy']" width="120"/>-->
    <!--<el-table-column prop="updateBy" :label="state.dict['updateBy']" width="120"/>-->
    <!--<el-table-column prop="createTime" :label="state.dict['createTime']" width="220"/>-->
    <!--<el-table-column prop="updateTime" :label="state.dict['updateTime']" width="220"/>-->
    <!--<el-table-column prop="deleted" :label="state.dict['deleted']" width="60"/>-->
    <!--上方几个酌情使用-->
    <el-table-column fixed="right" label="操作" min-width="200">
      <template #default="{row}">
        <!--<el-button link type="primary" size="small" @click="tUpd(row.id)">修改</el-button>-->
        <!--<el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>-->
        <el-button link type="primary" size="small" @click="resetPsd(row.id)">重置密码</el-button>
        <el-button link type="primary" size="small" @click="manageRole(row)">分配角色</el-button>
        <el-button link type="primary" size="small" @click="manageDept(row)">分配部门</el-button>
        <el-button link type="primary" size="small" @click="manageUserGroup(row)">分配用户组</el-button>
      </template>
    </el-table-column>
    <!--<template #append>-->
    <!--  <div class="el-table-append-box">-->
    <!--    <span>此表格的多选<span-->
    <!--        class="underline">不支持</span>{{ `跨分页保存，当前已选 ${state.multipleSelection.length} 条数据。` }}</span>-->
    <!--  </div>-->
    <!--</template>-->
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