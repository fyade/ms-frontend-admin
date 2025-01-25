<script lang="ts">
export default {
  name: 'main:sysManage:menu'
}
</script>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { cascaderProps2, CONFIG, final, menuTypeDict, T_COMP, T_Inter, T_IS, T_MENU, TMenuType } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Sort, Delete, Download, Edit, Plus, Refresh, Upload, Search, DArrowRight } from "@element-plus/icons-vue";
import { MenuDto, MenuUpdDto } from "@/type/module/main/sysManage/menu.ts";
import { menuApi } from "@/api/module/main/sysManage/menu.ts";
import { menuDict, menuDictI2, menuDictInter } from "@/dict/module/main/sysManage/menu.ts";
import { useRouterStore } from "@/store/module/router.ts";
import { copyObject, ifNull, ifUndefined } from "@/utils/ObjectUtils.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import { SysDto } from "@/type/module/main/sysManage/sys.ts";
import { sysApi } from "@/api/module/main/sysManage/sys.ts";
import MenuIpWhiteList from "@/views/module/main/sysManage/menu/menuIpWhiteList.vue";

const state = reactive<State2<MenuDto, MenuUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    type: T_MENU,
    path: '#',
    parentId: final.DEFAULT_PARENT_ID,
    component: '#',
    icon: '#',
    orderNum: final.DEFAULT_ORDER_NUM,
    ifLink: final.N,
    ifVisible: final.Y,
    ifDisabled: final.N,
    ifPublic: final.N,
    ifFixed: final.N,
    perms: '',
    sysId: final.DEFAULT_PARENT_ID,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    perms: ''
  },
})
const dFormRules: FormRules = reactive({})
const config = new TablePageConfig<MenuDto<String>>({
  pageQuery: false,
  bulkOperation: true,
  selectParam: {
    type: JSON.stringify({in: {value: [T_MENU, T_COMP]}}),
    sysId: final.DEFAULT_PARENT_ID,
  },
  selectListCallback: () => {
    selAllSyss()
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

const stateInter = reactive<State2<MenuDto, MenuUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    type: T_IS,
    path: '#',
    parentId: final.DEFAULT_PARENT_ID,
    component: '#',
    icon: '#',
    orderNum: final.DEFAULT_ORDER_NUM,
    ifLink: final.N,
    ifVisible: final.Y,
    ifDisabled: final.N,
    ifPublic: final.N,
    ifFixed: final.N,
    perms: '',
    sysId: final.DEFAULT_PARENT_ID,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    perms: ''
  },
})
const dFormRulesInter: FormRules = {
  type: [{required: true, trigger: 'change'}],
  label: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
  perms: [{required: true, trigger: 'change'}],
  ifPublic: [{required: true, trigger: 'change'}],
  sysId: [{required: true, trigger: 'change'}],
}
const configInter = new TablePageConfig<MenuDto<string>>({
  pageQuery: false,
  bulkOperation: true,
  selectParam: {
    type: JSON.stringify({in: {value: [T_IS]}}),
    sysId: final.DEFAULT_PARENT_ID,
  },
  selectListCallback: () => {
    selAllSyss()
  }
})

const {
  dialogFormRef: dialogFormRefInter,
  dialogFormsRef: dialogFormsRefInter,
  filterFormRef: filterFormRefInter,
  filterFormVisible1: filterFormVisible1Inter,
  filterFormVisible: filterFormVisibleInter,
  dialogVisible: dialogVisibleInter,
  dialogLoadingRef: dialogLoadingRefInter,
  dialogButtonLoadingRef: dialogButtonLoadingRefInter,
  tableLoadingRef: tableLoadingRefInter,
  switchLoadingRef: switchLoadingRefInter,
  activeTabName: activeTabNameInter,
  tableData: tableDataInter,
  pageParam: pageParamInter,
  total: totalInter,
  multipleSelection: multipleSelectionInter,
  dialogType: dialogTypeInter,
  refresh: refreshInter,
  dCan: dCanInter,
  dCon: dConInter,
  fEnter: fEnterInter,
  fCon: fConInter,
  fCan: fCanInter,
  gRefresh: gRefreshInter,
  gIns: gInsInter,
  gUpd: gUpdInter,
  gDel: gDelInter,
  gExport: gExportInter,
  gImport: gImportInter,
  gChangeFilterFormVisible: gChangeFilterFormVisibleInter,
  tUpd: tUpdInter,
  tDel: tDelInter,
  handleSelectionChange: handleSelectionChangeInter,
  pageChange: pageChangeInter,
  dfIns: dfInsInter,
  dfDel: dfDelInter,
  ifRequired: ifRequiredInter,
} = funcTablePage<MenuDto, MenuUpdDto>({
  state: stateInter,
  dFormRules: dFormRulesInter,
  config: configInter,
  api: menuApi,
  dict: menuDictInter,
  dialogFormRefName: 'dialogFormRefInter',
  dialogFormsRefName: 'dialogFormsRefInter',
  filterFormRefName: 'filterFormRefInter',
})

const routerStore = useRouterStore();
// 页面显示为菜单/组件（a）还是接口（b）
const activeTab2Name = ref('a')

// 可选择的类型
const canChooseTypes = ref<TMenuType[]>([])
// 校验规则的修改
watch(() => [state.dialogForm.type, activeTabName.value], () => {
  if (activeTabName.value === final.more) {
    Object.keys(dFormRules).forEach(key => delete dFormRules[key])
    return
  }
  Object.keys(dFormRules).forEach(key => delete dFormRules[key])
  const rule: FormRules = {
    type: [{required: true, trigger: 'change'}],
    label: [{required: true, trigger: 'change'}],
    orderNum: [{required: true, trigger: 'change'}],
    path: [{required: [T_MENU, T_COMP].indexOf(state.dialogForm.type) > -1, trigger: 'change'}],
    component: [{required: [T_COMP].indexOf(state.dialogForm.type) > -1, trigger: 'change'}],
    icon: [{required: [T_MENU, T_COMP].indexOf(state.dialogForm.type) > -1, trigger: 'change'}],
    perms: [{required: true, trigger: 'change'}],
    sysId: [{required: true, trigger: 'change'}],
  }
  Object.keys(rule).forEach(key => dFormRules[key] = rule[key])
  if ([T_MENU, T_COMP].indexOf(state.dialogForm.type) > -1) {
    const rule: FormRules = {
      ifLink: [{required: true, trigger: 'change'}],
      ifVisible: [{required: true, trigger: 'change'}],
      ifDisabled: [{required: true, trigger: 'change'}],
    }
    Object.keys(rule).forEach(key => dFormRules[key] = rule[key])
  }
  if ([T_Inter].indexOf(state.dialogForm.type) > -1) {
    const rule: FormRules = {
      parentId: [{required: true, trigger: 'change'}],
      ifPublic: [{required: true, trigger: 'change'}],
    }
    Object.keys(rule).forEach(key => dFormRules[key] = rule[key])
  }
}, {
  immediate: true,
})
// 可供选择的类型的修改
watch(() => [state.dialogForm.parentId, activeTabName.value], () => {
  if (activeTabName.value === final.more) {
    canChooseTypes.value = [T_MENU, T_COMP, T_Inter]
    return
  }
  if (ifNull(state.dialogForm.parentId) || ifUndefined(state.dialogForm.parentId)) {
    state.dialogForm.parentId = final.DEFAULT_PARENT_ID
  }
  if (state.dialogForm.parentId === final.DEFAULT_PARENT_ID) {
    canChooseTypes.value = [T_MENU, T_COMP]
  } else {
    const data = tableData.value.find(item => item.id === state.dialogForm.parentId);
    if (data) {
      if (data.type === T_MENU) {
        canChooseTypes.value = [T_MENU, T_COMP]
      } else if (data.type === T_COMP) {
        canChooseTypes.value = [T_COMP, T_Inter]
      }
    }
  }
  if (canChooseTypes.value.indexOf(state.dialogForm.type) === -1) {
    state.dialogForm.type = canChooseTypes.value[0]
  }
}, {
  immediate: true
})

