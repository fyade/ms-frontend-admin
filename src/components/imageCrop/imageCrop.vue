<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";
import { blobToFile, selectFiles } from "@/utils/FileUtils.ts";
import { ElMessage } from "element-plus";
import { fileUploadAvatar } from "@/api/common/fileUpload.ts";

const emits = defineEmits(['uploadSuccess']);

let cSize = 200 // 画布大小
let scale = 1 // 画布缩放
let transformX = cSize / 2 // 图片中心的x坐标
let transformY = cSize / 2 // 图片y坐标
let offsetX = 0 // 鼠标当前坐标
let offsetY = 0 // 鼠标当前坐标
const isDisabled = ref(false)
const c1 = useTemplateRef<HTMLCanvasElement>('c1')
let ctx: CanvasRenderingContext2D | null | void = null
let img: HTMLImageElement | null = null
let fileName = ''
let imgWidth = 0
let imgHeight = 0

onMounted(() => {
  ctx = c1.value?.getContext('2d');
})

const selectedFiles: File[] = []
const onInpClick = () => {
  const file: File = selectedFiles[0]
  if (['png', 'jpg', 'jpeg'].indexOf(file.name.substring(file.name.lastIndexOf('.') + 1)) === -1) {
    return ElMessage.warning('只允许上传图片。')
  }
  if (file.size > 1024 * 1024 * 2) {
    return ElMessage.warning('文件大小超出限制。')
  }
  fileName = file.name
  draw(file)
}
const draw = (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onload = () => {
    img = new Image();
    img.src = reader.result as string
    img.onload = () => {
      imgWidth = img!.width
      imgHeight = img!.height
      initCanvas()
      reDraw()
    }
  }
}
const reDraw = () => {
  if (!(ctx && img)) {
    return
  }
  ctx.reset()
  ctx.drawImage(
      img,
      0,
      0,
      imgWidth,
      imgHeight,
      transformX - (imgWidth / 2) * scale,
      transformY - (imgHeight / 2) * scale,
      imgWidth * scale,
      imgHeight * scale
  )
}
const initCanvas = () => {
  scale = Math.max(cSize / imgWidth, cSize / imgHeight)
  transformX = cSize / 2
  transformY = cSize / 2
}
const upload = () => {
  c1.value?.toBlob(cb => {
    if (!cb) {
      return
    }
    // const file = blobToFile(cb, fileName, cb.type);
    // const fd: FormData = new FormData()
    // fd.append('file', file)
    fileUploadAvatar(cb, fileName).then(res => {
      emits('uploadSuccess', res)
    })
  })
}

const onCanvasClick = async () => {
  try {
    selectedFiles.splice(0)
    selectFiles().then(res => {
      selectedFiles.push(...res)
      onInpClick()
    })
  } catch (e) {
  }
}
const onMouseDown = (e: MouseEvent) => {
  offsetX = e.offsetX
  offsetY = e.offsetY
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
  document.addEventListener('mouseleave', onMouseUp)
}
const onMouseMove = (e: MouseEvent) => {
  transformX += e.movementX
  transformY += e.movementY
  reDraw()
}
const onMouseUp = async (e: MouseEvent) => {
  if (e.offsetX === offsetX && e.offsetY === offsetY) {
    await onCanvasClick()
  }
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('mouseleave', onMouseUp)
}
const onWheel = (e: WheelEvent) => {
  offsetX = e.offsetX
  offsetY = e.offsetY
  scale = Math.max(scale - e.deltaY / 2000, .05)
  reDraw()
}
const setCenter = () => {
  initCanvas()
  reDraw()
}
</script>

<template>
  <!--<el-button :disabled="isDisabled" type="primary" :icon="Upload" @click="inpClick">上传文件</el-button>-->
  <div>
    <canvas
        class="c1"
        ref="c1"
        :width="cSize"
        :height="cSize"
        @mousedown="onMouseDown"
        @wheel="onWheel"
    ></canvas>
  </div>
  <el-button :disabled="isDisabled" type="primary" @click="setCenter">居中</el-button>
  <el-button :disabled="isDisabled" type="primary" @click="upload">保存</el-button>
</template>

<style scoped>
.c1 {
  background-image: linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0),
  linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
}
</style>
