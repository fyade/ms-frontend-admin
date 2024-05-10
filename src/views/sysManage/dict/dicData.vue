<script setup lang="ts">
import { reactive, ref } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.js"
import { State, t_config, t_FuncMap } from "@/type/tablePage.ts";
import type { FormRules } from 'element-plus'
import { Delete, Edit, Plus, Refresh } from "@element-plus/icons-vue";
import {
  dicDataDel,
  dicDataIns, dicDataInss,
  dicDataSel,
  dicDataSelById,
  dicDataSelByIds,
  dicDataUpd, dicDataUpds
} from "@/api/module/sysManage/dicData.ts";
import { dicTypeSelAll } from "@/api/module/sysManage/dicType.ts";
import { MORE, ONE } from "@/type/utils/base.ts";

const props = defineProps({
  dic_type: {
    type: String,
    required: true
  }
})

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
    value: '',
    dic_type: props.dic_type,
    if_default: final.N,
    if_disabled: final.N,
    order_num: final.DEFAULT_ORDER_NUM,
    remark: ''
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
    value: [{required: true, trigger: 'change'}],
    dic_type: [{required: true, trigger: 'change'}],
    if_default: [{required: true, trigger: 'change'}],
    if_disabled: [{required: true, trigger: 'change'}],
    order_num: [{required: true, trigger: 'change'}]
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    label: '标签',
    value: '值',
    dic_type: '字典类型'
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    label: '',
    value: ''
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
  selectParam: {
    dic_type: props.dic_type
  }, // 查询参数（补充
  getDataOnMounted: true, // 页面加载时获取数据，默认true
  pageQuery: true, // 分页，默认true
  watchDialogVisible: true, // 监听dialogVisible变化，默认true
  /**
   * dialogVisible变化时的回调，可不传
   * @param visible 变化后的值
   */
  dialogVisibleCallback: (visible: boolean) => {
  },
  /**
   * selectList回调，可不传
   */
  selectListCallback: () => {
  },
  bulkOperation: true,
  one2More: false, // 表格数据为一对多格式，默认false
  one2MoreConfig: { // 仅在表格数据为一对多时有效
    oneKey: '', // 一的键
    moreKey: '', // 多的键
  },
  /**
   * 修改单个前的查询的回调，可不传，one2More为true时调这个
   */
  beforeUpdateOneCallback1: (res: any[]) => {
  },
  /**
   * 修改单个前的查询的回调，可不传，one2More为false时调这个
   */
  beforeUpdateOneCallback2: (res: any) => {
  }
})

