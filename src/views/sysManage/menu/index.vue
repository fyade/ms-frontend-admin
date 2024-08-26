<script lang="ts">
export default {
  name: 'sysManage:menu'
}
</script>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue"
import { cascaderProps2, CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.js"
import { State, t_config } from "@/type/tablePage.ts"
import type { FormRules } from 'element-plus'
import { Delete, Download, Edit, Plus, Refresh, Upload, Sort } from "@element-plus/icons-vue";
import { MORE, ONE } from "@/type/utils/base.ts"
import { menuDto, tType } from "@/type/api/sysManage/menu.ts";
import { menuFunc } from "@/api/module/sysManage/menu.ts"
import { useRouterStore } from "@/store/module/router.ts";
import { ifNull, ifUndefined } from "@/utils/ObjectUtils.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";

const T_MENU = 'mm'
const T_COMP = 'mc'
const T_Inter = 'mb'

const state = reactive<State<menuDto, menuDto>>({
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
    type: T_MENU,
    path: '#',
    parentId: final.DEFAULT_PARENT_ID,
    component: '#',
    icon: '',
    orderNum: final.DEFAULT_ORDER_NUM,
    ifLink: final.N,
    ifVisible: final.Y,
    ifDisabled: final.N,
    ifPublic: final.N,
    perms: '',
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  // 这个是弹出框表单校验
  // 格式: {
  //   name: [{ required: true, trigger: 'change' }],
  //   ...
  // }
  dFormRules: {} as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    label: `菜单/组件名`,
    type: '菜单类型',
    path: '菜单路径',
    parentId: '父级菜单',
    component: '组件路径',
    icon: '图标',
    ifLink: '是否外链',
    ifVisible: '是否显示',
    ifDisabled: '是否禁用',
    ifPublic: '是否公共接口',
    perms: '权限标识',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    type: '',
    perms: ''
  },
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
  pageQuery: false, // 分页，默认true
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
  func: menuFunc
})

const routerStore = useRouterStore();
const menuTypeDict = {
  [T_MENU]: '菜单',
  [T_COMP]: '组件',
  [T_Inter]: '接口'
};
const canChooseTypes = ref<tType[]>([])
watch(() => [state.dialogForm.type, activeTabName.value], () => {
  if (activeTabName.value === final.more) {
    state.dFormRules = {}
    return
  }
  state.dFormRules = {
    type: [{required: true, trigger: 'change'}],
    label: [{required: true, trigger: 'change'}],
    orderNum: [{required: true, trigger: 'change'}],
    path: [{required: [T_MENU, T_COMP].indexOf(state.dialogForm.type) > -1, trigger: 'change'}],
    component: [{required: [T_COMP].indexOf(state.dialogForm.type) > -1, trigger: 'change'}],
    icon: [{required: [T_MENU, T_COMP].indexOf(state.dialogForm.type) > -1, trigger: 'change'}],
    perms: [{required: true, trigger: 'change'}],
  }
  if ([T_MENU, T_COMP].indexOf(state.dialogForm.type) > -1) {
    state.dFormRules = {
      ...state.dFormRules,
      ifLink: [{required: true, trigger: 'change'}],
      ifVisible: [{required: true, trigger: 'change'}],
      ifDisabled: [{required: true, trigger: 'change'}],
    }
  }
  if ([T_Inter].indexOf(state.dialogForm.type) > -1) {
    state.dFormRules = {
      ...state.dFormRules,
      parentId: [{required: true, trigger: 'change'}],
      ifPublic: [{required: true, trigger: 'change'}],
    }
  }
}, {
  immediate: true,
})
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
    const data = state.list.find(item => item.id === state.dialogForm.parentId);
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

const tIns = (id: number) => {
  state.dialogForm.parentId = id
  gIns()
}

const checkVisible = (a: tType, b: tType[]): boolean => {
  return b.indexOf(a) > -1
}

const tableData2 = computed(() => {
  const diguiObj = arr2ToDiguiObj(state.list);
  if (diguiObj.length === 0 && state.list.length > 0) {
    return state.list
  }
  return diguiObj
})
const tableData3 = computed(() => {
  return arr2ToDiguiObj(state.list.filter(item => checkVisible(item.type, [T_MENU, T_COMP])))
})

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
</script>

