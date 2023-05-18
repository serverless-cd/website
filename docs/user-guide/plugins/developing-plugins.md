---
title: Engine插件系统开发与设计
sidebar_position: 1
---

## 插件开发

### 入口文件示例

```ts
import { lodash as _, Logger, getInputs, getStepContext, getCredentials } from '@serverless-cd/core'; // core 支持方法: https://github.com/serverless-cd/toolkit/blob/master/packages/core/src/index.ts

// 插件加载时调用此方法
export const run = async (inputs: Record<string, any>, context: Record<string, any>, logger: Logger) => {
  logger.info('start plugin run');
  // 获取 Steps 真实的值
  const newInputs = getInputs(inputs, context) as Record<string, any>;
  // 处理业务
  // ...
  logger.info('Run plugin end');
  return { result: 'xxx' };
};

// 流水线的步骤运行完成之后，会调用此方法
export const postRun = async (inputs: Record<string, any>, context: Record<string, any>, logger: Logger) => {
  logger.info('start plugin postRun');
  // 获取对映 run 数据
  const stepContext = getStepContext(context);
  // 获取 run 返回结果
  const runOutputs = _.get(stepContext, 'run.outputs', {});
  // 处理业务
  // ...
  logger.info('postRun plugin end');
};
```

## Engine 运行插件机制

主要分为两个阶段：加载和运行

### 加载插件

1. Engine 会在 init 阶段扫描 Steps 的配置，检测是否存在插件配置。

2. 检测到插件的配置，会先判断plugin配置的路径格式，根据路径加载到插件暴露的 **run** 方法。

> 目前支持两种方式加载插件
>   1. 通过本地目录
>   2. 通过 npm 的形式，如果是 npm 的形式会先将依赖下载到 `/tmp/cache/plugins` 目录

3. 插件如果暴露 **postRun** 方法，则将此方法追加到 Steps 后面运行。


### 插件运行


Engine 在调用插件方法的时候会传递三个参数：

第一个参数 `inputs` 插件传入的 inputs 内容。**提示：** 此处获取的可能存在一些魔法变量，所以需要使用`getInputs`转译以获取真实的值。

第二个参数 `context` 运行 Engine 时注入的一些参数、Steps 数据等等。

第三个参数 `logger` 处理日志输出，使用此 logger 方法会将日志托管给 Engine 处理。

