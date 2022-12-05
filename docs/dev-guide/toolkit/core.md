---
sidebar_position: 1
title: 核心core
---

# 核心 core(@serverless-cd/core)

## 安装

```bash
$ npm install @serverless-cd/core --save
```

## parseSpec

获取 pipeline 文件里的 steps 数据以及 env 逻辑处理

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

### 代码示例

```ts
import core from "@serverless-cd/core";
import path from "path";
const TEMPLATE_YAML = "serverless-pipeline.yaml";

const res = core.parseSpec(path.join(__dirname, TEMPLATE_YAML));
console.log(res);
```

输出

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

> parseSpec(value)

| 参数  | 说明              | 类型   | 必填 | 默认值 |
| ----- | ----------------- | ------ | ---- | ------ |
| value | pipeline 文件路径 | string | 是   |        |

## getRef

通过 branch 或者 tag 获取到 ref

### branch 代码示例

```ts
import core from "@serverless-cd/core";
const res = core.getRef({ type: "branch", value: "main" });
console.log(res);
```

输出

```txt
refs/heads/main
```

### tag 代码示例

```ts
import core from "@serverless-cd/core";
const res = core.getRef({ type: "tag", value: "v0.0.1" });
console.log(res);
```

输出

```txt
refs/tags/v0.0.1
```

> getRef({type: 'branch', value: 'main'})

| 参数  | 说明                    | 类型                  | 必填 | 默认值 |
| ----- | ----------------------- | --------------------- | ---- | ------ |
| type  | 表示分支还是 tag 的 ref | 枚举类型：branch、tag | 是   |        |
| value | 分支或者 tag 的值       | string                | 是   |        |

## parseRef(value)

解析 ref 得到 branch 或者 tag 的值

### ref 为 branch 代码示例

```ts
import core from "@serverless-cd/core";
const res = core.parseRef("refs/heads/main");
console.log(res);
```

输出

```json
{
  "type": "branch",
  "value": "master"
}
```

### ref 为 tag 代码示例

```ts
import core from "@serverless-cd/core";
const res = core.parseRef("refs/tags/v0.0.1");
console.log(res);
```

输出

```json
{
  "type": "tag",
  "value": "v0.0.1"
}
```

> parseRef(value)

| 参数  | 说明     | 类型   | 必填 | 默认值 |
| ----- | -------- | ------ | ---- | ------ |
| value | ref 的值 | string | 是   |        |
