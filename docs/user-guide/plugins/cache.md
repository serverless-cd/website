---
title: 缓存组件
---


# 缓存组件

## 快速体验

```yaml
- plugin: "@serverless-cd/cache"
  id: string # 用于其他任务的条件引用, eg: stepId1
  inputs: # 用于其他任务的条件引用
    key: string # 判断缓存命中的 Hash 值。eg: ${{hashFile('./src/package.json')}}
    path: string # 缓存的目录. eg: /root/.npm
    # 缓存存放的地址配置
    region: string # 阿里云地域 eg: cn-hongkong
    ossConfig: # 阿里云Bucket配置，用于存储缓存文件
      bucket: string # 阿里云OSS的Bucket名称，需要 region 配置下
      internal: boolean # 是否走内网，默认为 false
    credentials: # 阿里云密钥配置，用于上传下载缓存文件
      accessKeyID: string # 阿里云密钥 AK
      accessKeySecret: string # 阿里云密钥 SK
      securityToken: string # 选填
```

## 字段解析

| 参数     | 说明                                                                                         | 类型                                | 必填 | 默认值   |
| -------- | -------------------------------------------------------------------------------------------- | ----------------------------------- | ---- | -------- |
| key      | 用于其他任务的条件引用，比如：stepId1                     | string      | 是   |    -     |
| path      | 缓存的目录，比如：/root/.npm                   | string      | 是   |    -     |·
| region      | 阿里云地域，比如：cn-hongkong                   | string      | 是   |    -     |
| ossConfig      | 阿里云Bucket配置，用于存储缓存文件                 | [ossConfig](#ossConfig)      | 是   |    -     |
| credentials      | 阿里云密钥配置，用于上传下载缓存文件                | [credentials](#credentials)      | 是   |    -     |


### ossConfig

| 参数     | 说明                                                                                         | 类型                                | 必填 | 默认值   |
| -------- | -------------------------------------------------------------------------------------------- | ----------------------------------- | ---- | -------- |
| bucket      | 阿里云OSS的Bucket名称，需要 region 配置下                 | string      | 是   |    -     |
| internal      | 是否走内网               | boolean      | 否   |    false      |

### credentials

| 参数     | 说明                                                                                         | 类型                                | 必填 | 默认值   |
| -------- | -------------------------------------------------------------------------------------------- | ----------------------------------- | ---- | -------- |
| accessKeyID      | 阿里云密钥 AK          | string      | 是   |    -     |
| accessKeySecret      | 阿里云密钥 SK       | string      | 是   |    -     |
| securityToken      | -               | string      | 否   |    false      |


## 实践：Nodejs

比如需要在流水线跑 Nodejs 项目，package.json 内容大致如下：
```json
{
  "name": "@wssgryx/npm-test",
  "version": "0.0.1",
  "main": "index.js",
  "author": "@wssgryx",
  "license": "ISC",
  "dependencies": {
    "npm-registry-fetch": "^14.0.2",
    "urlencode": "^1.1.0"
  }
}
```

如果此时需要使用缓存，使用缓存有两种方式。

1. 存在缓存直接放到代码目录中，不用在此执行 npm install 安装依赖，写法如下：

```yaml
name: "On Push masters"

steps:
  - plugin: "@serverless-cd/cache"
    id: my-cache
    inputs:
      key: ${{hashFile('./package.json')}}
      path: ./node_modules
      region: cn-hongkong
      ossConfig:
        bucket: xxxx-cn-hongkong-serverless-cd
      credentials:
        accessKeyID: ${{cloudSecrets.AccessKeyID}}
        accessKeySecret: ${{cloudSecrets.AccessKeySecret}}
  - run: npm install --production
    if: ${{ steps['my-cache'].outputs['cache-hit'] != 'true' }} # 判断是否有命中缓存，没有命中缓存将不在运行此步骤
```

2. 使用 npm 缓存目录

> 提示：可以通过运行 `npm config get cache` 命令查找 npm 缓存地址

```yaml
name: "On Push masters"

steps:
  - plugin: "@serverless-cd/cache"
    id: my-cache
    inputs:
      key: ${{hashFile('./package.json')}}
      path: /root/.npm # 由于流水线运行在函数计算中，而函数计算配置的 npm 缓存是 /root/.npm
      region: cn-hongkong
      ossConfig:
        bucket: xxxx-cn-hongkong-serverless-cd
      credentials:
        accessKeyID: ${{cloudSecrets.AccessKeyID}}
        accessKeySecret: ${{cloudSecrets.AccessKeySecret}}
  - run: npm install --production
```