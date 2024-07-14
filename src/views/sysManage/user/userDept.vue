<script setup lang="ts">
import { computed, inject, nextTick, reactive, Ref, ref, watch } from "vue";
import { State, t_config, t_FuncMap } from "@/type/tablePage.ts";
import { deptDto } from "@/type/api/sysManage/dept.ts";
import { final, PAGINATION, publicDict } from "@/utils/base.ts";
import { FormRules } from "element-plus";
import { MORE, ONE } from "@/type/utils/base.ts";
import {
  deptDel,
  deptIns,
  deptInss,
  deptSel,
  deptSelAll,
  deptSelById,
  deptSelByIds,
  deptUpd,
  deptUpds
} from "@/api/module/sysManage/dept.ts";
import { funcTablePage } from "@/composition/tablePage/tablePage.ts";
import { Refresh } from "@element-plus/icons-vue";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

const state = reactive<State<deptDto>>({
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
  //   orderNum: final.DEFAULT_ORDER_NUM,
  //   ...
  // }
  dialogForm: {
    id: -1,
    label: '',
    parentId: final.DEFAULT_PARENT_ID,
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
    parentId: [{required: true, trigger: 'change'}],
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
    label: '部门名',
    parentId: '父级部门',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    label: ''
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
  selectParam: {}, // 查询参数（补充
  getDataOnMounted: true, // 页面加载时获取数据，默认true
  pageQuery: false, // 分页，默认true
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
    // nextTick(() => {
    //   handleDataChange()
    // })
  },
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
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
    return deptSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: any) => {
    return deptSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return deptSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return deptSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return deptIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    return deptUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: any[]) => {
    return deptInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: any[]) => {
    return deptUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return deptDel(ids)
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
  func
})

const selectDeptTree = ref<any>(null)
const tableData2 = computed(() => arr2ToDiguiObj(state.list))
const selectDept: Ref<any[]> | undefined = inject('changeSelectDept')
const selectDept2 = ref<any[]>(selectDept ? selectDept.value.map(item => item.id) : [])
nextTick(() => {
  if (selectDeptTree) {
    selectDeptTree.value?.setCheckedKeys(selectDept2.value)
  }
})
watch(selectDept2, () => {
  if (selectDept) {
    selectDept.value = state.list.filter((item: any) => selectDept2.value.indexOf(item.id) > -1)
  }
}, {
  deep: true
})

