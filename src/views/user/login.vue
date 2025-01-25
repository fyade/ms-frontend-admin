<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from "@/store/module/user.ts";
import { useSysStore } from "@/store/module/sys.ts";
import { APP_NAME } from "~/config/config.ts";
import { allLoginRoles } from "@/utils/base.ts";
import { getVerificationCode } from "@/api/module/main/sysManage/user.ts";

const userStore = useUserStore();
const sysStore = useSysStore();
const form = reactive({
  username: '',
  password: '',
  loginRole: allLoginRoles[0].value,
  verificationCode: '',
  verificationCodeUuid: '',
})

const logining = ref(false)
const onSubmit = async () => {
  if (logining.value) {
    return;
  }
  logining.value = true
  userStore.login(form).then().catch((e) => {
    logining.value = false
    refreshVerificationCode()
  })
}

const vcode = ref('')
const refreshVerificationCode = () => {
  getVerificationCode().then(res => {
    form.verificationCodeUuid = res.uuid
    vcode.value = res.svg
  })
}
refreshVerificationCode()
</script>

<template>
  <div class="main">
    <p class="title">{{ APP_NAME }}</p>
    <el-form
        :model="form"
        label-width="80px"
        label-position="left"
        @keyup.enter="onSubmit"
    >
      <el-form-item label="用户名">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"/>
      </el-form-item>
      <el-form-item label="登录身份">
        <el-select v-model="form.loginRole">
          <el-option v-for="item in allLoginRoles" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="form.verificationCode">
          <template #append>
            <div @click="refreshVerificationCode" style="margin: 0 -20px;min-width: 120px;height: 40px;">
              <div v-html="vcode"></div>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-button style="width: 100%" type="primary" :disabled="logining" :loading="logining" @click="onSubmit">登录</el-button>
    </el-form>
  </div>

  <div class="bottom-text">
    <div class="grey">
      <p>前端版本：{{ sysStore.version.qd }}</p>
      <p>后端版本：{{ sysStore.version.hd }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  > .title {
    text-align: center;
    font-size: 24px;
    line-height: 2;
    margin-bottom: 24px;
  }

  position: fixed;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 500px;
  transform: translate(-50%, -50%);
  //background: #ffffff;
}

.bottom-text {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  .grey {
    color: gray;
  }

  > * {
    display: flex;
    gap: 24px;
  }
}
</style>