// 表格内的新增
const tIns = (id: number) => {
  state.dialogForm.parentId = id
  gIns()
}

// 检查是否需要显示
const checkVisible = (a: TMenuType, b: TMenuType[]): boolean => {
  return b.indexOf(a) > -1
}

// 数据转递归数据
const tableData2 = computed(() => {
  const diguiObj = arr2ToDiguiObj(tableData.value);
  if (diguiObj.length === 0 && tableData.value.length > 0) {
    return tableData.value
  }
  return diguiObj
})
const tableData3 = computed(() => {
  return arr2ToDiguiObj(tableData.value.filter(item => checkVisible(item.type, [T_MENU, T_COMP])))
})

// 表格的展开
const expandRowKeys = ref<string[]>([])
let level = 0
const expendAll = () => {
  if (level % 3 === 0) {
    expandRowKeys.value = routerStore.allMenus2.filter(item => item.meta.parentId === 0).map(item => item.meta.id!.toString())
  } else if (level % 3 === 1) {
    expandRowKeys.value = routerStore.allMenus2.map(item => item.ar[item.ar.length - 1].meta.id).filter(item => item).map(item => item!.toString())
  } else if (level % 3 === 2) {
    expandRowKeys.value = []
  }
  level++
}

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
  const selectSys = value || final.DEFAULT_PARENT_ID;
  state.dialogForm.sysId = selectSys;
  stateInter.dialogForm.sysId = selectSys;
  stateI2.dialogForm.sysId = selectSys;
  config.selectParam.sysId = selectSys;
  configInter.selectParam.sysId = selectSys;
  configI2.selectParam.sysId = selectSys;
  gRefresh();
  gRefreshInter();
  // gRefreshI2();
}

// 接口组
const tableData3Inter = computed(() => {
  return arr2ToDiguiObj(tableDataInter.value.filter(item => checkVisible(item.type, [T_IS])))
})
const tInsInter = (id: number) => {
  stateInter.dialogForm.parentId = id
  gInsInter()
}
const selectInterGroup = reactive(new MenuDto())
const manageInterDialogShow = ref(false)
const manageInter = (row: MenuDto) => {
  copyObject(selectInterGroup, row);
  configI2.insUpdParam.sysId = selectSys.value;
  configI2.selectParam.parentId = row.id;
  manageInterDialogShow.value = true
  gRefreshI2()
}

const stateI2 = reactive<State2<MenuDto, MenuUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    type: T_Inter,
    path: '#',
    parentId: final.DEFAULT_PARENT_ID,
    component: '#',
    icon: '#',
    orderNum: final.DEFAULT_ORDER_NUM,
    ifLink: final.N,
    ifVisible: final.Y,
    ifDisabled: final.N,
    ifPublic: final.N,
    ifFixed: final.N,
    perms: '',
    sysId: final.DEFAULT_PARENT_ID,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {},
})
const dFormRulesI2: FormRules = {
  type: [{required: true, trigger: 'change'}],
  label: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
  perms: [{required: true, trigger: 'change'}],
  ifPublic: [{required: true, trigger: 'change'}],
  sysId: [{required: true, trigger: 'change'}],
}
const configI2 = new TablePageConfig<MenuDto<string>>({
  getDataOnMounted: false,
  bulkOperation: true,
  selectParam: {
    type: JSON.stringify({in: {value: [T_Inter]}}),
    parentId: selectInterGroup.id,
    sysId: final.DEFAULT_PARENT_ID,
  },
  activeTabMoreInsFinishCallback: () => {
    if (stateI2.dialogForms) {
      stateI2.dialogForms[stateI2.dialogForms.length - 1].parentId = selectInterGroup.id
    }
  }
})

const {
  dialogFormRef: dialogFormRefI2,
  dialogFormsRef: dialogFormsRefI2,
  filterFormRef: filterFormRefI2,
  filterFormVisible1: filterFormVisible1I2,
  filterFormVisible: filterFormVisibleI2,
  dialogVisible: dialogVisibleI2,
  dialogLoadingRef: dialogLoadingRefI2,
  dialogButtonLoadingRef: dialogButtonLoadingRefI2,
  tableLoadingRef: tableLoadingRefI2,
  switchLoadingRef: switchLoadingRefI2,
  activeTabName: activeTabNameI2,
  tableData: tableDataI2,
  pageParam: pageParamI2,
  total: totalI2,
  multipleSelection: multipleSelectionI2,
  dialogType: dialogTypeI2,
  refresh: refreshI2,
  dCan: dCanI2,
  dCon: dConI2,
  fEnter: fEnterI2,
  fCon: fConI2,
  fCan: fCanI2,
  gRefresh: gRefreshI2,
  gIns: gInsI2,
  gUpd: gUpdI2,
  gDel: gDelI2,
  gExport: gExportI2,
  gImport: gImportI2,
  gChangeFilterFormVisible: gChangeFilterFormVisibleI2,
  tUpd: tUpdI2,
  tDel: tDelI2,
  handleSelectionChange: handleSelectionChangeI2,
  pageChange: pageChangeI2,
  dfIns: dfInsI2,
  dfDel: dfDelI2,
  ifRequired: ifRequiredI2,
} = funcTablePage<MenuDto, MenuUpdDto>({
  state: stateI2,
  dFormRules: dFormRulesI2,
  config: configI2,
  api: menuApi,
  dict: menuDictI2,
  dialogFormRefName: 'dialogFormRefI2',
  dialogFormsRefName: 'dialogFormsRefI2',
  filterFormRefName: 'filterFormRefI2',
})

