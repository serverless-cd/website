---
title: 缓存插件
---

# 缓存插件

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
| region      | 阿里云地域，比如：cn-hongkong                   | string      | 否   |    默认使用流水线运行的地区     |
| ossConfig      | 阿里云Bucket配置，用于存储缓存文件                 | [ossConfig](#ossConfig)      | 否   |    -     |
| credentials      | 阿里云密钥配置，用于上传下载缓存文件                | [credentials](#credentials)      | 否   |  如果没有配置从应用关联的密钥获取，获取不到会异常     |


### ossConfig

| 参数     | 说明                                                                                         | 类型                                | 必填 | 默认值   |
| -------- | -------------------------------------------------------------------------------------------- | ----------------------------------- | ---- | -------- |
| bucket      | 阿里云OSS的Bucket名称，需要 region 配置下                 | string      | 否   |    如果为空则使用此规则 `serverless-cd-${region}-cache-${accuountId}`尝试创建     |
| internal      | 是否走内网               | boolean      | 否   |    如果和流水线运行的地区一致则为 `true`, 否则默认为 `false`      |

### credentials

| 参数     | 说明                                                                                         | 类型                                | 必填 | 默认值   |
| -------- | -------------------------------------------------------------------------------------------- | ----------------------------------- | ---- | -------- |
| accessKeyID      | 阿里云密钥 AK          | string      | 是   |    -     |
| accessKeySecret      | 阿里云密钥 SK       | string      | 是   |    -     |
| securityToken      | -               | string      | 否   |    false      |

## 实现逻辑

如果插件入参没有填写buckct，则首先需要确保 bucket 存在，每次运行时都会**尝试直接创建**bucket。

验证缓存是否命中，是根据 `oss://${bucket}/${key}` 的远端文件数量，如果文件数量大于0，则认为命中。PS：缓存如何失效，目前还没有支持，用户可以手动配置 oss 的生命周期来实现失效。

如果命中则将文件远端下载到指定目录，结束后不回重新上传文件；如果没有命中则跳过文件下载，结束后会将指定目录的文件上传到远端。

## 权限

AliyunOSSFullAccess


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

如果此时需要使用缓存，写法如下：

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

[Nodejs 最佳实践](https://github.com/serverless-cd-demo/serverless-devs-deploy)