const handleCheckChange = (
    data: any,
    checked: boolean,
    indeterminate: boolean
) => {
  if (checked) {
    selectDept2.value.push(data.id)
  } else {
    if (selectDept) {
      selectDept2.value.splice(selectDept2.value.indexOf(data.id), 1)
    }
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
    <el-text size="large" style="font-weight: bold;">部门列表</el-text>
  </el-divider>
  <!--顶部筛选表单-->
  <!--<el-form-->
  <!--    class="demo-form-inline"-->
  <!--    v-if="Object.keys(state.filterForm).length>0"-->
  <!--    ref="filterFormRef"-->
  <!--    :model="state.filterForm"-->
  <!--    :inline="true"-->
  <!--    @keyup.enter="fEnter"-->
  <!--&gt;-->
  <!--  &lt;!&ndash;在此下方添加表单项&ndash;&gt;-->
  <!--  <el-form-item :label="state.dict['label']" prop="label">-->
  <!--    <el-input v-model="state.filterForm['label']" :placeholder="state.dict['label']"/>-->
  <!--  </el-form-item>-->
  <!--  &lt;!&ndash;在此上方添加表单项&ndash;&gt;-->
  <!--  <el-form-item>-->
  <!--    <el-button type="primary" @click="fCon">筛选</el-button>-->
  <!--    <el-button @click="fCan">重置</el-button>-->
  <!--  </el-form-item>-->
  <!--</el-form>-->

  <!--操作按钮-->
  <div>
    <!--  &lt;!&ndash;<el-button-group>&ndash;&gt;-->
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
    <!--  <el-button type="primary" plain :icon="Plus" @click="gIns2">新增</el-button>-->
    <!--  <el-button type="success" plain :icon="Edit"-->
    <!--             :disabled="config.bulkOperation?state.multipleSelection.length===0:state.multipleSelection.length!==1"-->
    <!--             @click="gUpd">修改-->
    <!--  </el-button>-->
    <!--  <el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel()">删除-->
    <!--  </el-button>-->
    <!--  <el-button type="warning" plain :icon='Download' :disabled='state.multipleSelection.length===0' @click="gExport">-->
    <!--    导出-->
    <!--  </el-button>-->
    <!--  <el-button type="warning" plain :icon='Upload' @click="gImport">上传</el-button>-->
    <!--  &lt;!&ndash;</el-button-group>&ndash;&gt;-->
    <!--  &lt;!&ndash;<el-button-group>&ndash;&gt;-->
    <!--  &lt;!&ndash;  <el-button plain :disabled="state.multipleSelection.length===0" @click="gMoveUp">上移</el-button>&ndash;&gt;-->
    <!--  &lt;!&ndash;  <el-button plain :disabled="state.multipleSelection.length===0" @click="gMoveDown">下移</el-button>&ndash;&gt;-->
    <!--  &lt;!&ndash;</el-button-group>&ndash;&gt;-->
    <!--  &lt;!&ndash;<el-button-group>&ndash;&gt;-->
    <!--  &lt;!&ndash;  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledToNo">启用</el-button>&ndash;&gt;-->
    <!--  &lt;!&ndash;  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledToYes">禁用</el-button>&ndash;&gt;-->
    <!--  &lt;!&ndash;  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledShift">切换</el-button>&ndash;&gt;-->
    <!--  &lt;!&ndash;</el-button-group>&ndash;&gt;-->
  </div>

  <!--数据表格-->
  <!--<el-table-->
  <!--    ref="multipleTable"-->
  <!--    v-loading="tableLoadingRef"-->
  <!--    :data="tableData2"-->
  <!--    row-key="id"-->
  <!--    :expand-row-keys="expandRowKeys"-->
  <!--    :default-expand-all="true"-->
  <!--    @selection-change="handleSelectionChange"-->
  <!--&gt;-->
  <!--  &lt;!&ndash;<el-table-column fixed type="selection" width="55" :reserve-selection="true">&ndash;&gt;-->
  <!--  &lt;!&ndash;  <template #default="{row}">&ndash;&gt;-->
  <!--  &lt;!&ndash;    <el-checkbox v-model="selects[row.id]" @change="handleSelectionChange(row)"/>&ndash;&gt;-->
  <!--  &lt;!&ndash;  </template>&ndash;&gt;-->
  <!--  &lt;!&ndash;</el-table-column>&ndash;&gt;-->
  <!--  <el-table-column type="selection" width="55"/>-->
  <!--  &lt;!&ndash;<el-table-column fixed prop="id" :label="state.dict['id']" width="180"/>&ndash;&gt;-->
  <!--  &lt;!&ndash;上面id列的宽度改一下&ndash;&gt;-->
  <!--  &lt;!&ndash;在此下方添加表格列&ndash;&gt;-->
  <!--  <el-table-column prop="label" :label="state.dict['label']" width="240"/>-->
  <!--  <el-table-column prop="parentId" :label="state.dict['parentId']" width="120"/>-->
  <!--  <el-table-column prop="orderNum" :label="state.dict['orderNum']" width="120"/>-->
  <!--  <el-table-column prop="remark" :label="state.dict['remark']" width="120"/>-->
  <!--  &lt;!&ndash;在此上方添加表格列&ndash;&gt;-->
  <!--  &lt;!&ndash;<el-table-column prop="createBy" :label="state.dict['createBy']" width="120"/>&ndash;&gt;-->
  <!--  &lt;!&ndash;<el-table-column prop="updateBy" :label="state.dict['updateBy']" width="120"/>&ndash;&gt;-->
  <!--  &lt;!&ndash;<el-table-column prop="createTime" :label="state.dict['createTime']" width="220"/>&ndash;&gt;-->
  <!--  &lt;!&ndash;<el-table-column prop="updateTime" :label="state.dict['updateTime']" width="220"/>&ndash;&gt;-->
  <!--  &lt;!&ndash;<el-table-column prop="deleted" :label="state.dict['deleted']" width="60"/>&ndash;&gt;-->
  <!--  &lt;!&ndash;上方几个酌情使用&ndash;&gt;-->
  <!--  &lt;!&ndash;<el-table-column fixed="right" label="操作" min-width="200">&ndash;&gt;-->
  <!--  &lt;!&ndash;  <template #default="{row}">&ndash;&gt;-->
  <!--  &lt;!&ndash;    <el-button link type="primary" size="small" @click="tIns(row.id)">新增</el-button>&ndash;&gt;-->
  <!--  &lt;!&ndash;    <el-button link type="primary" size="small" @click="tUpd(row.id)">修改</el-button>&ndash;&gt;-->
  <!--  &lt;!&ndash;    <el-button link type="primary" size="small" @click="manageUser(row)">管理用户</el-button>&ndash;&gt;-->
  <!--  &lt;!&ndash;    <el-button link type="primary" size="small" @click="managePermission(row)">分配权限</el-button>&ndash;&gt;-->
  <!--  &lt;!&ndash;    <el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>&ndash;&gt;-->
  <!--  &lt;!&ndash;  </template>&ndash;&gt;-->
  <!--  &lt;!&ndash;</el-table-column>&ndash;&gt;-->
  <!--  <template #append>-->
  <!--    <span>此表格的多选<span-->
  <!--        class="underline">不支持</span>{{ `跨分页保存，当前已选 ${state.multipleSelection.length} 条数据。` }}</span>-->
  <!--  </template>-->
  <!--</el-table>-->

  <!--&lt;!&ndash;分页&ndash;&gt;-->
  <!--<Pagination-->
  <!--    v-if="state.total!==-1"-->
  <!--    :total="Number(state.total)"-->
  <!--    :page-num="state.pageParam.pageNum"-->
  <!--    :page-size="state.pageParam.pageSize"-->
  <!--    @page-change="pageChange"-->
  <!--/>-->
  <br/>
  <el-form>
    <el-form-item label="所属部门">
      <el-tree
          ref="selectDeptTree"
          node-key="id"
          style="width: 100%;"
          :data="tableData2"
          show-checkbox
          :check-strictly="true"
          :default-checked-keys="selectDept2"
          default-expand-all
          @check-change="handleCheckChange"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>