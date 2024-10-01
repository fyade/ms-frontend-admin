<script setup lang="ts">
import { getSelfInfo, updUser } from '@/api/module/main/sysManage/user';
import { reactive } from 'vue';
import { ElMessage } from "element-plus";

const state = reactive({
    id: '',
    nickname: '',
    username: '',
})
const getUserInfo = () => {
    getSelfInfo().then(res => {
        state.id = res.id
        state.nickname = res.nickname
        state.username = res.username
    })
}
getUserInfo()

const onSubmit = () => {
    updUser(state).then(res => {
        if (res) {
            ElMessage.success('用户资料修改成功。')
            getUserInfo()
        }
    })
}
</script>

<template>
    <div>
        <el-form :model="state" label-width="auto" style="max-width: 500px;">
            <el-form-item label="昵称">
                <el-input v-model="state.nickname" />
            </el-form-item>
            <el-form-item label="用户名">
                {{ state.username }}
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped></style>