import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.scss'
import router from './router'
import { APP_NAME, currentEnv } from "../config/config.ts";
import directives from "@/dicevtive/index.ts";
import { createPinia } from "pinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'

import './loaded/autoUpdate.ts'
import './loaded/singleInputNoEnterSubmit.ts'

document.title = APP_NAME

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(directives)
app.mount('#app')

const env = currentEnv();
console.info(env.VITE_MODE)
