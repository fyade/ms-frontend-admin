<script setup lang="ts">
const props=defineProps({
  selectDept:{
    type:Object,
    required:true
  }
})
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
    <el-text size="large" style="font-weight: bold;">权限列表</el-text>
  </el-divider>
</template>

<style scoped lang="scss">

</style>