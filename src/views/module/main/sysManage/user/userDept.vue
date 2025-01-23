<script setup lang="ts">
import { computed, inject, nextTick, reactive, ref, Ref, useTemplateRef, watch } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules, TreeInstance } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { DeptDto, DeptUpdDto } from "@/type/module/main/sysManage/dept.ts";
import { deptApi } from "@/api/module/main/sysManage/dept.ts";
import { deptDict } from "@/dict/module/main/sysManage/dept.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import { UserDto2 } from "@/type/module/main/sysManage/user.ts";
import { userDict } from "@/dict/module/main/sysManage/user.ts";

const props = defineProps({
  user: {
    type: UserDto2,
    required: true
  }
});

const state = reactive<State2<DeptDto, DeptUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    ifAdmin: final.N,
    ifDisabled: final.N,
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
const dFormRules: FormRules = {
  label: [{required: true, trigger: 'change'}],
  ifAdmin: [{required: true, trigger: 'change'}],
  ifDisabled: [{required: true, trigger: 'change'}],
  parentId: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  pageQuery: false,
  bulkOperation: true,
})

const {
  dialogFormRef,
  dialogFormsRef,
  filterFormRef,
  filterFormVisible1,
  filterFormVisible,
  dialogVisible,
  dialogLoadingRef,
  dialogButtonLoadingRef,
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
  gChangeFilterFormVisible,
  tUpd,
  tDel,
  handleSelectionChange,
  pageChange,
  dfIns,
  dfDel,
  ifRequired,
} = funcTablePage<DeptDto, DeptUpdDto>({
  state,
  dFormRules,
  config,
  api: deptApi,
  dict: deptDict,
})

const selectDeptTree = useTemplateRef<TreeInstance>('selectDeptTree')
const tableData2 = computed(() => arr2ToDiguiObj(tableData.value))
const selectDept: Ref<number[]> | undefined = inject('changeSelectDept')
const selectDept2 = ref<number[]>(selectDept ? selectDept.value : [])
nextTick(() => {
  if (selectDeptTree.value) {
    selectDeptTree.value.setCheckedKeys(selectDept2.value)
  }
})
watch(selectDept2, () => {
  if (selectDept) {
    selectDept.value = tableData.value.filter(item => selectDept2.value.indexOf(item.id) > -1).map(item => item.id)
  }
}, {
  deep: true
})

const handleCheckChange = (
    data: DeptDto,
    checked: boolean,
    indeterminate: boolean
) => {
  if (checked) {
    selectDept2.value.push(data.id)
  } else {
    if (selectDept) {
      selectDept2.value.splice(selectDept2.value.indexOf(data.id), 1)
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
        <el-form-item :label="userDict.id">
          {{ props.user.id }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="userDict.username">
          {{ props.user.username }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="userDict.nickname">
          {{ props.user.nickname }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">部门列表</el-text>
  </el-divider>
  <!--操作按钮-->
  <div class="zs-button-row">
    <div>
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
    </div>
    <div>
      <el-button v-if="filterFormVisible1" plain :icon="Search" circle @click="gChangeFilterFormVisible"/>
    </div>
  </div>

  <br/>
  <el-form>
    <el-form-item label="所属部门">
      <el-tree
          style="width: 100%;"
          ref="selectDeptTree"
          node-key="id"
          :data="tableData2"
          show-checkbox
          :check-strictly="true"
          :default-checked-keys="selectDept2"
          default-expand-all
          @check-change="handleCheckChange"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>