const func: t_FuncMap = {
  /**
   * 查询列表
   * @param params
   */
  selectList: (params: any) => {
    return dicDataSel(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return dicDataSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return dicDataSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return dicDataIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    return dicDataUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: any[]) => {
    return dicDataInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: any[]) => {
    return dicDataUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return dicDataDel(ids)
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
  pageChange,
  dfIns,
  dfDel
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
  func,
  props
})

const allDicTypes = ref<any[]>([])
dicTypeSelAll({}).then(({res}) => {
  allDicTypes.value = res.data
})
</script>

<template>
  <!--弹框-->
  <el-dialog
      :width="activeTabName===final.more ? 'calc(100% - 50px)' : CONFIG.dialog_width"
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
        <!--<el-row>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--</el-row>-->
        <el-form-item v-if="state.dialogType.value!==final.ins" :label="state.dict['id']" prop="id">
          <span>{{ state.dialogForm['id'] }}</span>
        </el-form-item>
        <!--
        第一个input添加如下属性
        v-focus
        -->
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['label']" prop="label">
              <el-input v-model="state.dialogForm['label']" :placeholder="state.dict['label']"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['value']" prop="value">
              <el-input v-model="state.dialogForm['value']" :placeholder="state.dict['value']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['if_default']" prop="if_default">
              <el-radio-group v-model="state.dialogForm['if_default']">
                <el-radio :label="final.Y">是</el-radio>
                <el-radio :label="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['dic_type']" prop="dic_type">
              <el-select v-model="state.dialogForm['dic_type']" clearable filterable disabled>
                <el-option v-for="item in allDicTypes" :key="item.id" :label="item.name" :value="item.type"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['if_disabled']" prop="if_disabled">
              <el-radio-group v-model="state.dialogForm['if_disabled']">
                <el-radio :label="final.Y">是</el-radio>
                <el-radio :label="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['order_num']" prop="order_num">
              <el-input-number v-model="state.dialogForm['order_num']" controls-position="right"/>
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
        <!--  <el-radio-group v-model="state.dialogForm['if_disabled']">-->
        <!--    <el-radio :label="final.Y">是</el-radio>-->
        <!--    <el-radio :label="final.N">否</el-radio>-->
        <!--  </el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="state.dict['if_disabled']" prop="if_disabled">-->
        <!--  <el-switch v-model="state.dialogForm['if_disabled']" :active-value="final.DISABLED_NO"-->
        <!--             :inactive-value="final.DISABLED_YES"/>-->
        <!--</el-form-item>-->
        <!--上方几个酌情使用-->
      </el-form>
    </template>
    <template v-if="activeTabName===final.more">
      <el-form
          ref="dialogFormsRef"
          v-loading="dialogLoadingRef"
      >
        <el-table
            style="width: 100%"
            :data="state.dialogForms"
            v-if="state.dialogForms"
        >
          <el-table-column type="index" width="50">
            <template #header>
              #
            </template>
          </el-table-column>
          <!--<el-table-column prop="" :label="state.dict['']" width="300">-->
          <!--  <template #default="{$index}">-->
          <!--    <div :class="state.dialogForms_error?.[`${$index}-`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">-->
          <!--      <el-input v-model="state.dialogForms[$index]['']" :placeholder="state.dict['']"/>-->
          <!--    </div>-->
          <!--  </template>-->
          <!--</el-table-column>-->
          <!--在此下方添加表格列-->
          <el-table-column prop="label" :label="state.dict['label']" width="300">
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['label']" :placeholder="state.dict['label']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="value" :label="state.dict['value']" width="300">
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-value`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['value']" :placeholder="state.dict['value']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="if_default" :label="state.dict['if_default']" width="300">
            <template #default="{$index}">
              <div
                  :class="state.dialogForms_error?.[`${$index}-if_default`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-radio-group v-model="state.dialogForms[$index]['if_default']">
                  <el-radio :label="final.Y">是</el-radio>
                  <el-radio :label="final.N">否</el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="dic_type" :label="state.dict['dic_type']" width="300">
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-dic_type`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-select v-model="state.dialogForms[$index]['dic_type']" clearable filterable disabled>
                  <el-option v-for="item in allDicTypes" :key="item.id" :label="item.name" :value="item.type"/>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="if_disabled" :label="state.dict['if_disabled']" width="300">
            <template #default="{$index}">
              <div
                  :class="state.dialogForms_error?.[`${$index}-if_disabled`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-radio-group v-model="state.dialogForms[$index]['if_disabled']">
                  <el-radio :label="final.Y">是</el-radio>
                  <el-radio :label="final.N">否</el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="order_num" :label="state.dict['order_num']" width="300">
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-order_num`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index]['order_num']" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="state.dict['remark']" width="300">
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index]['remark']"
                          :placeholder="state.dict['remark']"/>
              </div>
            </template>
          </el-table-column>
          <!--在此上方添加表格列-->
          <el-table-column fixed="right" label="操作" min-width="120">
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
  >
    <!--在此下方添加表单项-->
    <el-form-item :label="state.dict['label']" prop="label">
      <el-input v-model="state.filterForm['label']" :placeholder="state.dict['label']"/>
    </el-form-item>
    <el-form-item :label="state.dict['value']" prop="value">
      <el-input v-model="state.filterForm['value']" :placeholder="state.dict['value']"/>
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
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
    <el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>
    <el-button type="success" plain :icon="Edit"
               :disabled="config.bulkOperation?state.multipleSelection.length===0:state.multipleSelection.length!==1"
               @click="gUpd">修改
    </el-button>
    <el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel()">删除
    </el-button>
    <!--<el-button type="warning" plain :icon="Download" :disabled="state.multipleSelection.length===0">导出</el-button>-->
    <!--<el-button type="warning" plain :icon="Upload">上传</el-button>-->
    <!--</el-button-group>-->
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
      :data="state.list"
      @selection-change="handleSelectionChange"
  >
    <el-table-column fixed type="selection" width="55"/>
    <!--<el-table-column fixed prop="id" :label="state.dict['id']" width="180"/>-->
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="label" :label="state.dict['label']" width="120"/>
    <el-table-column prop="value" :label="state.dict['value']" width="120"/>
    <el-table-column prop="if_default" :label="state.dict['if_default']" width="120"/>
    <el-table-column prop="if_disabled" :label="state.dict['if_disabled']" width="120"/>
    <el-table-column prop="order_num" :label="state.dict['order_num']" width="120"/>
    <el-table-column prop="remark" :label="state.dict['remark']" width="200"/>
    <!--在此上方添加表格列-->
    <!--<el-table-column prop="create_by" :label="state.dict['create_by']" width="120"/>-->
    <!--<el-table-column prop="update_by" :label="state.dict['update_by']" width="120"/>-->
    <!--<el-table-column prop="create_time" :label="state.dict['create_time']" width="220"/>-->
    <!--<el-table-column prop="update_time" :label="state.dict['update_time']" width="220"/>-->
    <!--<el-table-column prop="deleted" :label="state.dict['deleted']" width="60"/>-->
    <!--上方几个酌情使用-->
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{row}">
        <el-button link type="primary" size="small" @click="tUpd(row.id)">修改</el-button>
        <el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>
      </template>
    </el-table-column>
    <template #append>
      <span>此表格的多选<span
          class="underline">不支持</span>{{ `跨分页保存，当前已选 ${state.multipleSelection.length} 条数据。` }}</span>
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