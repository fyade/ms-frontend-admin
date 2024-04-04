<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue"
import { cascaderProps2, CONFIG, final, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.js"
import { t_config, t_FuncMap } from "@/type/tablePage.ts";
import type { FormRules } from 'element-plus'
import { Delete, Edit, Plus, Refresh } from "@element-plus/icons-vue";
import { menuDel, menuIns, menuSel, menuSelById, menuUpd } from "@/api/module/sys/menu.ts";
import Tooltip from "@/components/tooltip/tooltip.vue";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import { finalT } from "@/type/utils/base.ts";

const T_MENU = 'm'
const T_COMP = 'c'
const T_Inter = 'b'
type T_MENU = 'm'
type T_COMP = 'c'
type T_Inter = 'b'
type tType = T_MENU | T_COMP | T_Inter

type DialogForm = {
  id: string
  label: string
  type: tType
  path: string
  parent_id: number
  component: string
  icon: string
  order_num: number
  if_link: finalT
  if_visible: finalT
  if_disabled: finalT
  if_public: finalT
  perms: string
  remark: string
}

interface State {
  dialogType: {
    value: string
    label: string
  }
  dialogForm: DialogForm
  dFormRules: FormRules
  dict: object
  filterForm: object
  list: DialogForm[]
  multipleSelection: object[]
  total: number
}

const state = reactive<State>({
  dialogType: {
    value: '',
    label: ''
  },
  // 这个是弹出框表单
  // 格式: {
  //   id: '',
  //   if_default: final.IS_DEFAULT_YES,
  //   if_disabled: final.DISABLED_NO,
  //   parent_id: final.DEFAULT_PARENT_ID,
  //   ...
  // }
  dialogForm: {
    id: '',
    label: '',
    type: T_MENU,
    path: '#',
    parent_id: final.DEFAULT_PARENT_ID,
    component: '#',
    icon: '#',
    order_num: final.DEFAULT_ORDER_NUM,
    if_link: final.N,
    if_visible: final.Y,
    if_disabled: final.N,
    if_public: final.N,
    perms: '',
    remark: ''
  },
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
  dict: {},
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {},
  list: [],
  multipleSelection: [],
  total: -1
})
const state2 = reactive({
  orderNum: 0
})
const dialogFormRef = ref(null)
const dialogFormInput1Ref = ref(null)
const filterFormRef = ref(null)
const dialogVisible = ref(false)
const dislogLoadingRef = ref(false)
const tableLoadingRef = ref(false)
const switchLoadingRef = ref(false)
const config: t_config = reactive({
  selectParam: {}, // 查询参数（补充
  getDataOnMounted: true, // 页面加载时获取数据，默认true
  pageQuery: false, // 分页，默认true
  watchDialogVisible: true, // 监听dialogVisible变化，默认true
  tableInlineOperate: true // 允许表格行内操作，默认true
})

const func: t_FuncMap = {
  /**
   * 查询列表
   * @param params
   */
  selectList: (params: any) => {
    return menuSel(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return menuSelById(id)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return menuIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    return menuUpd(obj)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return menuDel(ids)
  }
}

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
  tUpd,
  tDel,
  handleSelectionChange,
  pageChange
} = funcTablePage({
  config,
  state,
  state2,
  dialogFormRef,
  dialogFormInput1Ref,
  filterFormRef,
  dialogVisible,
  dislogLoadingRef,
  tableLoadingRef,
  switchLoadingRef,
  func
})

const menuTypeDict = {
  [T_MENU]: '菜单',
  [T_COMP]: '组件',
  [T_Inter]: '接口'
};
const canChooseTypes = ref<tType[]>([])
watch(() => state.dialogForm.type, () => {
  state.dFormRules = {
    type: [{required: true, trigger: 'change'}],
    label: [{required: true, trigger: 'change'}],
    path: [{required: [T_MENU, T_COMP].indexOf(state.dialogForm.type) > -1, trigger: 'change'}],
    parent_id: [{required: true, trigger: 'change'}],
    component: [{required: [T_COMP].indexOf(state.dialogForm.type) > -1, trigger: 'change'}],
    icon: [{required: [T_MENU, T_COMP].indexOf(state.dialogForm.type) > -1, trigger: 'change'}],
    perms: [{required: [T_COMP, T_Inter].indexOf(state.dialogForm.type) > -1, trigger: 'change'}],
  }
  if ([T_MENU, T_COMP].indexOf(state.dialogForm.type) > -1) {
    state.dFormRules = {
      ...state.dFormRules,
      if_link: [{required: true, trigger: 'change'}],
      if_visible: [{required: true, trigger: 'change'}],
      if_disabled: [{required: true, trigger: 'change'}],
    }
  }
  if ([T_Inter].indexOf(state.dialogForm.type) > -1) {
    state.dFormRules = {
      ...state.dFormRules,
      if_public: [{required: true, trigger: 'change'}],
    }
  }
  state.dict = {
    ...publicDict,
    label: `${menuTypeDict[state.dialogForm.type]}名`,
    type: '菜单类型',
    path: '菜单路径',
    parent_id: '父级菜单',
    component: '组件路径',
    icon: '图标',
    if_link: '是否外链',
    if_visible: '是否显示',
    if_disabled: '是否禁用',
    if_public: '是否公共接口',
    perms: '权限标识',
  }
}, {
  immediate: true,
})
watch(() => state.dialogForm.parent_id, () => {
  if (state.dialogForm.parent_id === null) {
    state.dialogForm.parent_id = final.DEFAULT_PARENT_ID
  }
  if (state.dialogForm.parent_id === final.DEFAULT_PARENT_ID) {
    canChooseTypes.value = [T_MENU, T_COMP]
  } else {
    const data = state.list.find((item: any) => item.id === state.dialogForm.parent_id);
    if (data) {
      if (data.type === T_MENU) {
        canChooseTypes.value = [T_MENU, T_COMP]
      } else if (data.type === T_COMP) {
        canChooseTypes.value = [T_Inter]
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
  state.dialogForm.parent_id = id
  gIns()
}

const checkVisible = (a: tType, b: tType[]): boolean => {
  return b.indexOf(a) > -1
}

const tabledata2 = computed(() => {
  return arr2ToDiguiObj(state.list)
})
const tabledata3 = computed(() => {
  return arr2ToDiguiObj(state.list.filter(item => checkVisible(item.type, [T_MENU, T_COMP])))
})
</script>

<template>
  <!--弹框-->
  <el-dialog
      :width="CONFIG.dialog_width"
      v-model="dialogVisible"
      :title="state.dialogType.label"
      draggable
      append-to-body
  >
    <el-form
        ref="dialogFormRef"
        v-loading="dislogLoadingRef"
        :model="state.dialogForm"
        :label-width="CONFIG.dialog_form_label_width"
        :rules="state.dFormRules"
    >
      <el-row v-show="state.dialogType.value!=='ins'">
        <el-col :span="24">
          <el-form-item :label="state.dict['id']" prop="id">
            <span>{{ state.dialogForm['id'] }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <!--
      第一个input添加如下属性
      ref="dialogFormInput1Ref"
      -->
      <!--在此下方添加表单项-->
      <el-row>
        <el-col :span="24">
          <el-form-item :label="state.dict['parent_id']" prop="parent_id">
            <el-cascader
                v-model="state.dialogForm['parent_id']"
                :options="tabledata3"
                :props="cascaderProps2"
                clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="state.dict['type']" prop="type">
            <template #label>
              <tooltip content="菜单的父级只允许为菜单，组件的父级只允许为菜单，接口的父级只允许为组件。">
                {{ state.dict['type'] }}
              </tooltip>
            </template>
            <el-radio-group v-model="state.dialogForm['type']">
              <el-radio :label="T_MENU" :disabled="canChooseTypes.indexOf(T_MENU)===-1">
                {{ menuTypeDict[T_MENU] }}
              </el-radio>
              <el-radio :label="T_COMP" :disabled="canChooseTypes.indexOf(T_COMP)===-1">
                {{ menuTypeDict[T_COMP] }}
              </el-radio>
              <el-radio :label="T_Inter" :disabled="canChooseTypes.indexOf(T_Inter)===-1">
                {{ menuTypeDict[T_Inter] }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="checkVisible(state.dialogForm['type'], [T_MENU,T_COMP])">
        <el-col :span="24">
          <el-form-item :label="state.dict['icon']" prop="icon">
            <el-input v-model="state.dialogForm['icon']" :placeholder="state.dict['icon']"/>
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
          <el-form-item :label="state.dict['order_num']" prop="order_num">
            <el-input-number v-model="state.dialogForm['order_num']" controls-position="right"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="checkVisible(state.dialogForm['type'], [T_MENU,T_COMP])">
        <el-col :span="12">
          <el-form-item :label="state.dict['if_link']" prop="if_link">
            <template #label>
              <tooltip content="若选是，则点击会跳转至外部链接。">{{ state.dict['if_link'] }}</tooltip>
            </template>
            <el-radio-group v-model="state.dialogForm['if_link']">
              <el-radio :label="final.Y">是</el-radio>
              <el-radio :label="final.N">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="state.dict['path']" prop="path">
            <template #label>
              <tooltip content="这里填写路由地址。">{{ state.dict['path'] }}</tooltip>
            </template>
            <el-input v-model="state.dialogForm['path']" :placeholder="state.dict['path']"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="checkVisible(state.dialogForm['type'], [T_MENU,T_COMP])">
        <el-col :span="12">
          <el-form-item :label="state.dict['if_visible']" prop="if_visible">
            <el-radio-group v-model="state.dialogForm['if_visible']">
              <el-radio :label="final.Y">是</el-radio>
              <el-radio :label="final.N">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="state.dict['if_disabled']" prop="if_disabled">
            <el-radio-group v-model="state.dialogForm['if_disabled']">
              <el-radio :label="final.Y">是</el-radio>
              <el-radio :label="final.N">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" v-show="checkVisible(state.dialogForm['type'], [T_COMP])">
          <el-form-item :label="state.dict['component']" prop="component">
            <template #label>
              <tooltip content="这里填写项目文件夹中的路径。">{{ state.dict['component'] }}</tooltip>
            </template>
            <el-input v-model="state.dialogForm['component']" :placeholder="state.dict['component']"/>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="checkVisible(state.dialogForm['type'], [T_COMP,T_Inter])">
          <el-form-item :label="state.dict['perms']" prop="perms">
            <template #label>
              <tooltip content="与后端配合。">{{ state.dict['perms'] }}</tooltip>
            </template>
            <el-input v-model="state.dialogForm['perms']" :placeholder="state.dict['perms']"/>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="checkVisible(state.dialogForm['type'], [T_Inter])">
          <el-form-item :label="state.dict['if_public']" prop="if_public">
            <el-radio-group v-model="state.dialogForm['if_public']">
              <el-radio :label="final.Y">是</el-radio>
              <el-radio :label="final.N">否</el-radio>
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
      <!--<el-form-item :label="state.dict['order_num']" prop="order_num">-->
      <!--  <el-input-number v-model="state.dialogForm['order_num']" controls-position="right"/>-->
      <!--</el-form-item>-->
      <!--<el-form-item :label="state.dict['if_default']" prop="if_default">-->
      <!--  <el-switch v-model="state.dialogForm['if_default']" :active-value="final.IS_DEFAULT_YES"-->
      <!--             :inactive-value="final.IS_DEFAULT_NO"/>-->
      <!--</el-form-item>-->
      <!--<el-form-item :label="state.dict['if_disabled']" prop="if_disabled">-->
      <!--  <el-switch v-model="state.dialogForm['if_disabled']" :active-value="final.DISABLED_NO"-->
      <!--             :inactive-value="final.DISABLED_YES"/>-->
      <!--</el-form-item>-->
      <!--上方几个酌情使用-->
    </el-form>
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
  >
    <!--在此下方添加表单项-->
    <!--<el-form-item :label="state.dict['']" prop="">-->
    <!--  <el-input v-model="state.filterForm['']" :placeholder="state.dict['']"/>-->
    <!--</el-form-item>-->
    <!--在此上方添加表单项-->
    <el-form-item>
      <el-button type="primary" @click="fCon">筛选</el-button>
      <el-button @click="fCan">重置</el-button>
    </el-form-item>
  </el-form>

  <!--操作按钮-->
  <div style="display: flex;flex-wrap: wrap;gap: 1rem;">
    <el-button-group>
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
      <el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>
      <el-button type="success" plain :icon="Edit" :disabled="state.multipleSelection.length!==1" @click="gUpd">修改
      </el-button>
      <el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel">删除
      </el-button>
      <!--<el-button type="warning" plain :icon="Download" :disabled="state.multipleSelection.length===0">导出</el-button>-->
      <!--<el-button type="warning" plain :icon="Upload">上传</el-button>-->
    </el-button-group>
    <!--<el-button-group>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gMoveUp">上移</el-button>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gMoveDown">下移</el-button>-->
    <!--</el-button-group>-->
    <!--<el-button-group>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledToNo">启用</el-button>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledToYes">禁用</el-button>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledShift">切换</el-button>-->
    <!--</el-button-group>-->
  </div>

  <!--数据表格-->
  <el-table
      style="width: 100%"
      v-loading="tableLoadingRef"
      :data="tabledata2"
      row-key="id"
      default-expand-all
      @selection-change="handleSelectionChange"
  >
    <el-table-column fixed type="selection" width="55"/>
    <!--<el-table-column fixed prop="id" :label="state.dict['id']" width="180"/>-->
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="label" :label="state.dict['label']" width="200"/>
    <el-table-column prop="path" :label="state.dict['path']" width="120"/>
    <el-table-column prop="component" :label="state.dict['component']" width="120"/>
    <el-table-column prop="icon" :label="state.dict['icon']" width="120"/>
    <el-table-column prop="order_num" :label="state.dict['order_num']" width="120"/>
    <el-table-column prop="if_link" :label="state.dict['if_link']" width="120"/>
    <el-table-column prop="if_visible" :label="state.dict['if_visible']" width="120"/>
    <el-table-column prop="if_disabled" :label="state.dict['if_disabled']" width="120"/>
    <el-table-column prop="if_public" :label="state.dict['if_public']" width="120"/>
    <el-table-column prop="perms" :label="state.dict['perms']" width="120"/>
    <el-table-column prop="remark" :label="state.dict['remark']" width="120"/>
    <!--在此上方添加表格列-->
    <el-table-column prop="create_by" :label="state.dict['create_by']" width="120"/>
    <el-table-column prop="update_by" :label="state.dict['update_by']" width="120"/>
    <el-table-column prop="create_time" :label="state.dict['create_time']" width="200"/>
    <el-table-column prop="update_time" :label="state.dict['update_time']" width="200"/>
    <el-table-column prop="deleted" :label="state.dict['deleted']" width="60"/>
    <!--上方几个酌情使用-->
    <el-table-column fixed="right" label="操作" min-width="150">
      <template #default="{row}">
        <el-button link type="primary" size="small" @click="tIns(row.id)">新增</el-button>
        <el-button link type="primary" size="small" @click="tUpd(row.id)">修改</el-button>
        <el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>
      </template>
    </el-table-column>
    <template #append>
      <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${state.multipleSelection.length} 条数据` }}</span>
    </template>
  </el-table>

  <!--分页-->
  <Pagination
      v-if="state.total!==-1"
      :total="Number(state.total)"
      @page-change="pageChange"
  />
</template>

<style scoped>

</style>