<script setup lang="ts">
import { reactive, ref, toRaw, watch } from "vue";
import { allTRPDataTypes, T_COMP, T_DEPT, T_Inter, T_MENU, T_ROLE } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Edit, Refresh, Search } from "@element-plus/icons-vue";
import { MenuDto, MenuUpdDto } from "@/type/module/main/sysManage/menu.ts";
import { menuApi } from "@/api/module/main/sysManage/menu.ts";
import { menuDict, menuDictInter } from "@/dict/module/main/sysManage/menu.ts";
import { tableRowPermissionApi } from "@/api/module/main/sysManage/tableRowPermission.ts";
import { TableRowPermissionDto } from "@/type/module/main/sysManage/tableRowPermission.ts";
import Login from "@/views/user/login.vue";
import { deepClone } from "@/utils/ObjectUtils.ts";

const props = defineProps({
  selectPermissionId: {
    type: Number,
    required: true,
  },
  selectActionType: {
    type: String,
    required: true,
  },
  selectActionId: {
    type: Number,
    required: true,
  }
});

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
    type: JSON.stringify({in: {value: [T_Inter]}}),
  },
  selectListCallback: () => {
    selectTableRowPermissions()
  }
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

watch([
  () => props.selectPermissionId,
  () => props.selectActionType,
  () => props.selectActionId,
], () => {
  config.selectParam['parentId'] = props.selectPermissionId;
  gRefresh()
})

const trps = ref<string[][]>([])
let trps2: string[][] = []
const allTRPs = ref<TableRowPermissionDto[]>([])
const loading1 = ref(false)
const selectTableRowPermissions = () => {
  loading1.value = true;
  trps.value = tableData.value.map(_ => ([]))
  tableRowPermissionApi.selectAll({
    permissionId: JSON.stringify({in: {type: 'number', value: tableData.value.map(item => item.id)}}),
    actionType: props.selectActionType,
    actionId: props.selectActionId
  }).then(res => {
    allTRPs.value = res
    trps2 = tableData.value.map(item => {
      return allTRPs.value.filter(itm => itm.permissionId === item.id).map(item => item.dataType)
    })
    trps.value = deepClone(trps2)
  }).finally(() => {
    loading1.value = false
  })
}

const saveTrp = (index: number) => {
  const addTrps = trps.value[index].filter(item => !trps2[index].includes(item))
  const delTrps = trps2[index].filter(item => !trps.value[index].includes(item))
  const addObjs = addTrps.map(dataType => {
    const tableRowPermissionDto = new TableRowPermissionDto();
    tableRowPermissionDto.permissionId = tableData.value[index].id
    tableRowPermissionDto.actionType = props.selectActionType
    tableRowPermissionDto.actionId = `${props.selectActionId}`
    tableRowPermissionDto.dataType = dataType
    return tableRowPermissionDto
  })
  const delIds = allTRPs.value.filter(item => delTrps.includes(item.dataType)).map(item => item.id)
  const funcs = []
  if (addObjs.length > 0) funcs.push(tableRowPermissionApi.insertMore(addObjs))
  if (delIds.length > 0) funcs.push(tableRowPermissionApi.deleteList(...delIds))
  if (funcs.length > 0) {
    Promise.allSettled(funcs).then(ress => {
      selectTableRowPermissions()
    })
  }
}
</script>

<template>
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
        v-loading="tableLoadingRef"
        :data="tableData"
        @selection-change="handleSelectionChange"
    >
      <!--<el-table-column fixed type="selection" width="55"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column fixed prop="label" :label="menuDictInter.label" width="240"/>
      <!--<el-table-column prop="orderNum" :label="menuDictInter.orderNum" width="120"/>-->
      <el-table-column prop="perms" :label="menuDictInter.perms" width="300"/>
      <!--<el-table-column prop="remark" :label="menuDictInter.remark" width="200"/>-->
      <!--在此上方添加表格列-->
      <el-table-column fixed="right" label="操作" min-width="140">
        <template #default="{row, $index}">
          <div class="zs-table-data-operate-button-row">
            <el-select :disabled="loading1" v-model="trps[$index][0]" placeholder="请选择权限范围" clearable filterable>
              <el-option v-for="item in allTRPDataTypes" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <el-button :disabled="loading1" link type="primary" size="small" :icon="Edit" @click="saveTrp($index)">保存</el-button>
          </div>
        </template>
      </el-table-column>
      <template #append>
        <div class="el-table-append-box">
          <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${multipleSelection.length} 条数据。` }}</span>
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
