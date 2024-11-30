<script setup lang="ts">
import { onMounted, ref } from "vue";
import { blobToFile } from "@/utils/FileUtils.ts";
import { ElMessage } from "element-plus";
import { fileUploadAvatar } from "@/api/common/fileUpload.ts";

const emits = defineEmits(['uploadSuccess']);

let cSize = 200
let scale = 1
let transformX = 0
let transformY = 0
let offsetX = 0
let offsetY = 0
const isDisabled = ref(false)
// @ts-ignore
const inp = ref<HTMLInputElement>(null)
// @ts-ignore
const c1 = ref<HTMLCanvasElement>(null)
let ctx: CanvasRenderingContext2D | null = null
let img: HTMLImageElement | null = null
let fileName = ''
let imgWidth = 0
let imgHeight = 0

onMounted(() => {
  ctx = c1.value.getContext('2d');
})

const inpClick = () => {
  inp.value.click()
}
const onInpClick = (e: any) => {
  const file: File = e.target.files[0]
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
  if (ctx && img) {
    ctx.reset()
    let obj
    if (scale < 1) {
      scale = 1
      transformX = 0
      transformY = 0
    }
    if (imgWidth < imgHeight) {
      obj = [
        img,
        0,
        0,
        imgHeight,
        imgHeight,
        transformX,
        transformY,
        cSize * scale,
        cSize * scale
      ]
    } else {
      obj = [
        img,
        0,
        0,
        imgWidth,
        imgWidth,
        transformX,
        transformY,
        cSize * scale,
        cSize * scale
      ]
    }
    // @ts-ignore
    ctx.drawImage(...obj)
  }
}
const initCanvas = () => {
  scale = 1
  transformX = 0
  transformY = 0
}
const upload = () => {
  c1.value.toBlob(cb => {
    // @ts-ignore
    const file = blobToFile(cb, fileName, cb.type);
    const fd: FormData = new FormData()
    fd.append('file', file)
    fileUploadAvatar(fd).then(res => {
      emits('uploadSuccess', res)
    })
  })
}

const onCanvasClick = () => {
  inpClick()
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
const onMouseUp = (e: MouseEvent) => {
  if (e.offsetX === offsetX && e.offsetY === offsetY) {
    onCanvasClick()
  }
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('mouseleave', onMouseUp)
}
const onWheel = (e: WheelEvent) => {
  scale -= e.deltaY / 1000
  reDraw()
}
</script>

<template>
  <!--<el-button :disabled="isDisabled" type="primary" :icon="Upload" @click="inpClick">上传文件</el-button>-->
  <input ref="inp" type="file" v-show="false" @change="onInpClick"/>
  <div>
    <canvas class="c1" ref="c1" :width="cSize" :height="cSize" @mousedown="onMouseDown"
            @wheel="onWheel"></canvas>
  </div>
  <el-button :disabled="isDisabled" type="primary" @click="upload">上传</el-button>
</template>

<style scoped lang="scss">
.c1 {
  background-image: linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0),
  linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
}
</style>
