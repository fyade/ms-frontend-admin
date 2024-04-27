import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.scss'
import { createPinia } from "pinia";
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { APP_NAME } from "../config/config.ts";
import directives from "@/dicevtive";
import 'virtual:svg-icons-register'

const app = createApp(App)
const pinia = createPinia()


app.use(router)
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(directives)
app.mount('#app')

document.title = APP_NAME