<template>
  <!--弹窗-->
  <el-dialog
      :width="activeTabName===final.more ? CONFIG.dialog_width_wider : CONFIG.dialog_width"
      v-model="dialogVisible"
      :title="state.dialogType.label"
      draggable
      append-to-body
  >
    <el-tabs v-if="config.bulkOperation" v-model="activeTabName">
      <el-tab-pane :disabled="state.dialogType.value===final.upd" label="操作单个" :name="final.one"></el-tab-pane>
      <el-tab-pane :disabled="state.dialogType.value===final.upd" label="操作多个" :name="final.more"></el-tab-pane>
    </el-tabs>
    <template v-if="activeTabName===final.one">
      <el-form
          ref="dialogFormRef"
          v-loading="dialogLoadingRef"
          :model="state.dialogForm"
          :label-width="CONFIG.dialog_form_label_width"
          :rules="state.dFormRules"
      >
        <el-row v-show="state.dialogType.value!==final.ins">
          <el-col :span="24">
            <el-form-item :label="state.dict['id']" prop="id">
              <span>{{ state.dialogForm['id'] }}</span>
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
            <el-form-item :label="state.dict['parentId']" prop="parentId">
              <el-cascader
                  v-model="state.dialogForm['parentId']"
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
            <el-form-item :label="state.dict['type']" prop="type">
              <template #label>
                <Tooltip content="菜单的父级只允许为菜单，组件的父级只允许为菜单，接口的父级只允许为组件。">
                  {{ state.dict['type'] }}
                </Tooltip>
              </template>
              <el-radio-group v-model="state.dialogForm['type']">
                <el-radio :value="T_MENU" :disabled="canChooseTypes.indexOf(T_MENU)===-1">
                  {{ menuTypeDict[T_MENU] }}
                </el-radio>
                <el-radio :value="T_COMP" :disabled="canChooseTypes.indexOf(T_COMP)===-1">
                  {{ menuTypeDict[T_COMP] }}
                </el-radio>
                <el-radio :value="T_Inter" :disabled="canChooseTypes.indexOf(T_Inter)===-1">
                  {{ menuTypeDict[T_Inter] }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="checkVisible(state.dialogForm['type'], [T_MENU,T_COMP])">
          <el-col :span="24">
            <el-form-item :label="state.dict['icon']" prop="icon">
              <IconSelect v-model="state.dialogForm['icon']" :placeholder="state.dict['icon']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['label']" prop="label">
              <el-input v-model="state.dialogForm['label']" :placeholder="state.dict['label']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['orderNum']" prop="orderNum">
              <el-input-number v-model="state.dialogForm['orderNum']" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="checkVisible(state.dialogForm['type'], [T_MENU,T_COMP])">
          <el-col :span="12">
            <el-form-item :label="state.dict['ifLink']" prop="ifLink">
              <template #label>
                <Tooltip content="若选是，则点击会跳转至外部链接。">{{ state.dict['ifLink'] }}</Tooltip>
              </template>
              <el-radio-group v-model="state.dialogForm['ifLink']">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['path']" prop="path">
              <template #label>
                <Tooltip content="这里填写路由地址。">{{ state.dict['path'] }}</Tooltip>
              </template>
              <el-input v-model="state.dialogForm['path']" :placeholder="state.dict['path']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="checkVisible(state.dialogForm['type'], [T_MENU,T_COMP])">
          <el-col :span="12">
            <el-form-item :label="state.dict['ifVisible']" prop="ifVisible">
              <el-radio-group v-model="state.dialogForm['ifVisible']">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['ifDisabled']" prop="ifDisabled">
              <el-radio-group v-model="state.dialogForm['ifDisabled']">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-show="checkVisible(state.dialogForm['type'], [T_COMP])">
            <el-form-item :label="state.dict['component']" prop="component">
              <template #label>
                <Tooltip content="这里填写项目文件夹中的路径。">{{ state.dict['component'] }}</Tooltip>
              </template>
              <el-input v-model="state.dialogForm['component']" :placeholder="state.dict['component']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['perms']" prop="perms">
              <template #label>
                <Tooltip content="与后端配合。">{{ state.dict['perms'] }}</Tooltip>
              </template>
              <el-input v-model="state.dialogForm['perms']" :placeholder="state.dict['perms']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="checkVisible(state.dialogForm['type'], [T_Inter])">
            <el-form-item :label="state.dict['ifPublic']" prop="ifPublic">
              <el-radio-group v-model="state.dialogForm['ifPublic']">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="state.dict['remark']" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm['remark']" :placeholder="state.dict['remark']"/>
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
          <el-table-column prop="parentId" :label="state.dict['parentId']" width="300">
            <template #header>
              <span :class="ifRequired('parentId')?'tp-table-header-required':''">{{ state.dict['parentId'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-parentId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-cascader
                    v-model="state.dialogForms[$index]['parentId']"
                    :options="tableData3"
                    :props="cascaderProps2"
                    clearable
                    :value-on-clear="final.DEFAULT_PARENT_ID"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" :label="state.dict['type']" width="300">
            <template #header>
              <Tooltip content="菜单的父级只允许为菜单，组件的父级只允许为菜单，接口的父级只允许为组件。">
                <span :class="ifRequired('type')?'tp-table-header-required':''">
                  {{ state.dict['type'] }}
                </span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-type`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-radio-group v-model="state.dialogForms[$index]['type']">
                  <el-radio :value="T_MENU" :disabled="canChooseTypes.indexOf(T_MENU)===-1">
                    {{ menuTypeDict[T_MENU] }}
                  </el-radio>
                  <el-radio :value="T_COMP" :disabled="canChooseTypes.indexOf(T_COMP)===-1">
                    {{ menuTypeDict[T_COMP] }}
                  </el-radio>
                  <el-radio :value="T_Inter" :disabled="canChooseTypes.indexOf(T_Inter)===-1">
                    {{ menuTypeDict[T_Inter] }}
                  </el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="icon" :label="state.dict['icon']" width="300">
            <template #header>
              <span :class="ifRequired('icon')?'tp-table-header-required':''">{{ state.dict['icon'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-icon`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <IconSelect v-model="state.dialogForms[$index]['icon']" :placeholder="state.dict['icon']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="label" :label="state.dict['label']" width="300">
            <template #header>
              <span :class="ifRequired('label')?'tp-table-header-required':''">{{ state.dict['label'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['label']" :placeholder="state.dict['label']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="state.dict['orderNum']" width="200">
            <template #header>
              <span :class="ifRequired('orderNum')?'tp-table-header-required':''">{{ state.dict['orderNum'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index]['orderNum']" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifLink" :label="state.dict['ifLink']" width="80">
            <template #header>
              <Tooltip content="若选是，则点击会跳转至外部链接。">
                <span :class="ifRequired('ifLink')?'tp-table-header-required':''">{{ state.dict['ifLink'] }}</span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifLink`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <!--<el-radio-group v-model="state.dialogForms[$index]['ifLink']">-->
                <!--  <el-radio :value="final.Y">是</el-radio>-->
                <!--  <el-radio :value="final.N">否</el-radio>-->
                <!--</el-radio-group>-->
                <el-checkbox v-model="state.dialogForms[$index]['ifLink']" :true-value="final.Y"
                             :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="path" :label="state.dict['path']" width="300">
            <template #header>
              <Tooltip content="这里填写路由地址。">
                <span :class="ifRequired('path')?'tp-table-header-required':''">{{ state.dict['path'] }}</span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-path`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['path']" :placeholder="state.dict['path']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifVisible" :label="state.dict['ifVisible']" width="80">
            <template #header>
              <span :class="ifRequired('ifVisible')?'tp-table-header-required':''">{{ state.dict['ifVisible'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifVisible`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <!--<el-radio-group v-model="state.dialogForms[$index]['ifVisible']">-->
                <!--  <el-radio :value="final.Y">是</el-radio>-->
                <!--  <el-radio :value="final.N">否</el-radio>-->
                <!--</el-radio-group>-->
                <el-checkbox v-model="state.dialogForms[$index]['ifVisible']" :true-value="final.Y"
                             :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifDisabled" :label="state.dict['ifDisabled']" width="80">
            <template #header>
              <span :class="ifRequired('ifDisabled')?'tp-table-header-required':''">{{
                  state.dict['ifDisabled']
                }}</span>
            </template>
            <template #default="{$index}">
              <div
                  :class="state.dialogForms_error?.[`${$index}-ifDisabled`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <!--<el-radio-group v-model="state.dialogForms[$index]['ifDisabled']">-->
                <!--  <el-radio :value="final.Y">是</el-radio>-->
                <!--  <el-radio :value="final.N">否</el-radio>-->
                <!--</el-radio-group>-->
                <el-checkbox v-model="state.dialogForms[$index]['ifDisabled']" :true-value="final.Y"
                             :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="component" :label="state.dict['component']" width="300">
            <template #header>
              <Tooltip content="这里填写项目文件夹中的路径。">
                <span :class="ifRequired('component')?'tp-table-header-required':''">
                  {{ state.dict['component'] }}
                </span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-component`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['component']" :placeholder="state.dict['component']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="perms" :label="state.dict['perms']" width="300">
            <template #header>
              <Tooltip content="与后端配合。">
                <span :class="ifRequired('perms')?'tp-table-header-required':''">{{ state.dict['perms'] }}</span>
              </Tooltip>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-perms`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['perms']" :placeholder="state.dict['perms']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifPublic" :label="state.dict['ifPublic']" width="80">
            <template #header>
              <span :class="ifRequired('ifPublic')?'tp-table-header-required':''">{{ state.dict['ifPublic'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifPublic`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <!--<el-radio-group v-model="state.dialogForms[$index]['ifPublic']">-->
                <!--  <el-radio :value="final.Y">是</el-radio>-->
                <!--  <el-radio :value="final.N">否</el-radio>-->
                <!--</el-radio-group>-->
                <el-checkbox v-model="state.dialogForms[$index]['ifPublic']" :true-value="final.Y"
                             :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="state.dict['remark']" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ state.dict['remark'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index]['remark']"
                          :placeholder="state.dict['remark']"/>
              </div>
            </template>
          </el-table-column>
          <!--在此上方添加表格列-->
          <el-table-column fixed="right" label="操作" min-width="200">
            <template v-if="state.dialogType.value===final.ins" #default="{$index}">
              <el-button link type="danger" size="small" @click="dfDel($index)">删除</el-button>
            </template>
          </el-table-column>
          <template v-if="state.dialogType.value===final.ins" #append>
            <el-button text type="primary" plain :icon="Plus" @click="dfIns">新增</el-button>
          </template>
        </el-table>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dCan">取消</el-button>
        <el-button type="primary" @click="dCon">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!--顶部筛选表单-->
  <el-form
      class="demo-form-inline"
      v-if="Object.keys(state.filterForm).length>0"
      ref="filterFormRef"
      :model="state.filterForm"
      :inline="true"
      @keyup.enter="fEnter"
      @submit.prevent
  >
    <!--在此下方添加表单项-->
    <el-form-item :label="state.dict['type']" prop="type">
      <!--<el-input v-model="state.filterForm['type']" :placeholder="state.dict['type']"/>-->
      <el-select v-model="state.filterForm['type']" :placeholder="state.dict['type']" clearable filterable>
        <el-option :label="menuTypeDict[T_MENU]" :value="T_MENU"/>
        <el-option :label="menuTypeDict[T_COMP]" :value="T_COMP"/>
        <el-option :label="menuTypeDict[T_Inter]" :value="T_Inter"/>
      </el-select>
    </el-form-item>
    <el-form-item :label="state.dict['perms']" prop="perms">
      <el-input v-model="state.filterForm['perms']" :placeholder="state.dict['perms']"/>
    </el-form-item>
    <!--在此上方添加表单项-->
    <el-form-item>
      <el-button type="primary" @click="fCon">筛选</el-button>
      <el-button @click="fCan">重置</el-button>
    </el-form-item>
  </el-form>

  <!--操作按钮-->
  <div>
    <!--<el-button-group>-->
    <el-button type="info" plain :icon="Sort" @click="expendAll">展开/折叠</el-button>
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
    <el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>
    <el-button type="success" plain :icon="Edit"
               :disabled="config.bulkOperation?state.multipleSelection.length===0:state.multipleSelection.length!==1||(state.multipleSelection.length>0&&checkVisible(state.multipleSelection[0].type,[T_Inter]))"
               @click="gUpd">修改
    </el-button>
    <el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel()">删除
    </el-button>
    <el-button type="warning" plain :icon='Download' :disabled='state.multipleSelection.length===0' @click="gExport()">
      导出
    </el-button>
    <el-button type="warning" plain :icon='Upload' @click="gImport">上传</el-button>
    <!--</el-button-group>-->
  </div>

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
    <!--<el-table-column fixed prop="id" :label="state.dict['id']" width="180"/>-->
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column fixed prop="label" :label="state.dict['label']" width="240"/>
    <el-table-column prop="path" :label="state.dict['path']" width="200"/>
    <el-table-column prop="component" :label="state.dict['component']" width="280"/>
    <el-table-column prop="icon" :label="state.dict['icon']" width="120">
      <template #default="{row}">
        <SvgIcon :name="row.icon" :color="CONFIG.icon_black"/>
      </template>
    </el-table-column>
    <el-table-column prop="orderNum" :label="state.dict['orderNum']" width="120"/>
    <el-table-column prop="ifLink" :label="state.dict['ifLink']" width="120">
      <template #default="{row}">
        <el-tag v-if="row.ifLink===final.Y" type="primary">是</el-tag>
        <el-tag v-else type="info">否</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="ifVisible" :label="state.dict['ifVisible']" width="120">
      <template #default="{row}">
        <el-tag v-if="row.ifVisible===final.Y" type="primary">是</el-tag>
        <el-tag v-else type="info">否</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="ifDisabled" :label="state.dict['ifDisabled']" width="120">
      <template #default="{row}">
        <el-tag v-if="row.ifDisabled===final.Y" type="primary">是</el-tag>
        <el-tag v-else type="info">否</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="ifPublic" :label="state.dict['ifPublic']" width="120">
      <template #default="{row}">
        <el-tag v-if="row.ifPublic===final.Y" type="primary">是</el-tag>
        <el-tag v-else type="info">否</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="perms" :label="state.dict['perms']" width="280"/>
    <el-table-column prop="remark" :label="state.dict['remark']" width="200"/>
    <!--在此上方添加表格列-->
    <!--<el-table-column prop="createBy" :label="state.dict['createBy']" width="120"/>-->
    <!--<el-table-column prop="updateBy" :label="state.dict['updateBy']" width="120"/>-->
    <!--<el-table-column prop="createTime" :label="state.dict['createTime']" width="220"/>-->
    <!--<el-table-column prop="updateTime" :label="state.dict['updateTime']" width="220"/>-->
    <!--<el-table-column prop="deleted" :label="state.dict['deleted']" width="60"/>-->
    <!--上方几个酌情使用-->
    <el-table-column fixed="right" label="操作" min-width="200">
      <template #default="{row}">
        <el-button v-if="row.type!==T_Inter" link type="primary" size="small" @click="tIns(row.id)">新增</el-button>
        <el-button link type="primary" size="small" @click="tUpd(row.id)">修改</el-button>
        <el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>
      </template>
    </el-table-column>
    <template #append>
      <div class="el-table-append-box">
        <span>此表格的多选<span
            class="underline">不支持</span>{{ `跨分页保存，当前已选 ${state.multipleSelection.length} 条数据。` }}</span>
      </div>
    </template>
  </el-table>

  <!--分页-->
  <Pagination
      v-if="state.total!==-1"
      :total="Number(state.total)"
      :page-num="state.pageParam.pageNum"
      :page-size="state.pageParam.pageSize"
      @page-change="pageChange"
  />
</template>

<style scoped>

</style>