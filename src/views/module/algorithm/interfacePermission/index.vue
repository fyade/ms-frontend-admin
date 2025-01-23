<script lang="ts">
export default {
  name: 'algorithm:interfacePermission'
}
</script>

<script setup lang="ts">
import { reactive, ref, toRaw, useTemplateRef, watch } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts"
import { State2, TablePageConfig } from "@/type/tablePage.ts"
import { ElMessageBox, FormRules, TableInstance } from 'element-plus'
import { Delete, Download, Edit, Plus, Refresh, Upload, Search, View } from "@element-plus/icons-vue";
import { UserGroupDto, UserGroupUpdDto } from "@/type/module/algorithm/userGroup.ts";
import { userGroupApi } from "@/api/module/algorithm/userGroup.ts"
import { InterfaceGroupDto, InterfaceGroupUpdDto } from "@/type/module/algorithm/interfaceGroup.ts";
import Divider from "@/views/module/algorithm/interfacePermission/divider.vue";
import { UserGroupPermissionDto, UserGroupPermissionUpdDto } from "@/type/module/algorithm/userGroupPermission.ts";
import { userGroupPermissionApi } from "@/api/module/algorithm/userGroupPermission.ts"
import { copyObject, deepClone } from "@/utils/ObjectUtils.ts";
import LogAlgorithmCall from "@/views/module/algorithm/interfacePermission/logAlgorithmCall.vue";
import { interfaceGroupDict } from "@/dict/module/algorithm/interfaceGroup.ts";
import { interfaceGroupApi } from "@/api/module/algorithm/interfaceGroup.ts";
import { userGroupDict } from "@/dict/module/algorithm/userGroup.ts";
import { userGroupPermissionDict } from "@/dict/module/algorithm/userGroupPermission.ts";

const userGroupState = reactive<State2<UserGroupDto, UserGroupUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    parentId: final.DEFAULT_PARENT_ID,
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    label: ''
  },
})
const userGroupDFormRules: FormRules = {
  label: [{required: true, trigger: 'change'}],
  parentId: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
}
const userGroupConfig = new TablePageConfig({
  bulkOperation: true,
})

const {
  dialogFormRef: userGroupDialogFormRef,
  dialogFormsRef: userGroupDialogFormsRef,
  filterFormRef: userGroupFilterFormRef,
  filterFormVisible1: userGroupFilterFormVisible1,
  filterFormVisible: userGroupFilterFormVisible,
  dialogVisible: userGroupDialogVisible,
  dialogLoadingRef: userGroupDialogLoadingRef,
  dialogButtonLoadingRef: userGroupDialogButtonLoadingRef,
  tableLoadingRef: userGroupTableLoadingRef,
  switchLoadingRef: userGroupSwitchLoadingRef,
  activeTabName: userGroupActiveTabName,
  tableData: userGroupTableData,
  pageParam: userGroupPageParam,
  total: userGroupTotal,
  multipleSelection: userGroupMultipleSelection,
  dialogType: userGroupDialogType,
  refresh: userGroupRefresh,
  dCan: userGroupDCan,
  dCon: userGroupDCon,
  fEnter: userGroupFEnter,
  fCon: userGroupFCon,
  fCan: userGroupFCan,
  gRefresh: userGroupGRefresh,
  gIns: userGroupGIns,
  gUpd: userGroupGUpd,
  gDel: userGroupGDel,
  gExport: userGroupGExport,
  gImport: userGroupGImport,
  gChangeFilterFormVisible: userGroupGChangeFilterFormVisible,
  tUpd: userGroupTUpd,
  tDel: userGroupTDel,
  handleSelectionChange: userGroupHandleSelectionChange,
  pageChange: userGroupPageChange,
  dfIns: userGroupDfIns,
  dfDel: userGroupDfDel,
  ifRequired: userGroupIfRequired,
} = funcTablePage<UserGroupDto, UserGroupUpdDto>({
  state: userGroupState,
  dFormRules: userGroupDFormRules,
  config: userGroupConfig,
  api: userGroupApi,
  dict: userGroupDict,
})

const interfaceGroupState = reactive<State2<InterfaceGroupDto, InterfaceGroupUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    parentId: final.DEFAULT_PARENT_ID,
    perms: '',
    baseURL: '',
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    label: ''
  },
})
const interfaceGroupDFormRules: FormRules = {
  label: [{required: true, trigger: 'change'}],
  parentId: [{required: true, trigger: 'change'}],
  baseURL: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
}
const interfaceGroupConfig = new TablePageConfig({
  bulkOperation: true,
})

