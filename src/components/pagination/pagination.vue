<script setup lang="ts">
const props = defineProps({
  pageNum: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});
const emits = defineEmits(['pageChange']);

const handleSizeChange = (val: number) => {
  const obj = {
    pageNum: props.pageNum,
    pageSize: val
  };
  if ((props.pageNum - 1) * val > props.total) {
    obj.pageNum = Math.floor(props.total / props.pageSize)
  }
  emits('pageChange', obj);
};
const handleCurrentChange = (val: number) => {
  const obj = {
    pageNum: val,
    pageSize: props.pageSize
  };
  emits('pageChange', obj);
}
</script>

<template>
  <el-pagination
      class="my-pagination"
      :current-page="props.pageNum"
      :page-size="props.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
</template>

<style scoped>
.my-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>