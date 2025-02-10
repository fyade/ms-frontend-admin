<script lang="ts">
export default {
  name: 'algorithm:interface'
}
</script>

<script setup lang="ts">
import { provide, reactive, ref } from "vue"
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { InterfaceDto, InterfaceUpdDto } from "@/type/module/algorithm/interface.ts";
import { interfaceApi } from "@/api/module/algorithm/interface.ts";
import { interfaceDict } from "@/dict/module/algorithm/interface.ts";
import InterfaceInterfaceGroup from "@/views/module/algorithm/interface/interfaceInterfaceGroup.vue";
import { interfaceInterfaceGroupApi, interfaceInterfaceGroupUpdIIG } from "@/api/module/algorithm/interfaceInterfaceGroup.ts";

const state = reactive<State2<InterfaceDto, InterfaceUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    icon: '',
    orderNum: final.DEFAULT_ORDER_NUM,
    ifDisabled: final.N,
    ifPublic: final.N,
    perms: '',
    url: '',
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    label: '',
    ifDisabled: '',
    ifPublic: '',
    perms: '',
  },
})
const dFormRules: FormRules = {
  label: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
  ifDisabled: [{required: true, trigger: 'change'}],
  ifPublic: [{required: true, trigger: 'change'}],
  perms: [{required: true, trigger: 'change'}],
  url: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true,
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
} = funcTablePage<InterfaceDto, InterfaceUpdDto>({
  state,
  dFormRules,
  config,
  api: interfaceApi,
  dict: interfaceDict,
})

const selectInterface = ref<InterfaceDto>(new InterfaceDto())
const drawer2 = ref(false)
const selectInterfaceGroups = ref<number[]>([])
const manageInterfaceGroup = (row: InterfaceDto) => {
  selectInterface.value = row
  interfaceInterfaceGroupApi.selectAll({interfaceId: selectInterface.value.id}).then(res => {
    selectInterfaceGroups.value = res.map(item => item.interfaceGroupId)
    drawer2.value = true
  })
}
const drawerConfirmInterfaceInterfaceGroup = () => {
  const param = {
    interfaceId: selectInterface.value.id,
    interfaceGroupId: selectInterfaceGroups.value
  }
  interfaceInterfaceGroupUpdIIG(param).then(res => {
    if (res) {
      drawer2.value = false
      gRefresh()
    }
  })
}
const drawerCancelInterfaceInterfaceGroup = () => {
  drawer2.value = false
}
provide('changeSelectInterfaceGroup', selectInterfaceGroups)
</script>

