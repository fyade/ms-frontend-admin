<script setup lang="ts">
import { computed, inject, nextTick, reactive, Ref, ref, watch } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.js"
import { State, t_config, t_FuncMap } from "@/type/tablePage.ts"
import type { FormRules } from 'element-plus'
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { MORE, ONE } from "@/type/utils/base.ts"
import { userGroupDto } from "@/type/api/sysManage/userGroup.ts";
import {
  userGroupSel,
  userGroupSelById,
  userGroupSelByIds,
  userGroupSelAll,
  userGroupIns,
  userGroupUpd,
  userGroupInss,
  userGroupUpds,
  userGroupDel,
} from "@/api/module/sysManage/userGroup.ts"
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";

const props = defineProps({
  user: {
    type: Object,
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
  orderNum: 0
})
const dialogFormRef = ref(null)
const dialogFormsRef = ref(null)
const filterFormRef = ref(null)
const dialogVisible = ref(false)
const dialogLoadingRef = ref(false)
const tableLoadingRef = ref(false)
const switchLoadingRef = ref(false)
const activeTabName = ref<ONE | MORE>(final.one)
const config: t_config = reactive({
  selectParam: {}, // 查询参数（补充
  getDataOnMounted: true, // 页面加载时获取数据，默认true
  pageQuery: false, // 分页，默认true
  watchDialogVisible: true, // 监听dialogVisible变化，默认true
  /**
   * dialogVisible变化时的回调，可不传
   * @param visible 变化后的值
   */
  dialogVisibleCallback: (visible: boolean) => {
  },
  /**
   * selectList回调，可不传
   */
  selectListCallback: () => {
  },
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
  /**
   * 修改单个前的查询的回调，可不传，one2More为true时调这个
   */
  beforeUpdateOneCallback1: (res: any[]) => {
  },
  /**
   * 修改单个前的查询的回调，可不传，one2More为false时调这个
   */
  beforeUpdateOneCallback2: (res: any) => {
  }
})

const func: t_FuncMap = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: any) => {
    return userGroupSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: any) => {
    return userGroupSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return userGroupSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return userGroupSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return userGroupIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    return userGroupUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: any[]) => {
    return userGroupInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: any[]) => {
    return userGroupUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return userGroupDel(ids)
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
  func
})

const selectUserGroupTree = ref<any>(null)
const tableData2 = computed(() => arr2ToDiguiObj(state.list))
const selectUserGroup: Ref<any[]> | undefined = inject('changeSelectUserGroup')
const selectUserGroup2 = ref<any[]>(selectUserGroup ? selectUserGroup.value.map(item => item.id) : [])
nextTick(() => {
  if (selectUserGroupTree) {
    selectUserGroupTree.value?.setCheckedKeys(selectUserGroup2.value)
  }
})
watch(selectUserGroup2, () => {
  if (selectUserGroup) {
    selectUserGroup.value = state.list.filter((item: any) => selectUserGroup2.value.indexOf(item.id) > -1)
  }
}, {
  deep: true
})

const handleCheckChange = (
    data: any,
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
          ref="selectUserGroupTree"
          node-key="id"
          style="width: 100%;"
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