const {
  dialogFormRef: interfaceGroupDialogFormRef,
  dialogFormsRef: interfaceGroupDialogFormsRef,
  filterFormRef: interfaceGroupFilterFormRef,
  filterFormVisible1: interfaceGroupFilterFormVisible1,
  filterFormVisible: interfaceGroupFilterFormVisible,
  dialogVisible: interfaceGroupDialogVisible,
  dialogLoadingRef: interfaceGroupDialogLoadingRef,
  dialogButtonLoadingRef: interfaceGroupDialogButtonLoadingRef,
  tableLoadingRef: interfaceGroupTableLoadingRef,
  switchLoadingRef: interfaceGroupSwitchLoadingRef,
  activeTabName: interfaceGroupActiveTabName,
  tableData: interfaceGroupTableData,
  pageParam: interfaceGroupPageParam,
  total: interfaceGroupTotal,
  multipleSelection: interfaceGroupMultipleSelection,
  dialogType: interfaceGroupDialogType,
  refresh: interfaceGroupRefresh,
  dCan: interfaceGroupDCan,
  dCon: interfaceGroupDCon,
  fEnter: interfaceGroupFEnter,
  fCon: interfaceGroupFCon,
  fCan: interfaceGroupFCan,
  gRefresh: interfaceGroupGRefresh,
  gIns: interfaceGroupGIns,
  gUpd: interfaceGroupGUpd,
  gDel: interfaceGroupGDel,
  gExport: interfaceGroupGExport,
  gImport: interfaceGroupGImport,
  gChangeFilterFormVisible: interfaceGroupGChangeFilterFormVisible,
  tUpd: interfaceGroupTUpd,
  tDel: interfaceGroupTDel,
  handleSelectionChange: interfaceGroupHandleSelectionChange,
  pageChange: interfaceGroupPageChange,
  dfIns: interfaceGroupDfIns,
  dfDel: interfaceGroupDfDel,
  ifRequired: interfaceGroupIfRequired,
} = funcTablePage<InterfaceGroupDto, InterfaceGroupUpdDto>({
  state: interfaceGroupState,
  dFormRules: interfaceGroupDFormRules,
  config: interfaceGroupConfig,
  api: interfaceGroupApi,
  dict: interfaceGroupDict,
})

