<script setup lang="ts">
import { computed, inject, nextTick, reactive, ref, Ref } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { MenuDto, MenuUpdDto, T_COMP, T_Inter, T_IS, T_MENU } from "@/type/module/main/sysManage/menu.ts";
import { menuApi, menuApi2 } from "@/api/module/main/sysManage/menu.ts";
import { menuDict } from "@/dict/module/main/sysManage/menu.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import { DeptDto } from "@/type/module/main/sysManage/dept.ts";
import { sysApi } from "@/api/module/main/sysManage/sys.ts";
import type Node from "element-plus/es/components/tree/src/model/node";
import { SysDto } from "@/type/module/main/sysManage/sys.ts";
import { deptDict } from "@/dict/module/main/sysManage/dept.ts";

const props = defineProps({
  selectDept: {
    type: DeptDto,
    required: true
  }
})

const state = reactive<State2<MenuDto<string>, MenuUpdDto<string>>>({
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
    sysId: final.DEFAULT_PARENT_ID,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {},
})
const dFormRules: FormRules = {
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
}
const config = new TablePageConfig({
  bulkOperation: true,
  pageQuery: false,
  selectParam: {
    type: {in: {value: [T_MENU, T_COMP]}},
    sysId: final.DEFAULT_PARENT_ID,
  },
  selectListCallback: () => {
    selAllSyss()
    if (selectPermission) {
      selectPermissionLeft.value = selectPermission.value.filter(n => tableData.value.findIndex(m => m.id === n) > -1)
      selectPermissionRight.value = selectPermission.value.filter(n => selectPermissionLeft.value.indexOf(n) === -1)
    }
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
} = funcTablePage<MenuDto<string>, MenuUpdDto<string>>({
  state,
  dFormRules,
  config,
  api: menuApi2,
  dict: menuDict,
})

// 左侧菜单/组件列表
const tableData2 = computed(() => arr2ToDiguiObj(tableData.value))
const selectPermission: Ref<number[]> | undefined = inject('changeSelectPermission')
const selectPermissionLeft = ref<number[]>([])
const selectPermissionRight = ref<number[]>([])
const handleCheckChange = (
    data: MenuDto,
    checked: boolean,
    indeterminate: boolean
) => {
  if (checked && selectPermission && selectPermission.value.indexOf(data.id) === -1) {
    selectPermission.value.push(data.id)
  } else if (!checked && selectPermission) {
    const indexOf = selectPermission.value.indexOf(data.id);
    if (indexOf > -1) {
      selectPermission.value.splice(indexOf, 1)
    }
  }
}

// 右侧接口列表
const loadNode = (node: Node, resolve: (data: MenuDto[]) => void) => {
  menuApi.selectAll({
    parentId: node.level === 0 ? final.DEFAULT_PARENT_ID : node.data.id,
    type: {in: {value: [T_IS, T_Inter]}},
    sysId: selectSys.value || final.DEFAULT_PARENT_ID,
  } as any).then((res: MenuDto[]) => {
    resolve(res)
  })
}

const treeShow = ref(true)
// 系统
const selectSys = ref<number | undefined>(void 0)
const allSyss = ref<SysDto[]>([])
const allSysLoading = ref(false)
const selAllSyss = () => {
  allSysLoading.value = true
  allSyss.value = []
  sysApi.selectAll({}).then(res => {
    allSyss.value = res
  }).finally(() => {
    allSysLoading.value = false
  })
}
const selectSysChange = (value: number | undefined) => {
  const v = value || final.DEFAULT_PARENT_ID;
  (config.selectParam as any).sysId = v;
  gRefresh();
  treeShow.value = false
  nextTick(() => {
    treeShow.value = true
  })
}
</script>

<template>
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">部门信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="deptDict.label">
          {{ props.selectDept.label }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="deptDict.ifAdmin">
          {{ props.selectDept.ifAdmin }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">权限列表</el-text>
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

  <el-form label-position="top">
    <el-form-item label="请先选择系统，随后下方会显示所选系统的菜单、组件及接口（注意：切换系统后，原先选择或取消选择的菜单、组件及接口也会被记录并一同提交）：">
      <el-select
          v-model="selectSys"
          placeholder="系统"
          clearable
          filterable
          @change="selectSysChange"
      >
        <el-option
            v-for="item in allSyss"
            :key="item.id"
            :value="item.id"
            :label="`${item.name} - ${item.perms}`"
        />
      </el-select>
    </el-form-item>
  </el-form>

  <el-form>
    <el-row>
      <el-col :span="12">
        <el-form-item label="菜单/组件列表">
          <el-tree
              style="width: 100%;"
              node-key="id"
              :data="tableData2"
              show-checkbox
              :check-strictly="true"
              default-expand-all
              :default-checked-keys="selectPermissionLeft"
              @check-change="handleCheckChange"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="接口列表">
          <el-tree
              v-if="treeShow"
              style="width: 100%;"
              node-key="id"
              lazy
              show-checkbox
              :load="loadNode"
              :check-strictly="true"
              :default-checked-keys="selectPermissionRight"
              @check-change="handleCheckChange"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>