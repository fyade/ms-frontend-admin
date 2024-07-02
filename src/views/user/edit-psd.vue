<script setup lang="ts">
import { updPsd } from '@/api/module/sysManage/user';
import { reactive } from 'vue';
import { ElMessage } from "element-plus";

const state = reactive({
    oldp: '',
    newp1: '',
    newp2: ''
})

const onSubmit = () => {
    updPsd(state).then(res => {
        if (res) {
            ElMessage.success('密码修改成功。')
        }
    })
}
</script>

<template>
    <el-form :model="state" label-width="auto" style="max-width: 500px;">
        <el-form-item label="旧密码">
            <el-input v-model="state.oldp" />
        </el-form-item>
        <el-form-item label="新密码">
            <el-input v-model="state.newp1" />
        </el-form-item>
        <el-form-item label="确认新密码">
            <el-input v-model="state.newp2" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>