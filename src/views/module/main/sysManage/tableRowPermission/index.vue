<script lang="ts">
export default {
  name: 'main:sysManage:tableRowPermission'
}
</script>

<script setup lang="ts">
import { computed, reactive, ref, useTemplateRef } from "vue";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { MenuDto, MenuUpdDto } from "@/type/module/main/sysManage/menu.ts";
import { final, T_DEPT, T_IS, T_ROLE, uTDPTypeDict } from "@/utils/base.ts";
import { FormRules, TreeInstance } from "element-plus";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { menuApi } from "@/api/module/main/sysManage/menu.ts";
import { menuDict } from "@/dict/module/main/sysManage/menu.ts";
import { sysApi } from "@/api/module/main/sysManage/sys.ts";
import { SysDto } from "@/type/module/main/sysManage/sys.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import TableRowPermission from "@/views/module/main/sysManage/tableRowPermission/tableRowPermission.vue";
import { Refresh } from "@element-plus/icons-vue";
import { roleApi } from "@/api/module/main/sysManage/role.ts";
import { RoleDto } from "@/type/module/main/sysManage/role.ts";
import { DeptDto } from "@/type/module/main/sysManage/dept.ts";
import { deptApi } from "@/api/module/main/sysManage/dept.ts";

const state = reactive<State2<MenuDto, MenuUpdDto>>({
  dialogForm: new MenuDto(),
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {},
})
const dFormRules: FormRules = reactive({})
const config = new TablePageConfig<MenuDto<String>>({
  pageQuery: false,
  getDataOnMounted: false,
  bulkOperation: true,
  selectParam: {
    type: JSON.stringify({in: {value: [T_IS]}}),
    sysId: final.DEFAULT_PARENT_ID,
  },
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
} = funcTablePage<MenuDto, MenuUpdDto>({
  state,
  dFormRules,
  config,
  api: menuApi,
  dict: menuDict,
})

// 左
const selectRT = ref('')
const allRoles = ref<RoleDto[]>([])
const allDepts = ref<DeptDto[]>([])
const allRoles2 = computed(() => allRoles.value)
const allDepts2 = computed(() => arr2ToDiguiObj(allDepts.value))
const selectRTChange = () => {
  // if (selectRT.value === T_ROLE) {
    roleApi.selectAll({}).then(res => {
      allRoles.value = res
    })
  // }
  // if (selectRT.value === T_DEPT) {
    deptApi.selectAll({}).then(res => {
      allDepts.value = res
    })
  // }
}
selectRTChange()
const treeRole = useTemplateRef<TreeInstance>('treeRole')
const treeDept = useTemplateRef<TreeInstance>('treeDept')
const selectActionId = ref(0)
const nodeClickRole = (row: RoleDto) => {
  selectRT.value = T_ROLE
  selectActionId.value = row.id
  treeDept.value?.setCurrentKey(void 0)
}
const nodeClickDept = (row: DeptDto) => {
  selectRT.value = T_DEPT
  selectActionId.value = row.id
  treeRole.value?.setCurrentKey(void 0)
}

// 中
const allSyss = ref<SysDto[]>([])
const selectSys = ref<number | undefined>(void 0)
const sysLoading = ref(false)
const getSysData = () => {
  sysLoading.value = true
  sysApi.selectAll({}).then(res => {
    allSyss.value = res
  }).finally(() => {
    sysLoading.value = false
  })
}
getSysData()
const sysChange = () => {
  config.selectParam.sysId = selectSys.value
  gRefresh()
}
const tableData2 = computed(() => arr2ToDiguiObj(tableData.value))
const selectIS = ref(0)
const nodeClick = (row: MenuDto) => {
  selectIS.value = row.id
}
</script>

<template>
  <div class="zs-two-col">
    <!--最左侧，选择角色或者部门-->
    <div class="left">
      <!--<el-radio-group v-model="selectRT" @change="selectRTChange">-->
      <!--  <el-radio-button :value="T_ROLE" border>{{ uTDPTypeDict[T_ROLE] }}</el-radio-button>-->
      <!--  <el-radio-button :value="T_DEPT" border>{{ uTDPTypeDict[T_DEPT] }}</el-radio-button>-->
      <!--</el-radio-group>-->
      <!--<div v-if="selectRT===T_ROLE">-->
        <el-divider content-position="left" border-style="dashed">{{ uTDPTypeDict[T_ROLE] }}</el-divider>
        <el-tree
            ref="treeRole"
            :data="allRoles2"
            node-key="id"
            highlight-current
            @node-click="nodeClickRole"
        />
      <!--</div>-->
      <!--<div v-if="selectRT===T_DEPT">-->
        <el-divider content-position="left" border-style="dashed">{{ uTDPTypeDict[T_DEPT] }}</el-divider>
        <el-tree
            ref="treeDept"
            :data="allDepts2"
            node-key="id"
            highlight-current
            @node-click="nodeClickDept"
        />
      <!--</div>-->
    </div>
    <!--中间，选择具体的接口-->
    <div class="left">
      <el-select
          v-model="selectSys"
          placeholder="请选择所属系统"
          clearable
          filterable
          :loading="sysLoading"
          @change="sysChange"
      >
        <el-option v-for="item in allSyss" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-tree
          :data="tableData2"
          highlight-current
          @node-click="nodeClick"
      />
    </div>
    <!--右侧，设置数据类型-->
    <div class="right">
      <TableRowPermission
          :select-permission-id="selectIS"
          :select-action-id="selectActionId"
          :select-action-type="selectRT"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
