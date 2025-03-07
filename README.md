
# !!!注意!!!
本项目现已整合至以下仓库，今后的所有更新与维护工作都将在此新仓库中进行。敬请关注新仓库的最新动态。
- https://github.com/fyade/ms
- https://gitee.com/fyade/ms

## 前言

作为一个 TS 项目，我对这个项目中的编码规范、TS 的使用并不满意，并没有完全把 TS 的优势发挥出来，所以在此给希望或者正在使用本项目的小伙伴说声抱歉，我会尽量抽时间系统性地学习 TS，早日将次项目改的健壮一点！

另外，在 1.0 版本发布之前，可能会经常出现页面大改的情况，以及目前部分页面代码较为混乱，未来我会专门进行优化，再次抱歉！

## 关于

这是一个后台管理系统模板，前端语言为 Vue.js（Vue3），后端语言为 Nest.js。

- 精细化权限控制：采用基于角色的权限控制模型，实现接口级别的权限控制；
- 数据表行级别权限控制（尚未完工）；
- 精细化接口管理：可给特定接口设置 IP 白名单；
- 用户表默认角色部门配置：可为特定用户表设置预设角色与部门（目前需要后端复制粘贴部分代码）；
- 特殊接口授权功能：支持添加按次或按时授权的接口的地址，系统可将接收到的请求转发至对应地址，适用于按次授权或按时授权的第三方服务；
- 多系统管理：在一个平台内即可高效管理多个项目的后台操作；
- 动态路由机制：只加载有权限的页面，提升系统安全性；
- 页面状态保持：使用 KeepAlive 技术，维持页面状态，优化用户体验；
- gzip：使用 gzip 压缩打包后的较大文件，提高加载速度；
- 代码生成：提供基本接口及基本页面的代码生成功能，提升开发效率；
- 消息队列：支持消息队列；
- 定时任务：支持定时任务；
- 通用增删改查及工具函数封装：将通用的增删改查方法到一个 ts 文件中，简化 .vue 文件中的代码，页面上只需传入实体类、表单的变量、表单校验规则、字典数据、请求 api 及可自定义的配置即可；通用工具函数封装至 utils 文件夹，降低代码耦合性；

演示地址：https://demo.ms.yang12138.xyz

演示用户名：yanshi

演示用户密码：123456

版本建议：
- Node 20.12.0

前端开源地址：
- ~~https://github.com/fyade/ms-frontend-admin~~ 请关注新仓库
- ~~https://gitee.com/fyade/ms-frontend-admin~~ 请关注新仓库

后端开源地址：
- ~~https://github.com/fyade/ms-backend~~ 请关注新仓库
- ~~https://gitee.com/fyade/ms-backend~~ 请关注新仓库

## 二开注意事项

- 本项目中未对 DTO、VO、POJO、ENTITY 等做区分，均使用 DTO；

## 运行教程

在 /config 目录下新建 config.ts 文件，随后将 /config/config.txt 内的内容复制进去并根据自身情况做修改。

## 打包教程

以生产环境为例子：在 config.ts 中有一个变量，叫 config，其第一个键为 dev，表示开发环境的配置，接下来你需要加一个键 prod，表示生产环境的配置，然后你需要把 dev 的值复制进去并修改为生产环境的配置。

## 其他注意事项

菜单相关常量：
* mm 表示菜单
* mc 表示组件
* ma 表示接口组
* mb 表示接口

菜单 ip 限制相关常量：
* ip 表示 ip
* ho 表示 host

权限身份类型相关常量：
* ro 表示角色
* de 表示部门
* ug 表示用户组

数据表行(háng)权限管理相关常量：
* ALL 表示全部
* SELF_DEPT 表示本部门
* DEPT_ONE_SON 表示本部门及直属子部门
* DEPT_ALL_SON 表示本部门及全部子部门
* SELF_ROLE 表示本角色
* SELF 表示自己

图标风格：
* 图标大小：16
* 线段粗细：2
* 图标风格：线性
* 描边颜色：#333

## 许可证

注意：本项目允许任何组织和个人进行以学习为目的的使用，不允许任何未经许可的商用。

[GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.txt)

License file name in this project: COPYING

Copyright (c) 2024-present, Fei Yang

## 已获得商用许可的组织和个人

- 无
