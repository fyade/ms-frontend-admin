## 使用说明 Description

项目名在 /config/config.ts 中；

在项目根目录中新建 .env.test 文件，配置项与 .env.dev 一样，用于测试环境；

在项目根目录中新建 .env.prod 文件，配置项与 .env.dev 一样，用于生产环境。

在 /config 中新建 authConfig.ts 文件，并写入以下内容：
```typescript
export const SECRET_KEY = '' // 这里输入你的盐
```

## 关于 About

这是一个后台管理系统模板，后端语言为Nest.js，前端语言为Vue.js。

## 注意 NOTICE

图标风格：
* 图标大小：16
* 线段粗细：2
* 图标风格：线性
* 描边颜色：#333

## 许可证 License

[GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.txt)

License file name in this project: COPYING

Copyright (c) 2024-present, Fei Yang
