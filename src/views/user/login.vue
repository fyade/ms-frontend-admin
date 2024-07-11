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

const activeName = ref('a')
</script>

<template>
  <div class="main">
    <el-form
        :model="form"
        label-width="60px"
        label-position="left"
    >
      <!--<div style="text-align: center;margin-bottom: 10px;font-size: 20px;font-family: 'Microsoft Yahei';">网络安全设备</div>-->
      <!--<el-tabs v-model="activeName" class="demo-tabs">-->
      <!--  &lt;!&ndash;<el-tab-pane label="网络安全设备" name="a"></el-tab-pane>&ndash;&gt;-->
      <!--  <el-tab-pane label="超级用户登录" name="b"></el-tab-pane>-->
      <!--  <el-tab-pane label="普通用户登录" name="c"></el-tab-pane>-->
      <!--</el-tabs>-->
      <!--<br/>-->
      <el-form-item label="用户名">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="logining" @click="onSubmit">登录</el-button>
        <!--<el-button text type="info" :disabled="logining">忘记密码</el-button>-->
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