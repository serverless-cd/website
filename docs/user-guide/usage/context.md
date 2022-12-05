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

| 属性                    | 说明                                             | 类型                                                 |
| ----------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| steps.<step_id>.name    | step 的显示名称, step_name 在 task 中唯一        | string                                               |
| steps.<step_id>.status  | step 的运行状态                                  | [IStatus](../../dev-guide/toolkit/engine.md#istatus) |
| steps.<step_id>.outputs | step 的输出信息                                  | object                                               |
| steps.<step_id>.error   | step 的`status`为`failure`时候，当前字段不为空。 | Error                                                |

## env

> 注意： 对于 env，[core 包](../../dev-guide/toolkit/core.md)提供了 parseSpec 方法去解析 step 数据以及 env

```yaml
env:
  name: serverless-cd
steps:
  # output: serverless-cd
  - run: echo 'Hi ${{ env.name }}'
  # output: Tony
  - run: echo 'Hi ${{ env.name }}'
    env:
      name: Tony
```

经过 parseSpec 处理后得到的数据

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

## git 和 secrets

> 注意： 对于 git 和 secrets，在使用 engine 的时候是需要提前注入的。

```ts
import Engine from "@serverless-cd/engine";
import path from "path";
const logPrefix = path.join(__dirname, "logs");

(async () => {
  const steps = [{ run: "node -v" }, { run: "echo 'hello world'" }];
  const engine = new Engine({
    steps,
    logConfig: { logPrefix },
    inputs: {
      // 注入git信息
      git: {
        provider: "github", // 托管平台，github、gitee、gitlab、codeup等
        clone_url: "xx", // 仓库的url地址
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
  await engine.start();
})();
```

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
