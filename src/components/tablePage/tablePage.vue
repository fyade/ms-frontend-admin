<script setup lang="ts">
import { reactive, ref } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.js"
import { State, t_config, t_FuncMap } from "@/type/tablePage.ts";
import type { FormRules } from 'element-plus'
import { Delete, Edit, Plus, Refresh } from "@element-plus/icons-vue";
import { MORE, ONE } from "@/type/utils/base.ts";

const state = reactive<State>({
  dialogType: {
    value: '',
    label: ''
  },
  // 这个是弹出框表单
  // 格式: {
  //   id: '',
  //   ifDefault: final.IS_DEFAULT_YES,
  //   ifDisabled: final.DISABLED_NO,
  //   parentId: final.DEFAULT_PARENT_ID,
  //   ...
  // }
  dialogForm: {},
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
const dialogFormsRef = ref(null)
const filterFormRef = ref(null)
const dialogVisible = ref(false)
const dialogLoadingRef = ref(false)
const tableLoadingRef = ref(false)
const switchLoadingRef = ref(false)
const activeTabName = ref<ONE | MORE>(final.one)
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
  bulkOperation: false, // 弹出表单是否支持批量操作，默认false
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
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    // return func(ids)
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
   * 新增多个
   * @param objs
   */
  insertMore: (objs: any[]) => {
    // return func(objs)
    return new Promise((resolve, reject) => {
      reject()
    })
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: any[]) => {
    // return func(objs)
    return new Promise((resolve, reject) => {
      reject()
    })
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    // return func(ids)
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
  func
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
        <!--<el-form-item :label="state.dict['']" prop="">-->
        <!--  <el-input v-model="state.dialogForm['']" :placeholder="state.dict['']"/>-->
        <!--</el-form-item>-->
        <!--在此上方添加表单项-->
        <!--<el-form-item :label="state.dict['orderNum']" prop="orderNum">-->
        <!--  <el-input-number v-model="state.dialogForm['orderNum']" controls-position="right"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="state.dict['ifDefault']" prop="ifDefault">-->
        <!--  <el-switch v-model="state.dialogForm['ifDefault']" :active-value="final.IS_DEFAULT_YES"-->
        <!--             :inactive-value="final.IS_DEFAULT_NO"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="state.dict['ifDisabled']" prop="ifDisabled">-->
        <!--  <el-radio-group v-model="state.dialogForm['ifDisabled']">-->
        <!--    <el-radio :label="final.Y">是</el-radio>-->
        <!--    <el-radio :label="final.N">否</el-radio>-->
        <!--  </el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="state.dict['ifDisabled']" prop="ifDisabled">-->
        <!--  <el-switch v-model="state.dialogForm['ifDisabled']" :active-value="final.DISABLED_NO"-->
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
          <!--在此下方添加表格列-->
          <!--<el-table-column prop="" :label="state.dict['']" width="300">-->
          <!--  <template #header>-->
          <!--    <span :class="ifRequired('')?'tp-table-header-required':''">{{ state.dict[''] }}</span>-->
          <!--  </template>-->
          <!--  <template #default="{$index}">-->
          <!--    <div :class="state.dialogForms_error?.[`${$index}-`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">-->
          <!--      <el-input v-model="state.dialogForms[$index]['']" :placeholder="state.dict['']"/>-->
          <!--    </div>-->
          <!--  </template>-->
          <!--</el-table-column>-->
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
    <!--<el-table-column prop="createBy" :label="state.dict['createBy']" width="120"/>-->
    <!--<el-table-column prop="updateBy" :label="state.dict['updateBy']" width="120"/>-->
    <!--<el-table-column prop="createTime" :label="state.dict['createTime']" width="220"/>-->
    <!--<el-table-column prop="updateTime" :label="state.dict['updateTime']" width="220"/>-->
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