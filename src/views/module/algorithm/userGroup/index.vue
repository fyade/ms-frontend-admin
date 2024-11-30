<script lang="ts">
export default {
  name: 'algorithm:userGroup'
}
</script>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { cascaderProps2, CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { UserGroupDto, UserGroupUpdDto } from "@/type/module/algorithm/userGroup.ts";
import { userGroupApi } from "@/api/module/algorithm/userGroup.ts";
import { userGroupDict } from "@/dict/module/algorithm/userGroup.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import UserGroupUser from "@/views/module/algorithm/userGroup/userGroupUser.vue";

const state = reactive<State2<UserGroupDto, UserGroupUpdDto>>({
  dialogForm: {
    id: -1,
    label: '',
    parentId: final.DEFAULT_PARENT_ID,
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {
    label: ''
  },
})
const dFormRules: FormRules = {
  label: [{required: true, trigger: 'change'}],
  parentId: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true,
  pageQuery: false,
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
} = funcTablePage<UserGroupDto, UserGroupUpdDto>({
  state,
  dFormRules,
  config,
  api: userGroupApi,
  dict: userGroupDict,
})

const expandRowKeys = ref<string[]>([])
const tableData2 = computed(() => {
  return arr2ToDiguiObj(tableData.value)
})
const gIns2 = () => {
  state.dialogForm.parentId = final.DEFAULT_PARENT_ID
  gIns()
}
const tIns = (id: number) => {
  state.dialogForm.parentId = id
  gIns()
}
const selectUserGroupInfo = ref<UserGroupDto>(new UserGroupDto())
const drawer2 = ref(false)
const manageUser = (row: UserGroupDto) => {
  selectUserGroupInfo.value = row
  drawer2.value = true
}
</script>

<template>
  <!--管理用户-->
  <el-dialog
      v-model="drawer2"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title="管理用户"
  >
    <UserGroupUser
        :select-user-group="selectUserGroupInfo"
    />
    <template #footer>
      <el-button plain @click="drawer2=false">取消</el-button>
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
        <el-form-item v-if="dialogType.value!==final.ins" :label="userGroupDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--
        第一个input添加如下属性
        v-focus
        -->
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="userGroupDict.label" prop="label">
              <el-input v-model="state.dialogForm.label" :placeholder="userGroupDict.label"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="userGroupDict.parentId" prop="parentId">
              <el-cascader
                  v-model="state.dialogForm.parentId"
                  :options="tableData2"
                  :props="cascaderProps2"
                  clearable
                  :value-on-clear="final.DEFAULT_PARENT_ID"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="userGroupDict.orderNum" prop="orderNum">
              <el-input-number v-model="state.dialogForm.orderNum" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="userGroupDict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="userGroupDict.remark"/>
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
          <el-table-column prop="label" :label="userGroupDict.label" width="300">
            <template #header>
              <span :class="ifRequired('label')?'tp-table-header-required':''">{{ userGroupDict.label }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].label" :placeholder="userGroupDict.label"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="parentId" :label="userGroupDict.parentId" width="300">
            <template #header>
              <span :class="ifRequired('parentId')?'tp-table-header-required':''">{{ userGroupDict.parentId }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-parentId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-cascader
                    v-model="state.dialogForms[$index].parentId"
                    :options="tableData2"
                    :props="cascaderProps2"
                    clearable
                    :value-on-clear="final.DEFAULT_PARENT_ID"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="userGroupDict.orderNum" width="300">
            <template #header>
              <span :class="ifRequired('orderNum')?'tp-table-header-required':''">{{ userGroupDict.orderNum }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index].orderNum" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="userGroupDict.remark" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ userGroupDict.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].remark" :placeholder="userGroupDict.remark"/>
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
        @submit.prevent
    >
      <!--在此下方添加表单项-->
      <el-form-item :label="userGroupDict.label" prop="label">
        <el-input v-model="state.filterForm.label" :placeholder="userGroupDict.label"/>
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
      <el-button type="primary" plain :icon="Plus" @click="gIns2">新增</el-button>
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
        :data="tableData2"
        :expand-row-keys="expandRowKeys"
        row-key="id"
        :default-expand-all="true"
        @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55"/>
      <!--<el-table-column fixed prop="id" :label="userGroupDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="label" :label="userGroupDict.label" width="240"/>
      <!--<el-table-column prop="parentId" :label="userGroupDict.parentId" width="120"/>-->
      <el-table-column prop="orderNum" :label="userGroupDict.orderNum" width="120"/>
      <el-table-column prop="remark" :label="userGroupDict.remark" width="120"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="userGroupDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="userGroupDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="userGroupDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="userGroupDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="userGroupDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <el-table-column fixed="right" label="操作" min-width="140">
        <template #default="{row}">
          <div class="zs-table-data-operate-button-row">
            <el-button link type="primary" size="small" :icon="Plus" @click="tIns(row.id)">新增</el-button>
            <el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改</el-button>
            <el-button link type="primary" size="small" :icon="Edit" @click="manageUser(row)">管理用户</el-button>
            <!--<el-button link type="primary" size="small">分配权限</el-button>-->
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
