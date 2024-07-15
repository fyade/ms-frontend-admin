<script setup lang="ts">
import { userRoleDel, userRoleSelAll, userRoleUpdRU } from "@/api/module/sysManage/userRole.ts";
import { userSelByIds, userSelList } from "@/api/module/sysManage/user.ts";
import { computed, reactive, ref } from "vue";
import { fileBaseUrl } from "@/api/request.ts";
import { CONFIG, PAGINATION, publicDict } from "@/utils/base.ts";
import { Plus, Refresh } from "@element-plus/icons-vue";
import Pagination from "@/components/pagination/pagination.vue";
import { ElMessageBox } from "element-plus";

const props = defineProps({
  selectRole: {
    type: Object,
    required: true
  }
})

const state = reactive({
  total: -1,
  pageParam: {
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  },
  table2: [],
  table2Loading: false
})
const userDict = {
  ...publicDict,
  username: '用户名',
  nickname: '昵称',
  password: '密码',
  avatar: '头像',
  sex: '性别',
  email: '邮箱',
  tel: '电话',
  roles: '角色'
}
const userDialogFilterForm = reactive({
  id: '',
  username: '',
  nickname: ''
})
const tableLoadingRef = ref(false)
const usersOfThisRole = ref([])
const userRolesOfThisRole = ref([])
const getInfo = () => {
  usersOfThisRole.value = []
  userRolesOfThisRole.value = []
  tableLoadingRef.value = true
  userRoleSelAll({roleId: props.selectRole.id}).then(res => {
    userRolesOfThisRole.value = res
    userSelByIds(res.map((item: any) => item.userId)).then(res => {
      usersOfThisRole.value = res
      tableLoadingRef.value = false
    })
  })
}
getInfo()

const addUser = () => {
  addUserDialog.value = true
  selectRows.value = []
}
const addUserDialog = ref(false)
const ifAllNull = computed(() => Object.values(userDialogFilterForm).every(item => !!!item))
const userDialogGetData = () => {
  if (ifAllNull.value) {
    ElMessage.warning('请输入筛选条件。')
    return;
  }
  state.table2Loading = true
  state.table2 = []
  userSelList({...state.pageParam, ...userDialogFilterForm}).then(res => {
    state.total = res.total
    state.table2 = res.list
    state.table2Loading = false
  })
}
const filterFormRef = ref<any>(null)
const userDialogClear = () => {
  filterFormRef.value?.resetFields()
  state.table2 = []
}
const pageChange = (newVal: any) => {
  state.pageParam.pageNum = newVal.pageNum
  state.pageParam.pageSize = newVal.pageSize
  userDialogGetData()
}
const selectRows = ref([])
const handleSelectionChange = (val: any) => {
  selectRows.value = val
}
const dialogCancel = () => {
  addUserDialog.value = false
  selectRows.value = []
}
const dialogConfirm = () => {
  const param = {
    userId: selectRows.value.map((item: any) => item.id),
    roleId: props.selectRole.id
  }
  userRoleUpdRU(param).then(res => {
    getInfo()
    dialogCancel()
  })
}

const deleteUserRole = (userId: any) => {
  ElMessageBox.confirm(
      `此操作将删除选中的 1 条数据，且无法撤销，请确认是否继续？`,
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        draggable: true
      }
  ).then(() => {
    const find: any = userRolesOfThisRole.value.find((item: any) => item.userId = userId)
    if (find) {
      userRoleDel([find.id]).then(res => {
        if (res) {
          getInfo()
        }
      })
    }
  })
}
</script>

<template>
  <!--角色信息-->
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">角色信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item label="角色名">
          <el-input disabled v-model="props.selectRole.label"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否管理员权限">
          <el-input disabled v-model="props.selectRole.ifAdmin"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否禁用">
          <el-input disabled v-model="props.selectRole.ifDisabled"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <!--用户列表-->
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">用户列表</el-text>
  </el-divider>
  <!--弹窗，用于新增时的选择-->
  <el-dialog
      :width="CONFIG.dialog_width_wider"
      v-model="addUserDialog"
      title="选择用户"
      draggable
      append-to-body
  >
    <el-form
        class="demo-form-inline"
        :model="userDialogFilterForm"
        :inline="true"
        ref="filterFormRef"
        @keyup.enter="userDialogGetData"
    >
      <el-form-item :label="userDict['id']" prop="id">
        <el-input v-model="userDialogFilterForm['id']" :placeholder="userDict['id']"/>
      </el-form-item>
      <el-form-item :label="userDict['username']" prop="username">
        <el-input v-model="userDialogFilterForm['username']" :placeholder="userDict['username']"/>
      </el-form-item>
      <el-form-item :label="userDict['nickname']" prop="nickname">
        <el-input v-model="userDialogFilterForm['nickname']" :placeholder="userDict['nickname']"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userDialogGetData">筛选</el-button>
        <el-button @click="userDialogClear">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
        v-loading="state.table2Loading"
        :data="state.table2"
        @selection-change="handleSelectionChange"
    >
      <template #empty>
        <template v-if="ifAllNull">
          <el-tag type="warning">请输入筛选条件，随后点击“筛选”按钮。</el-tag>
        </template>
      </template>
      <el-table-column fixed type="selection" width="55"/>
      <!--<el-table-column fixed type="selection" width="55"/>-->
      <el-table-column fixed prop="id" :label="userDict['id']" width="80"/>
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="username" :label="userDict['username']" width="120"/>
      <el-table-column prop="nickname" :label="userDict['nickname']" width="120"/>
      <el-table-column prop="avatar" :label="userDict['avatar']" width="120">
        <template #default="{row}">
          <el-image style="width: 50px;height: 50px;border-radius: 8px;" :src="fileBaseUrl+row.avatar" fit="contain">
            <template #error>
              <div></div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="sex" :label="userDict['sex']" width="120"/>
      <el-table-column prop="email" :label="userDict['email']" width="120"/>
      <el-table-column prop="tel" :label="userDict['tel']" width="120"/>
    </el-table>
    <Pagination
        v-if="state.total!==-1"
        :total="Number(state.total)"
        :page-num="state.pageParam.pageNum"
        :page-size="state.pageParam.pageSize"
        @page-change="pageChange"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogCancel">取消</el-button>
        <el-button type="primary" @click="dialogConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-button type="primary" plain :icon="Refresh" @click="getInfo">刷新</el-button>
  <el-button type="primary" plain :icon="Plus" @click="addUser">添加用户</el-button>

  <!--当前角色的用户-->
  <el-table
      v-loading="tableLoadingRef"
      :data="usersOfThisRole"
  >
    <!--<el-table-column fixed type="selection" width="55"/>-->
    <el-table-column fixed prop="id" :label="userDict['id']" width="80"/>
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="username" :label="userDict['username']" width="120"/>
    <el-table-column prop="nickname" :label="userDict['nickname']" width="120"/>
    <el-table-column prop="avatar" :label="userDict['avatar']" width="120">
      <template #default="{row}">
        <el-image style="width: 50px;height: 50px;border-radius: 8px;" :src="fileBaseUrl+row.avatar" fit="contain">
          <template #error>
            <div></div>
          </template>
        </el-image>
      </template>
    </el-table-column>
    <el-table-column prop="sex" :label="userDict['sex']" width="120"/>
    <el-table-column prop="email" :label="userDict['email']" width="120"/>
    <el-table-column prop="tel" :label="userDict['tel']" width="120"/>
    <el-table-column fixed="right" label="操作" min-width="200">
      <template #default="{row}">
        <el-button link type="danger" size="small" @click="deleteUserRole(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>