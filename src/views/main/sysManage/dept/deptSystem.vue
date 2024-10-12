<script setup lang="ts">
import { reactive, ref } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { SysDto, SysUpdDto } from "@/type/module/main/sysManage/sys.ts";
import { sysApi } from "@/api/module/main/sysManage/sys.ts";
import { sysDict } from "@/dict/module/main/sysManage/sys.ts";
import { DeptDto } from "@/type/module/main/sysManage/dept.ts";
import { DeptSysDto } from "@/type/module/main/sysManage/deptSys.ts";
import { deptSysApi } from "@/api/module/main/sysManage/deptSys.ts";

const props = defineProps({
  selectDept: {
    type: DeptDto,
    required: true
  }
})

const state = reactive<State2<SysDto, SysUpdDto>>({
  dialogForm: {
    id: -1,
    name: '',
    perms: '',
    orderNum: final.DEFAULT_ORDER_NUM,
    path: '',
    ifDisabled: final.N,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  filterForm: {},
})
const dFormRules: FormRules = {
  name: [{required: true, trigger: 'change'}],
  perms: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
  path: [{required: true, trigger: 'change'}],
  ifDisabled: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true,
  pageQuery: false,
  selectListCallback: () => {
    getDeptSyss()
  }
})

const {
  dialogFormRef,
  dialogFormsRef,
  filterFormRef,
  dialogVisible,
  dialogLoadingRef,
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
  tUpd,
  tDel,
  handleSelectionChange,
  pageChange,
  dfIns,
  dfDel,
  ifRequired,
} = funcTablePage<SysDto, SysUpdDto>({
  state,
  dFormRules,
  config,
  api: sysApi,
  dict: sysDict,
})

class SysDto2 extends SysDto {
  ifTrue!: boolean
  loading!: boolean
}

const allDeptSyss = ref<DeptSysDto[]>([])
const stateList2 = ref<SysDto2[]>([])
const getDeptSyss = () => {
  stateList2.value = tableData.value.map(item => ({...item, ifTrue: false, loading: true}))
  deptSysApi.selectAll({deptId: props.selectDept?.id}).then((res: DeptSysDto[]) => {
    allDeptSyss.value = res
    res.forEach(ite => {
      const find = stateList2.value.find(item => item.id === ite.sysId);
      if (find) {
        find.ifTrue = true
      }
    })
    stateList2.value.forEach(item => item.loading = false)
  })
}
const beforeChange = (dto: SysDto2): boolean | Promise<boolean> => {
  dto.loading = true
  if (!dto.ifTrue) {
    return new Promise((resolve, reject) => {
      deptSysApi.insertOne({deptId: props.selectDept?.id, sysId: dto.id, remark: ''}).then(res => {
        if (res) {
          gRefresh()
          resolve(true)
        } else {
          reject()
        }
      }).finally(() => {
        dto.loading = false
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      const find = allDeptSyss.value.find(item => item.deptId === props.selectDept?.id && item.sysId === dto.id);
      if (find) {
        deptSysApi.deleteList(find.id).then(res => {
          if (res) {
            gRefresh()
            resolve(true)
          } else {
            reject()
          }
        }).finally(() => {
          dto.loading = false
        })
      } else {
        dto.loading = false
        reject()
      }
    })
  }
}
</script>

<template>
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">部门信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item label="部门id">
          <el-input disabled v-model="props.selectDept.id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="部门名">
          <el-input disabled v-model="props.selectDept.label"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">系统列表</el-text>
  </el-divider>
  <!--操作按钮-->
  <div>
    <!--<el-button-group>-->
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
    <!--<el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>-->
    <!--<el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd">修改</el-button>-->
    <!--<el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除</el-button>-->
    <!--<el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>-->
    <!--<el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>-->
    <!--</el-button-group>-->
  </div>

  <br/>

  <div style="display: grid;grid-template-columns: repeat(4, 1fr);gap: 12px;">
    <el-card
        v-for="item in stateList2"
        :key="item.id"
    >
      <el-row>
        <el-col :span="16">
          {{ item.name }}
        </el-col>
        <el-col :span="8">
          <el-switch
              v-model="item.ifTrue"
              :loading="item.loading"
              :before-change="()=>beforeChange(item)"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped lang="scss">

</style>