const userGroupPermissionState = reactive<State2<UserGroupPermissionDto, UserGroupPermissionUpdDto>>({
  dialogForm: {
    id: -1,
    userGroupId: -1,
    permissionId: -1,
    ifLongTerm: final.N,
    ifLimitRequestTimes: final.Y,
    ifRejectRequestUseUp: final.Y,
    permissionStartTime: new Date(),
    permissionEndTime: new Date(),
    permissionTime: '',
    limitRequestTimes: 0,
    ifUseUp: '',
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {},
})
const userGroupPermissionDFormRules: FormRules = {
  userGroupId: [{required: true, trigger: 'change'}],
  permissionId: [{required: true, trigger: 'change'}],
  ifLongTerm: [{required: true, trigger: 'change'}],
  ifLimitRequestTimes: [{required: true, trigger: 'change'}],
  ifRejectRequestUseUp: [{required: true, trigger: 'change'}],
  permissionStartTime: [{required: true, trigger: 'change'}],
  permissionEndTime: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
}
const userGroupPermissionConfig = new TablePageConfig({
  bulkOperation: true,
  getDataOnMounted: false,
  pageQuery: false,
  selectListCallback: () => {
    if (selectType.value === USER_GROUP) {
      userGroupHandleCurrentChange2()
    }
    if (selectType.value === INTERFACE_GROUP) {
      interfaceGroupHandleCurrentChange2()
    }
  },
})

const {
  dialogFormRef: userGroupPermissionDialogFormRef,
  dialogFormsRef: userGroupPermissionDialogFormsRef,
  filterFormRef: userGroupPermissionFilterFormRef,
  filterFormVisible1: userGroupPermissionFilterFormVisible1,
  filterFormVisible: userGroupPermissionFilterFormVisible,
  dialogVisible: userGroupPermissionDialogVisible,
  dialogLoadingRef: userGroupPermissionDialogLoadingRef,
  dialogButtonLoadingRef: userGroupPermissionDialogButtonLoadingRef,
  tableLoadingRef: userGroupPermissionTableLoadingRef,
  switchLoadingRef: userGroupPermissionSwitchLoadingRef,
  activeTabName: userGroupPermissionActiveTabName,
  tableData: userGroupPermissionTableData,
  pageParam: userGroupPermissionPageParam,
  total: userGroupPermissionTotal,
  multipleSelection: userGroupPermissionMultipleSelection,
  dialogType: userGroupPermissionDialogType,
  refresh: userGroupPermissionRefresh,
  dCan: userGroupPermissionDCan,
  dCon: userGroupPermissionDCon,
  fEnter: userGroupPermissionFEnter,
  fCon: userGroupPermissionFCon,
  fCan: userGroupPermissionFCan,
  gRefresh: userGroupPermissionGRefresh,
  gIns: userGroupPermissionGIns,
  gUpd: userGroupPermissionGUpd,
  gDel: userGroupPermissionGDel,
  gExport: userGroupPermissionGExport,
  gImport: userGroupPermissionGImport,
  gChangeFilterFormVisible: userGroupPermissionGChangeFilterFormVisible,
  tUpd: userGroupPermissionTUpd,
  tDel: userGroupPermissionTDel,
  handleSelectionChange: userGroupPermissionHandleSelectionChange,
  pageChange: userGroupPermissionPageChange,
  dfIns: userGroupPermissionDfIns,
  dfDel: userGroupPermissionDfDel,
  ifRequired: userGroupPermissionIfRequired,
} = funcTablePage<UserGroupPermissionDto, UserGroupPermissionUpdDto>({
  state: userGroupPermissionState,
  dFormRules: userGroupPermissionDFormRules,
  config: userGroupPermissionConfig,
  api: userGroupPermissionApi,
  dict: userGroupPermissionDict,
})

const USER_GROUP = 'userGroup'
const INTERFACE_GROUP = 'interfaceGroup'
const selectType = ref<typeof USER_GROUP | typeof INTERFACE_GROUP | null>(null)

const userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup = ref<UserGroupPermissionDto[]>([])

const leftCardLoading = ref(false)
const userGroupTableRef = useTemplateRef<TableInstance>('userGroupTableRef')
const selectUserGroupInfo = reactive<UserGroupDto>({
  id: -1,
  label: '',
  parentId: -1,
  orderNum: -1,
  remark: '',
})

class InterfaceGroupDto2 extends InterfaceGroupDto {
  userGroupPermissionId!: number
}

const interfaceGroupsOfThisUserGroup = ref<InterfaceGroupDto2[]>([])
const userGroupHandleCurrentChangeSelectRow = reactive<UserGroupDto>({
  id: -1,
  label: '',
  parentId: -1,
  orderNum: -1,
  remark: '',
})
const userGroupHandleCurrentChange = (row: UserGroupDto) => {
  if (row) {
    interfaceGroupTableRef.value?.setCurrentRow(null)
    copyObject(userGroupHandleCurrentChangeSelectRow, row)
  } else {
    return
  }
  selectType.value = USER_GROUP
  leftCardLoading.value = true
  userGroupApi.selectById(row.id).then(res => {
    copyObject(selectUserGroupInfo, res)
    leftCardLoading.value = false
  })
  userGroupHandleCurrentChange2()
}
const userGroupHandleCurrentChange2 = () => {
  rightCardLoading.value = true
  const row = userGroupHandleCurrentChangeSelectRow
  userGroupPermissionApi.selectAll({userGroupId: row.id}).then(res => {
    userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup.value = res
    const interfaceGroupIds = res.map(item => item.permissionId);
    interfaceGroupApi.selectByIds(interfaceGroupIds).then(res => {
      interfaceGroupsOfThisUserGroup.value = userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup.value.map(item => {
        const find = deepClone<InterfaceGroupDto2>(res.find(r => r.id === item.permissionId)!);
        find.userGroupPermissionId = item.id
        return find
      })
      rightCardLoading.value = false
    })
  })
}
const beforeDelInterfaceGroupOfThisUserGroup = (userGroupPermissionId: number) => {
  const delIds = [userGroupPermissionId]
  delUserGroupPermissions(delIds).then(res => {
    if (res) {
      userGroupHandleCurrentChange2()
    }
  })
}
const detailInterfaceGroupOfThisUserGroup = (userGroupPermissionId: number) => {
  const find = userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup.value.find(item => item.id === userGroupPermissionId);
  if (find) {
    userGroupPermissionDialogLoadingRef.value = true
    userGroupPermissionApi.selectById(find.id).then(res => {
      copyObject(userGroupPermissionState.dialogForm, res)
      userGroupPermissionState.dialogForm.permissionTime = [
        userGroupPermissionState.dialogForm.permissionStartTime,
        userGroupPermissionState.dialogForm.permissionEndTime
      ]
      userGroupPermissionDialogLoadingRef.value = false
    })
    ifAddUserGroupPermission.value = false
    userGroupPermissionDialogType.label = '查看权限详情'
    userGroupPermissionDialogVisible.value = true
  }
}

const rightCardLoading = ref(false)
const interfaceGroupTableRef = useTemplateRef<TableInstance>('interfaceGroupTableRef')
const selectInterfaceGroupInfo = reactive({
  id: -1,
  label: '',
  parentId: -1,
  orderNum: -1,
  remark: '',
})

class UserGroupDto2 extends UserGroupDto {
  userGroupPermissionId!: number
}

const userGroupsOfThisInterfaceGroup = ref<UserGroupDto[]>([])
const interfaceGroupHandleCurrentChangeSelectRow = reactive<InterfaceGroupDto>(new InterfaceGroupDto())
const interfaceGroupHandleCurrentChange = (row: InterfaceGroupDto) => {
  if (row) {
    userGroupTableRef.value?.setCurrentRow(null)
    copyObject(interfaceGroupHandleCurrentChangeSelectRow, row)
  } else {
    return
  }
  selectType.value = INTERFACE_GROUP
  rightCardLoading.value = true
  interfaceGroupApi.selectById(row.id).then(res => {
    copyObject(selectInterfaceGroupInfo, res)
    rightCardLoading.value = false
  })
  interfaceGroupHandleCurrentChange2()
}
const interfaceGroupHandleCurrentChange2 = () => {
  leftCardLoading.value = true
  const row = interfaceGroupHandleCurrentChangeSelectRow
  userGroupPermissionApi.selectAll({permissionId: row.id}).then(res => {
    userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup.value = res
    const userGroupIds = res.map(item => item.userGroupId);
    userGroupApi.selectByIds(userGroupIds).then(res => {
      userGroupsOfThisInterfaceGroup.value = userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup.value.map(item => {
        const find = deepClone<UserGroupDto2>(res.find(r => r.id === item.userGroupId)!)
        find.userGroupPermissionId = item.id
        return find
      })
      leftCardLoading.value = false
    })
  })
}
const beforeDelUserGroupOfThisInterfaceGroup = (userGroupPermissionId: number) => {
  const delIds = [userGroupPermissionId]
  delUserGroupPermissions(delIds).then(res => {
    if (res) {
      interfaceGroupHandleCurrentChange2()
    }
  })
}
const detailUserGroupOfThisInterfaceGroup = (userGroupPermissionId: number) => {
  const find = userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup.value.find(item => item.id === userGroupPermissionId);
  if (find) {
    userGroupPermissionDialogLoadingRef.value = true
    userGroupPermissionApi.selectById(find.id).then(res => {
      copyObject(userGroupPermissionState.dialogForm, res)
      userGroupPermissionState.dialogForm.permissionTime = [
        userGroupPermissionState.dialogForm.permissionStartTime,
        userGroupPermissionState.dialogForm.permissionEndTime
      ]
      userGroupPermissionDialogLoadingRef.value = false
    })
    ifAddUserGroupPermission.value = false
    userGroupPermissionDialogType.label = '查看权限详情'
    userGroupPermissionDialogVisible.value = true
  }
}

const delUserGroupPermissions = (delIds: number[]) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(
        `此操作将删除选中的 ${delIds.length} 条数据，且无法撤销，请确认是否继续？`,
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          draggable: true
        }
    ).then(() => {
      userGroupPermissionApi.deleteList(...delIds)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
    }).catch(err => {
      reject(err)
    })
  })
}

