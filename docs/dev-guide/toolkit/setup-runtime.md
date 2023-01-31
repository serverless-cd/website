---
sidebar_position: 8
title: 支持多runtime
---

# 支持多runtime(@serverless-cd/setup-runtime)

## 安装

```bash
$ npm install @serverless-cd/setup-runtime --save
```

## 示例

```typescript
import Setup from "@serverless-cd/setup-runtime";

const setup = new Setup(
  credentials: {
    accountId: "accountId",
    accessKeyId: "accessKeyId",
    accessKeySecret: "accessKeySecret",
  },
  dest: '/opt',
  region: 'cn-hongkong',
  runtimes: ["nodejs14"],
);

await setup.run();
```

## 参数解析

| 参数        | 说明             | 类型                         | 必填 |   默认值    |
| ----------- | ---------------- | ---------------------------- | ---- | :---------: |
| credentials | 密钥信息配置     | [Credentials](#Credentials)  | 是   |      -      |
| region      | 需要加载的地区   | string                       | 否   | cn-hongkong |
| dest        | 环境包下载路径   | string                       | 否   |    /opt     |
| runtimes    | 需要加载的环境包 | Array<[Runtimes](#Runtimes)> | 否   |    /opt     |

### Credentials

| 参数            | 说明                        | 类型   | 必填 | 默认值 |
| --------------- | --------------------------- | ------ | ---- | :----: |
| accessKeyId     | aliyun 密钥 accessKeyId     | string | 是   |   -    |
| accessKeySecret | aliyun 密钥 accessKeySecret | string | 是   |   -    |
| securityToken   | aliyun 密钥 securityToken   | string | 否   |   -    |
| accountId       | aliyun 主账号 ID            | string | 是   |   -    |

### Runtimes

支持环境包信息，类型 `string`

```typescript
enum RUNTIME {
  PYTHON310 = "python3.10", // Python 3.10.5
  PYTHON39 = "python3.9", // Python 3.9.13
  PYTHON38 = "python3.8", // Python 3.8.13
  PYTHON36 = "python3.6", // Python 3.6.15
  NODEJA17 = "nodejs17", // Node.js 17.9.1
  NODEJA16 = "nodejs16", // Node.js 16.17.0
  NODEJA14 = "nodejs14", // Node.js 14.20.0
  NODEJA12 = "nodejs12", // Node.js 12.22.12
  PHP81 = "php8.1", // PHP 8.1.9
  PHP80 = "php8.0", // PHP 8.0.22
  PHP72 = "php7.2", // PHP 7.2.8
  JAVA11 = "java11", // openjdk 11.0.13
  JAVA17 = "java17", // openjdk 17.0.2
  DOTNET6 = ".net6", // .net6 6.0.5
}
```