<template>
  <!--接口接口组-->
  <el-dialog
      v-model="drawer2"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title="分配接口组"
  >
    <InterfaceInterfaceGroup
        :interface="selectInterface"
    />
    <template #footer>
      <el-button plain @click="drawerCancelInterfaceInterfaceGroup">取消</el-button>
      <el-button type="primary" plain @click="drawerConfirmInterfaceInterfaceGroup">提交</el-button>
    </template>
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
        <!--<el-row>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--</el-row>-->
        <el-form-item v-if="dialogType.value!==final.ins" :label="interfaceDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="interfaceDict.label" prop="label">
              <el-input v-model="state.dialogForm.label" :placeholder="interfaceDict.label"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="interfaceDict.icon" prop="icon">
              <IconSelect v-model="state.dialogForm.icon" :placeholder="interfaceDict.icon"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="interfaceDict.orderNum" prop="orderNum">
              <el-input-number v-model="state.dialogForm.orderNum" controls-position="right"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="interfaceDict.ifDisabled" prop="ifDisabled">
              <el-radio-group v-model="state.dialogForm.ifDisabled">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="interfaceDict.ifPublic" prop="ifPublic">
              <el-radio-group v-model="state.dialogForm.ifPublic">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="interfaceDict.perms" prop="perms">
              <el-input v-model="state.dialogForm.perms" :placeholder="interfaceDict.perms"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="interfaceDict.url" prop="url">
              <el-input v-model="state.dialogForm.url" :placeholder="interfaceDict.url"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="interfaceDict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="interfaceDict.remark"/>
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
          <el-table-column prop="label" :label="interfaceDict.label" width="300">
            <template #header>
              <span :class="ifRequired('label')?'tp-table-header-required':''">{{ interfaceDict.label }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].label" :placeholder="interfaceDict.label"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="icon" :label="interfaceDict.icon" width="300">
            <template #header>
              <span :class="ifRequired('icon')?'tp-table-header-required':''">{{ interfaceDict.icon }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-icon`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <IconSelect v-model="state.dialogForms[$index].icon" :placeholder="interfaceDict.icon"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="interfaceDict.orderNum" width="300">
            <template #header>
              <span :class="ifRequired('orderNum')?'tp-table-header-required':''">{{ interfaceDict.orderNum }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].orderNum" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifDisabled" :label="interfaceDict.ifDisabled" width="70">
            <template #header>
              <span :class="ifRequired('ifDisabled')?'tp-table-header-required':''">{{ interfaceDict.ifDisabled }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifDisabled`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifDisabled" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifPublic" :label="interfaceDict.ifPublic" width="70">
            <template #header>
              <span :class="ifRequired('ifPublic')?'tp-table-header-required':''">{{ interfaceDict.ifPublic }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifPublic`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index].ifPublic" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="perms" :label="interfaceDict.perms" width="300">
            <template #header>
              <span :class="ifRequired('perms')?'tp-table-header-required':''">{{ interfaceDict.perms }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-perms`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].perms" :placeholder="interfaceDict.perms"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="url" :label="interfaceDict.url" width="300">
            <template #header>
              <span :class="ifRequired('url')?'tp-table-header-required':''">{{ interfaceDict.url }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-url`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].url" :placeholder="interfaceDict.url"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="interfaceDict.remark" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ interfaceDict.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].remark" :placeholder="interfaceDict.remark"/>
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

  <!--顶部筛选表单-->
  <div class="zs-filter-form" v-show="filterFormVisible1 && filterFormVisible">
    <el-form
        class="demo-form-inline"
        ref="filterFormRef"
        :model="state.filterForm"
        :inline="true"
        @keyup.enter="fEnter"
    >
      <!--在此下方添加表单项-->
      <el-form-item :label="interfaceDict.label" prop="label">
        <el-input v-model="state.filterForm.label" :placeholder="interfaceDict.label"/>
      </el-form-item>
      <el-form-item :label="interfaceDict.ifDisabled" prop="ifDisabled">
        <el-select v-model="state.filterForm.ifDisabled" :placeholder="interfaceDict.ifDisabled" clearable filterable>
          <el-option label="是" :value="final.Y"/>
          <el-option label="否" :value="final.N"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="interfaceDict.ifPublic" prop="ifPublic">
        <el-select v-model="state.filterForm.ifPublic" :placeholder="interfaceDict.ifPublic" clearable filterable>
          <el-option label="是" :value="final.Y"/>
          <el-option label="否" :value="final.N"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="interfaceDict.perms" prop="perms">
        <el-input v-model="state.filterForm.perms" :placeholder="interfaceDict.perms"/>
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
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
      <el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>
      <el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd">修改</el-button>
      <el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除</el-button>
      <el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>
      <el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>
    </div>
    <div>
      <el-button v-if="filterFormVisible1" plain :icon="Search" circle @click="gChangeFilterFormVisible"/>
    </div>
  </div>

  <div class="zs-table-data">
    <!--数据表格-->
    <el-table
        v-loading="tableLoadingRef"
        :data="tableData"
        @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55"/>
      <!--<el-table-column fixed prop="id" :label="interfaceDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="label" :label="interfaceDict.label" width="240"/>
      <el-table-column prop="orderNum" :label="interfaceDict.orderNum" width="120"/>
      <el-table-column prop="ifDisabled" :label="interfaceDict.ifDisabled" width="120"/>
      <el-table-column prop="ifPublic" :label="interfaceDict.ifPublic" width="120"/>
      <el-table-column prop="perms" :label="interfaceDict.perms" width="240"/>
      <el-table-column prop="url" :label="interfaceDict.url" width="240"/>
      <el-table-column prop="remark" :label="interfaceDict.remark" width="120"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="interfaceDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="interfaceDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="interfaceDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="interfaceDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="interfaceDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <el-table-column fixed="right" label="操作" min-width="140">
        <template #default="{row}">
          <div class="zs-table-data-operate-button-row">
            <el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改</el-button>
            <el-button link type="primary" size="small" :icon="Edit" @click="manageInterfaceGroup(row)">分配接口组</el-button>
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
</template>

<style scoped>
</style>