const gInsI22 = () => {
  stateI2.dialogForm.parentId = selectInterGroup.id
  gInsI2()
}

const drawerIpWhiteList = ref(false)
const selectMenu = ref<MenuDto>(new MenuDto())
const setIpWhiteList = (row: MenuDto) => {
  selectMenu.value = row
  drawerIpWhiteList.value = true
}
</script>

<template>
  <!--ip白名单管理-->
  <el-dialog
      v-model="drawerIpWhiteList"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title="ip白名单管理"
  >
    <MenuIpWhiteList
        :menu="selectMenu"
    />
    <template #footer>
      <el-button plain @click="drawerIpWhiteList=false">取消</el-button>
    </template>
  </el-dialog>

  <!--接口管理-->
  <el-dialog
      v-model="manageInterDialogShow"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title="接口管理"
  >
    <el-divider content-position="left">
      <el-text size="large" style="font-weight: bold;">接口组信息</el-text>
    </el-divider>
    <el-form>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="menuDictInter.label">
            <el-input disabled v-model="selectInterGroup.label"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="menuDictInter.perms">
            <el-input disabled v-model="selectInterGroup.perms"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-divider content-position="left">
      <el-text size="large" style="font-weight: bold;">接口列表</el-text>
    </el-divider>
    <!--弹窗-->
    <el-dialog
        :width="activeTabNameI2===final.more ? CONFIG.dialog_width_wider : CONFIG.dialog_width"
        v-model="dialogVisibleI2"
        :title="dialogTypeI2.label"
        draggable
        append-to-body
    >
      <el-tabs v-if="configI2.bulkOperation" v-model="activeTabNameI2">
        <el-tab-pane :disabled="dialogTypeI2.value===final.upd" label="操作单个" :name="final.one"></el-tab-pane>
        <el-tab-pane :disabled="dialogTypeI2.value===final.upd" label="操作多个" :name="final.more"></el-tab-pane>
      </el-tabs>
      <template v-if="activeTabNameI2===final.one">
        <el-form
            ref="dialogFormRefI2"
            v-loading="dialogLoadingRefI2"
            :model="stateI2.dialogForm"
            :label-width="CONFIG.dialog_form_label_width"
            :rules="dFormRulesI2"
        >
          <el-form-item v-if="dialogTypeI2.value!==final.ins" :label="menuDictI2.id" prop="id">
            <span>{{ stateI2.dialogForm.id }}</span>
          </el-form-item>
          <!--
          第一个input添加如下属性
          v-focus
          -->
          <!--在此下方添加表单项-->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="menuDictI2.parentId" prop="parentId">
                <el-cascader
                    style="width: 100%;"
                    v-model="stateI2.dialogForm.parentId"
                    :options="tableData3Inter"
                    :props="cascaderProps2"
                    clearable
                    :value-on-clear="final.DEFAULT_PARENT_ID"
                    disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="menuDictI2.type" prop="type">
                <el-radio-group v-model="stateI2.dialogForm.type">
                  <el-radio :value="T_Inter">
                    {{ menuTypeDict[T_Inter] }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="menuDictI2.label" prop="label">
                <el-input v-model="stateI2.dialogForm.label" :placeholder="menuDictI2.label"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="menuDictI2.orderNum" prop="orderNum">
                <el-input-number v-model="stateI2.dialogForm.orderNum" controls-position="right"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="menuDictI2.perms" prop="perms">
                <el-input v-model="stateI2.dialogForm.perms" :placeholder="menuDictI2.perms"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="menuDictI2.ifPublic" prop="ifPublic">
                <el-radio-group v-model="stateI2.dialogForm.ifPublic">
                  <el-radio :value="final.Y">是</el-radio>
                  <el-radio :value="final.N">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="menuDictI2.remark" prop="remark">
                <el-input type="textarea" v-model="stateI2.dialogForm.remark" :placeholder="menuDictI2.remark"/>
              </el-form-item>
            </el-col>
          </el-row>
          <!--在此上方添加表单项-->
        </el-form>
      </template>
      <template v-if="activeTabNameI2===final.more">
        <el-form
            ref="dialogFormsRefI2"
            v-loading="dialogLoadingRefI2"
        >
          <el-table
              :data="stateI2.dialogForms"
              v-if="stateI2.dialogForms"
          >
            <el-table-column type="index" width="50">
              <template #header>
                #
              </template>
            </el-table-column>
            <!--在此下方添加表格列-->
            <el-table-column prop="parentId" :label="menuDictI2.parentId" width="300">
              <template #header>
                <span :class="ifRequiredI2('parentId')?'tp-table-header-required':''">{{ menuDictI2.parentId }}</span>
              </template>
              <template #default="{$index}">
                <div :class="stateI2.dialogForms_error?.[`${$index}-parentId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-cascader
                      v-model="stateI2.dialogForms[$index].parentId"
                      :options="tableData3Inter"
                      :props="cascaderProps2"
                      clearable
                      :value-on-clear="final.DEFAULT_PARENT_ID"
                      disabled
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="type" :label="menuDictI2.type" width="300">
              <template #header>
                <span :class="ifRequiredI2('type')?'tp-table-header-required':''">{{ menuDictI2.type }}</span>
              </template>
              <template #default="{$index}">
                <div :class="stateI2.dialogForms_error?.[`${$index}-type`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-radio-group v-model="stateI2.dialogForms[$index].type">
                    <el-radio :value="T_Inter">
                      {{ menuTypeDict[T_Inter] }}
                    </el-radio>
                  </el-radio-group>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="label" :label="menuDictI2.label" width="300">
              <template #header>
                <span :class="ifRequiredI2('label')?'tp-table-header-required':''">{{ menuDictI2.label }}</span>
              </template>
              <template #default="{$index}">
                <div :class="stateI2.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="stateI2.dialogForms[$index].label" :placeholder="menuDictI2.label"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="orderNum" :label="menuDictI2.orderNum" width="300">
              <template #header>
                <span :class="ifRequiredI2('orderNum')?'tp-table-header-required':''">{{ menuDictI2.orderNum }}</span>
              </template>
              <template #default="{$index}">
                <div :class="stateI2.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input-number v-model="stateI2.dialogForms[$index].orderNum" controls-position="right"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="perms" :label="menuDictI2.perms" width="300">
              <template #header>
                <span :class="ifRequiredI2('perms')?'tp-table-header-required':''">{{ menuDictI2.perms }}</span>
              </template>
              <template #default="{$index}">
                <div :class="stateI2.dialogForms_error?.[`${$index}-perms`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="stateI2.dialogForms[$index].perms" :placeholder="menuDictI2.perms"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="ifPublic" :label="menuDictI2.ifPublic" width="300">
              <template #header>
                <span :class="ifRequiredI2('ifPublic')?'tp-table-header-required':''">{{ menuDictI2.ifPublic }}</span>
              </template>
              <template #default="{$index}">
                <div :class="stateI2.dialogForms_error?.[`${$index}-ifPublic`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-radio-group v-model="stateI2.dialogForms[$index].ifPublic">
                    <el-radio :value="final.Y">是</el-radio>
                    <el-radio :value="final.N">否</el-radio>
                  </el-radio-group>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="remark" :label="menuDictI2.remark" width="300">
              <template #header>
                <span :class="ifRequiredI2('remark')?'tp-table-header-required':''">{{ menuDictI2.remark }}</span>
              </template>
              <template #default="{$index}">
                <div :class="stateI2.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input type="textarea" v-model="stateI2.dialogForms[$index].remark" :placeholder="menuDictI2.remark"/>
                </div>
              </template>
            </el-table-column>
            <!--在此上方添加表格列-->
            <el-table-column fixed="right" label="操作" min-width="120">
              <template v-if="dialogTypeI2.value===final.ins" #default="{$index}">
                <el-button link type="danger" size="small" :icon="Delete" @click="dfDelI2($index)">删除</el-button>
              </template>
            </el-table-column>
            <template v-if="dialogTypeI2.value===final.ins" #append>
              <el-button text type="primary" plain :icon="Plus" @click="dfInsI2">新增</el-button>
            </template>
          </el-table>
        </el-form>
      </template>
      <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="dialogButtonLoadingRefI2" @click="dCanI2">取消</el-button>
        <el-button type="primary" :disabled="dialogButtonLoadingRefI2" @click="dConI2">确认</el-button>
      </span>
      </template>
    </el-dialog>

    <!--顶部筛选表单-->
    <div class="zs-filter-form" v-show="filterFormVisible1I2 && filterFormVisibleI2">
      <el-form
          class="demo-form-inline"
          ref="filterFormRefI2"
          :model="stateI2.filterForm"
          :inline="true"
          @keyup.enter="fEnterI2"
          @submit.prevent
      >
        <!--在此下方添加表单项-->
        <!--<el-form-item :label="menuDictI2." prop="">-->
        <!--  <el-input v-model="state.filterForm." :placeholder="menuDictI2."/>-->
        <!--</el-form-item>-->
        <!--在此上方添加表单项-->
        <el-form-item>
          <el-button type="primary" @click="fConI2">筛选</el-button>
          <el-button @click="fCanI2">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--操作按钮-->
    <div class="zs-button-row">
      <div>
        <el-button type="primary" plain :icon="Refresh" @click="gRefreshI2">刷新</el-button>
        <el-button type="primary" plain :icon="Plus" @click="gInsI22">新增</el-button>
        <el-button type="success" plain :icon="Edit" :disabled="configI2.bulkOperation?multipleSelectionI2.length===0:multipleSelectionI2.length!==1" @click="gUpdI2">修改</el-button>
        <el-button type="danger" plain :icon="Delete" :disabled="multipleSelectionI2.length===0" @click="gDelI2()">删除</el-button>
        <!--<el-button type="warning" plain :icon="Download" :disabled="multipleSelectionI2.length===0" @click="gExportI2()">导出</el-button>-->
        <!--<el-button type="warning" plain :icon="Upload" @click="gImportI2">上传</el-button>-->
      </div>
      <div>
        <el-button v-if="filterFormVisible1I2" plain :icon="Search" circle @click="gChangeFilterFormVisibleI2"/>
      </div>
    </div>

    <div class="zs-table-data">
      <!--数据表格-->
      <el-table
          v-loading="tableLoadingRefI2"
          :data="tableDataI2"
          @selection-change="handleSelectionChangeI2"
      >
        <el-table-column fixed type="selection" width="55"/>
        <!--上面id列的宽度改一下-->
        <!--在此下方添加表格列-->
        <el-table-column prop="label" :label="menuDictI2.label" width="240"/>
        <el-table-column prop="orderNum" :label="menuDictI2.orderNum" width="120"/>
        <el-table-column prop="ifPublic" :label="menuDictI2.ifPublic" width="120"/>
        <el-table-column prop="perms" :label="menuDictI2.perms" width="360"/>
        <el-table-column prop="remark" :label="menuDictI2.remark" width="200"/>
        <!--在此上方添加表格列-->
        <el-table-column fixed="right" label="操作" min-width="140">
          <template #default="{row}">
            <div class="zs-table-data-operate-button-row">
              <el-button link type="primary" size="small" :icon="Edit" @click="tUpdI2(row.id)">修改</el-button>
              <el-button link type="danger" size="small" :icon="Delete" @click="tDelI2(row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
        <template #append>
          <div class="el-table-append-box">
            <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${multipleSelectionI2.length} 条数据。` }}</span>
          </div>
        </template>
      </el-table>

      <!--分页-->
      <Pagination
          v-if="configI2.pageQuery"
          :total="totalI2"
          :page-num="pageParamI2.pageNum"
          :page-size="pageParamI2.pageSize"
          @page-change="pageChangeI2"
      />
    </div>
  </el-dialog>

  <!--弹窗-->
  <el-dialog
      :width="activeTabName===final.more ? CONFIG.dialog_width_wider : CONFIG.dialog_width"
      v-model="dialogVisible"
      :title="dialogType.label"
      draggable
      append-to-body
  >
    <el-tabs v-if="config.bulkOperation" v-model="activeTabName">
      <el-tab-pane :disabled="dialogType.value===final.upd" label="操作单个" :name="final.one"></el-tab-pane>
      <el-tab-pane :disabled="dialogType.value===final.upd" label="操作多个" :name="final.more"></el-tab-pane>
    </el-tabs>
    <template v-if="activeTabName===final.one">
      <el-form
          ref="dialogFormRef"
          v-loading="dialogLoadingRef"
          :model="state.dialogForm"
          :label-width="CONFIG.dialog_form_label_width"
          :rules="dFormRules"
      >
        <el-row v-show="dialogType.value!==final.ins">
          <el-col :span="24">
            <el-form-item :label="menuDict.id" prop="id">
              <span>{{ state.dialogForm.id }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!--
        第一个input添加如下属性
        v-focus
        -->
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="24">
            <el-form-item :label="menuDict.parentId" prop="parentId">
              <el-cascader
                  style="width: 100%;"
                  v-model="state.dialogForm.parentId"
                  :options="tableData3"
                  :props="cascaderProps2"
                  clearable
                  :value-on-clear="final.DEFAULT_PARENT_ID"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="menuDict.type" prop="type">
              <template #label>
                <Tooltip content="菜单的父级只允许为菜单，组件的父级只允许为菜单，接口的父级只允许为组件。">
                  {{ menuDict.type }}
                </Tooltip>
              </template>
              <el-radio-group v-model="state.dialogForm.type">
                <el-radio :value="T_MENU" :disabled="canChooseTypes.indexOf(T_MENU)===-1">
                  {{ menuTypeDict[T_MENU] }}
                </el-radio>
                <el-radio :value="T_COMP" :disabled="canChooseTypes.indexOf(T_COMP)===-1">
                  {{ menuTypeDict[T_COMP] }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="checkVisible(state.dialogForm.type, [T_MENU,T_COMP])">
          <el-col :span="24">
            <el-form-item :label="menuDict.icon" prop="icon">
              <IconSelect v-model="state.dialogForm.icon" :placeholder="menuDict.icon"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="menuDict.label" prop="label">
              <el-input v-model="state.dialogForm.label" :placeholder="menuDict.label"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="menuDict.orderNum" prop="orderNum">
              <el-input-number v-model="state.dialogForm.orderNum" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="checkVisible(state.dialogForm.type, [T_MENU,T_COMP])">
          <el-col :span="12">
            <el-form-item :label="menuDict.ifLink" prop="ifLink">
              <template #label>
                <Tooltip content="若选是，则点击会跳转至外部链接。">{{ menuDict.ifLink }}</Tooltip>
              </template>
              <el-radio-group v-model="state.dialogForm.ifLink">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="menuDict.path" prop="path">
              <template #label>
                <Tooltip content="这里填写路由地址。">{{ menuDict.path }}</Tooltip>
              </template>
              <el-input v-model="state.dialogForm.path" :placeholder="menuDict.path"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="checkVisible(state.dialogForm.type, [T_MENU,T_COMP])">
          <el-col :span="12">
            <el-form-item :label="menuDict.ifVisible" prop="ifVisible">
              <el-radio-group v-model="state.dialogForm.ifVisible">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="menuDict.ifDisabled" prop="ifDisabled">
              <el-radio-group v-model="state.dialogForm.ifDisabled">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-show="checkVisible(state.dialogForm.type, [T_COMP])">
            <el-form-item :label="menuDict.ifFixed" prop="ifFixed">
              <el-radio-group v-model="state.dialogForm.ifFixed">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="menuDict.perms" prop="perms">
              <template #label>
                <Tooltip content="与后端配合。">{{ menuDict.perms }}</Tooltip>
              </template>
              <el-input v-model="state.dialogForm.perms" :placeholder="menuDict.perms"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="checkVisible(state.dialogForm.type, [T_Inter])">
            <el-form-item :label="menuDict.ifPublic" prop="ifPublic">
              <el-radio-group v-model="state.dialogForm.ifPublic">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="checkVisible(state.dialogForm.type, [T_COMP])">
          <el-col :span="24">
            <el-form-item :label="menuDict.component" prop="component">
              <template #label>
                <Tooltip content="这里填写项目文件夹中的路径。">{{ menuDict.component }}</Tooltip>
              </template>
              <el-input v-model="state.dialogForm.component" :placeholder="menuDict.component"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="menuDict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="menuDict.remark"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--在此上方添加表单项-->
      </el-form>
    </template>
    <template v-if="activeTabName===final.more">
      <el-form
          ref="dialogFormsRef"
          v-loading="dialogLoadingRef"
      >
        <el-table
            :data="state.dialogForms"
            v-if="state.dialogForms"
        >
          <el-table-column type="index" width="50">
            <template #header>
              #
            </template>
          </el-table-column>
          <!--在此下方添加表格列-->
          <el-table-column prop="parentId" :label="menuDict.parentId" width="300">
            <template #header>
              <span :class="ifRequired('parentId')?'tp-table-header-required':''">{{ menuDict.parentId }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-parentId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-cascader
                    v-model="state.dialogForms[$index].parentId"
                    :options="tableData3"
                    :props="cascaderProps2"
                    clearable
                    :value-on-clear="final.DEFAULT_PARENT_ID"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" :label="menuDict.type" width="300">
            <template #header>
              <Tooltip content="菜单的父级只允许为菜单，组件的父级只允许为菜单，接口的父级只允许为组件。">
                <span :class="ifRequired('type')?'tp-table-header-required':''">{{ menuDict.type }}</span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-type`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-radio-group v-model="state.dialogForms[$index].type">
                  <el-radio :value="T_MENU" :disabled="canChooseTypes.indexOf(T_MENU)===-1">
                    {{ menuTypeDict[T_MENU] }}
                  </el-radio>
                  <el-radio :value="T_COMP" :disabled="canChooseTypes.indexOf(T_COMP)===-1">
                    {{ menuTypeDict[T_COMP] }}
                  </el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="icon" :label="menuDict.icon" width="300">
            <template #header>
              <span :class="ifRequired('icon')?'tp-table-header-required':''">{{ menuDict.icon }}</span>
            </template>
            <template #default="{$index}">
              <template v-if="checkVisible(state.dialogForms[$index].type, [T_MENU,T_COMP])">
                <div :class="state.dialogForms_error?.[`${$index}-icon`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <IconSelect v-model="state.dialogForms[$index].icon" :placeholder="menuDict.icon"/>
                </div>
              </template>
              <template v-else></template>
            </template>
          </el-table-column>
          <el-table-column prop="label" :label="menuDict.label" width="300">
            <template #header>
              <span :class="ifRequired('label')?'tp-table-header-required':''">{{ menuDict.label }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].label" :placeholder="menuDict.label"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="menuDict.orderNum" width="200">
            <template #header>
              <span :class="ifRequired('orderNum')?'tp-table-header-required':''">{{ menuDict.orderNum }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].orderNum" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifLink" :label="menuDict.ifLink" width="80">
            <template #header>
              <Tooltip content="若选是，则点击会跳转至外部链接。">
                <span :class="ifRequired('ifLink')?'tp-table-header-required':''">{{ menuDict.ifLink }}</span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <template v-if="checkVisible(state.dialogForms[$index].type, [T_MENU,T_COMP])">
                <div :class="state.dialogForms_error?.[`${$index}-ifLink`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <!--<el-radio-group v-model="state.dialogForms[$index].ifLink">-->
                  <!--  <el-radio :value="final.Y">是</el-radio>-->
                  <!--  <el-radio :value="final.N">否</el-radio>-->
                  <!--</el-radio-group>-->
                  <el-checkbox v-model="state.dialogForms[$index].ifLink" :true-value="final.Y" :false-value="final.N"/>
                </div>
              </template>
              <template v-else></template>
            </template>
          </el-table-column>
          <el-table-column prop="path" :label="menuDict.path" width="300">
            <template #header>
              <Tooltip content="这里填写路由地址。">
                <span :class="ifRequired('path')?'tp-table-header-required':''">{{ menuDict.path }}</span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <template v-if="checkVisible(state.dialogForms[$index].type, [T_MENU,T_COMP])">
                <div :class="state.dialogForms_error?.[`${$index}-path`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="state.dialogForms[$index].path" :placeholder="menuDict.path"/>
                </div>
              </template>
              <template v-else></template>
            </template>
          </el-table-column>
          <el-table-column prop="ifVisible" :label="menuDict.ifVisible" width="80">
            <template #header>
              <span :class="ifRequired('ifVisible')?'tp-table-header-required':''">{{ menuDict.ifVisible }}</span>
            </template>
            <template #default="{$index}">
              <template v-if="checkVisible(state.dialogForms[$index].type, [T_MENU,T_COMP])">
                <div :class="state.dialogForms_error?.[`${$index}-ifVisible`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <!--<el-radio-group v-model="state.dialogForms[$index].ifVisible">-->
                  <!--  <el-radio :value="final.Y">是</el-radio>-->
                  <!--  <el-radio :value="final.N">否</el-radio>-->
                  <!--</el-radio-group>-->
                  <el-checkbox v-model="state.dialogForms[$index].ifVisible" :true-value="final.Y" :false-value="final.N"/>
                </div>
              </template>
              <template v-else></template>
            </template>
          </el-table-column>
          <el-table-column prop="ifDisabled" :label="menuDict.ifDisabled" width="80">
            <template #header>
              <span :class="ifRequired('ifDisabled')?'tp-table-header-required':''">{{ menuDict.ifDisabled }}</span>
            </template>
            <template #default="{$index}">
              <template v-if="checkVisible(state.dialogForms[$index].type, [T_MENU,T_COMP])">
                <div :class="state.dialogForms_error?.[`${$index}-ifDisabled`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <!--<el-radio-group v-model="state.dialogForms[$index].ifDisabled">-->
                  <!--  <el-radio :value="final.Y">是</el-radio>-->
                  <!--  <el-radio :value="final.N">否</el-radio>-->
                  <!--</el-radio-group>-->
                  <el-checkbox v-model="state.dialogForms[$index].ifDisabled" :true-value="final.Y" :false-value="final.N"/>
                </div>
              </template>
              <template v-else></template>
            </template>
          </el-table-column>
          <el-table-column prop="ifFixed" :label="menuDict.ifFixed" width="80">
            <template #header>
              <span :class="ifRequired('ifFixed')?'tp-table-header-required':''">{{ menuDict.ifFixed }}</span>
            </template>
            <template #default="{$index}">
              <template v-if="checkVisible(state.dialogForms[$index].type, [T_MENU,T_COMP])">
                <div :class="state.dialogForms_error?.[`${$index}-ifFixed`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <!--<el-radio-group v-model="state.dialogForms[$index].ifFixed">-->
                  <!--  <el-radio :value="final.Y">是</el-radio>-->
                  <!--  <el-radio :value="final.N">否</el-radio>-->
                  <!--</el-radio-group>-->
                  <el-checkbox v-model="state.dialogForms[$index].ifFixed" :true-value="final.Y" :false-value="final.N"/>
                </div>
              </template>
              <template v-else></template>
            </template>
          </el-table-column>
          <el-table-column prop="component" :label="menuDict.component" width="300">
            <template #header>
              <Tooltip content="这里填写项目文件夹中的路径。">
                <span :class="ifRequired('component')?'tp-table-header-required':''">{{ menuDict.component }}</span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <template v-if="checkVisible(state.dialogForms[$index].type, [T_COMP])">
                <div :class="state.dialogForms_error?.[`${$index}-component`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                  <el-input v-model="state.dialogForms[$index].component" :placeholder="menuDict.component"/>
                </div>
              </template>
              <template v-else></template>
            </template>
          </el-table-column>
          <el-table-column prop="perms" :label="menuDict.perms" width="300">
            <template #header>
              <Tooltip content="与后端配合。">
                <span :class="ifRequired('perms')?'tp-table-header-required':''">{{ menuDict.perms }}</span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-perms`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].perms" :placeholder="menuDict.perms"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="menuDict.remark" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ menuDict.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].remark" :placeholder="menuDict.remark"/>
              </div>
            </template>
          </el-table-column>
          <!--在此上方添加表格列-->
          <el-table-column fixed="right" label="操作" min-width="120">
            <template v-if="dialogType.value===final.ins" #default="{$index}">
              <el-button link type="danger" size="small" :icon="Delete" @click="dfDel($index)">删除</el-button>
            </template>
          </el-table-column>
          <template v-if="dialogType.value===final.ins" #append>
            <el-button text type="primary" plain :icon="Plus" @click="dfIns">新增</el-button>
          </template>
        </el-table>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="dialogButtonLoadingRef" @click="dCan">取消</el-button>
        <el-button type="primary" :disabled="dialogButtonLoadingRef" @click="dCon">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!--弹窗-->
  <el-dialog
      :width="activeTabNameInter===final.more ? CONFIG.dialog_width_wider : CONFIG.dialog_width"
      v-model="dialogVisibleInter"
      :title="dialogTypeInter.label"
      draggable
      append-to-body
  >
    <el-tabs v-if="configInter.bulkOperation" v-model="activeTabNameInter">
      <el-tab-pane :disabled="dialogTypeInter.value===final.upd" label="操作单个" :name="final.one"></el-tab-pane>
      <el-tab-pane :disabled="dialogTypeInter.value===final.upd" label="操作多个" :name="final.more"></el-tab-pane>
    </el-tabs>
    <template v-if="activeTabNameInter===final.one">
      <el-form
          ref="dialogFormRefInter"
          v-loading="dialogLoadingRefInter"
          :model="stateInter.dialogForm"
          :label-width="CONFIG.dialog_form_label_width"
          :rules="dFormRulesInter"
      >
        <!--<el-row>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--</el-row>-->
        <el-form-item v-if="dialogTypeInter.value!==final.ins" :label="menuDictInter.id" prop="id">
          <span>{{ stateInter.dialogForm.id }}</span>
        </el-form-item>
        <!--
        第一个input添加如下属性
        v-focus
        -->
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="24">
            <el-form-item :label="menuDictInter.parentId" prop="parentId">
              <el-cascader
                  style="width: 100%;"
                  v-model="stateInter.dialogForm.parentId"
                  :options="tableData3Inter"
                  :props="cascaderProps2"
                  clearable
                  :value-on-clear="final.DEFAULT_PARENT_ID"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="menuDictInter.type" prop="type">
              <template #label>
                <Tooltip content="接口的父级只允许为接口组，建议以业务名-模块名-接口为结构。">
                  {{ menuDictInter.type }}
                </Tooltip>
              </template>
              <el-radio-group v-model="stateInter.dialogForm.type">
                <el-radio :value="T_IS">
                  {{ menuTypeDict[T_IS] }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="menuDictInter.label" prop="label">
              <el-input v-model="stateInter.dialogForm.label" :placeholder="menuDictInter.label"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="menuDictInter.orderNum" prop="orderNum">
              <el-input-number v-model="stateInter.dialogForm.orderNum" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="menuDictInter.perms" prop="perms">
              <template #label>
                <Tooltip content="与后端配合。">{{ menuDictInter.perms }}</Tooltip>
              </template>
              <el-input v-model="stateInter.dialogForm.perms" :placeholder="menuDictInter.perms"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="checkVisible(stateInter.dialogForm.type, [T_Inter])">
            <el-form-item :label="menuDictInter.ifPublic" prop="ifPublic">
              <el-radio-group v-model="stateInter.dialogForm.ifPublic">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="menuDictInter.remark" prop="remark">
              <el-input type="textarea" v-model="stateInter.dialogForm.remark" :placeholder="menuDictInter.remark"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--在此上方添加表单项-->
      </el-form>
    </template>
    <template v-if="activeTabNameInter===final.more">
      <el-form
          ref="dialogFormRefInter"
          v-loading="dialogLoadingRefInter"
      >
        <el-table
            :data="stateInter.dialogForms"
            v-if="stateInter.dialogForms"
        >
          <el-table-column type="index" width="50">
            <template #header>
              #
            </template>
          </el-table-column>
          <!--在此下方添加表格列-->
          <el-table-column prop="parentId" :label="menuDictInter.parentId" width="300">
            <template #header>
              <span :class="ifRequiredInter('parentId')?'tp-table-header-required':''">{{ menuDictInter.parentId }}</span>
            </template>
            <template #default="{$index}">
              <div :class="stateInter.dialogForms_error?.[`${$index}-parentId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-cascader
                    style="width: 100%;"
                    v-model="stateInter.dialogForms[$index].parentId"
                    :options="tableData3Inter"
                    :props="cascaderProps2"
                    clearable
                    :value-on-clear="final.DEFAULT_PARENT_ID"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" :label="menuDictInter.type" width="300">
            <template #header>
              <span :class="ifRequiredInter('type')?'tp-table-header-required':''">{{ menuDictInter.type }}</span>
            </template>
            <template #default="{$index}">
              <div :class="stateInter.dialogForms_error?.[`${$index}-type`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-radio-group v-model="stateInter.dialogForms[$index].type">
                  <el-radio :value="T_IS">
                    {{ menuTypeDict[T_IS] }}
                  </el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="label" :label="menuDictInter.label" width="300">
            <template #header>
              <span :class="ifRequiredInter('label')?'tp-table-header-required':''">{{ menuDictInter.label }}</span>
            </template>
            <template #default="{$index}">
              <div :class="stateInter.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="stateInter.dialogForms[$index].label" :placeholder="menuDictInter.label"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="menuDictInter.orderNum" width="300">
            <template #header>
              <span :class="ifRequiredInter('orderNum')?'tp-table-header-required':''">{{ menuDictInter.orderNum }}</span>
            </template>
            <template #default="{$index}">
              <div :class="stateInter.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="stateInter.dialogForms[$index].orderNum" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="perms" :label="menuDictInter.perms" width="300">
            <template #header>
              <span :class="ifRequiredInter('perms')?'tp-table-header-required':''">{{ menuDictInter.perms }}</span>
            </template>
            <template #default="{$index}">
              <div :class="stateInter.dialogForms_error?.[`${$index}-perms`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="stateInter.dialogForms[$index].perms" :placeholder="menuDictInter.perms"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifPublic" :label="menuDictInter.ifPublic" width="300">
            <template #header>
              <span :class="ifRequiredInter('ifPublic')?'tp-table-header-required':''">{{ menuDictInter.ifPublic }}</span>
            </template>
            <template #default="{$index}">
              <div :class="stateInter.dialogForms_error?.[`${$index}-ifPublic`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-radio-group v-model="stateInter.dialogForms[$index].ifPublic">
                  <el-radio :value="final.Y">是</el-radio>
                  <el-radio :value="final.N">否</el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="menuDictInter.remark" width="300">
            <template #header>
              <span :class="ifRequiredInter('remark')?'tp-table-header-required':''">{{ menuDictInter.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="stateInter.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="stateInter.dialogForms[$index].remark" :placeholder="menuDictInter.remark"/>
              </div>
            </template>
          </el-table-column>
          <!--在此上方添加表格列-->
          <el-table-column fixed="right" label="操作" min-width="120">
            <template v-if="dialogTypeInter.value===final.ins" #default="{$index}">
              <el-button link type="danger" size="small" :icon="Delete" @click="dfDelInter($index)">删除</el-button>
            </template>
          </el-table-column>
          <template v-if="dialogTypeInter.value===final.ins" #append>
            <el-button text type="primary" plain :icon="Plus" @click="dfInsInter">新增</el-button>
          </template>
        </el-table>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="dialogButtonLoadingRefInter" @click="dCanInter">取消</el-button>
        <el-button type="primary" :disabled="dialogButtonLoadingRefInter" @click="dConInter">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <div class="zs-filter-form">
    <el-form label-position="top">
      <el-form-item label="请先选择系统，随后下方会显示所选系统的菜单、组件及接口：">
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
  </div>

  <!--<el-divider/>-->

  <el-tabs v-model="activeTab2Name" type="border-card">
    <el-tab-pane label="菜单及组件" name="a">
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
          <el-form-item :label="menuDict.perms" prop="perms">
            <el-input v-model="state.filterForm.perms" :placeholder="menuDict.perms"/>
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
          <el-button type="info" plain :icon="Sort" @click="expendAll">展开/折叠</el-button>
          <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
          <el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>
          <el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1||(multipleSelection.length>0&&checkVisible(multipleSelection[0].type,[T_Inter]))" @click="gUpd">修改</el-button>
          <el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除</el-button>
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
              :data="tableData2"
              :expand-row-keys="expandRowKeys"
              row-key="id"
              :default-expand-all="false"
              @selection-change="handleSelectionChange"
          >
            <el-table-column fixed type="selection" width="55"/>
            <!--<el-table-column fixed prop="id" :label="menuDict.id" width="180"/>-->
            <!--上面id列的宽度改一下-->
            <!--在此下方添加表格列-->
            <el-table-column fixed prop="label" :label="menuDict.label" width="240"/>
            <el-table-column prop="path" :label="menuDict.path" width="200"/>
            <el-table-column prop="component" :label="menuDict.component" width="280"/>
            <el-table-column prop="icon" :label="menuDict.icon" width="120">
              <template #default="{row}">
                <SvgIcon :name="row.icon" :color="CONFIG.icon_black"/>
              </template>
            </el-table-column>
            <el-table-column prop="orderNum" :label="menuDict.orderNum" width="120"/>
            <el-table-column prop="ifLink" :label="menuDict.ifLink" width="120">
              <template #default="{row}">
                <el-tag v-if="row.ifLink===final.Y" type="primary">是</el-tag>
                <el-tag v-else type="info">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="ifVisible" :label="menuDict.ifVisible" width="120">
              <template #default="{row}">
                <el-tag v-if="row.ifVisible===final.Y" type="primary">是</el-tag>
                <el-tag v-else type="info">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="ifDisabled" :label="menuDict.ifDisabled" width="120">
              <template #default="{row}">
                <el-tag v-if="row.ifDisabled===final.Y" type="primary">是</el-tag>
                <el-tag v-else type="info">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="ifPublic" :label="menuDict.ifPublic" width="120">
              <template #default="{row}">
                <el-tag v-if="row.ifPublic===final.Y" type="primary">是</el-tag>
                <el-tag v-else type="info">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="ifFixed" :label="menuDict.ifFixed" width="120">
              <template #default="{row}">
                <el-tag v-if="row.ifFixed===final.Y" type="primary">是</el-tag>
                <el-tag v-else type="info">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="perms" :label="menuDict.perms" width="280"/>
            <el-table-column prop="remark" :label="menuDict.remark" width="200"/>
            <!--在此上方添加表格列-->
            <!--<el-table-column prop="createBy" :label="menuDict.createBy" width="120"/>-->
            <!--<el-table-column prop="updateBy" :label="menuDict.updateBy" width="120"/>-->
            <!--<el-table-column prop="createTime" :label="menuDict.createTime" width="220"/>-->
            <!--<el-table-column prop="updateTime" :label="menuDict.updateTime" width="220"/>-->
            <!--<el-table-column prop="deleted" :label="menuDict.deleted" width="60"/>-->
            <!--上方几个酌情使用-->
            <el-table-column fixed="right" label="操作" min-width="140">
              <template #default="{row}">
                <div class="zs-table-data-operate-button-row">
                  <el-button v-if="row.type!==T_Inter" link type="primary" size="small" :icon="Plus" @click="tIns(row.id)">新增</el-button>
                  <el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改</el-button>
                  <el-button link type="danger" size="small" :icon="Delete" @click="tDel(row.id)">删除</el-button>
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
    </el-tab-pane>

    <el-tab-pane label="接口" name="b">
      <!--顶部筛选表单-->
      <div class="zs-filter-form" v-show="filterFormVisible1Inter && filterFormVisibleInter">
        <el-form
            class="demo-form-inline"
            ref="filterFormRefInter"
            :model="stateInter.filterForm"
            :inline="true"
            @keyup.enter="fEnterInter"
            @submit.prevent
        >
          <!--在此下方添加表单项-->
          <el-form-item :label="menuDictInter.perms" prop="perms">
            <el-input v-model="stateInter.filterForm.perms" :placeholder="menuDictInter.perms"/>
          </el-form-item>
          <!--在此上方添加表单项-->
          <el-form-item>
            <el-button type="primary" @click="fConInter">筛选</el-button>
            <el-button @click="fCanInter">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--操作按钮-->
      <div class="zs-button-row">
        <div>
          <el-button type="primary" plain :icon="Refresh" @click="gRefreshInter">刷新</el-button>
          <el-button type="primary" plain :icon="Plus" @click="gInsInter">新增</el-button>
          <el-button type="success" plain :icon="Edit" :disabled="configInter.bulkOperation?multipleSelectionInter.length===0:multipleSelectionInter.length!==1" @click="gUpdInter">修改</el-button>
          <el-button type="danger" plain :icon="Delete" :disabled="multipleSelectionInter.length===0" @click="gDelInter()">删除</el-button>
          <!--<el-button type="warning" plain :icon="Download" :disabled="multipleSelectionInter.length===0" @click="gExportInter()">导出</el-button>-->
          <!--<el-button type="warning" plain :icon="Upload" @click="gImportInter">上传</el-button>-->
        </div>
        <div>
          <el-button v-if="filterFormVisible1Inter" plain :icon="Search" circle @click="gChangeFilterFormVisibleInter"/>
        </div>
      </div>

      <div class="zs-table-data">
        <!--数据表格-->
        <el-table
            v-loading="tableLoadingRefInter"
            :data="tableData3Inter"
            :expand-row-keys="expandRowKeys"
            row-key="id"
            :default-expand-all="false"
            @selection-change="handleSelectionChangeInter"
        >
          <el-table-column fixed type="selection" width="55"/>
          <!--上面id列的宽度改一下-->
          <!--在此下方添加表格列-->
          <el-table-column fixed prop="label" :label="menuDictInter.label" width="240"/>
          <el-table-column prop="orderNum" :label="menuDictInter.orderNum" width="120"/>
          <el-table-column prop="perms" :label="menuDictInter.perms" width="280"/>
          <el-table-column prop="remark" :label="menuDictInter.remark" width="200"/>
          <!--在此上方添加表格列-->
          <el-table-column fixed="right" label="操作" min-width="140">
            <template #default="{row}">
              <div class="zs-table-data-operate-button-row">
                <el-button v-if="row.type!==T_Inter" link type="primary" size="small" :icon="Plus" @click="tInsInter(row.id)">新增</el-button>
                <el-button link type="primary" size="small" :icon="Edit" @click="tUpdInter(row.id)">修改</el-button>
                <el-button link type="danger" size="small" :icon="Delete" @click="tDelInter(row.id)">删除</el-button>
                <el-dropdown>
                  <el-button link type="primary" size="small" :icon="DArrowRight">更多</el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item><el-button link type="info" size="small" :icon="Edit" @click="manageInter(row)">接口管理</el-button></el-dropdown-item>
                      <el-dropdown-item><el-button link type="info" size="small" :icon="Edit" @click="setIpWhiteList(row)">IP白名单管理</el-button></el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
          <template #append>
            <div class="el-table-append-box">
              <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${multipleSelectionInter.length} 条数据。` }}</span>
            </div>
          </template>
        </el-table>

        <!--分页-->
        <Pagination
            v-if="configInter.pageQuery"
            :total="totalInter"
            :page-num="pageParamInter.pageNum"
            :page-size="pageParamInter.pageSize"
            @page-change="pageChangeInter"
        />
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
</style>
