<script setup lang="ts">
import { inject, nextTick, reactive, ref, Ref, toRaw, useTemplateRef, watch } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules, TableInstance } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { RoleDto, RoleUpdDto } from "@/type/module/main/sysManage/role.ts";
import { roleApi } from "@/api/module/main/sysManage/role.ts";
import { roleDict } from "@/dict/module/main/sysManage/role.ts";
import { deepClone } from "@/utils/ObjectUtils.ts";
import { UserVisitorDto2 } from "@/type/module/main/otherUser/userVisitor.ts";
import { userVisitorDict } from "@/dict/module/main/otherUser/userVisitor.ts";

const props = defineProps({
  user: {
    type: UserVisitorDto2,
    required: true
  }
});

const state = reactive<State2<RoleDto, RoleUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    ifAdmin: final.N,
    ifDisabled: final.N,
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    label: '',
    ifAdmin: '',
    ifDisabled: ''
  },
})
const dFormRules: FormRules = {
  label: [{required: true, trigger: 'change'}],
  ifAdmin: [{required: true, trigger: 'change'}],
  ifDisabled: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  selectListCallback: () => {
    nextTick(() => {
      handleDataChange()
    })
  },
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
  pageChange,
  dfIns,
  dfDel,
  ifRequired,
} = funcTablePage<RoleDto, RoleUpdDto>({
  state,
  dFormRules,
  config,
  api: roleApi,
  dict: roleDict,
})

const selects = reactive<Record<string|number, boolean>>({})
const selectRole: Ref<number[]> | undefined = inject('changeSelectRole')
if (selectRole) {
  selectRole.value.forEach(id => selects[id] = true)
}
const multipleTable = useTemplateRef<TableInstance>('multipleTable')
const handleDataChange = () => {
  const selects2 = deepClone<Record<string|number, boolean>>(toRaw(selects))
  for (const role of tableData.value) {
    multipleTable.value?.toggleRowSelection(role, !!selects2[role.id])
  }
}
const handleSelectionChange = (vals: RoleDto[]) => {
  tableData.value.forEach(data => {
    selects[data.id] = vals.findIndex(val => val.id === data.id) > -1
  })
}
watch(selects, () => {
  if (selectRole) {
    selectRole.value = Object.keys(selects).filter(key => selects[key]).map(_ => Number(_))
  }
})
</script>

<template>
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">用户信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="userVisitorDict.id">
          {{ props.user.id }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="userVisitorDict.username">
          {{ props.user.username }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="userVisitorDict.nickname">
          {{ props.user.nickname }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">角色列表</el-text>
  </el-divider>

  <!--顶部筛选表单-->
  <div class="zs-filter-form" v-show="filterFormVisible1 && filterFormVisible">
    <el-form
        class="demo-form-inline"
        ref="filterFormRef"
        :model="state.filterForm"
        :inline="true"
        @keyup.enter="fEnter"
        @submit.prevent
    >
      <!--在此下方添加表单项-->
      <el-form-item :label="roleDict.label" prop="label">
        <el-input v-model="state.filterForm.label" :placeholder="roleDict.label"/>
      </el-form-item>
      <el-form-item :label="roleDict.ifAdmin" prop="ifAdmin">
        <!--<el-input v-model="state.filterForm.ifAdmin" :placeholder="roleDict.ifAdmin"/>-->
        <el-select v-model="state.filterForm.ifAdmin" :placeholder="roleDict.ifAdmin" clearable filterable>
          <el-option label="是" :value="final.Y"/>
          <el-option label="否" :value="final.N"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="roleDict.ifDisabled" prop="ifDisabled">
        <!--<el-input v-model="state.filterForm.ifDisabled" :placeholder="roleDict.ifDisabled"/>-->
        <el-select v-model="state.filterForm.ifDisabled" :placeholder="roleDict.ifDisabled" clearable filterable>
          <el-option label="是" :value="final.Y"/>
          <el-option label="否" :value="final.N"/>
        </el-select>
      </el-form-item>
      <!--在此上方添加表单项-->
      <el-form-item>
        <el-button type="primary" @click="fCon">筛选</el-button>
        <el-button @click="fCan">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!--操作按钮-->
  <div class="zs-button-row">
    <div>
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
      <!--<el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>-->
      <!--<el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd">修改</el-button>-->
      <!--<el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除</el-button>-->
      <!--<el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>-->
      <!--<el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>-->
    </div>
    <div>
      <el-button v-if="filterFormVisible1" plain :icon="Search" circle @click="gChangeFilterFormVisible"/>
    </div>
  </div>

  <div class="zs-table-data">
    <!--数据表格-->
    <el-table
        ref="multipleTable"
        v-loading="tableLoadingRef"
        :data="tableData"
        row-key="id"
        @selectAll="handleSelectionChange"
        @selectionChange="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55" :reserve-selection="true"/>
      <!--<el-table-column fixed prop="id" :label="roleDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="label" :label="roleDict.label" width="120"/>
      <el-table-column prop="ifAdmin" :label="roleDict.ifAdmin" width="120"/>
      <el-table-column prop="ifDisabled" :label="roleDict.ifDisabled" width="120"/>
      <el-table-column prop="orderNum" :label="roleDict.orderNum" width="120"/>
      <el-table-column prop="remark" :label="roleDict.remark" width="200"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="roleDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="roleDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="roleDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="roleDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="roleDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <!--<el-table-column fixed="right" label="操作" min-width="140">-->
      <!--  <template #default="{row}">-->
      <!--    <div class="zs-table-data-operate-button-row">-->
      <!--    </div>-->
      <!--  </template>-->
      <!--</el-table-column>-->
      <template #append>
        <div class="el-table-append-box">
          <span>此表格的多选<span class="underline">支持</span>{{ `跨分页保存，当前已选 ${Object.keys(selects).filter(key=>selects[key]).length} 条数据。` }}</span>
        </div>
      </template>
    </el-table>

    <!--分页-->
    <Pagination
        v-if="config.pageQuery"
        :total="total"
        :page-num="pageParam.pageNum"
        :page-size="pageParam.pageSize"
        @page-change="pageChange"
    />
  </div>
</template>

<style scoped>

</style>