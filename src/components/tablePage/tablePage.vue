<script setup lang="ts">
import { reactive, ref } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.js"
import { State, t_config, t_FuncMap } from "@/type/tablePage.ts";
import type { FormRules } from 'element-plus'
import { Delete, Edit, Plus, Refresh } from "@element-plus/icons-vue";

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
  dialogForm: {},
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
    ...publicDict
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {},
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
const filterFormRef = ref(null)
const dialogVisible = ref(false)
const dislogLoadingRef = ref(false)
const tableLoadingRef = ref(false)
const switchLoadingRef = ref(false)
const config: t_config = reactive({
  selectParam: {}, // 查询参数（补充
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
  tableInlineOperate: true, // 允许表格行内操作，默认true
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
    // return func(params)
    return new Promise((resolve, reject) => {
      reject()
    })
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    // return func(id)
    return new Promise((resolve, reject) => {
      reject()
    })
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    // return func(obj)
    return new Promise((resolve, reject) => {
      reject()
    })
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    // return func(obj)
    return new Promise((resolve, reject) => {
      reject()
    })
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    // return func(...ids)
    return new Promise((resolve, reject) => {
      reject()
    })
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
  filterFormRef,
  dialogVisible,
  dislogLoadingRef,
  tableLoadingRef,
  switchLoadingRef,
  func
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
      <!--<el-row>-->
      <!--  <el-col :span="12"></el-col>-->
      <!--  <el-col :span="12"></el-col>-->
      <!--</el-row>-->
      <el-form-item v-if="state.dialogType.value!=='ins'" :label="state.dict['id']" prop="id">
        <span>{{ state.dialogForm['id'] }}</span>
      </el-form-item>
      <!--
      第一个input添加如下属性
      v-autofocus
      -->
      <!--在此下方添加表单项-->
      <!--<el-form-item :label="state.dict['']" prop="">-->
      <!--  <el-input v-model="state.dialogForm['']" :placeholder="state.dict['']"/>-->
      <!--</el-form-item>-->
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
  <div>
    <!--<el-button-group>-->
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
      <el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>
      <el-button type="success" plain :icon="Edit" :disabled="state.multipleSelection.length!==1" @click="gUpd">修改
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
    <!--<el-table-column prop="" :label="state.dict['']" width="120"/>-->
    <!--在此上方添加表格列-->
    <!--<el-table-column prop="order_num" :label="state.dict['order_num']" width="180">-->
    <!--  <template #default="{row}">-->
    <!--    <el-input-number-->
    <!--        v-if="config.tableInlineOperate"-->
    <!--        v-model="row.order_num"-->
    <!--        step-strictly-->
    <!--        :value-on-clear="state2.orderNum"-->
    <!--        controls-position="right"-->
    <!--        @focus="handlerFocus(row.order_num)"-->
    <!--        @change="handleOrderNumChange(row.id)"-->
    <!--    />-->
    <!--    <template v-else>{{ row['order_num'] }}</template>-->
    <!--  </template>-->
    <!--</el-table-column>-->
    <!--<el-table-column :label="state.dict['if_default']" width="80">-->
    <!--  <template #default="{row}">-->
    <!--    <el-switch-->
    <!--        v-if="config.tableInlineOperate"-->
    <!--        v-model="row.if_default"-->
    <!--        :loading="switchLoadingRef"-->
    <!--        :active-value="final.IS_DEFAULT_YES"-->
    <!--        :inactive-value="final.IS_DEFAULT_NO"-->
    <!--        :before-change="tBeforeChangeIsDefault.bind(this,row.id)"-->
    <!--    />-->
    <!--    <template v-else>{{ row['if_default'] }}</template>-->
    <!--  </template>-->
    <!--</el-table-column>-->
    <!--<el-table-column :label="state.dict['if_disabled']" width="80">-->
    <!--  <template #default="{row}">-->
    <!--    <el-switch-->
    <!--        v-if="config.tableInlineOperate"-->
    <!--        v-model="row.if_disabled"-->
    <!--        :loading="switchLoadingRef"-->
    <!--        :active-value="final.DISABLED_NO"-->
    <!--        :inactive-value="final.DISABLED_YES"-->
    <!--        :before-change="tBeforeChangeSwitch.bind(this,row.id)"-->
    <!--    />-->
    <!--    <template v-else>{{ shift_yes_no[row['if_disabled']] }}</template>-->
    <!--  </template>-->
    <!--</el-table-column>-->
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