<script setup lang="ts">
import { computed, inject, nextTick, reactive, Ref, ref, watch } from "vue";
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage.ts";
import { State, t_config } from "@/type/tablePage.ts";
import type { FormRules, TreeInstance } from 'element-plus';
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { MORE, ONE, typeOM } from "@/type/utils/base.ts";
import { interfaceGroupDto, interfaceGroupUpdDto } from "@/type/api/sysManage/interfaceGroup.ts";
import { interfaceGroupFunc } from "@/api/module/sysManage/interfaceGroup.ts";
import { interfaceDto } from "@/type/api/sysManage/interface.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import { interfaceInterfaceGroupDto } from "@/type/api/sysManage/interfaceInterfaceGroup.ts";

const props = defineProps({
  interface: {
    type: interfaceDto,
    required: true
  }
});

const state = reactive<State<interfaceGroupDto, interfaceGroupUpdDto>>({
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
  func: interfaceGroupFunc
})

const selectInterfaceGroupTree = ref<TreeInstance|null>(null)
const tableData2 = computed(() => arr2ToDiguiObj(state.list))
const selectInterfaceGroup: Ref<number[]> | undefined = inject('changeSelectInterfaceGroup')
const selectInterfaceGroup2 = ref<number[]>(selectInterfaceGroup ? selectInterfaceGroup.value : [])
nextTick(() => {
  if (selectInterfaceGroupTree.value) {
    selectInterfaceGroupTree.value.setCheckedKeys(selectInterfaceGroup2.value)
  }
})
watch(selectInterfaceGroup2, () => {
  if (selectInterfaceGroup) {
    selectInterfaceGroup.value = state.list.filter(item => selectInterfaceGroup2.value.indexOf(item.id) > -1).map(item=>item.id)
  }
}, {
  deep: true
})

const handleCheckChange = (
    data: interfaceGroupDto,
    checked: boolean,
    indeterminate: boolean
) => {
  if (checked) {
    selectInterfaceGroup2.value.push(data.id)
  } else {
    if (selectInterfaceGroup) {
      selectInterfaceGroup2.value.splice(selectInterfaceGroup2.value.indexOf(data.id), 1)
    }
  }
}
</script>

<template>
  <!--接口信息-->
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">接口信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item label="接口id">
          <el-input disabled v-model="props.interface.id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="接口名">
          <el-input disabled v-model="props.interface.label"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="接口权限标识">
          <el-input disabled v-model="props.interface.perms"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <!--接口组列表-->
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">接口组列表</el-text>
  </el-divider>
  <!--操作按钮-->
  <div>
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
  </div>

  <br/>
  <el-form>
    <el-form-item label="接口组列表">
      <el-tree
          style="width: 100%;"
          ref="selectInterfaceGroupTree"
          node-key="id"
          :data="tableData2"
          show-checkbox
          :check-strictly="true"
          :default-expanded-keys="selectInterfaceGroup2"
          default-expand-all
          @check-change="handleCheckChange"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>