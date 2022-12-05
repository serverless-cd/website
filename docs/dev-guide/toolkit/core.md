---
sidebar_position: 1
title: 核心core
---

# 核心 core(@serverless-cd/core)

## 安装

```bash
$ npm install @serverless-cd/core --save
```

## getRef(options)

通过 branch 或者 tag 获取到 ref

| 参数          | 说明                    | 类型                  | 必填 |
| ------------- | ----------------------- | --------------------- | ---- |
| options.type  | 表示分支还是 tag 的 ref | 枚举类型：branch、tag | 是   |
| options.value | 分支或者 tag 的值       | string                | 是   |

```js
const res = getRef({ type: "branch", value: "master" });
console.log(res); // output: refs/heads/master

const res = getRef({ type: "tag", value: "v0.0.1" });
console.log(res); // output: refs/tags/v0.0.1
```

## parseRef(value)

解析 ref 得到 branch 或者 tag 的值

| 参数  | 说明     | 类型   | 必填 |
| ----- | -------- | ------ | ---- |
| value | ref 的值 | string | 是   |

```js
const res = parseRef("refs/heads/master");
console.log(res); // output: { type: 'branch', value: 'master' }

const res = parseRef("refs/tags/v0.0.1");
console.log(res); // output: { type: 'tag', value: 'v0.0.1' }
```
