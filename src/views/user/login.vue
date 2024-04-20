<script setup lang="ts">
import { reactive } from 'vue'
import { useUserStore } from "@/store/module/user.ts";

let userStore = useUserStore();
const form = reactive({
  username: '',
  password: ''
})

const onSubmit = async () => {
  await userStore.login(form)
}
</script>

<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="form.username"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="form.password"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>