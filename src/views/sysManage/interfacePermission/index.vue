<script lang="ts">
export default {
  name: 'sysManage:interfacePermission'
}
</script>

<script setup lang="ts">
import { reactive, ref, toRaw, watch } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.js"
import { State, t_config } from "@/type/tablePage.ts"
import { ElMessageBox, FormRules, TableInstance } from 'element-plus'
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { MORE, ONE } from "@/type/utils/base.ts"
import { userGroupDto } from "@/type/api/sysManage/userGroup.ts";
import { userGroupFunc } from "@/api/module/sysManage/userGroup.ts"
import { interfaceGroupDto } from "@/type/api/sysManage/interfaceGroup.ts";
import { interfaceGroupFunc } from "@/api/module/sysManage/interfaceGroup.ts"
import Divider from "@/views/sysManage/interfacePermission/divider.vue";
import { userGroupPermissionDto } from "@/type/api/sysManage/userGroupPermission.ts";
import { userGroupPermissionFunc } from "@/api/module/sysManage/userGroupPermission.ts"
import { copyObject, deepClone } from "@/utils/ObjectUtils.ts";
import LogAlgorithmCall from "@/views/sysManage/interfacePermission/logAlgorithmCall.vue";

const userGroupState = reactive<State<userGroupDto>>({
  dialogType: {
    value: '',
    label: ''
  },
  // 这个是弹出框表单
  // 格式: {
  //   id: '',
  //   parentId: final.DEFAULT_PARENT_ID,
  //   orderNum: final.DEFAULT_ORDER_NUM,
  //   ...
  // }
  dialogForm: {
    id: -1,
    label: '',
    parentId: final.DEFAULT_PARENT_ID,
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  // 这个是弹出框表单校验
  // 格式: {
  //   name: [{ required: true, trigger: 'change' }],
  //   ...
  // }
  dFormRules: {
    label: [{required: true, trigger: 'change'}],
    parentId: [{required: true, trigger: 'change'}],
    orderNum: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    label: '用户组名',
    parentId: '父级用户组',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    label: ''
  },
  list: [],
  multipleSelection: [],
  total: -1,
  pageParam: {
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  }
})
const userGroupState2 = reactive({
  orderNum: 0
})
const userGroupDialogFormRef = ref(null)
const userGroupDialogFormsRef = ref(null)
const userGroupFilterFormRef = ref(null)
const userGroupDialogVisible = ref(false)
const userGroupDialogLoadingRef = ref(false)
const userGroupTableLoadingRef = ref(false)
const userGroupSwitchLoadingRef = ref(false)
const userGroupActiveTabName = ref<ONE | MORE>(final.one)
const userGroupConfig: t_config = reactive({
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
})

const {
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
  tUpd: userGroupTUpd,
  tDel: userGroupTDel,
  handleSelectionChange: userGroupHandleSelectionChange,
  pageChange: userGroupPageChange,
  dfIns: userGroupDfIns,
  dfDel: userGroupDfDel,
  ifRequired: userGroupIfRequired
} = funcTablePage({
  config: userGroupConfig,
  state: userGroupState,
  state2: userGroupState2,
  dialogFormRef: userGroupDialogFormRef,
  dialogFormsRef: userGroupDialogFormsRef,
  filterFormRef: userGroupFilterFormRef,
  dialogVisible: userGroupDialogVisible,
  dialogLoadingRef: userGroupDialogLoadingRef,
  tableLoadingRef: userGroupTableLoadingRef,
  switchLoadingRef: userGroupSwitchLoadingRef,
  activeTabName: userGroupActiveTabName,
  func: userGroupFunc
})

const interfaceGroupState = reactive<State<interfaceGroupDto>>({
  dialogType: {
    value: '',
    label: ''
  },
  // 这个是弹出框表单
  // 格式: {
  //   id: '',
  //   parentId: final.DEFAULT_PARENT_ID,
  //   orderNum: final.DEFAULT_ORDER_NUM,
  //   ...
  // }
  dialogForm: {
    id: -1,
    label: '',
    parentId: final.DEFAULT_PARENT_ID,
    baseURL: '',
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  // 这个是弹出框表单校验
  // 格式: {
  //   name: [{ required: true, trigger: 'change' }],
  //   ...
  // }
  dFormRules: {
    label: [{required: true, trigger: 'change'}],
    parentId: [{required: true, trigger: 'change'}],
    baseURL: [{required: true, trigger: 'change'}],
    orderNum: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    label: '接口组名',
    parentId: '父级接口组',
    baseURL: 'baseURL',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    label: ''
  },
  list: [],
  multipleSelection: [],
  total: -1,
  pageParam: {
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  }
})
const interfaceGroupState2 = reactive({
  orderNum: 0
})
const interfaceGroupDialogFormRef = ref(null)
const interfaceGroupDialogFormsRef = ref(null)
const interfaceGroupFilterFormRef = ref(null)
const interfaceGroupDialogVisible = ref(false)
const interfaceGroupDialogLoadingRef = ref(false)
const interfaceGroupTableLoadingRef = ref(false)
const interfaceGroupSwitchLoadingRef = ref(false)
const interfaceGroupActiveTabName = ref<ONE | MORE>(final.one)
const interfaceGroupConfig: t_config = reactive({
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
})

const {
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
  tUpd: interfaceGroupTUpd,
  tDel: interfaceGroupTDel,
  handleSelectionChange: interfaceGroupHandleSelectionChange,
  pageChange: interfaceGroupPageChange,
  dfIns: interfaceGroupDfIns,
  dfDel: interfaceGroupDfDel,
  ifRequired: interfaceGroupIfRequired
} = funcTablePage({
  config: interfaceGroupConfig,
  state: interfaceGroupState,
  state2: interfaceGroupState2,
  dialogFormRef: interfaceGroupDialogFormRef,
  dialogFormsRef: interfaceGroupDialogFormsRef,
  filterFormRef: interfaceGroupFilterFormRef,
  dialogVisible: interfaceGroupDialogVisible,
  dialogLoadingRef: interfaceGroupDialogLoadingRef,
  tableLoadingRef: interfaceGroupTableLoadingRef,
  switchLoadingRef: interfaceGroupSwitchLoadingRef,
  activeTabName: interfaceGroupActiveTabName,
  func: interfaceGroupFunc
})

const userGroupPermissionState = reactive<State<userGroupPermissionDto>>({
  dialogType: {
    value: '',
    label: ''
  },
  // 这个是弹出框表单
  // 格式: {
  //   id: '',
  //   parentId: final.DEFAULT_PARENT_ID,
  //   orderNum: final.DEFAULT_ORDER_NUM,
  //   ...
  // }
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
  // 这个是弹出框表单校验
  // 格式: {
  //   name: [{ required: true, trigger: 'change' }],
  //   ...
  // }
  dFormRules: {
    userGroupId: [{required: true, trigger: 'change'}],
    permissionId: [{required: true, trigger: 'change'}],
    ifLongTerm: [{required: true, trigger: 'change'}],
    ifLimitRequestTimes: [{required: true, trigger: 'change'}],
    ifRejectRequestUseUp: [{required: true, trigger: 'change'}],
    permissionStartTime: [{required: true, trigger: 'change'}],
    permissionEndTime: [{required: true, trigger: 'change'}],
    orderNum: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    userGroupId: '用户组',
    permissionId: '接口组',
    ifLongTerm: '是否长期权限',
    ifLimitRequestTimes: '是否限制次数',
    ifRejectRequestUseUp: '次数用尽后是否拒绝请求',
    permissionStartTime: '权限开始时间',
    permissionEndTime: '权限结束时间',
    permissionTime: '权限期限',
    limitRequestTimes: '请求限制次数',
    ifUseUp: '是否已用尽',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {},
  list: [],
  multipleSelection: [],
  total: -1,
  pageParam: {
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  }
})
const userGroupPermissionState2 = reactive({
  orderNum: 0
})
const userGroupPermissionDialogFormRef = ref(null)
const userGroupPermissionDialogFormsRef = ref(null)
const userGroupPermissionFilterFormRef = ref(null)
const userGroupPermissionDialogVisible = ref(false)
const userGroupPermissionDialogLoadingRef = ref(false)
const userGroupPermissionTableLoadingRef = ref(false)
const userGroupPermissionSwitchLoadingRef = ref(false)
const userGroupPermissionActiveTabName = ref<ONE | MORE>(final.one)
const userGroupPermissionConfig: t_config = reactive({
  getDataOnMounted: false, // 页面加载时获取数据，默认true
  pageQuery: false, // 分页，默认true
  /**
   * selectList回调，可不传
   */
  selectListCallback: () => {
    if (selectType.value === USER_GROUP) {
      userGroupHandleCurrentChange2()
    }
    if (selectType.value === INTERFACE_GROUP) {
      interfaceGroupHandleCurrentChange2()
    }
  },
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
})

const {
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
  tUpd: userGroupPermissionTUpd,
  tDel: userGroupPermissionTDel,
  handleSelectionChange: userGroupPermissionHandleSelectionChange,
  pageChange: userGroupPermissionPageChange,
  dfIns: userGroupPermissionDfIns,
  dfDel: userGroupPermissionDfDel,
  ifRequired: userGroupPermissionIfRequired
} = funcTablePage({
  config: userGroupPermissionConfig,
  state: userGroupPermissionState,
  state2: userGroupPermissionState2,
  dialogFormRef: userGroupPermissionDialogFormRef,
  dialogFormsRef: userGroupPermissionDialogFormsRef,
  filterFormRef: userGroupPermissionFilterFormRef,
  dialogVisible: userGroupPermissionDialogVisible,
  dialogLoadingRef: userGroupPermissionDialogLoadingRef,
  tableLoadingRef: userGroupPermissionTableLoadingRef,
  switchLoadingRef: userGroupPermissionSwitchLoadingRef,
  activeTabName: userGroupPermissionActiveTabName,
  func: userGroupPermissionFunc
})

const USER_GROUP = 'userGroup'
const INTERFACE_GROUP = 'interfaceGroup'
const selectType = ref<typeof USER_GROUP | typeof INTERFACE_GROUP | null>(null)

const userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup = ref<userGroupPermissionDto[]>([])

const leftCardLoading = ref(false)
const userGroupTableRef = ref<TableInstance | null>(null)
const selectUserGroupInfo = reactive<userGroupDto>({
  id: -1,
  label: '',
  parentId: -1,
  orderNum: -1,
  remark: '',
})

class interfaceGroupDto2 extends interfaceGroupDto {
  userGroupPermissionId!: number
}

const interfaceGroupsOfThisUserGroup = ref<interfaceGroupDto2[]>([])
const userGroupHandleCurrentChangeSelectRow = reactive<userGroupDto>({
  id: -1,
  label: '',
  parentId: -1,
  orderNum: -1,
  remark: '',
})
const userGroupHandleCurrentChange = (row: userGroupDto) => {
  if (row) {
    interfaceGroupTableRef.value?.setCurrentRow(null)
    copyObject(userGroupHandleCurrentChangeSelectRow, row)
  } else {
    return
  }
  selectType.value = USER_GROUP
  leftCardLoading.value = true
  userGroupFunc.selectById(row.id).then(res => {
    copyObject(selectUserGroupInfo, res)
    leftCardLoading.value = false
  })
  userGroupHandleCurrentChange2()
}
const userGroupHandleCurrentChange2 = () => {
  rightCardLoading.value = true
  const row = userGroupHandleCurrentChangeSelectRow
  userGroupPermissionFunc.selectAll({userGroupId: row.id}).then(res => {
    userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup.value = res
    const interfaceGroupIds = res.map(item => item.permissionId);
    interfaceGroupFunc.selectByIds(interfaceGroupIds).then(res => {
      interfaceGroupsOfThisUserGroup.value = userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup.value.map(item => {
        const find = deepClone<interfaceGroupDto2>(res.find(r => r.id === item.permissionId)!);
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
    userGroupPermissionFunc.selectById(find.id).then(res => {
      copyObject(userGroupPermissionState.dialogForm, res)
      userGroupPermissionState.dialogForm.permissionTime = [
        userGroupPermissionState.dialogForm.permissionStartTime,
        userGroupPermissionState.dialogForm.permissionEndTime
      ]
      userGroupPermissionDialogLoadingRef.value = false
    })
    ifAddUserGroupPermission.value = false
    userGroupPermissionState.dialogType.label = '查看权限详情'
    userGroupPermissionDialogVisible.value = true
  }
}

const rightCardLoading = ref(false)
const interfaceGroupTableRef = ref<TableInstance | null>(null)
const selectInterfaceGroupInfo = reactive({
  id: -1,
  label: '',
  parentId: -1,
  orderNum: -1,
  remark: '',
})

class userGroupDto2 extends userGroupDto {
  userGroupPermissionId!: number
}

const userGroupsOfThisInterfaceGroup = ref<userGroupDto[]>([])
const interfaceGroupHandleCurrentChangeSelectRow = reactive<interfaceGroupDto>({
  id: -1,
  label: '',
  parentId: -1,
  orderNum: -1,
  remark: '',
})
const interfaceGroupHandleCurrentChange = (row: interfaceGroupDto) => {
  if (row) {
    userGroupTableRef.value?.setCurrentRow(null)
    copyObject(interfaceGroupHandleCurrentChangeSelectRow, row)
  } else {
    return
  }
  selectType.value = INTERFACE_GROUP
  rightCardLoading.value = true
  interfaceGroupFunc.selectById(row.id).then(res => {
    copyObject(selectInterfaceGroupInfo, res)
    rightCardLoading.value = false
  })
  interfaceGroupHandleCurrentChange2()
}
const interfaceGroupHandleCurrentChange2 = () => {
  leftCardLoading.value = true
  const row = interfaceGroupHandleCurrentChangeSelectRow
  userGroupPermissionFunc.selectAll({permissionId: row.id}).then(res => {
    userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup.value = res
    const userGroupIds = res.map(item => item.userGroupId);
    userGroupFunc.selectByIds(userGroupIds).then(res => {
      userGroupsOfThisInterfaceGroup.value = userGroupPermissionsOfSelectUserGroupOrSelectInterfaceGroup.value.map(item => {
        const find = deepClone<userGroupDto2>(res.find(r => r.id === item.userGroupId)!)
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
    userGroupPermissionFunc.selectById(find.id).then(res => {
      copyObject(userGroupPermissionState.dialogForm, res)
      userGroupPermissionState.dialogForm.permissionTime = [
        userGroupPermissionState.dialogForm.permissionStartTime,
        userGroupPermissionState.dialogForm.permissionEndTime
      ]
      userGroupPermissionDialogLoadingRef.value = false
    })
    ifAddUserGroupPermission.value = false
    userGroupPermissionState.dialogType.label = '查看权限详情'
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
      userGroupPermissionFunc.deleteList(...delIds)
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
  const userGroup = userGroupState.multipleSelection[0]
  const interfaceGroup = interfaceGroupState.multipleSelection[0]
  userGroupPermissionState.dialogForm.userGroupId = userGroup.id
  userGroupPermissionState.dialogForm.permissionId = interfaceGroup.id
  userGroupPermissionGIns()
}

watch(() => userGroupPermissionState.dialogForm, () => {
  // 是否长期权限
  if (userGroupPermissionState.dialogForm.ifLongTerm === final.N) {
    userGroupPermissionState.dFormRules.permissionTime = [{required: true, trigger: 'change'}]
  } else {
    delete userGroupPermissionState.dFormRules.permissionTime
  }

  // 是否限制次数
  if (userGroupPermissionState.dialogForm.ifLimitRequestTimes === final.Y) {
    userGroupPermissionState.dFormRules.limitRequestTimes = [{
      required: true,
      trigger: 'change',
      min: 1,
      type: 'number'
    }]
  } else {
    delete userGroupPermissionState.dFormRules.limitRequestTimes
  }
}, {
  deep: true,
  immediate: true
})
if (Object.keys(userGroupPermissionState.dialogForm).indexOf('permissionTime') > -1) {
  watch(() => userGroupPermissionState.dialogForm['permissionTime'], () => {
    if (userGroupPermissionState.dialogForm['permissionTime']) {
      userGroupPermissionState.dialogForm.permissionStartTime = new Date(userGroupPermissionState.dialogForm['permissionTime'][0])
      userGroupPermissionState.dialogForm.permissionEndTime = new Date(userGroupPermissionState.dialogForm['permissionTime'][1])
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
  selectUGPId.value = userGroupPermissionState.dialogForm['id']
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
      :title="userGroupPermissionState.dialogType.label"
      draggable
      append-to-body
  >
    <el-form
        ref="userGroupPermissionDialogFormRef"
        v-loading="userGroupPermissionDialogLoadingRef"
        :model="userGroupPermissionState.dialogForm"
        :label-width="CONFIG.dialog_form_label_width"
        :rules="userGroupPermissionState.dFormRules"
        label-position="top"
        :disabled="!ifAddUserGroupPermission"
        validate-on-rule-change
    >
      <!--<el-row>-->
      <!--  <el-col :span="12"></el-col>-->
      <!--  <el-col :span="12"></el-col>-->
      <!--</el-row>-->
      <el-form-item v-if="!ifAddUserGroupPermission" :label="userGroupPermissionState.dict['id']" prop="id">
        <span>{{ userGroupPermissionState.dialogForm['id'] }}</span>
      </el-form-item>
      <!--
      第一个input添加如下属性
      v-focus
      -->
      <!--在此下方添加表单项-->
      <el-form-item :label="userGroupPermissionState.dict['userGroupId']" prop="userGroupId">
        <!--<el-input-number v-model="userGroupPermissionState.dialogForm['userGroupId']" controls-position="right"/>-->
        <el-select v-model="userGroupPermissionState.dialogForm['userGroupId']" clearable filterable disabled>
          <el-option v-for="item in userGroupState.list" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="userGroupPermissionState.dict['permissionId']" prop="permissionId">
        <!--<el-input-number v-model="userGroupPermissionState.dialogForm['permissionId']" controls-position="right"/>-->
        <el-select v-model="userGroupPermissionState.dialogForm['permissionId']" clearable filterable disabled>
          <el-option v-for="item in interfaceGroupState.list" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="userGroupPermissionState.dict['ifLongTerm']" prop="ifLongTerm">
        <!--<el-input v-model="userGroupPermissionState.dialogForm['ifLongTerm']"-->
        <!--          :placeholder="userGroupPermissionState.dict['ifLongTerm']"/>-->
        <el-radio-group v-model="userGroupPermissionState.dialogForm['ifLongTerm']">
          <el-radio :value="final.Y">是</el-radio>
          <el-radio :value="final.N">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="userGroupPermissionState.dict['ifLimitRequestTimes']" prop="ifLimitRequestTimes">
        <!--<el-input v-model="userGroupPermissionState.dialogForm['ifLimitRequestTimes']"-->
        <!--          :placeholder="userGroupPermissionState.dict['ifLimitRequestTimes']"/>-->
        <el-radio-group v-model="userGroupPermissionState.dialogForm['ifLimitRequestTimes']">
          <el-radio :value="final.Y">是</el-radio>
          <el-radio :value="final.N">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="userGroupPermissionState.dict['ifRejectRequestUseUp']" prop="ifRejectRequestUseUp">
        <!--<el-input v-model="userGroupPermissionState.dialogForm['ifRejectRequestUseUp']"-->
        <!--          :placeholder="userGroupPermissionState.dict['ifRejectRequestUseUp']"/>-->
        <el-radio-group v-model="userGroupPermissionState.dialogForm['ifRejectRequestUseUp']">
          <el-radio :value="final.Y">是</el-radio>
          <el-radio :value="final.N">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--<el-form-item :label="userGroupPermissionState.dict['permissionStartTime']" prop="permissionStartTime">-->
      <!--  <el-input v-model="userGroupPermissionState.dialogForm['permissionStartTime']"-->
      <!--            :placeholder="userGroupPermissionState.dict['permissionStartTime']"/>-->
      <!--</el-form-item>-->
      <!--<el-form-item :label="userGroupPermissionState.dict['permissionEndTime']" prop="permissionEndTime">-->
      <!--  <el-input v-model="userGroupPermissionState.dialogForm['permissionEndTime']"-->
      <!--            :placeholder="userGroupPermissionState.dict['permissionEndTime']"/>-->
      <!--</el-form-item>-->
      <el-form-item v-if="userGroupPermissionState.dialogForm.ifLongTerm === final.N"
                    :label="userGroupPermissionState.dict['permissionTime']" prop="permissionTime">
        <el-date-picker
            v-model="userGroupPermissionState.dialogForm['permissionTime']"
            type="datetimerange"
            :shortcuts="shortcuts"
            :start-placeholder="userGroupPermissionState.dict['permissionStartTime']"
            :end-placeholder="userGroupPermissionState.dict['permissionEndTime']"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
        />
      </el-form-item>
      <el-form-item v-if="userGroupPermissionState.dialogForm.ifLimitRequestTimes === final.Y"
                    :label="userGroupPermissionState.dict['limitRequestTimes']" prop="limitRequestTimes">
        <el-input-number v-model="userGroupPermissionState.dialogForm['limitRequestTimes']" controls-position="right"/>
      </el-form-item>
      <el-form-item :label="userGroupPermissionState.dict['orderNum']" prop="orderNum">
        <el-input-number v-model="userGroupPermissionState.dialogForm['orderNum']" controls-position="right"/>
      </el-form-item>
      <el-form-item :label="userGroupPermissionState.dict['remark']" prop="remark">
        <el-input type="textarea" v-model="userGroupPermissionState.dialogForm['remark']"
                  :placeholder="userGroupPermissionState.dict['remark']"/>
      </el-form-item>
      <el-form-item v-if="!ifAddUserGroupPermission" :label="userGroupPermissionState.dict['ifUseUp']" prop="ifUseUp">
        <el-tag v-if="userGroupPermissionState.dialogForm['ifUseUp'] === final.Y" type="danger">是</el-tag>
        <el-tag v-else type="success">已使用{{ userGroupPermissionState.dialogForm['count'] }}次
        </el-tag>
      </el-form-item>
      <!--在此上方添加表单项-->
      <!--<el-form-item :label="userGroupPermissionState.dict['orderNum']" prop='orderNum'>-->
      <!--  <el-input-number v-model="userGroupPermissionState.dialogForm['orderNum']" controls-position="right"/>-->
      <!--</el-form-item>-->
      <!--<el-form-item :label="userGroupPermissionState.dict['ifDefault']" prop='ifDefault'>-->
      <!--  <el-switch v-model="userGroupPermissionState.dialogForm['ifDefault']" :active-value='final.Y' :inactive-value='final.N'/>-->
      <!--</el-form-item>-->
      <!--<el-form-item :label="userGroupPermissionState.dict['ifDisabled']" prop='ifDisabled'>-->
      <!--  <el-radio-group v-model="userGroupPermissionState.dialogForm['ifDisabled']">-->
      <!--    <el-radio :value="final.Y">是</el-radio>-->
      <!--    <el-radio :value="final.N">否</el-radio>-->
      <!--  </el-radio-group>-->
      <!--</el-form-item>-->
      <!--<el-form-item :label="userGroupPermissionState.dict['ifDisabled']" prop="ifDisabled">-->
      <!--  <el-switch v-model="userGroupPermissionState.dialogForm['ifDisabled']" :active-value="final.N" :inactive-value="final.Y"/>-->
      <!--</el-form-item>-->
      <!--上方几个酌情使用-->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="showUseLog" v-if="!ifAddUserGroupPermission">查看调用日志</el-button>
        <el-button @click="userGroupPermissionDCan">取消</el-button>
        <el-button type="primary" @click="userGroupPermissionDCon2" v-if="ifAddUserGroupPermission">确认</el-button>
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
              <!--<el-table-column prop="ifLongTerm" :label="userGroupPermissionState.dict['ifLongTerm']" width="120">-->
              <!--  <template #default="{row}">-->
              <!--    <el-tag type="primary" v-if="row.ifLongTerm === final.Y">是</el-tag>-->
              <!--    <el-tag type="success" v-if="row.ifLongTerm === final.N">否</el-tag>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="ifLimitRequestTimes" :label="userGroupPermissionState.dict['ifLimitRequestTimes']"-->
              <!--                 width="120">-->
              <!--  <template #default="{row}">-->
              <!--    <el-tag type="primary" v-if="row.ifLimitRequestTimes === final.Y">是</el-tag>-->
              <!--    <el-tag type="success" v-if="row.ifLimitRequestTimes === final.N">否</el-tag>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="ifRejectRequestUseUp"-->
              <!--                 :label="userGroupPermissionState.dict['ifRejectRequestUseUp']" width="120">-->
              <!--  <template #default="{row}">-->
              <!--    <el-tag type="primary" v-if="row.ifRejectRequestUseUp === final.Y">是</el-tag>-->
              <!--    <el-tag type="success" v-if="row.ifRejectRequestUseUp === final.N">否</el-tag>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <el-table-column prop="ifUseUp" :label="userGroupPermissionState.dict['ifUseUp']" width="120">
                <template #default="{row}">
                  <el-tag type="danger" v-if="row.ifUseUp === final.Y">是</el-tag>
                  <el-tag type="success" v-if="row.ifUseUp === final.N">否</el-tag>
                </template>
              </el-table-column>
              <!--<el-table-column prop="orderNum" :label="userGroupPermissionState.dict['orderNum']" width="120"/>-->
              <el-table-column :label="userGroupState.dict['label']" width="120">
                <template #default="{row}">
                  {{ userGroupsOfThisInterfaceGroup.find(item => item.id === row.userGroupId)?.label }}
                </template>
              </el-table-column>
              <el-table-column prop="remark" :label="userGroupPermissionState.dict['remark']" width="120"/>
              <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="{row}">
                  <el-button link type="primary" size="small" @click="detailUserGroupOfThisInterfaceGroup(row.id)">
                    查看详情
                  </el-button>
                  <el-button link type="danger" size="small" @click="beforeDelUserGroupOfThisInterfaceGroup(row.id)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--<el-table :data="userGroupsOfThisInterfaceGroup">-->
            <!--  <el-table-column prop="label" :label="userGroupState.dict['label']" width="240"/>-->
            <!--  <el-table-column prop="remark" :label="userGroupState.dict['remark']" width="240"/>-->
            <!--  <el-table-column fixed="right" label="操作" min-width="120">-->
            <!--    <template #default="{row}">-->
            <!--      <el-button link type="primary" size="small"-->
            <!--                 @click="detailUserGroupOfThisInterfaceGroup(row.userGroupPermissionId)">-->
            <!--        查看详情-->
            <!--      </el-button>-->
            <!--      <el-button link type="danger" size="small"-->
            <!--                 @click="beforeDelUserGroupOfThisInterfaceGroup(row.userGroupPermissionId)">-->
            <!--        删除-->
            <!--      </el-button>-->
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
              <!--<el-table-column prop="ifLongTerm" :label="userGroupPermissionState.dict['ifLongTerm']" width="120">-->
              <!--  <template #default="{row}">-->
              <!--    <el-tag type="primary" v-if="row.ifLongTerm === final.Y">是</el-tag>-->
              <!--    <el-tag type="success" v-if="row.ifLongTerm === final.N">否</el-tag>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="ifLimitRequestTimes" :label="userGroupPermissionState.dict['ifLimitRequestTimes']"-->
              <!--                 width="120">-->
              <!--  <template #default="{row}">-->
              <!--    <el-tag type="primary" v-if="row.ifLimitRequestTimes === final.Y">是</el-tag>-->
              <!--    <el-tag type="success" v-if="row.ifLimitRequestTimes === final.N">否</el-tag>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="ifRejectRequestUseUp"-->
              <!--                 :label="userGroupPermissionState.dict['ifRejectRequestUseUp']" width="120">-->
              <!--  <template #default="{row}">-->
              <!--    <el-tag type="primary" v-if="row.ifRejectRequestUseUp === final.Y">是</el-tag>-->
              <!--    <el-tag type="success" v-if="row.ifRejectRequestUseUp === final.N">否</el-tag>-->
              <!--  </template>-->
              <!--</el-table-column>-->
              <el-table-column prop="ifUseUp" :label="userGroupPermissionState.dict['ifUseUp']" width="120">
                <template #default="{row}">
                  <el-tag type="danger" v-if="row.ifUseUp === final.Y">是</el-tag>
                  <el-tag type="success" v-if="row.ifUseUp === final.N">否</el-tag>
                </template>
              </el-table-column>
              <!--<el-table-column prop="orderNum" :label="userGroupPermissionState.dict['orderNum']" width="120"/>-->
              <el-table-column :label="interfaceGroupState.dict['label']" width="120">
                <template #default="{row}">
                  {{ interfaceGroupsOfThisUserGroup.find(item => item.id === row.permissionId)?.label }}
                </template>
              </el-table-column>
              <el-table-column prop="remark" :label="userGroupPermissionState.dict['remark']" width="120"/>
              <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="{row}">
                  <el-button link type="primary" size="small" @click="detailInterfaceGroupOfThisUserGroup(row.id)">
                    查看详情
                  </el-button>
                  <el-button link type="danger" size="small" @click="beforeDelInterfaceGroupOfThisUserGroup(row.id)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--<el-table :data="interfaceGroupsOfThisUserGroup">-->
            <!--  <el-table-column prop="label" :label="interfaceGroupState.dict['label']" width="240"/>-->
            <!--  <el-table-column prop="remark" :label="interfaceGroupState.dict['remark']" width="240"/>-->
            <!--  <el-table-column fixed="right" label="操作" min-width="120">-->
            <!--    <template #default="{row}">-->
            <!--      <el-button link type="primary" size="small"-->
            <!--                 @click="detailInterfaceGroupOfThisUserGroup(row.userGroupPermissionId)">-->
            <!--        查看详情-->
            <!--      </el-button>-->
            <!--      <el-button link type="danger" size="small"-->
            <!--                 @click="beforeDelInterfaceGroupOfThisUserGroup(row.userGroupPermissionId)">-->
            <!--        删除-->
            <!--      </el-button>-->
            <!--    </template>-->
            <!--  </el-table-column>-->
            <!--</el-table>-->
          </div>
        </el-card>
      </div>
      <div>
        <el-scrollbar>
          <!--顶部筛选表单-->
          <el-form
              class="demo-form-inline"
              v-if="Object.keys(userGroupState.filterForm).length>0"
              ref="userGroupFilterFormRef"
              :model="userGroupState.filterForm"
              :inline="true"
              @keyup.enter="userGroupFEnter"
              @submit.prevent
          >
            <!--在此下方添加表单项-->
            <el-form-item :label="userGroupState.dict['label']" prop="label">
              <el-input v-model="userGroupState.filterForm['label']" :placeholder="userGroupState.dict['label']"/>
            </el-form-item>
            <!--在此上方添加表单项-->
            <el-form-item>
              <el-button type="primary" @click="userGroupFCon">筛选</el-button>
              <el-button @click="userGroupFCan">重置</el-button>
            </el-form-item>
          </el-form>

          <!--操作按钮-->
          <div>
            <!--<el-button-group>-->
            <el-button type="primary" plain :icon="Refresh" @click="userGroupGRefresh">刷新</el-button>
            <!--<el-button type="primary" plain :icon="Plus" @click="userGroupGIns">新增</el-button>-->
            <!--<el-button type="success" plain :icon="Edit" :disabled="userGroupConfig.bulkOperation?userGroupState.multipleSelection.length===0:userGroupState.multipleSelection.length!==1" @click="userGroupGUpd">修改</el-button>-->
            <!--<el-button type="danger" plain :icon="Delete" :disabled="userGroupState.multipleSelection.length===0" @click="userGroupGDel()">删除</el-button>-->
            <!--<el-button type="warning" plain :icon='Download' :disabled='userGroupState.multipleSelection.length===0' @click="userGroupGExport()">导出</el-button>-->
            <!--<el-button type="warning" plain :icon='Upload' @click="userGroupGImport">上传</el-button>-->
            <!--</el-button-group>-->
          </div>

          <!--数据表格-->
          <el-table
              ref="userGroupTableRef"
              v-loading="userGroupTableLoadingRef"
              :data="userGroupState.list"
              @selection-change="userGroupHandleSelectionChange"
              highlight-current-row
              @current-change="userGroupHandleCurrentChange"
          >
            <el-table-column fixed type="selection" width="55"/>
            <!--<el-table-column fixed prop="id" :label="userGroupState.dict['id']" width="180"/>-->
            <!--上面id列的宽度改一下-->
            <!--在此下方添加表格列-->
            <el-table-column prop="label" :label="userGroupState.dict['label']" width="240"/>
            <!--<el-table-column prop="parentId" :label="userGroupState.dict['parentId']" width="120"/>-->
            <!--<el-table-column prop="orderNum" :label="userGroupState.dict['orderNum']" width="120"/>-->
            <el-table-column prop="remark" :label="userGroupState.dict['remark']" width="240"/>
            <!--在此上方添加表格列-->
            <!--<el-table-column prop="createBy" :label="userGroupState.dict['createBy']" width="120"/>-->
            <!--<el-table-column prop="updateBy" :label="userGroupState.dict['updateBy']" width="120"/>-->
            <!--<el-table-column prop="createTime" :label="userGroupState.dict['createTime']" width="220"/>-->
            <!--<el-table-column prop="updateTime" :label="userGroupState.dict['updateTime']" width="220"/>-->
            <!--<el-table-column prop="deleted" :label="userGroupState.dict['deleted']" width="60"/>-->
            <!--上方几个酌情使用-->
            <!--<el-table-column fixed="right" label="操作" min-width="120">-->
            <!--  <template #default="{row}">-->
            <!--    <el-button link type="primary" size="small" @click="userGroupTUpd(row.id)">修改</el-button>-->
            <!--    <el-button link type="danger" size="small" @click="userGroupTDel(row.id)">删除</el-button>-->
            <!--  </template>-->
            <!--</el-table-column>-->
            <template #append>
              <div class="el-table-append-box">
          <span>此表格的多选<span class="underline">不支持</span>
            {{ `跨分页保存，当前已选 ${userGroupState.multipleSelection.length} 条数据。` }}</span>
              </div>
            </template>
          </el-table>

          <!--分页-->
          <Pagination
              v-if="userGroupState.total!==-1"
              :total="Number(userGroupState.total)"
              :page-num="userGroupState.pageParam.pageNum"
              :page-size="userGroupState.pageParam.pageSize"
              @page-change="userGroupPageChange"
          />
        </el-scrollbar>
      </div>
      <div>
        <Divider/>
      </div>
      <div>
        <el-scrollbar>
          <!--顶部筛选表单-->
          <el-form
              class="demo-form-inline"
              v-if="Object.keys(interfaceGroupState.filterForm).length>0"
              ref="interfaceGroupFilterFormRef"
              :model="interfaceGroupState.filterForm"
              :inline="true"
              @keyup.enter="interfaceGroupFEnter"
              @submit.prevent
          >
            <!--在此下方添加表单项-->
            <el-form-item :label="interfaceGroupState.dict['label']" prop="label">
              <el-input v-model="interfaceGroupState.filterForm['label']"
                        :placeholder="interfaceGroupState.dict['label']"/>
            </el-form-item>
            <!--在此上方添加表单项-->
            <el-form-item>
              <el-button type="primary" @click="interfaceGroupFCon">筛选</el-button>
              <el-button @click="interfaceGroupFCan">重置</el-button>
            </el-form-item>
          </el-form>

          <!--操作按钮-->
          <div>
            <!--<el-button-group>-->
            <el-button type="primary" plain :icon="Refresh" @click="interfaceGroupGRefresh">刷新</el-button>
            <!--<el-button type="primary" plain :icon="Plus" @click="interfaceGroupGIns">新增</el-button>-->
            <!--<el-button type="success" plain :icon="Edit" :disabled="interfaceGroupConfig.bulkOperation?interfaceGroupState.multipleSelection.length===0:interfaceGroupState.multipleSelection.length!==1" @click="interfaceGroupGUpd">修改</el-button>-->
            <!--<el-button type="danger" plain :icon="Delete" :disabled="interfaceGroupState.multipleSelection.length===0" @click="interfaceGroupGDel()">删除</el-button>-->
            <!--<el-button type="warning" plain :icon='Download' :disabled='interfaceGroupState.multipleSelection.length===0' @click="interfaceGroupGExport()">导出</el-button>-->
            <!--<el-button type="warning" plain :icon='Upload' @click="interfaceGroupGImport">上传</el-button>-->
            <!--</el-button-group>-->
          </div>

          <!--数据表格-->
          <el-table
              ref="interfaceGroupTableRef"
              v-loading="interfaceGroupTableLoadingRef"
              :data="interfaceGroupState.list"
              @selection-change="interfaceGroupHandleSelectionChange"
              highlight-current-row
              @current-change="interfaceGroupHandleCurrentChange"
          >
            <el-table-column fixed type="selection" width="55"/>
            <!--<el-table-column fixed prop="id" :label="interfaceGroupState.dict['id']" width="180"/>-->
            <!--上面id列的宽度改一下-->
            <!--在此下方添加表格列-->
            <el-table-column prop="label" :label="interfaceGroupState.dict['label']" width="240"/>
            <!--<el-table-column prop="parentId" :label="interfaceGroupState.dict['parentId']" width="120"/>-->
            <!--<el-table-column prop="orderNum" :label="interfaceGroupState.dict['orderNum']" width="120"/>-->
            <el-table-column prop="remark" :label="interfaceGroupState.dict['remark']" width="240"/>
            <!--在此上方添加表格列-->
            <!--<el-table-column prop="createBy" :label="interfaceGroupState.dict['createBy']" width="120"/>-->
            <!--<el-table-column prop="updateBy" :label="interfaceGroupState.dict['updateBy']" width="120"/>-->
            <!--<el-table-column prop="createTime" :label="interfaceGroupState.dict['createTime']" width="220"/>-->
            <!--<el-table-column prop="updateTime" :label="interfaceGroupState.dict['updateTime']" width="220"/>-->
            <!--<el-table-column prop="deleted" :label="interfaceGroupState.dict['deleted']" width="60"/>-->
            <!--上方几个酌情使用-->
            <!--<el-table-column fixed="right" label="操作" min-width="120">-->
            <!--  <template #default="{row}">-->
            <!--    <el-button link type="primary" size="small" @click="interfaceGroupTUpd(row.id)">修改</el-button>-->
            <!--    <el-button link type="danger" size="small" @click="interfaceGroupTDel(row.id)">删除</el-button>-->
            <!--  </template>-->
            <!--</el-table-column>-->
            <template #append>
              <div class="el-table-append-box">
          <span>此表格的多选<span class="underline">不支持</span>
            {{ `跨分页保存，当前已选 ${interfaceGroupState.multipleSelection.length} 条数据。` }}</span>
              </div>
            </template>
          </el-table>

          <!--分页-->
          <Pagination
              v-if="interfaceGroupState.total!==-1"
              :total="Number(interfaceGroupState.total)"
              :page-num="interfaceGroupState.pageParam.pageNum"
              :page-size="interfaceGroupState.pageParam.pageSize"
              @page-change="interfaceGroupPageChange"
          />
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
            :disabled="!(userGroupState.multipleSelection.length===1&&interfaceGroupState.multipleSelection.length===1)"
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
