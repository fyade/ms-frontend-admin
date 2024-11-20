<script setup lang="ts">
import { reactive } from "vue";
import { CONFIG, final, T_HOST, T_IP, T_IS } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { MenuIpWhiteListDto, MenuIpWhiteListUpdDto } from "@/type/module/main/sysManage/menuIpWhiteList.ts";
import { menuIpWhiteListApi } from "@/api/module/main/sysManage/menuIpWhiteList.ts";
import { menuIpWhiteListDict } from "@/dict/module/main/sysManage/menuIpWhiteList.ts";
import { MenuDto } from "@/type/module/main/sysManage/menu.ts";
import { menuDictInter } from "@/dict/module/main/sysManage/menu.ts";

const props = defineProps({
  menu: {
    type: MenuDto,
    required: true,
  }
})

const state = reactive<State2<MenuIpWhiteListDto, MenuIpWhiteListUpdDto>>({
  dialogForm: {
    id: -1,
    menuId: props.menu.id,
    whiteList: '',
    fromType: T_IP,
    type: T_IS,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {},
})
const dFormRules: FormRules = {
  menuId: [{required: true, trigger: 'change'}],
  whiteList: [{required: true, trigger: 'change'}],
  fromType: [{required: true, trigger: 'change'}],
  type: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true,
  selectParam: {
    menuId: props.menu.id
  }
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
} = funcTablePage<MenuIpWhiteListDto, MenuIpWhiteListUpdDto>({
  state,
  dFormRules,
  config,
  api: menuIpWhiteListApi,
  dict: menuIpWhiteListDict,
})
</script>

<template>
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
        <el-form-item v-if="dialogType.value!==final.ins" :label="menuIpWhiteListDict.id" prop="id">
          <span>{{ state.dialogForm.id }}</span>
        </el-form-item>
        <!--
        第一个input添加如下属性
        v-focus
        -->
        <!--在此下方添加表单项-->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="menuIpWhiteListDict.whiteList" prop="whiteList">
              <el-input v-model="state.dialogForm.whiteList" :placeholder="menuIpWhiteListDict.whiteList"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="menuIpWhiteListDict.fromType" prop="fromType">
              <!--<el-input v-model="state.dialogForm.fromType" :placeholder="menuIpWhiteListDict.fromType"/>-->
              <el-radio-group v-model="state.dialogForm.fromType">
                <el-radio :value="T_IP">ip</el-radio>
                <el-radio :value="T_HOST">host</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="menuIpWhiteListDict.remark" prop="remark">
              <el-input type="textarea" v-model="state.dialogForm.remark" :placeholder="menuIpWhiteListDict.remark"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--在此上方添加表单项-->
        <!--<el-form-item :label="menuIpWhiteListDict.orderNum" prop='orderNum'>-->
        <!--  <el-input-number v-model="state.dialogForm.orderNum" controls-position="right"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="menuIpWhiteListDict.ifDefault" prop='ifDefault'>-->
        <!--  <el-switch v-model="state.dialogForm.ifDefault" :active-value='final.Y' :inactive-value='final.N'/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="menuIpWhiteListDict.ifDisabled" prop='ifDisabled'>-->
        <!--  <el-radio-group v-model="state.dialogForm.ifDisabled">-->
        <!--    <el-radio :value="final.Y">是</el-radio>-->
        <!--    <el-radio :value="final.N">否</el-radio>-->
        <!--  </el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="menuIpWhiteListDict.ifDisabled" prop="ifDisabled">-->
        <!--  <el-switch v-model="state.dialogForm.ifDisabled" :active-value="final.N" :inactive-value="final.Y"/>-->
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
            :data="state.dialogForms"
            v-if="state.dialogForms"
        >
          <el-table-column type="index" width="50">
            <template #header>
              #
            </template>
          </el-table-column>
          <!--在此下方添加表格列-->
          <el-table-column prop="whiteList" :label="menuIpWhiteListDict.whiteList" width="480">
            <template #header>
              <span :class="ifRequired('whiteList')?'tp-table-header-required':''">{{ menuIpWhiteListDict.whiteList }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-whiteList`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index].whiteList" :placeholder="menuIpWhiteListDict.whiteList"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="fromType" :label="menuIpWhiteListDict.fromType" width="300">
            <template #header>
              <span :class="ifRequired('fromType')?'tp-table-header-required':''">{{ menuIpWhiteListDict.fromType }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-fromType`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <!--<el-input v-model="state.dialogForms[$index].fromType" :placeholder="menuIpWhiteListDict.fromType"/>-->
                <el-radio-group v-model="state.dialogForms[$index].fromType">
                  <el-radio :value="T_IP">ip</el-radio>
                  <el-radio :value="T_HOST">host</el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="menuIpWhiteListDict.remark" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ menuIpWhiteListDict.remark }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index].remark" :placeholder="menuIpWhiteListDict.remark"/>
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

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">接口组信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="menuDictInter.label">
          {{ props.menu.label }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="menuDictInter.perms">
          {{ props.menu.perms }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">ip白名单列表</el-text>
  </el-divider>

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
      <!--<el-form-item :label="menuIpWhiteListDict." prop="">-->
      <!--  <el-input v-model="state.filterForm." :placeholder="menuIpWhiteListDict."/>-->
      <!--</el-form-item>-->
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
      <!--<el-table-column fixed prop="id" :label="menuIpWhiteListDict.id" width="180"/>-->
      <!--上面id列的宽度改一下-->
      <!--在此下方添加表格列-->
      <el-table-column prop="whiteList" :label="menuIpWhiteListDict.whiteList" width="360"/>
      <el-table-column prop="fromType" :label="menuIpWhiteListDict.fromType" width="120"/>
      <el-table-column prop="remark" :label="menuIpWhiteListDict.remark" width="120"/>
      <!--在此上方添加表格列-->
      <!--<el-table-column prop="createBy" :label="menuIpWhiteListDict.createBy" width="120"/>-->
      <!--<el-table-column prop="updateBy" :label="menuIpWhiteListDict.updateBy" width="120"/>-->
      <!--<el-table-column prop="createTime" :label="menuIpWhiteListDict.createTime" width="220"/>-->
      <!--<el-table-column prop="updateTime" :label="menuIpWhiteListDict.updateTime" width="220"/>-->
      <!--<el-table-column prop="deleted" :label="menuIpWhiteListDict.deleted" width="60"/>-->
      <!--上方几个酌情使用-->
      <el-table-column fixed="right" label="操作" min-width="140">
        <template #default="{row}">
          <div class="zs-table-data-operate-button-row">
            <el-button link type="primary" size="small" :icon="Edit" @click="tUpd(row.id)">修改</el-button>
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
