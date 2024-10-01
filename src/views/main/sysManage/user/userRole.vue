<script setup lang="ts">
import { inject, nextTick, reactive, Ref, ref, toRaw } from "vue"
import { final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.ts"
import { State, t_config } from "@/type/tablePage.ts"
import { ElTable, FormRules, TableInstance } from 'element-plus'
import { Refresh } from "@element-plus/icons-vue";
import { MORE, ONE, typeOM } from "@/type/utils/base.ts"
import { roleDto } from "@/type/api/main/sysManage/role.ts";
import { roleFunc, } from "@/api/module/main/sysManage/role.ts"

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

const state = reactive<State<roleDto>>({
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
    ifAdmin: final.N,
    ifDisabled: final.N,
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
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
    ifAdmin: [{required: true, trigger: 'change'}],
    ifDisabled: [{required: true, trigger: 'change'}],
    orderNum: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    label: '角色名',
    ifAdmin: '是否管理员权限',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    label: '',
    ifAdmin: '',
    ifDisabled: ''
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
const activeTabName = ref<typeOM>(final.one)
const config: t_config = reactive({
  /**
   * selectList回调，可不传
   */
  selectListCallback: () => {
    nextTick(() => {
      handleDataChange()
    })
  },
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
  func: roleFunc
})

const selectRole: Ref<number[]> | undefined = inject('changeSelectRole')
const multipleTable = ref<TableInstance | null>(null)
const handleDataChange = () => {
  if (selectRole && selectRole.value && multipleTable && multipleTable.value) {
    const value = toRaw(selectRole.value);
    state.list.forEach(item => {
      if (value.indexOf(item.id) > -1) {
        multipleTable.value?.toggleRowSelection(item, true)
      }
    })
    state.multipleSelection = state.list.filter(item => selectRole.value.indexOf(item.id) > -1)
  }
}
const handleSelectionChange = (val: roleDto[]) => {
  state.multipleSelection = val
  if (selectRole) {
    selectRole.value = state.multipleSelection.map(item => item.id)
  }
}
</script>

<template>
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">用户信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item label="用户id">
          <el-input disabled v-model="props.user.id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="用户名">
          <el-input disabled v-model="props.user.username"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="用户昵称">
          <el-input disabled v-model="props.user.nickname"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">角色列表</el-text>
  </el-divider>

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
    <el-form-item :label="state.dict['label']" prop="label">
      <el-input v-model="state.filterForm['label']" :placeholder="state.dict['label']"/>
    </el-form-item>
    <el-form-item :label="state.dict['ifAdmin']" prop="ifAdmin">
      <!--<el-input v-model="state.filterForm['ifAdmin']" :placeholder="state.dict['ifAdmin']"/>-->
      <el-select v-model="state.filterForm['ifAdmin']" :placeholder="state.dict['ifAdmin']" clearable filterable>
        <el-option label="是" :value="final.Y"/>
        <el-option label="否" :value="final.N"/>
      </el-select>
    </el-form-item>
    <el-form-item :label="state.dict['ifDisabled']" prop="ifDisabled">
      <!--<el-input v-model="state.filterForm['ifDisabled']" :placeholder="state.dict['ifDisabled']"/>-->
      <el-select v-model="state.filterForm['ifDisabled']" :placeholder="state.dict['ifDisabled']" clearable filterable>
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

  <!--操作按钮-->
  <div>
    <!--<el-button-group>-->
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
    <!--</el-button-group>-->
  </div>

  <!--数据表格-->
  <el-table
      ref="multipleTable"
      v-loading="tableLoadingRef"
      :data="state.list"
      row-key="id"
      @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55"/>
    <!--<el-table-column fixed type="selection" width="55" :reserve-selection="true">-->
    <!--  <template #default="{row}">-->
    <!--    <el-checkbox v-model="selects[row.id]" @change="handleSelectionChange(row)"/>-->
    <!--  </template>-->
    <!--</el-table-column>-->
    <!--<el-table-column fixed prop="id" :label="state.dict['id']" width="180"/>-->
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="label" :label="state.dict['label']" width="120"/>
    <el-table-column prop="ifAdmin" :label="state.dict['ifAdmin']" width="120"/>
    <el-table-column prop="ifDisabled" :label="state.dict['ifDisabled']" width="120"/>
    <el-table-column prop="orderNum" :label="state.dict['orderNum']" width="120"/>
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
      </template>
    </el-table-column>
    <template #append>
      <div class="el-table-append-box">
        <span>此表格的多选<span
            class="underline">支持</span>{{ `跨分页保存，当前已选 ${state.multipleSelection.length} 条数据。` }}</span>
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