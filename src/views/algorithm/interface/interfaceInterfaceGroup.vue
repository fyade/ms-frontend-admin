<script setup lang="ts">
import { computed, inject, nextTick, reactive, Ref, ref, watch } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules, TreeInstance } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { InterfaceGroupDto, InterfaceGroupUpdDto } from "@/type/module/algorithm/interfaceGroup.ts";
import { interfaceGroupApi } from "@/api/module/algorithm/interfaceGroup.ts";
import { interfaceGroupDict } from "@/dict/module/algorithm/interfaceGroup.ts";
import { InterfaceDto } from "@/type/module/algorithm/interface.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";

const props = defineProps({
  interface: {
    type: InterfaceDto,
    required: true
  }
});

const state = reactive<State2<InterfaceGroupDto, InterfaceGroupUpdDto>>({
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
  filterForm: {},
})
const dFormRules: FormRules = {
  label: [{required: true, trigger: 'change'}],
  parentId: [{required: true, trigger: 'change'}],
  baseURL: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true,
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
} = funcTablePage<InterfaceGroupDto, InterfaceGroupUpdDto>({
  state,
  dFormRules,
  config,
  api: interfaceGroupApi,
  dict: interfaceGroupDict,
})

const selectInterfaceGroupTree = ref<TreeInstance | null>(null)
const tableData2 = computed(() => arr2ToDiguiObj(tableData.value))
const selectInterfaceGroup: Ref<number[]> | undefined = inject('changeSelectInterfaceGroup')
const selectInterfaceGroup2 = ref<number[]>(selectInterfaceGroup ? selectInterfaceGroup.value : [])
nextTick(() => {
  if (selectInterfaceGroupTree.value) {
    selectInterfaceGroupTree.value.setCheckedKeys(selectInterfaceGroup2.value)
  }
})
watch(selectInterfaceGroup2, () => {
  if (selectInterfaceGroup) {
    selectInterfaceGroup.value = tableData.value.filter(item => selectInterfaceGroup2.value.indexOf(item.id) > -1).map(item => item.id)
  }
}, {
  deep: true
})

const handleCheckChange = (
    data: InterfaceGroupDto,
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
          default-expand-all
          @check-change="handleCheckChange"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>