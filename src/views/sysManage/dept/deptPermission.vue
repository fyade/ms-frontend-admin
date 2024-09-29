<script setup lang="ts">
import { computed, inject, nextTick, reactive, Ref, ref, watch } from "vue"
import { final, PAGINATION, publicDict } from "@/utils/base.ts"
import { funcTablePage } from "@/composition/tablePage/tablePage.ts"
import { State, t_config } from "@/type/tablePage.ts"
import type { FormRules, TreeInstance } from 'element-plus'
import { Refresh } from "@element-plus/icons-vue";
import { MORE, ONE, typeOM } from "@/type/utils/base.ts"
import { menuDto, T_COMP, T_Inter, T_IS, T_MENU } from "@/type/api/sysManage/menu.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import { menuFunc } from "@/api/module/sysManage/menu.ts";
import type Node from "element-plus/es/components/tree/src/model/node";

const props = defineProps({
  selectDept: {
    type: Object,
    required: true
  }
})

const state = reactive<State<menuDto<string>>>({
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
    type: '',
    path: '',
    parentId: final.DEFAULT_PARENT_ID,
    component: '',
    icon: '',
    orderNum: final.DEFAULT_ORDER_NUM,
    ifLink: '',
    ifVisible: '',
    ifDisabled: final.N,
    ifPublic: '',
    perms: '',
    sysPerms: 'main',
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
    type: [{required: true, trigger: 'change'}],
    path: [{required: true, trigger: 'change'}],
    parentId: [{required: true, trigger: 'change'}],
    component: [{required: true, trigger: 'change'}],
    icon: [{required: true, trigger: 'change'}],
    orderNum: [{required: true, trigger: 'change'}],
    ifLink: [{required: true, trigger: 'change'}],
    ifVisible: [{required: true, trigger: 'change'}],
    ifDisabled: [{required: true, trigger: 'change'}],
    ifPublic: [{required: true, trigger: 'change'}],
    perms: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    label: '菜单名',
    type: '菜单类型',
    path: '菜单路径',
    parentId: '父级菜单',
    component: '组件路径',
    icon: '图标',
    ifLink: '是否外链',
    ifVisible: '是否显示',
    ifPublic: '是否公共接口',
    perms: '权限标识',
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
const activeTabName = ref<typeOM>(final.one)
const config: t_config = reactive({
  pageQuery: false, // 分页，默认true
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
  selectParam: {
    type: {in: {value: [T_MENU, T_COMP]}}
  },
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
  func: menuFunc
})

// 左侧菜单/组件列表
const selectPermissionTree = ref<TreeInstance | null>(null)
const tableData2 = computed(() => arr2ToDiguiObj(state.list))
const selectPermission: Ref<number[]> | undefined = inject('changeSelectPermission')
const selectPermission2 = ref<number[]>(selectPermission ? selectPermission.value : [])
nextTick(() => {
  if (selectPermissionTree.value) {
    selectPermissionTree.value.setCheckedKeys(selectPermission2.value)
  }
})
watch(selectPermission2, () => {
  if (selectPermission) {
    selectPermission.value = state.list.filter(item => selectPermission2.value.indexOf(item.id) > -1).map(item => item.id)
  }
}, {
  deep: true
})

const handleCheckChange = (
    data: menuDto,
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

// 右侧接口列表
const selectPermission3: Ref<number[]> | undefined = inject('changeSelectPermission3')
const loadNode = (node: Node, resolve: (data: menuDto[]) => void) => {
  menuFunc.selectAll({
    parentId: node.level === 0 ? final.DEFAULT_PARENT_ID : node.data.id,
    type: {in: {value: [T_IS, T_Inter]}}
  } as any).then((res: menuDto[]) => {
    resolve(res)
  })
}
const handleCheckChange2 = (
    data: menuDto,
    checked: boolean,
    indeterminate: boolean
) => {
  if (checked) {
    selectPermission3?.value.push(data.id)
  } else {
    selectPermission3?.value.splice(selectPermission3?.value.indexOf(data.id), 1)
  }
  if (selectPermission2.value.includes(data.id)) {
    selectPermission2.value.splice(selectPermission2.value.indexOf(data.id), 1)
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
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
  </div>

  <br/>
  <el-form>
    <el-row>
      <el-col :span="12">
        <el-form-item label="菜单/组件列表">
          <el-tree
              style="width: 100%;"
              ref="selectPermissionTree"
              node-key="id"
              :data="tableData2"
              show-checkbox
              :check-strictly="true"
              :default-expanded-keys="selectPermission2"
              default-expand-all
              @check-change="handleCheckChange"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="接口列表">
          <el-tree
              style="width: 100%;"
              node-key="id"
              lazy
              show-checkbox
              :load="loadNode"
              :check-strictly="true"
              :default-checked-keys="selectPermission2"
              @check-change="handleCheckChange2"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>