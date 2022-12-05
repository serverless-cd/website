---
sidebar_position: 1
title: 上下文
---

# 上下文(context)

> serverless-cd 执行过程中的全局上下文，可以在 yaml 任何地方进行引用

## task 上下文

| 属性    | 说明                   | 类型                   |
| ------- | ---------------------- | ---------------------- |
| steps   | 当前 task 作业中的信息 | [Steps](#steps-上下文) |
| env     | 环境变量               | object                 |
| git     | git 相关信息           | object                 |
| secrets | secrets 相关信息       | object                 |

## steps 上下文

| 属性                    | 说明                                             | 类型                                               |
| ----------------------- | ------------------------------------------------ | -------------------------------------------------- |
| steps.<step_id>.name    | step 的显示名称, step_name 在 task 中唯一        | string                                             |
| steps.<step_id>.status  | step 的运行状态                                  | [Status](../../dev-guide/toolkit/engine.md#status) |
| steps.<step_id>.outputs | step 的输出信息                                  | object                                             |
| steps.<step_id>.error   | step 的`status`为`failure`时候，当前字段不为空。 | Error                                              |

## env

> 注意：[core 包](../../dev-guide/toolkit/core.md)提供了 [parseSpec](../../dev-guide//toolkit//core.md#parsespec) 方法去解析 steps 数据以及 env 逻辑处理

### yaml 示例

```yaml
env:
  name: serverless-cd
steps:
  - run: echo 'Hi ${{ env.name }}'
  - run: echo 'Hi ${{ env.name }}'
    env:
      name: Tony
```

### [parseSpec](../../dev-guide//toolkit//core.md#parsespec) 得到的数据

```json
{
  "steps": [
    {
      "run": "echo 'Hi ${{ env.name }}'",
      "env": {
        "name": "serverless-cd"
      }
    },
    {
      "run": "echo 'Hi ${{ env.name }}'",
      "env": {
        "name": "Tony"
      }
    }
  ]
}
```

### engine 执行代码示例

```ts
import Engine from "@serverless-cd/engine";
import path from "path";
const logPrefix = path.join(__dirname, "logs");

(async () => {
  const steps = [
    {
      run: "echo 'Hi ${{ env.name }}'",
      env: {
        name: "serverless-cd",
      },
    },
    {
      run: "echo 'Hi ${{ env.name }}'",
      env: {
        name: "Tony",
      },
    },
  ];
  const engine = new Engine({
    steps,
    logConfig: { logPrefix },
  });
  const context = await engine.start();
  console.log(`context: ${JSON.stringify(context, null, 2)}`);
})();
```

### engine 输出

```txt
Info: @serverless-cd/engine: 0.0.11, darwin-x64, node-v16.16.0
'Hi serverless-cd'

'Hi Tony'

Cleaning up task
context: {
  "status": "success",
  "completed": true,
  "cwd": "/Users/shihuali/workspace/a",
  "steps": [
    {
      "name": "Set up task",
      "status": "success",
      "process_time": 0.01,
      "stepCount": "0"
    },
    {
      "run": "echo 'Hi {{ env.name }}'",
      "env": {
        "name": "serverless-cd"
      },
      "stepCount": "1",
      "status": "success",
      "name": "Run echo 'Hi {{ env.name }}'",
      "outputs": {},
      "process_time": 0.02
    },
    {
      "run": "echo 'Hi {{ env.name }}'",
      "env": {
        "name": "Tony"
      },
      "stepCount": "2",
      "status": "success",
      "name": "Run echo 'Hi {{ env.name }}'",
      "outputs": {},
      "process_time": 0.01
    }
  ],
  "stepCount": "2",
  "env": {
    "name": "Tony"
  }
}
```

## git 和 secrets

> 注意： 对于 git 和 secrets，在使用 engine 的时候是需要提前注入的

### yaml 示例

```yaml
steps:
  - run: echo ${{ git.clone_url }}
  - run: echo "push"
    if: ${{ git.event_name === 'push' }}
  - run: echo ${{ secrets.AccountID }}
  - run: echo ${{ secrets.AccessKeyID }}
  - run: echo ${{ secrets.AccessKeySecret }}
```

### [parseSpec](../../dev-guide//toolkit//core.md#parsespec) 得到的数据

```json
{
  "steps": [
    {
      "run": "echo ${{ git.clone_url }}",
      "env": {}
    },
    {
      "run": "echo \"push\"",
      "if": "${{ git.event_name === 'push' }}",
      "env": {}
    },
    {
      "run": "echo ${{ secrets.AccountID }}",
      "env": {}
    },
    {
      "run": "echo ${{ secrets.AccessKeyID }}",
      "env": {}
    },
    {
      "run": "echo ${{ secrets.AccessKeySecret }}",
      "env": {}
    }
  ]
}
```

### engine 执行代码示例

```ts
import Engine from "@serverless-cd/engine";
import path from "path";
const logPrefix = path.join(__dirname, "logs");

(async () => {
  const steps = [
    {
      run: "echo ${{ git.clone_url }}",
      env: {},
    },
    {
      run: 'echo "push"',
      if: "${{ git.event_name === 'push' }}",
      env: {},
    },
    {
      run: "echo ${{ secrets.AccountID }}",
      env: {},
    },
    {
      run: "echo ${{ secrets.AccessKeyID }}",
      env: {},
    },
    {
      run: "echo ${{ secrets.AccessKeySecret }}",
      env: {},
    },
  ];
  const engine = new Engine({
    steps,
    logConfig: { logPrefix },
    inputs: {
      // 注入git信息
      git: {
        provider: "github", // 托管平台，github、gitee、gitlab、codeup等
        clone_url: "https://github.com/serverless-cd/website", // 仓库的url地址
        ref: "refs/heads/main", // webhook携带的参数ref，分支触发的webkook: refs/heads/main, tag触发的webhook: refs/tags/v0.0.1
        commit: "xxx", // git commit id
        event_name: "push", // 触发的事件名称
      },
      // 注入secrets信息
      secrets: {
        AccountID: "xxx", // 用户的账户ID
        AccessKeyID: "xxx", // 访问阿里云 API 的密钥 ak
        AccessKeySecret: "xxx", // 访问阿里云 API 的密钥 sk
      },
    },
  });
  const context = await engine.start();
  console.log(`context: ${JSON.stringify(context, null, 2)}`);
})();
```

### engine 输出

```txt
Info: @serverless-cd/engine: 0.0.11, darwin-x64, node-v16.16.0
https://github.com/serverless-cd/website

"push"

***

***

***

Cleaning up task
context: {
  "status": "success",
  "completed": true,
  "cwd": "/Users/shihuali/workspace/a",
  "inputs": {
    "git": {
      "provider": "github",
      "clone_url": "https://github.com/serverless-cd/website",
      "ref": "refs/heads/main",
      "commit": "xxx",
      "event_name": "push"
    },
    "secrets": {
      "AccountID": "xxx",
      "AccessKeyID": "xxx",
      "AccessKeySecret": "xxx"
    }
  },
  "secrets": {
    "AccountID": "xxx",
    "AccessKeyID": "xxx",
    "AccessKeySecret": "xxx"
  },
  "steps": [
    {
      "name": "Set up task",
      "status": "success",
      "process_time": 0.01,
      "stepCount": "0"
    },
    {
      "run": "echo {{ git.clone_url }}",
      "env": {},
      "stepCount": "1",
      "status": "success",
      "name": "Run echo {{ git.clone_url }}",
      "outputs": {},
      "process_time": 0.03
    },
    {
      "run": "echo \"push\"",
      "if": "true",
      "env": {},
      "stepCount": "2",
      "status": "success",
      "name": "Run echo \"push\"",
      "outputs": {},
      "process_time": 0.01
    },
    {
      "run": "echo {{ secrets.AccountID }}",
      "env": {},
      "stepCount": "3",
      "status": "success",
      "name": "Run echo {{ secrets.AccountID }}",
      "outputs": {},
      "process_time": 0.01
    },
    {
      "run": "echo {{ secrets.AccessKeyID }}",
      "env": {},
      "stepCount": "4",
      "status": "success",
      "name": "Run echo {{ secrets.AccessKeyID }}",
      "outputs": {},
      "process_time": 0.01
    },
    {
      "run": "echo {{ secrets.AccessKeySecret }}",
      "env": {},
      "stepCount": "5",
      "status": "success",
      "name": "Run echo {{ secrets.AccessKeySecret }}",
      "outputs": {},
      "process_time": 0.01
    }
  ],
  "stepCount": "5",
  "env": {}
}
```

> 注意：对于 secrets 相关数据日志输出的时候会进行加密处理。

## 示例 1:根据前面步骤的执行状态来决定当前步骤是否执行

```yaml
steps:
  - run: echo "hello"
    id: xhello
  - run: echo "world"
    if: ${{ steps.xhello.status==="success" }}
    id: xworld
```

## 示例 2:根据前面步骤的输出结果来决定当前步骤是否执行

```yaml
steps:
  - plugin: @serverless-cd/ding-talk
    id: ding
 	- run: echo "hello"
    if: ${{ steps.ding.outputs.success === true }}
```