const ifAddUserGroupPermission = ref(false)
const beforeAddUserGroupPermission = () => {
  userGroupPermissionState.dialogForm.permissionTime = ''
  ifAddUserGroupPermission.value = true
  const userGroup = userGroupMultipleSelection.value[0]
  const interfaceGroup = interfaceGroupMultipleSelection.value[0]
  userGroupPermissionState.dialogForm.userGroupId = userGroup.id
  userGroupPermissionState.dialogForm.permissionId = interfaceGroup.id
  userGroupPermissionGIns()
}

watch(() => userGroupPermissionState.dialogForm, () => {
  // 是否长期权限
  if (userGroupPermissionState.dialogForm.ifLongTerm === final.N) {
    userGroupPermissionDFormRules.permissionTime = [{required: true, trigger: 'change'}]
  } else {
    delete userGroupPermissionDFormRules.permissionTime
  }

  // 是否限制次数
  if (userGroupPermissionState.dialogForm.ifLimitRequestTimes === final.Y) {
    userGroupPermissionDFormRules.limitRequestTimes = [{
      required: true,
      trigger: 'change',
      min: 1,
      type: 'number'
    }]
  } else {
    delete userGroupPermissionDFormRules.limitRequestTimes
  }
}, {
  deep: true,
  immediate: true
})
if (Object.keys(userGroupPermissionState.dialogForm).indexOf('permissionTime') > -1) {
  watch(() => userGroupPermissionState.dialogForm.permissionTime, () => {
    if (userGroupPermissionState.dialogForm.permissionTime) {
      userGroupPermissionState.dialogForm.permissionStartTime = new Date(userGroupPermissionState.dialogForm.permissionTime[0])
      userGroupPermissionState.dialogForm.permissionEndTime = new Date(userGroupPermissionState.dialogForm.permissionTime[1])
    } else {
      userGroupPermissionState.dialogForm.permissionStartTime = new Date()
      userGroupPermissionState.dialogForm.permissionEndTime = new Date()
    }
  })
}
const shortcuts = [
  {
    text: '一周',
    value: () => {
      const start = new Date()
      const end = new Date()
      end.setDate(end.getDate() + 7)
      return [start, end]
    },
  },
  {
    text: '两周',
    value: () => {
      const start = new Date()
      const end = new Date()
      end.setDate(end.getDate() + 14)
      return [start, end]
    },
  },
  {
    text: '一个月',
    value: () => {
      const start = new Date()
      const end = new Date()
      end.setMonth(end.getMonth() + 1)
      return [start, end]
    },
  },
  {
    text: '三个月',
    value: () => {
      const start = new Date()
      const end = new Date()
      end.setMonth(end.getMonth() + 3)
      return [start, end]
    },
  },
  {
    text: '半年',
    value: () => {
      const start = new Date()
      const end = new Date()
      end.setMonth(end.getMonth() + 6)
      return [start, end]
    },
  },
  {
    text: '一年',
    value: () => {
      const start = new Date()
      const end = new Date()
      end.setFullYear(end.getFullYear() + 1)
      return [start, end]
    },
  },
]

const useLogVisible = ref(false)
const selectUGPId = ref<number>(-1)
const showUseLog = () => {
  selectUGPId.value = userGroupPermissionState.dialogForm.id
  useLogVisible.value = true
}
const userGroupPermissionDCon2 = () => {
  delete userGroupPermissionState.dialogForm.count
  userGroupPermissionDCon()
}
</script>

