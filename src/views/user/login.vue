<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from "@/store/module/user.ts";
import Loginbg from "@/views/user/loginbg.vue";

let userStore = useUserStore();
const form = reactive({
  username: '',
  password: ''
})

const logining = ref(false)
const onSubmit = async () => {
  logining.value = true
  userStore.login(form).then().catch(() => {
    logining.value = false
  })
}
</script>

<template>
  <div class="main">
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="logining" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!--<Loginbg class="bg"/>-->
</template>

<style scoped lang="scss">
.main {
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 500px;
  transform: translate(-50%, -50%);
  //background: #ffffff;
}

.bg {
  position: fixed;
  z-index: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>