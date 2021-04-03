# react-source-code-learn

## 说明

该仓库用于个人学习前端知识点的代码实践，目前分为两部分

1、react的代码实践，借助该仓库，可以自由运行想要学习的react版本环境，每个版本的react源码会在学习过程中添加相对详细的学习注释，以便快速理解。

2、基础语法的实践，即一些新的语法的使用测试等

## 目录结构

```js
-- react-local // react本地代码 
  -- 15.3.1
  -- 16.1.0
  -- ... // 其他需要测试的版本
-- react-pratices // 一些测试react相关features的业务代码
-- syntax-pratices // 语法的实践代码
-- self-router // 自实现路由
```

## usage

### 安装

```js
npm i
```

### react学习部分的各版本环境command

```js
// 运行react15.3.1环境
npm run dev:15.3.1

// 运行react16.1.0环境
npm run dev:16.1.0
```

### 自定义环境

目前自定义环境需要手动配置

1、在script目录中修改需要使用的版本号

2、运行 npm run add,将react对应版本包放入local-react文件夹

3、创建指定版本的入口文件index-version.js即可

### 各版本下的知识点实践

#### 15.3.1

- setState执行机制

资源目录： 15.3.1/index.js

#### 16.13.1

- 父组件更新，子组件不随之更新的实践方案

资源目录：16.13.1/pages/pure-component
