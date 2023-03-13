---
sidebar_position: 4
title: checkout
---

# 下载仓库代码(@serverless-cd/checkout)

## 快速体验

```yaml
- plugin: "@serverless-cd/checkout"
  inputs:
    # 通过分支或者tag来下载仓库，比如：refs/heads/main 或者 refs/tags/v0.0.1
    ref: ""

    # 通过commit id来下载仓库
    commit: ""

    # 用于下载仓库的个人访问令牌 比如：github的个人访问令牌（https://github.com/settings/tokens）。
    token: ""

    # 支持下载的代码托管平台(github、gitee、gitlab、codeup)
    provider: ""

    # 仓库的克隆地址，比如：https://gitee.com/shihuali/checkout.git
    cloneUrl: ""

    # 仓库owner，比如cloneUrl为https://gitee.com/shihuali/checkout.git时，owner应为 shihuali
    owner: ""

    # 代码下载目录
    execDir: ""
```

## 字段解析

| 参数     | 说明                                                                                         | 类型                                | 必填 | 默认值   |
| -------- | -------------------------------------------------------------------------------------------- | ----------------------------------- | ---- | -------- |
| ref      | 通过分支或者 tag 来下载仓库，比如：refs/heads/main 或者 refs/tags/v0.0.1                     | string                              | 否   |          |
| commit   | 通过 commit id 来下载仓库                                                                    | string                              | 否   |          |
| execDir  | 代码下载目录                                                                                 | string                              | 否   | 临时目录 |
| token    | 用于下载仓库的个人访问令牌 比如：[github 的个人访问令牌](https://github.com/settings/tokens) | string                              | 否   |          |
| provider | 支持下载的代码托管平台                                                                       | enum：github、gitee、gitlab、codeup | 否   |          |
| cloneUrl | 仓库的克隆地址                                                                               | string                              | 否   |          |
| owner    | 仓库 owner                                                                                   | string                              | 否   |          |

## 注意 Engine 调用方式

对于 checkout 插件而言，调用 engine 的时候需要注入 checkout 插件所需要的参数

```ts
const engine = new Engine({
  cwd: __dirname,
  steps,
  logConfig: { logPrefix },
  inputs: {
    git: {
      token: "xxx", // 必填
      provider: "gitee", // 必填
      owner: "shihuali", // 必填
      cloneUrl: "https://gitee.com/shihuali/checkout.git", // 必填
      execDir: "./checkout", // 选填
      ref: "refs/heads/main", // 选填
      commit: "xx", // 选填
    },
  },
});
await engine.start();
```

## 作为普通的 NPM Module 使用
