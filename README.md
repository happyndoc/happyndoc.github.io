<div align="center">

happyndoc

![GitHub package.json version](https://img.shields.io/github/package-json/v/happyndoc/happyndoc.github.io?style=flat-square)
[![GitHub license](https://img.shields.io/github/license/happyndoc/happyndoc.github.io?style=flat-square)](https://github.com/happyndoc/happyndoc.github.io)
</div>


## 介绍

这是 [happynet](happyn.net) 项目的文档，包含服务端的搭建，各个平台客户端的使用，以及所有项目的进展；


## 文档

[在线文档](https://happyndoc.github.io)


### 主题

- [vuepress-template](https://github.com/openHacking/vuepress-template) 一款简洁的文档站模板

### 插件

- [vuepress-plugin-qrocde](https://github.com/openHacking/vuepress-plugin-qrcode) 展示当前网址二维码供移动设备扫描

## 用法

### 第一步

下载 happyndoc 的仓库代码
```sh
git clone https://github.com/happyndoc/happyndoc.github.io
```

### 第二步

安装依赖
```sh
cd happyndoc.github.io
yarn # 或者npm i
```

### 第三步

启动项目，随后即可根据自己的需求修改配置、编写文档内容
```sh
npm run docs:dev
```

### 第四步

打包项目
```sh
npm run docs:build
```
结果会在`docs/.vuepress/`目录下生成一个`dist`文件夹，里面就是打包后的代码
