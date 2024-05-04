<script setup lang="ts">
import { inject, nextTick, reactive, Ref, ref, toRaw, watch } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.js"
import { State, t_config, t_FuncMap } from "@/type/tablePage.ts";
import { ElTable, FormRules } from 'element-plus'
import { roleDel, roleIns, roleSel, roleSelById, roleUpd } from "@/api/module/sys/role.ts";
import RolePermission from "@/views/sys/role/rolePermission.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

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
    order_num: final.DEFAULT_ORDER_NUM,
    remark: ''
  },
  // 这个是弹出框表单校验
  // 格式: {
  //   name: [{ required: true, trigger: 'change' }],
  //   ...
  // }
  dFormRules: {
    label: [{required: true, trigger: 'change'}]
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
    if_admin: '是否管理员用户',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    label: '',
    if_admin: '',
    if_disabled: ''
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
  selectListCallback: () => {
    nextTick(() => {
      handleDataChange()
    })
  },
  tableInlineOperate: true // 允许表格行内操作，默认true
})

const func: t_FuncMap = {
  /**
   * 查询列表
   * @param params
   */
  selectList: (params: any) => {
    return roleSel(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return roleSelById(id)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return roleIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    return roleUpd(obj)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return roleDel(ids)
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
  // handleSelectionChange,
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

const setPermission = (id: any) => {
  selectRoleId.value = id
  drawer.value = true
}
const drawer = ref(false)
const selectRoleId = ref(0)
const selectRole: Ref<any[]> | undefined = inject('changeSelectRole')
const multipleTable: Ref<InstanceType<typeof ElTable> | null> = ref<InstanceType<typeof ElTable> | null>(null)
const handleSelectionChange = (val: any) => {
  const index = state.multipleSelection.findIndex((item: any) => item.id === val.id);
  if (index === -1) {
    state.multipleSelection.push(val)
  } else {
    state.multipleSelection.splice(index, 1)
  }
  if (selectRole) {
    selectRole.value = state.multipleSelection
  }
}
const handleDataChange = () => {
  if (selectRole && selectRole.value && multipleTable && multipleTable.value) {
    const selectRoleIds = selectRole.value.map(item => item.id);
    state.list.forEach((item: any) => {
      if (selectRoleIds.indexOf(item.id) > -1) {
        multipleTable.value?.toggleRowSelection(item, true)
      }
    })
    state.multipleSelection = selectRole.value
  }
}
const selects = reactive({})
watch(() => state.multipleSelection, () => {
  for (let key in selects) {
    selects[key] = false
  }
  state.multipleSelection.forEach((item: any) => {
    selects[item.id] = true
  })
}, {
  deep: true
})

const selectAll = (val: any[]) => {
  let newselect: any[] = []
  if (val.length > 0) {
    const additems = val.filter(item => state.multipleSelection.findIndex((itm: any) => itm.id === item.id) === -1)
    newselect = [...state.multipleSelection, ...additems]
  } else {
    newselect = state.multipleSelection.filter((item: any) => state.list.findIndex((itm: any) => itm.id === item.id) === -1)
  }
  state.multipleSelection = newselect
  if (selectRole) {
    selectRole.value = state.multipleSelection
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
  <el-drawer
      v-model="drawer"
      :size="CONFIG.drawer_size"
      destroy-on-close
      title="分配权限"
  >
    <RolePermission
        :role_id="selectRoleId"
    />
  </el-drawer>

  <!--弹框-->
  <!--<el-dialog-->
  <!--    :width="CONFIG.dialog_width"-->
  <!--    v-model="dialogVisible"-->
  <!--    :title="state.dialogType.label"-->
  <!--    draggable-->
  <!--    append-to-body-->
  <!--&gt;-->
  <!--  <el-form-->
  <!--      ref="dialogFormRef"-->
  <!--      v-loading="dislogLoadingRef"-->
  <!--      :model="state.dialogForm"-->
  <!--      :label-width="CONFIG.dialog_form_label_width"-->
  <!--      :rules="state.dFormRules"-->
  <!--  >-->
  <!--    <el-row v-if="state.dialogType.value!=='ins'">-->
  <!--      <el-col :span="24">-->
  <!--        <el-form-item :label="state.dict['id']" prop="id">-->
  <!--          <span>{{ state.dialogForm['id'] }}</span>-->
  <!--        </el-form-item>-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--    &lt;!&ndash;-->
  <!--    第一个input添加如下属性-->
  <!--    v-autofocus-->
  <!--    &ndash;&gt;-->
  <!--    &lt;!&ndash;在此下方添加表单项&ndash;&gt;-->
  <!--    <el-row>-->
  <!--      <el-col :span="12">-->
  <!--        <el-form-item :label="state.dict['label']" prop="label">-->
  <!--          <el-input v-model="state.dialogForm['label']" :placeholder="state.dict['label']"/>-->
  <!--        </el-form-item>-->
  <!--      </el-col>-->
  <!--      <el-col :span="12">-->
  <!--        <el-form-item :label="state.dict['order_num']" prop="order_num">-->
  <!--          <el-input-number v-model="state.dialogForm['order_num']" controls-position="right"/>-->
  <!--        </el-form-item>-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--    <el-row>-->
  <!--      <el-col :span="24">-->
  <!--        <el-form-item :label="state.dict['remark']" prop="remark">-->
  <!--          <el-input type="textarea" v-model="state.dialogForm['remark']" :placeholder="state.dict['remark']"/>-->
  <!--        </el-form-item>-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--    &lt;!&ndash;在此上方添加表单项&ndash;&gt;-->
  <!--    &lt;!&ndash;<el-form-item :label="state.dict['order_num']" prop="order_num">&ndash;&gt;-->
  <!--    &lt;!&ndash;  <el-input-number v-model="state.dialogForm['order_num']" controls-position="right"/>&ndash;&gt;-->
  <!--    &lt;!&ndash;</el-form-item>&ndash;&gt;-->
  <!--    &lt;!&ndash;<el-form-item :label="state.dict['if_default']" prop="if_default">&ndash;&gt;-->
  <!--    &lt;!&ndash;  <el-switch v-model="state.dialogForm['if_default']" :active-value="final.IS_DEFAULT_YES"&ndash;&gt;-->
  <!--    &lt;!&ndash;             :inactive-value="final.IS_DEFAULT_NO"/>&ndash;&gt;-->
  <!--    &lt;!&ndash;</el-form-item>&ndash;&gt;-->
  <!--    &lt;!&ndash;<el-form-item :label="state.dict['if_disabled']" prop="if_disabled">&ndash;&gt;-->
  <!--    &lt;!&ndash;  <el-switch v-model="state.dialogForm['if_disabled']" :active-value="final.DISABLED_NO"&ndash;&gt;-->
  <!--    &lt;!&ndash;             :inactive-value="final.DISABLED_YES"/>&ndash;&gt;-->
  <!--    &lt;!&ndash;</el-form-item>&ndash;&gt;-->
  <!--    &lt;!&ndash;上方几个酌情使用&ndash;&gt;-->
  <!--  </el-form>-->
  <!--  <template #footer>-->
  <!--    <span class="dialog-footer">-->
  <!--      <el-button @click="dCan">取消</el-button>-->
  <!--      <el-button type="primary" @click="dCon">确认</el-button>-->
  <!--    </span>-->
  <!--  </template>-->
  <!--</el-dialog>-->

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
    <el-form-item :label="state.dict['if_admin']" prop="if_admin">
      <el-input v-model="state.filterForm['if_admin']" :placeholder="state.dict['if_admin']"/>
    </el-form-item>
    <el-form-item :label="state.dict['if_disabled']" prop="if_disabled">
      <el-input v-model="state.filterForm['if_disabled']" :placeholder="state.dict['if_disabled']"/>
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
    <!--<el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>-->
    <!--<el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>-->
    <!--<el-button type="success" plain :icon="Edit" :disabled="state.multipleSelection.length!==1" @click="gUpd">修改-->
    <!--</el-button>-->
    <!--<el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel()">删除-->
    <!--</el-button>-->
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
      ref="multipleTable"
      v-loading="tableLoadingRef"
      :data="state.list"
      row-key="id"
      @select-all="selectAll"
  >
    <!--@selection-change="handleSelectionChange"-->
    <el-table-column fixed type="selection" width="55" :reserve-selection="true">
      <template #default="{row}">
        <el-checkbox v-model="selects[row.id]" @change="handleSelectionChange(row)"/>
      </template>
    </el-table-column>
    <!--<el-table-column fixed prop="id" :label="state.dict['id']" width="180"/>-->
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="label" :label="state.dict['label']" width="120"/>
    <el-table-column prop="if_admin" :label="state.dict['if_admin']" width="120"/>
    <el-table-column prop="if_disabled" :label="state.dict['if_disabled']" width="120"/>
    <el-table-column prop="order_num" :label="state.dict['order_num']" width="120"/>
    <el-table-column prop="remark" :label="state.dict['remark']" width="200"/>
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
      </template>
    </el-table-column>
    <template #append>
      <span>此表格的多选<span
          class="underline">支持</span>{{ `跨分页保存，当前已选 ${state.multipleSelection.length} 条数据。` }}</span>
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