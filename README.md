<h1 align="center">Luckyue</h1>

<div align="center">
  A front-end solution web applications base on Vue.js Antd-Vue Egg.
</div>

## wiki 文档 （施工中）

## dependencies &nbsp; 依赖模块

- [Vue](https://cn.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/zh/)(Vue 官方状态管理工具)
- [Antd-Vue](https://vue.ant.design/)(一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库)
- [Egg](https://eggjs.org/zh-cn/)(为企业级框架和应用而生,本项目中 node 版本须>=10.0)
- [axios](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http 请求模块</span>)
- [echarts](https://github.com/apache/incubator-echarts)(<span style="color: rgb(243,121,52);">百度开源可视化图表工具</span>)
- [animate.css](http://daneden.me/animate)(<span style="color: rgb(243,121,52);">css 动画库</span>)
- [moment](http://momentjs.cn/)(<span style="color: rgb(243,121,52);">时间工具库</span>)
- [lodash](https://www.lodashjs.com/)(<span style="color: rgb(243,121,52);">是一个一致性、模块化、高性能的 JavaScript 实用工具库。</span>)

## function module &nbsp; 功能模块

```bash
- 首页
    - 完整布局
- 导航菜单
    - 顶部导航
    - 左侧菜单
      - 菜单伸缩
- 组件
    - 路由
      - route 权限校验
      - 路由配置渲染route
      - 路由配置渲染菜单
    - 过渡动画
    - 基础页面布局
    - loading遮罩模块
    - i18n 国际化
      - 支持多语言翻译
    - 简易封装了echarts
- UI组件
    - 表单页
    - 列表页
    - 详情页
    - 结果页
    - 异常页
    - 个人页
- 图表
    - echarts图表
- 多分辨率 & 移动端适配
- 支持TypeScript
```

## 如何启动

1. 下载或克隆项目源码

```bash
git clone http://git.luckincoffee.com/front/luckyue.git
cd luckyue
```

2. yarn 或者 npm 安装相关包文件

```bash
yarn install  Or  npm install
```

3. 启动项目

- 客户端启动

```bash
yarn start-client  Or  npm run start-client
```

- 服务端启动

```bash
yarn start-server  Or  npm run start-server
```

4. 启动完成后打开浏览器访问 [http://localhost:9527](http://localhost:9527)，如果需要更改启动端口，可在 .env 文件中配置。

5. 打包项目

```bash
yarn build or npm run build
```
