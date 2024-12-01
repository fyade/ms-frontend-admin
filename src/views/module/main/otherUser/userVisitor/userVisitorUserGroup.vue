<script setup lang="ts">
import { computed, inject, nextTick, reactive, Ref, ref, watch } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules, TreeInstance } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { UserGroupDto, UserGroupUpdDto } from "@/type/module/algorithm/userGroup.ts";
import { userGroupApi } from "@/api/module/algorithm/userGroup.ts";
import { userGroupDict } from "@/dict/module/algorithm/userGroup.ts";
import { arr2ToDiguiObj } from "@/utils/baseUtils.ts";
import { UserVisitorDto2 } from "@/type/module/main/otherUser/userVisitor.ts";
import { userVisitorDict } from "@/dict/module/main/otherUser/userVisitor.ts";

const props = defineProps({
  user: {
    type: UserVisitorDto2,
    required: true
  }
});

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
  filterForm: {},
})
const dFormRules: FormRules = {
  label: [{required: true, trigger: 'change'}],
  parentId: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  pageQuery: false,
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
} = funcTablePage<UserGroupDto, UserGroupUpdDto>({
  state,
  dFormRules,
  config,
  api: userGroupApi,
  dict: userGroupDict,
})

const selectUserGroupTree = ref<TreeInstance | null>(null)
const tableData2 = computed(() => arr2ToDiguiObj(tableData.value))
const selectUserGroup: Ref<number[]> | undefined = inject('changeSelectUserGroup')
const selectUserGroup2 = ref<number[]>(selectUserGroup ? selectUserGroup.value : [])
nextTick(() => {
  if (selectUserGroupTree.value) {
    selectUserGroupTree.value.setCheckedKeys(selectUserGroup2.value)
  }
})
watch(selectUserGroup2, () => {
  if (selectUserGroup) {
    selectUserGroup.value = tableData.value.filter(item => selectUserGroup2.value.indexOf(item.id) > -1).map(item => item.id)
  }
}, {
  deep: true
})

const handleCheckChange = (
    data: UserGroupDto,
    checked: boolean,
    indeterminate: boolean
) => {
  if (checked) {
    selectUserGroup2.value.push(data.id)
  } else {
    if (selectUserGroup) {
      selectUserGroup2.value.splice(selectUserGroup2.value.indexOf(data.id), 1)
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
        <el-form-item :label="userVisitorDict.id">
          {{ props.user.id }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="userVisitorDict.username">
          {{ props.user.username }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="userVisitorDict.nickname">
          {{ props.user.nickname }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">角色列表</el-text>
  </el-divider>
  <!--操作按钮-->
  <div class="zs-button-row">
    <div>
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
    </div>
    <div>
      <el-button v-if="filterFormVisible1" plain :icon="Search" circle @click="gChangeFilterFormVisible"/>
    </div>
  </div>

  <br/>
  <el-form>
    <el-form-item label="所属用户组">
      <el-tree
          style="width: 100%;"
          ref="selectUserGroupTree"
          node-key="id"
          :data="tableData2"
          show-checkbox
          :check-strictly="true"
          :default-checked-keys="selectUserGroup2"
          default-expand-all
          @check-change="handleCheckChange"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>