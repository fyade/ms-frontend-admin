<script setup lang="ts">
import { computed, inject, nextTick, reactive, Ref, ref, watch } from "vue"
import { final, PAGINATION, publicDict } from "@/utils/base.ts"
import { funcTablePage } from "@/composition/tablePage/tablePage.ts"
import { State, t_config } from "@/type/tablePage.ts"
import type { FormRules, TreeInstance } from 'element-plus'
import { MORE, ONE, typeOM } from "@/type/utils/base.ts"
import { userGroupDto } from "@/type/api/main/sysManage/userGroup.ts";
import { userGroupFunc, } from "@/api/module/main/sysManage/userGroup.ts"
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import { userDto2 } from "@/type/api/main/sysManage/user.ts";

const props = defineProps({
  user: {
    type: userDto2,
    required: true
  }
});

const state = reactive<State<userGroupDto>>({
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
  filterForm: {},
  list: [],
  multipleSelection: [],
  total: -1,
  pageParam: {
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  }
})
const state2 = reactive({
  orderNum: final.DEFAULT_ORDER_NUM
})
const dialogFormRef = ref(null)
const dialogFormsRef = ref(null)
const filterFormRef = ref(null)
const dialogVisible = ref(false)
const dialogLoadingRef = ref(false)
const tableLoadingRef = ref(false)
const switchLoadingRef = ref(false)
const activeTabName = ref<typeOM>(final.one)
const config: t_config = reactive({
  pageQuery: false, // 分页，默认true
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
})

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
  gExport,
  gImport,
  tUpd,
  tDel,
  handleSelectionChange,
  pageChange,
  dfIns,
  dfDel,
  ifRequired
} = funcTablePage({
  config,
  state,
  state2,
  dialogFormRef,
  dialogFormsRef,
  filterFormRef,
  dialogVisible,
  dialogLoadingRef,
  tableLoadingRef,
  switchLoadingRef,
  activeTabName,
  func: userGroupFunc
})

const selectUserGroupTree = ref<TreeInstance | null>(null)
const tableData2 = computed(() => arr2ToDiguiObj(state.list))
const selectUserGroup: Ref<number[]> | undefined = inject('changeSelectUserGroup')
const selectUserGroup2 = ref<number[]>(selectUserGroup ? selectUserGroup.value : [])
nextTick(() => {
  if (selectUserGroupTree.value) {
    selectUserGroupTree.value.setCheckedKeys(selectUserGroup2.value)
  }
})
watch(selectUserGroup2, () => {
  if (selectUserGroup) {
    selectUserGroup.value = state.list.filter(item => selectUserGroup2.value.indexOf(item.id) > -1).map(item => item.id)
  }
}, {
  deep: true
})

const handleCheckChange = (
    data: userGroupDto,
    checked: boolean,
    indeterminate: boolean
) => {
  if (checked) {
    selectUserGroup2.value.push(data.id)
  } else {
    if (selectUserGroup) {
      selectUserGroup2.value.splice(selectUserGroup2.value.indexOf(data.id), 1)
    }
  }
}
</script>

<template>
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">用户信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item label="用户id">
          <el-input disabled v-model="props.user.id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="用户名">
          <el-input disabled v-model="props.user.username"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="用户昵称">
          <el-input disabled v-model="props.user.nickname"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">部门列表</el-text>
  </el-divider>

  <br/>
  <el-form>
    <el-form-item label="所属部门">
      <el-tree
          style="width: 100%;"
          ref="selectUserGroupTree"
          node-key="id"
          :data="tableData2"
          show-checkbox
          :check-strictly="true"
          :default-checked-keys="selectUserGroup2"
          default-expand-all
          @check-change="handleCheckChange"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>