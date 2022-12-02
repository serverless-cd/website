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

| 参数              | 说明         | 类型                            | 必填 |
| ----------------- | ------------ | ------------------------------- | ---- |
| options.cwd       | 当前工作目录 | string                          | 否   |
| options.steps     | 执行的步骤   | [IStepOptions[]](#istepoptions) | 否   |
| options.logConfig | 日志配置     | [ILogConfig](#ilogconfig)       | 否   |
| options.events    | 事件配置     | [IEvent](#ievent)               | 否   |

## IStepOptions

- IRunOptions（shell 类型）

| 参数              | 说明                                         | 类型                | 必填 |
| ----------------- | -------------------------------------------- | ------------------- | ---- |
| name              | 当前步骤名称                                 | string              | 否   |
| run               | 当前步骤运行的命令                           | string              | 是   |
| id                | 当前步骤的 id(唯一标识)                      | string              | 否   |
| env               | 当前步骤环境变量                             | Record<string, any> | 否   |
| if                | 如果为 true，则执行当前步骤，否则就不执行    | string              | 否   |
| working-directory | 执行当前步骤命令的路径，默认为 process.cwd() | string              | 否   |
| continue-on-error | 如果为 true，允许步骤执行失败时通过          | boolean             | 否   |

- IScriptOptions（[zx](https://github.com/google/zx) 类型）

| 参数              | 说明                                      | 类型                | 必填 |
| ----------------- | ----------------------------------------- | ------------------- | ---- |
| name              | 当前步骤名称                              | string              | 否   |
| script            | 当前步骤运行的命令                        | string              | 是   |
| id                | 当前步骤的 id(唯一标识)                   | string              | 否   |
| env               | 当前步骤环境变量                          | Record<string, any> | 否   |
| if                | 如果为 true，则执行当前步骤，否则就不执行 | string              | 否   |
| continue-on-error | 如果为 true，允许步骤执行失败时通过       | boolean             | 否   |

- IPluginOptions（npm 类型）

| 参数              | 说明                                      | 类型                | 必填 |
| ----------------- | ----------------------------------------- | ------------------- | ---- |
| name              | 当前步骤名称                              | string              | 否   |
| plugin            | 当前步骤运行的命令                        | string              | 是   |
| id                | 当前步骤的 id(唯一标识)                   | string              | 否   |
| env               | 当前步骤环境变量                          | Record<string, any> | 否   |
| if                | 如果为 true，则执行当前步骤，否则就不执行 | string              | 否   |
| continue-on-error | 如果为 true，允许步骤执行失败时通过       | boolean             | 否   |
| inputs            | plugin 插件接收的参数                     | Record<string, any> | 否   |

## ILogConfig

| 参数         | 说明                  | 类型                                          | 必填 |
| ------------ | --------------------- | --------------------------------------------- | ---- |
| logPrefix    | 日志输出的路径        | string                                        | 否   |
| logLevel     | 日志等级， 默认为 NFO | 枚举类型：DEBUG、INFO、WARN、ERROR            | 否   |
| ossConfig    | oss 配置              | [IOssConfig](#iossconfig)                     | 否   |
| customLogger | 自定义 logger         | [Logger](https://github.com/eggjs/egg-logger) | 否   |

## IOssConfig

| 参数            | 说明                                        | 类型   | 必填 |
| --------------- | ------------------------------------------- | ------ | ---- |
| accessKeyId     | 访问阿里云 API 的密钥 ak                    | string | 是   |
| accessKeySecret | 访问阿里云 API 的密钥 sk                    | string | 是   |
| bucket          | bucket 名称                                 | string | 是   |
| region          | bucket 的地域                               | string | 是   |
| codeUri         | 上传到 oss 的本地路径，默认为 process.cwd() | string | 否   |

## IEvent

| 参数        | 说明                    | 类型                                                                                                                                | 必填 |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---- |
| onInit      | engine 初始化的执行事件 | (context: [IContext](#icontext), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<any\>                            | 否   |
| onPreRun    | 每个步骤执行之前的事件  | (data: Record<string, any>, context:[IContext](#icontext), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<void/> | 否   |
| onPostRun   | 每个步骤执行之后的事件  | (data: Record<string, any>, context:[IContext](#icontext), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<void/> | 否   |
| onSuccess   | engine 执行成功的事件   | (context:[IContext](#icontext), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<void\>                            | 否   |
| onFailure   | engine 执行失败的事件   | (context:[IContext](#icontext), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<void\>                            | 否   |
| onCompleted | engine 执行完成的事件   | (context:[IContext](#icontext), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<void\>                            | 否   |
| onCancelled | engine 取消执行的事件   | (context:[IContext](#icontext), logger: [Logger](https://github.com/eggjs/egg-logger)) => Promise<void\>                            | 否   |

## IContext

| 参数      | 说明                         | 类型                          |
| --------- | ---------------------------- | ----------------------------- |
| cwd       | 记录行参里的 cwd             | string                        |
| stepCount | 记录当前执行的 step          | string                        |
| steps     | 记录步骤执行的相关数据       | [ISteps[]](#isteps)           |
| env       | 记录执行当前步骤的环境变量   | Record<string, any>           |
| secrets   | 记录 secrets 数据            | Record<string, any>           |
| status    | 记录 task 的状态             | 枚举类型：[IStatus](#istatus) |
| completed | 记录 task 是否执行完成       | boolean                       |
| inputs    | 记录行参里的 inputs          | Record<string, any>           |
| error     | 记录步骤执行失败时的错误信息 | Error                         |

## ISteps

| 参数                             | 说明                         | 类型                |
| -------------------------------- | ---------------------------- | ------------------- |
| ...[IStepOptions](#istepoptions) |                              |                     |
| status                           | 当前步骤的状态               | string              |
| error                            | 当前步骤执行失败时的错误信息 | Error               |
| outputs                          | 当前步骤执行成功时的输出结果 | Record<string, any> |
| name                             | 当前步骤的显示名称           | string              |
| process_time                     | 当前步骤的执行时间           | number              |

## IStatus

- 步骤执行过程中的状态

| 值                  | 说明                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------ |
| pending             | 等待执行                                                                             |
| running             | 执行中                                                                               |
| success             | 执行成功                                                                             |
| failure             | 执行失败                                                                             |
| skipped             | 忽略执行                                                                             |
| cancelled           | 取消执行                                                                             |
| error-with-continue | 步骤执行失败了，但是当前步骤标记了 continue-on-error 为 true，允许步骤执行失败时通过 |

- 步骤执行完成的状态

| 值        | 说明     |
| --------- | -------- |
| success   | 执行成功 |
| failure   | 执行失败 |
| skipped   | 忽略执行 |
| cancelled | 取消执行 |

## 启动 engine

engine.start(), 返回值为 Promise<[IContext](#icontext)/>

## 取消 engine

engine.cancel()