<template>
  <!--调用日志弹窗-->
  <el-dialog
      :width="CONFIG.dialog_width_wider"
      v-model="useLogVisible"
      title="算法调用日志"
      draggable
      append-to-body
      destroy-on-close
  >
    <LogAlgorithmCall
        :select-u-g-p-id="selectUGPId"
    />
  </el-dialog>

  <!--弹窗-->
  <el-dialog
      :width="CONFIG.dialog_width"
      v-model="userGroupPermissionDialogVisible"
      :title="userGroupPermissionDialogType.label"
      draggable
      append-to-body
  >
    <el-form
        ref="userGroupPermissionDialogFormRef"
        v-loading="userGroupPermissionDialogLoadingRef"
        :model="userGroupPermissionState.dialogForm"
        :label-width="CONFIG.dialog_form_label_width"
        :rules="userGroupPermissionDFormRules"
        label-position="top"
        :disabled="!ifAddUserGroupPermission"
        validate-on-rule-change
    >
      <!--<el-row>-->
      <!--  <el-col :span="12"></el-col>-->
      <!--  <el-col :span="12"></el-col>-->
      <!--</el-row>-->
      <el-form-item v-if="!ifAddUserGroupPermission" :label="userGroupPermissionDict.id" prop="id">
        <span>{{ userGroupPermissionState.dialogForm.id }}</span>
      </el-form-item>
      <!--
      第一个input添加如下属性
      v-focus
      -->
      <!--在此下方添加表单项-->
      <el-form-item :label="userGroupPermissionDict.userGroupId" prop="userGroupId">
        <el-select v-model="userGroupPermissionState.dialogForm.userGroupId" clearable filterable disabled>
          <el-option v-for="item in userGroupTableData" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="userGroupPermissionDict.permissionId" prop="permissionId">
        <el-select v-model="userGroupPermissionState.dialogForm.permissionId" clearable filterable disabled>
          <el-option v-for="item in interfaceGroupTableData" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="userGroupPermissionDict.ifLongTerm" prop="ifLongTerm">
        <el-radio-group v-model="userGroupPermissionState.dialogForm.ifLongTerm">
          <el-radio :value="final.Y">是</el-radio>
          <el-radio :value="final.N">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="userGroupPermissionDict.ifLimitRequestTimes" prop="ifLimitRequestTimes">
        <el-radio-group v-model="userGroupPermissionState.dialogForm.ifLimitRequestTimes">
          <el-radio :value="final.Y">是</el-radio>
          <el-radio :value="final.N">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="userGroupPermissionDict.ifRejectRequestUseUp" prop="ifRejectRequestUseUp">
        <el-radio-group v-model="userGroupPermissionState.dialogForm.ifRejectRequestUseUp">
          <el-radio :value="final.Y">是</el-radio>
          <el-radio :value="final.N">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="userGroupPermissionState.dialogForm.ifLongTerm === final.N" :label="userGroupPermissionDict.permissionTime" prop="permissionTime">
        <el-date-picker
            v-model="userGroupPermissionState.dialogForm.permissionTime"
            type="datetimerange"
            :shortcuts="shortcuts"
            :start-placeholder="userGroupPermissionDict.permissionStartTime"
            :end-placeholder="userGroupPermissionDict.permissionEndTime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm:ss"
        />
      </el-form-item>
      <el-form-item v-if="userGroupPermissionState.dialogForm.ifLimitRequestTimes === final.Y" :label="userGroupPermissionDict.limitRequestTimes" prop="limitRequestTimes">
        <el-input-number v-model="userGroupPermissionState.dialogForm.limitRequestTimes" controls-position="right"/>
      </el-form-item>
      <el-form-item :label="userGroupPermissionDict.orderNum" prop="orderNum">
        <el-input-number v-model="userGroupPermissionState.dialogForm.orderNum" controls-position="right"/>
      </el-form-item>
      <el-form-item :label="userGroupPermissionDict.remark" prop="remark">
        <el-input type="textarea" v-model="userGroupPermissionState.dialogForm.remark" :placeholder="userGroupPermissionDict.remark"/>
      </el-form-item>
      <el-form-item v-if="!ifAddUserGroupPermission" :label="userGroupPermissionDict.ifUseUp" prop="ifUseUp">
        <el-tag v-if="userGroupPermissionState.dialogForm.ifUseUp === final.Y" type="danger">是</el-tag>
        <el-tag v-else type="success">已使用{{ userGroupPermissionState.dialogForm.count }}次
        </el-tag>
      </el-form-item>
      <!--在此上方添加表单项-->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="showUseLog" v-if="!ifAddUserGroupPermission">查看调用日志</el-button>
        <el-button :disabled="userGroupPermissionDialogButtonLoadingRef" @click="userGroupPermissionDCan">取消</el-button>
        <el-button type="primary" :disabled="userGroupPermissionDialogButtonLoadingRef" @click="userGroupPermissionDCon2" v-if="ifAddUserGroupPermission">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <div class="el">
    <div class="el-grid">
      <div>
        <el-card style="height: 100%;overflow: auto;" v-loading="leftCardLoading">
          <!--用户组信息-->
          <div v-if="selectType===USER_GROUP">
            <p>{{ selectUserGroupInfo.label }}</p>
            <p>{{ selectUserGroupInfo.remark }}</p>
          </div>
          <!--当前接口组的用户组-->
          <div v-if="selectType===INTERFACE_GROUP">
            <!--{{ userGroupsOfThisInterfaceGroup }}-->
            <el-table :data="userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup">
              <!--<el-table-column prop="ifLongTerm" :label="userGroupPermissionDict.ifLongTerm" width="120">-->
              <!--  <template #default="{row}">-->
              <!--    <el-tag type="primary" v-if="row.ifLongTerm === final.Y">是</el-tag>-->
              <!--    <el-tag type="success" v-if="row.ifLongTerm === final.N">否</el-tag>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="ifLimitRequestTimes" :label="userGroupPermissionDict.ifLimitRequestTimes" width="120">-->
              <!--  <template #default="{row}">-->
              <!--    <el-tag type="primary" v-if="row.ifLimitRequestTimes === final.Y">是</el-tag>-->
              <!--    <el-tag type="success" v-if="row.ifLimitRequestTimes === final.N">否</el-tag>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="ifRejectRequestUseUp" :label="userGroupPermissionDict.ifRejectRequestUseUp" width="120">-->
              <!--  <template #default="{row}">-->
              <!--    <el-tag type="primary" v-if="row.ifRejectRequestUseUp === final.Y">是</el-tag>-->
              <!--    <el-tag type="success" v-if="row.ifRejectRequestUseUp === final.N">否</el-tag>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <el-table-column prop="ifUseUp" :label="userGroupPermissionDict.ifUseUp" width="120">
                <template #default="{row}">
                  <el-tag type="danger" v-if="row.ifUseUp === final.Y">是</el-tag>
                  <el-tag type="success" v-if="row.ifUseUp === final.N">否</el-tag>
                </template>
              </el-table-column>
              <!--<el-table-column prop="orderNum" :label="userGroupPermissionDict.orderNum" width="120"/>-->
              <el-table-column :label="userGroupDict.label" width="120">
                <template #default="{row}">
                  {{ userGroupsOfThisInterfaceGroup.find(item => item.id === row.userGroupId)?.label }}
                </template>
              </el-table-column>
              <el-table-column prop="remark" :label="userGroupPermissionDict.remark" width="120"/>
              <el-table-column fixed="right" label="操作" min-width="140">
                <template #default="{row}">
                  <div class="zs-table-data-operate-button-row">
                    <el-button link type="primary" size="small" :icon="View" @click="detailUserGroupOfThisInterfaceGroup(row.id)">查看详情</el-button>
                    <el-button link type="danger" size="small" :icon="Delete" @click="beforeDelUserGroupOfThisInterfaceGroup(row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!--<el-table :data="userGroupsOfThisInterfaceGroup">-->
            <!--  <el-table-column prop="label" :label="userGroupDict.label" width="240"/>-->
            <!--  <el-table-column prop="remark" :label="userGroupDict.remark" width="240"/>-->
            <!--  <el-table-column fixed="right" label="操作" min-width="140">-->
            <!--    <template #default="{row}">-->
            <!--      <div class="zs-table-data-operate-button-row">-->
            <!--        <el-button link type="primary" size="small" :icon="View" @click="detailUserGroupOfThisInterfaceGroup(row.userGroupPermissionId)">查看详情</el-button>-->
            <!--        <el-button link type="danger" size="small" :icon="Delete" @click="beforeDelUserGroupOfThisInterfaceGroup(row.userGroupPermissionId)">删除</el-button>-->
            <!--      </div>-->
            <!--    </template>-->
            <!--  </el-table-column>-->
            <!--</el-table>-->
          </div>
        </el-card>
      </div>
      <div>
        <Divider/>
      </div>
      <div>
        <el-card style="height: 100%;overflow: auto;" v-loading="rightCardLoading">
          <!--接口组信息-->
          <div v-if="selectType===INTERFACE_GROUP">
            <p>{{ selectInterfaceGroupInfo.label }}</p>
            <p>{{ selectInterfaceGroupInfo.remark }}</p>
          </div>
          <!--当前用户组的接口组-->
          <div v-if="selectType===USER_GROUP">
            <!--{{ interfaceGroupsOfThisUserGroup }}-->
            <el-table :data="userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup">
              <!--<el-table-column prop="ifLongTerm" :label="userGroupPermissionDict.ifLongTerm" width="120">-->
              <!--  <template #default="{row}">-->
              <!--    <el-tag type="primary" v-if="row.ifLongTerm === final.Y">是</el-tag>-->
              <!--    <el-tag type="success" v-if="row.ifLongTerm === final.N">否</el-tag>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="ifLimitRequestTimes" :label="userGroupPermissionDict.ifLimitRequestTimes" width="120">-->
              <!--  <template #default="{row}">-->
              <!--    <el-tag type="primary" v-if="row.ifLimitRequestTimes === final.Y">是</el-tag>-->
              <!--    <el-tag type="success" v-if="row.ifLimitRequestTimes === final.N">否</el-tag>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="ifRejectRequestUseUp" :label="userGroupPermissionDict.ifRejectRequestUseUp" width="120">-->
              <!--  <template #default="{row}">-->
              <!--    <el-tag type="primary" v-if="row.ifRejectRequestUseUp === final.Y">是</el-tag>-->
              <!--    <el-tag type="success" v-if="row.ifRejectRequestUseUp === final.N">否</el-tag>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <el-table-column prop="ifUseUp" :label="userGroupPermissionDict.ifUseUp" width="120">
                <template #default="{row}">
                  <el-tag type="danger" v-if="row.ifUseUp === final.Y">是</el-tag>
                  <el-tag type="success" v-if="row.ifUseUp === final.N">否</el-tag>
                </template>
              </el-table-column>
              <!--<el-table-column prop="orderNum" :label="userGroupPermissionDict.orderNum" width="120"/>-->
              <el-table-column :label="interfaceGroupDict.label" width="120">
                <template #default="{row}">
                  {{ interfaceGroupsOfThisUserGroup.find(item => item.id === row.permissionId)?.label }}
                </template>
              </el-table-column>
              <el-table-column prop="remark" :label="userGroupPermissionDict.remark" width="120"/>
              <el-table-column fixed="right" label="操作" min-width="140">
                <template #default="{row}">
                  <div class="zs-table-data-operate-button-row">
                    <el-button link type="primary" size="small" :icon="View" @click="detailInterfaceGroupOfThisUserGroup(row.id)">查看详情</el-button>
                    <el-button link type="danger" size="small" :icon="Delete" @click="beforeDelInterfaceGroupOfThisUserGroup(row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!--<el-table :data="interfaceGroupsOfThisUserGroup">-->
            <!--  <el-table-column prop="label" :label="interfaceGroupDict.label" width="240"/>-->
            <!--  <el-table-column prop="remark" :label="interfaceGroupDict.remark" width="240"/>-->
            <!--  <el-table-column fixed="right" label="操作" min-width="140">-->
            <!--    <template #default="{row}">-->
            <!--      <div class="zs-table-data-operate-button-row">-->
            <!--        <el-button link type="primary" size="small" :icon="View" @click="detailInterfaceGroupOfThisUserGroup(row.userGroupPermissionId)">查看详情</el-button>-->
            <!--        <el-button link type="danger" size="small" :icon="Delete" @click="beforeDelInterfaceGroupOfThisUserGroup(row.userGroupPermissionId)">删除</el-button>-->
            <!--      </div>-->
            <!--    </template>-->
            <!--  </el-table-column>-->
            <!--</el-table>-->
          </div>
        </el-card>
      </div>
      <div>
        <el-scrollbar>
          <!--顶部筛选表单-->
          <div class="zs-filter-form" v-show="userGroupFilterFormVisible1 && userGroupFilterFormVisible">
            <el-form
                class="demo-form-inline"
                ref="userGroupFilterFormRef"
                :model="userGroupState.filterForm"
                :inline="true"
                @keyup.enter="userGroupFEnter"
                @submit.prevent
            >
              <!--在此下方添加表单项-->
              <el-form-item :label="userGroupDict.label" prop="label">
                <el-input v-model="userGroupState.filterForm.label" :placeholder="userGroupDict.label"/>
              </el-form-item>
              <!--在此上方添加表单项-->
              <el-form-item>
                <el-button type="primary" @click="userGroupFCon">筛选</el-button>
                <el-button @click="userGroupFCan">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

          <!--操作按钮-->
          <div class="zs-button-row">
            <div>
              <el-button type="primary" plain :icon="Refresh" @click="userGroupGRefresh">刷新</el-button>
              <!--<el-button type="primary" plain :icon="Plus" @click="userGroupGIns">新增</el-button>-->
              <!--<el-button type="success" plain :icon="Edit" :disabled="userGroupConfig.bulkOperation?userGroupMultipleSelection.length===0:userGroupMultipleSelection.length!==1" @click="userGroupGUpd">修改</el-button>-->
              <!--<el-button type="danger" plain :icon="Delete" :disabled="userGroupMultipleSelection.length===0" @click="userGroupGDel()">删除</el-button>-->
              <!--<el-button type="warning" plain :icon="Download" :disabled="userGroupMultipleSelection.length===0" @click="userGroupGExport()">导出</el-button>-->
              <!--<el-button type="warning" plain :icon="Upload" @click="userGroupGImport">上传</el-button>-->
            </div>
            <div>
              <el-button v-if="userGroupFilterFormVisible1" plain :icon="Search" circle @click="userGroupGChangeFilterFormVisible"/>
            </div>
          </div>

          <div class="zs-table-data">
            <!--数据表格-->
            <el-table
                ref="userGroupTableRef"
                v-loading="userGroupTableLoadingRef"
                :data="userGroupTableData"
                @selection-change="userGroupHandleSelectionChange"
                highlight-current-row
                @current-change="userGroupHandleCurrentChange"
            >
              <el-table-column fixed type="selection" width="55"/>
              <!--<el-table-column fixed prop="id" :label="userGroupDict.id" width="180"/>-->
              <!--上面id列的宽度改一下-->
              <!--在此下方添加表格列-->
              <el-table-column prop="label" :label="userGroupDict.label" width="240"/>
              <!--<el-table-column prop="parentId" :label="userGroupDict.parentId" width="120"/>-->
              <!--<el-table-column prop="orderNum" :label="userGroupDict.orderNum" width="120"/>-->
              <el-table-column prop="remark" :label="userGroupDict.remark" width="240"/>
              <!--在此上方添加表格列-->
              <!--<el-table-column prop="createBy" :label="userGroupDict.createBy" width="120"/>-->
              <!--<el-table-column prop="updateBy" :label="userGroupDict.updateBy" width="120"/>-->
              <!--<el-table-column prop="createTime" :label="userGroupDict.createTime" width="220"/>-->
              <!--<el-table-column prop="updateTime" :label="userGroupDict.updateTime" width="220"/>-->
              <!--<el-table-column prop="deleted" :label="userGroupDict.deleted" width="60"/>-->
              <!--上方几个酌情使用-->
              <!--<el-table-column fixed="right" label="操作" min-width="140">-->
              <!--  <template #default="{row}">-->
              <!--    <div class="zs-table-data-operate-button-row">-->
              <!--      <el-button link type="primary" size="small" :icon="Edit" @click="userGroupTUpd(row.id)">修改</el-button>-->
              <!--      <el-button link type="danger" size="small" :icon="Delete" @click="userGroupTDel(row.id)">删除</el-button>-->
              <!--    </div>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <template #append>
                <div class="el-table-append-box">
                  <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${userGroupMultipleSelection.length} 条数据。` }}</span>
                </div>
              </template>
            </el-table>

            <!--分页-->
            <Pagination
                v-if="userGroupConfig.pageQuery"
                :total="userGroupTotal"
                :page-num="userGroupPageParam.pageNum"
                :page-size="userGroupPageParam.pageSize"
                @page-change="userGroupPageChange"
            />
          </div>
        </el-scrollbar>
      </div>
      <div>
        <Divider/>
      </div>
      <div>
        <el-scrollbar>
          <!--顶部筛选表单-->
          <div class="zs-filter-form" v-show="interfaceGroupFilterFormVisible1 && interfaceGroupFilterFormVisible">
            <el-form
                class="demo-form-inline"
                ref="interfaceGroupFilterFormRef"
                :model="interfaceGroupState.filterForm"
                :inline="true"
                @keyup.enter="interfaceGroupFEnter"
                @submit.prevent
            >
              <!--在此下方添加表单项-->
              <el-form-item :label="interfaceGroupDict.label" prop="label">
                <el-input v-model="interfaceGroupState.filterForm.label" :placeholder="interfaceGroupDict.label"/>
              </el-form-item>
              <!--在此上方添加表单项-->
              <el-form-item>
                <el-button type="primary" @click="interfaceGroupFCon">筛选</el-button>
                <el-button @click="interfaceGroupFCan">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

          <!--操作按钮-->
          <div class="zs-button-row">
            <div>
              <el-button type="primary" plain :icon="Refresh" @click="interfaceGroupGRefresh">刷新</el-button>
              <!--<el-button type="primary" plain :icon="Plus" @click="interfaceGroupGIns">新增</el-button>-->
              <!--<el-button type="success" plain :icon="Edit" :disabled="interfaceGroupConfig.bulkOperation?interfaceGroupMultipleSelection.length===0:interfaceGroupMultipleSelection.length!==1" @click="interfaceGroupGUpd">修改</el-button>-->
              <!--<el-button type="danger" plain :icon="Delete" :disabled="interfaceGroupMultipleSelection.length===0" @click="interfaceGroupGDel()">删除</el-button>-->
              <!--<el-button type="warning" plain :icon="Download" :disabled="interfaceGroupStateMultipleSelection.length===0" @click="interfaceGroupGExport()">导出</el-button>-->
              <!--<el-button type="warning" plain :icon="Upload" @click="interfaceGroupGImport">上传</el-button>-->
            </div>
            <div>
              <el-button v-if="interfaceGroupFilterFormVisible1" plain :icon="Search" circle @click="interfaceGroupGChangeFilterFormVisible"/>
            </div>
          </div>

          <div class="zs-table-data">
            <!--数据表格-->
            <el-table
                ref="interfaceGroupTableRef"
                v-loading="interfaceGroupTableLoadingRef"
                :data="interfaceGroupTableData"
                @selection-change="interfaceGroupHandleSelectionChange"
                highlight-current-row
                @current-change="interfaceGroupHandleCurrentChange"
            >
              <el-table-column fixed type="selection" width="55"/>
              <!--<el-table-column fixed prop="id" :label="interfaceGroupDict.id" width="180"/>-->
              <!--上面id列的宽度改一下-->
              <!--在此下方添加表格列-->
              <el-table-column prop="label" :label="interfaceGroupDict.label" width="240"/>
              <!--<el-table-column prop="parentId" :label="interfaceGroupDict.parentId" width="120"/>-->
              <el-table-column prop="baseURL" :label="interfaceGroupDict.baseURL" width="240"/>
              <!--<el-table-column prop="orderNum" :label="interfaceGroupDict.orderNum" width="120"/>-->
              <el-table-column prop="remark" :label="interfaceGroupDict.remark" width="240"/>
              <!--在此上方添加表格列-->
              <!--<el-table-column prop="createBy" :label="interfaceGroupDict.createBy" width="120"/>-->
              <!--<el-table-column prop="updateBy" :label="interfaceGroupDict.updateBy" width="120"/>-->
              <!--<el-table-column prop="createTime" :label="interfaceGroupDict.createTime" width="220"/>-->
              <!--<el-table-column prop="updateTime" :label="interfaceGroupDict.updateTime" width="220"/>-->
              <!--<el-table-column prop="deleted" :label="interfaceGroupDict.deleted" width="60"/>-->
              <!--上方几个酌情使用-->
              <!--<el-table-column fixed="right" label="操作" min-width="140">-->
              <!--  <template #default="{row}">-->
              <!--    <div class="zs-table-data-operate-button-row">-->
              <!--      <el-button link type="primary" size="small" :icon="Edit" @click="interfaceGroupTUpd(row.id)">修改</el-button>-->
              <!--      <el-button link type="danger" size="small" :icon="Delete" @click="interfaceGroupTDel(row.id)">删除</el-button>-->
              <!--    </div>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <template #append>
                <div class="el-table-append-box">
                  <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${interfaceGroupMultipleSelection.length} 条数据。` }}</span>
                </div>
              </template>
            </el-table>

            <!--分页-->
            <Pagination
                v-if="interfaceGroupConfig.pageQuery"
                :total="interfaceGroupTotal"
                :page-num="interfaceGroupPageParam.pageNum"
                :page-size="interfaceGroupPageParam.pageSize"
                @page-change="interfaceGroupPageChange"
            />
          </div>
        </el-scrollbar>
      </div>
    </div>

    <el-row :gutter="20">
      <el-col :span="12">
        <span>使用说明：左侧中部和右侧中部的表格支持单选及多选，单选时，鼠标点击行即可，随后上方卡片会显示选中行的信息及其权限信息，支持查看权限详情及删除权限；若需要添加权限，请在左侧中部及右侧中部表格中各使用复选框选择一项，随后点击右侧按钮，填写信息后提交即可。</span>
      </el-col>

      <el-col :span="12">
        <el-button
            style="color: #fff;"
            :color="CONFIG.theme_color_menu_bg_active"
            @click="beforeAddUserGroupPermission"
            :disabled="!(userGroupMultipleSelection.length===1&&interfaceGroupMultipleSelection.length===1)"
        >
          新增权限
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.el {
  height: 100%;

  > * {
    &:nth-child(1) {
      height: calc(100% - 80px);
    }

    &:nth-child(2) {
      margin-top: 20px;
      height: 60px;
    }
  }
}

.el-grid {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  grid-template-rows: 200px calc(100% - calc(200px + 80px));
  grid-gap: 10px 0;
}
</style>
