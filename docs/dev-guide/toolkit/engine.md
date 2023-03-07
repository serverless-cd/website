---
sidebar_position: 2
title: 执行引擎Engine
---

# 执行引擎(@serverless-cd/engine)

## 安装

```bash
$ npm install @serverless-cd/engine --save
```

## 基本使用

```ts
import Engine from "@serverless-cd/engine";
import path from "path";
const logPrefix = path.join(__dirname, "logs");

(async () => {
  const steps = [{ run: "node -v" }, { run: "echo 'hello world'" }];
  const engine = new Engine({ steps, logConfig: { logPrefix } });
  await engine.start();
})();
```

## 参数解析

```ts
import Engine from "@serverless-cd/engine";
const engine = new Engine(options);
```

| 参数    | 说明            | 类型    | 必填 | 默认值 |
| ------- | --------------- | ------- | ---- | ------ |
| options | new Engine 入参 | Options | 是   |        |

## Options

| 参数      | 说明                                         | 类型                          | 必填 | 默认值        |
| --------- | -------------------------------------------- | ----------------------------- | ---- | ------------- |
| cwd       | 当前工作目录                                 | string                        | 否   | process.cwd() |
| steps     | 执行的步骤                                   | [StepOptions[]](#stepoptions) | 否   |               |
| logConfig | 日志配置                                     | [LogConfig](#logconfig)       | 否   |               |
| events    | 事件配置                                     | [Event](#event)               | 否   |               |
| inputs    | inputs 里的参数可作为魔法变量在 steps 里使用 | Record<string, any>           | 否   |               |

## StepOptions

- RunOptions（shell 类型）

| 参数              | 说明                                         | 类型    | 必填 | 默认值        |
| ----------------- | -------------------------------------------- | ------- | ---- | ------------- |
| name              | 当前步骤名称                                 | string  | 否   | `Run ${run}`  |
| run               | 当前步骤运行的命令                           | string  | 是   |               |
| id                | 当前步骤的 id(唯一标识)                      | string  | 否   |               |
| env               | 当前步骤环境变量                             | object  | 否   |               |
| if                | 如果为 true，则执行当前步骤，否则就不执行    | string  | 否   |               |
| working-directory | 执行当前步骤命令的路径，默认为 process.cwd() | string  | 否   | process.cwd() |
| continue-on-error | 如果为 true，允许步骤执行失败时通过          | boolean | 否   |               |

- PluginOptions（npm 类型）

| 参数              | 说明                                      | 类型    | 必填 | 默认值          |
| ----------------- | ----------------------------------------- | ------- | ---- | --------------- |
| name              | 当前步骤名称                              | string  | 否   | `Run ${plugin}` |
| plugin            | 当前步骤运行的命令                        | string  | 是   |                 |
| id                | 当前步骤的 id(唯一标识)                   | string  | 否   |                 |
| env               | 当前步骤环境变量                          | object  | 否   |                 |
| if                | 如果为 true，则执行当前步骤，否则就不执行 | string  | 否   |                 |
| continue-on-error | 如果为 true，允许步骤执行失败时通过       | boolean | 否   |                 |
| inputs            | plugin 插件接收的参数                     | object  | 否   |                 |

## LogConfig

| 参数         | 说明           | 类型                                          | 必填 | 默认值 |
| ------------ | -------------- | --------------------------------------------- | ---- | ------ |
| logPrefix    | 日志输出的路径 | string                                        | 否   |        |
| logLevel     | 日志等级       | 枚举类型：DEBUG、INFO、WARN、ERROR            | 否   | INFO   |
| ossConfig    | oss 配置       | [OssConfig](#ossconfig)                       | 否   |        |
| customLogger | 自定义 logger  | [Logger](https://github.com/eggjs/egg-logger) | 否   |        |

## OssConfig

| 参数            | 说明                     | 类型   | 必填 | 默认值        |
| --------------- | ------------------------ | ------ | ---- | ------------- |
| accessKeyId     | 访问阿里云 API 的密钥 ak | string | 是   |               |
| accessKeySecret | 访问阿里云 API 的密钥 sk | string | 是   |               |
| bucket          | bucket 名称              | string | 是   |               |
| region          | bucket 的地域            | string | 是   |               |
| codeUri         | 上传到 oss 的本地路径    | string | 否   | process.cwd() |

## Event

| 参数        | 说明                    | 类型                                                                                                                | 必填 | 默认值 |
| ----------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------- | ---- | ------ |
| onInit      | engine 初始化的执行事件 | (context: [Context](#context), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<any>               | 否   |        |
| onPreRun    | 每个步骤执行之前的事件  | (data: object, context:[Context](#context), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<void> | 否   |        |
| onPostRun   | 每个步骤执行之后的事件  | (data: object, context:[Context](#context), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<void> | 否   |        |
| onSuccess   | engine 执行成功的事件   | (context:[Context](#context), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<void>               | 否   |        |
| onFailure   | engine 执行失败的事件   | (context:[Context](#context), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<void>               | 否   |        |
| onCompleted | engine 执行完成的事件   | (context:[Context](#context), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<void>               | 否   |        |
| onCancelled | engine 取消执行的事件   | (context:[Context](#context), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<void>               | 否   |        |

> 注意：onInit 可以返回 steps 数据，优先级 大于 行参里的 steps

> 对于 engine 来说，执行的时候需要 pipeline 文件里的 steps 数据，如果将这部分逻辑写在 engine 之前，对于出错的时候，engine 并不能拿到相关的错误日志，所以对于这种场景可以将这部分逻辑写在 onInit 事件里，engine 也可以收集到相关日志。

```ts
import Engine from "@serverless-cd/engine";
import path from "path";
const logPrefix = path.join(__dirname, "logs");

(async () => {
  const engine = new Engine({
    logConfig: { logPrefix },
    events: {
      onInit: async (context, logger) => {
        logger.info("inlitializing engine");
        const steps = [{ run: "node -v" }, { run: "echo 'hello world'" }];
        return { steps };
      },
    },
  });
  const context = await engine.start();
  console.log(context);
})();
```

## Context

| 属性      | 说明                         | 类型                        |
| --------- | ---------------------------- | --------------------------- |
| cwd       | 记录行参里的 cwd             | string                      |
| stepCount | 记录当前执行的 step          | string                      |
| steps     | 记录步骤执行的相关数据       | [Steps[]](#steps)           |
| env       | 记录执行当前步骤的环境变量   | object                      |
| secrets   | 记录 secrets 数据            | object                      |
| status    | 记录 task 的状态             | 枚举类型：[Status](#status) |
| completed | 记录 task 是否执行完成       | boolean                     |
| inputs    | 记录行参里的 inputs          | object                      |
| error     | 记录步骤执行失败时的错误信息 | Error                       |

## Steps

| 属性                           | 说明                         | 类型   |
| ------------------------------ | ---------------------------- | ------ |
| ...[StepOptions](#stepoptions) |                              |        |
| status                         | 当前步骤的状态               | string |
| error                          | 当前步骤执行失败时的错误信息 | Error  |
| outputs                        | 当前步骤执行成功时的输出结果 | object |
| name                           | 当前步骤的显示名称           | string |
| process_time                   | 当前步骤的执行时间           | number |

## Status

### 步骤执行过程中的状态

| 值                  | 说明                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------ |
| pending             | 等待执行                                                                             |
| running             | 执行中                                                                               |
| success             | 执行成功                                                                             |
| failure             | 执行失败                                                                             |
| skipped             | 忽略执行                                                                             |
| cancelled           | 取消执行                                                                             |
| error-with-continue | 步骤执行失败了，但是当前步骤标记了 continue-on-error 为 true，允许步骤执行失败时通过 |

### 步骤执行完成的状态

| 值        | 说明     |
| --------- | -------- |
| success   | 执行成功 |
| failure   | 执行失败 |
| cancelled | 取消执行 |

## 启动 engine

engine.start(), 返回值为 Promise<[Context](#context)>

## 取消 engine

engine.cancel()

## 内置函数

### contains

```ts
contains(collection, value, [(fromIndex = 0)]);
```

检查 value(值) 是否在 collection(集合) 中。如果 collection(集合)是一个字符串，那么检查 value（值，子字符串） 是否在字符串中， 否则使用 [SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 做等值比较。如果指定 fromIndex 是负数，那么从 collection(集合) 的结尾开始检索。

#### 参数

- collection (Array|Object|string): 要检索的集合。
- value (\*): 要检索的值。
- [fromIndex=0] (number): 要检索的 索引位置

#### 返回

(boolean): 如果找到 value 返回 true， 否则返回 false。

Eg:

```ts
contains([1, 2, 3], 1);
// => true

contains([1, 2, 3], 1, 2);
// => false

contains("pebbles", "eb");
// => true
```

### startsWith

```ts
startsWith([(string = "")], [target], [(position = 0)]);
```

检查字符串 string 是否以 target 开头。

#### 参数

[string=''] (string): 要检索的字符串。
[target] (string): 要检查的字符串。
[position=0] (number): 检索的位置。

#### 返回

(boolean): 如果 string 以 target，那么返回 true，否则返回 false 。

Eg:

```ts
startsWith("abc", "a");
// => true

startsWith("abc", "b");
// => false

startsWith("abc", "b", 1);
// => true
```

### endsWith

```ts
endsWith([(string = "")], [target], [(position = string.length)]);
```

检查字符串 string 是否以给定的 target 字符串结尾。

#### 参数

[string=''] (string): 要检索的字符串。
[target] (string): 要检索字符。
[position=string.length] (number): 检索的位置。

#### 返回

(boolean): 如果字符串 string 以 target 字符串结尾，那么返回 true，否则返回 false。

Eg:

```ts
endsWith("abc", "c");
// => true

endsWith("abc", "b");
// => false

endsWith("abc", "b", 2);
// => true
```

### toJSON

```ts
toJSON(value);
```

返回一个 JSON，您可以使用此函数调试上下文中提供的信息, 比如：

- env: 当前 step 的 env
- inputs: engine 注入的`inputs`字段
- git: git 相关信息, engine 注入的`inputs.git`字段

> 提示： engine 注入的`inputs`下面的字段，都可以直接使用`toJSON`进行输出，比如 `toJSON(git)`

Eg:

- `toJSON(env)`

```ts
import Engine from "@serverless-cd/engine";
(async () => {
  const engine = new Engine({
    steps: [
      {
        run: "echo ${{toJSON(env)}}",
        env: [{ name: "xiaoming", age: 20 }],
      },
    ],
  });
  await engine.start();
})();
```

输出

```bash
Info: @serverless-cd/engine: 0.0.24, darwin-x64, node-v18.1.0
{
 name: xiaoming,
 age: 20
}

Cleaning up task
```

- `toJSON(git)`

```ts
import Engine from "@serverless-cd/engine";
(async () => {
  const engine = new Engine({
    steps: [
      {
        run: "echo ${{toJSON(git)}}",
      },
    ],
    inputs: {
      git: {
        token: "1234567890123456789",
        provider: "gitee",
        owner: "shihuali",
        cloneUrl: "https://gitee.com/shihuali/checkout.git",
        ref: "refs/heads/test",
      },
    },
  });
  await engine.start();
})();
```

输出

```bash
Info: @serverless-cd/engine: 0.0.24, darwin-x64, node-v18.1.0
{
 token: 123*************789,
 provider: gitee,
 owner: shihuali,
 cloneUrl: https://gitee.com/shihuali/checkout.git,
 ref: refs/heads/test
}

Cleaning up task
```
