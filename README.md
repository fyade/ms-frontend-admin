## 前言 Forward

作为一个TS项目，我对这个项目中的编码规范、TS的使用并不满意，并没有完全把TS的优势发挥出来，所以在此给希望或者正在使用本项目的小伙伴说声抱歉，我会尽量抽时间系统性地学习TS，早日将次项目改的健壮一点！

另外，在 1.0 版本发布之前，可能会经常出现页面大改的情况，以及目前部分页面代码较为混乱，未来我会专门进行优化，再次抱歉！

## 关于 About

这是一个后台管理系统模板，前端语言为Vue.js（Vue3），后端语言为Nest.js。

- 精细化权限控制：采用基于角色的权限控制模型，实现接口级别的权限控制；
- 多系统管理：在一个平台内即可高效管理多个项目的后台；
- 动态路由机制：只加载有权限的页面，提升系统安全性；
- 页面状态保持：使用KeepAlive技术，维持页面状态，优化用户体验；
- SaaS模块支持：内置简易的SaaS模块，可给特定用户设置特定接口的调用次数限制、调用期限限制；
- gzip：使用gzip压缩打包后的较大文件，提高加载速度；
- 通用增删改查及工具函数封装：将通用的增删改查方法封装到一个ts文件中，简化.vue文件中的代码，页面上只需传入实体类、表单的变量、表单校验规则、字典数据、请求api及可自定义的配置即可；通用工具函数封装至utils文件夹，降低代码耦合性；
- 代码生成：提供基本接口及基本页面的代码生成功能，提高开发效率；

版本建议：
- Node 20.12.0

前端开源地址：
- https://github.com/fyade/ms-frontend-admin
- https://gitee.com/fyade/ms-frontend-admin

后端开源地址：
- https://github.com/fyade/ms-backend
- https://gitee.com/fyade/ms-backend

## 运行教程 How to run

在项目根目录中新建 .env.test 文件，配置项与 .env.dev 一样，用于测试环境；

在项目根目录中新建 .env.prod 文件，配置项与 .env.dev 一样，用于生产环境；

在 /config 目录下新建 config.ts 文件，随后将 /config/config.txt 内的内容复制进去并根据自身情况做修改。

## 注意 NOTICE

菜单相关常量：
* mm表示菜单
* mc表示组件
* ma表示接口组
* mb表示接口

图标风格：
* 图标大小：16
* 线段粗细：2
* 图标风格：线性
* 描边颜色：#333

## 许可证 License

注意：本项目允许任何组织和个人进行以学习为目的的使用，不允许任何未经许可的商用。

[GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.txt)

License file name in this project: COPYING

Copyright (c) 2024-present, Fei Yang

## 已获得商用许可的组织和个人：

- 无
