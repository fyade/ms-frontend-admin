<script setup lang="ts">
import { computed, inject, nextTick, reactive, Ref, ref, watch } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.js"
import { State, t_config, t_FuncMap } from "@/type/tablePage.ts"
import type { FormRules } from 'element-plus'
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { MORE, ONE } from "@/type/utils/base.ts"
import { deptPermissionDto } from "@/type/api/sysManage/deptPermission.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import { menuSelAll } from "@/api/module/sysManage/menu.ts";

const props = defineProps({
  selectDept: {
    type: Object,
    required: true
  }
})


const state = reactive<State<deptPermissionDto>>({
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
  //   orderNum: final.DEFAULT_ORDER_NUM,
  //   ...
  // }
  dialogForm: {
    id: -1,
    deptId: -1,
    type: '',
    permissionId: -1,
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
    deptId: [{required: true, trigger: 'change'}],
    type: [{required: true, trigger: 'change'}],
    permissionId: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    deptId: '部门id',
    type: '接口类型',
    permissionId: '权限id',
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
    // return deptPermissionSel(params)
    return new Promise(resolve => resolve(null))
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: any) => {
    return menuSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    // return deptPermissionSelById(id)
    return new Promise(resolve => resolve(null))
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    // return deptPermissionSelByIds(ids)
    return new Promise(resolve => resolve(null))
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    // return deptPermissionIns(obj)
    return new Promise(resolve => resolve(null))
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    // return deptPermissionUpd(obj)
    return new Promise(resolve => resolve(null))
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: any[]) => {
    // return deptPermissionInss(objs)
    return new Promise(resolve => resolve(null))
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: any[]) => {
    // return deptPermissionUpds(objs)
    return new Promise(resolve => resolve(null))
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    // return deptPermissionDel(ids)
    return new Promise(resolve => resolve(null))
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

const selectPermissionTree = ref<any>(null)
const tableData2 = computed(() => arr2ToDiguiObj(state.list))
const selectPermission: Ref<any[]> | undefined = inject('changeSelectPermission')
const selectPermission2 = ref<any[]>(selectPermission ? selectPermission.value.map(item => item.permissionId) : [])
nextTick(() => {
  if (selectPermissionTree) {
    selectPermissionTree.value?.setCheckedKeys(selectPermission2.value)
  }
})
watch(selectPermission2, () => {
  if (selectPermission) {
    selectPermission.value = state.list.filter((item: any) => selectPermission2.value.indexOf(item.id) > -1)
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
    selectPermission2.value.push(data.id)
  } else {
    if (selectPermission) {
      selectPermission2.value.splice(selectPermission2.value.indexOf(data.id), 1)
    }
  }
}
</script>

<template>
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">部门信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item label="部门id">
          <el-input disabled v-model="props.selectDept.id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="部门名">
          <el-input disabled v-model="props.selectDept.label"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">权限列表</el-text>
  </el-divider>
  <!--操作按钮-->
  <div>
    <!--<el-button-group>-->
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
    <!--<el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>-->
    <!--<el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?state.multipleSelection.length===0:state.multipleSelection.length!==1" @click="gUpd">修改</el-button>-->
    <!--<el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel()">删除</el-button>-->
    <!--<el-button type="warning" plain :icon='Download' :disabled='state.multipleSelection.length===0' @click="gExport()">导出</el-button>-->
    <!--<el-button type="warning" plain :icon='Upload' @click="gImport">上传</el-button>-->
    <!--</el-button-group>-->
    <!--<el-button-group>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gMoveUp">上移</el-button>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gMoveDown">下移</el-button>-->
    <!--</el-button-group>-->
    <!--<el-button-group>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledToNo">启用</el-button>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledToYes">禁用</el-button>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledShift">切换</el-button>-->
    <!--</el-button-group>-->
  </div>

  <br/>
  <el-form>
    <el-form-item label="权限列表">
      <el-tree
          ref="selectPermissionTree"
          node-key="id"
          style="width: 100%;"
          :data="tableData2"
          show-checkbox
          :check-strictly="true"
          :default-expanded-keys="selectPermission2"
          default-expand-all
          @check-change="handleCheckChange"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>