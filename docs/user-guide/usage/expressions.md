---
sidebar_position: 2
title: 表达式
---

# 表达式

表达式可以设置环境变量和访问上下文。 表达式可以是文字值、上下文引用或函数的任意组合。 您可以使用运算符组合文字、上下文引用和函数。请参考 [上下文 context](./context.md)

表达式`${{ <expression> }}`通常与工作流文件中的条件 if 关键字一起使用，以确定是否应运行步骤。 如果 if 条件为 true，该步骤将运行。

## if 条件中示例表达式

```yaml
steps:
  - uses: @serverless-cd/checkout@v2
    if: ${{ <expression> }}
```

## 设置环境变量的示例

```yaml
env:
  MY_ENV_VAR: ${{ <expression> }}
```

## 内置函数

### contains

`contains(search, item)` 如果 search 包含 item，则返回 true。 如果 search 是一个数组，item 是数组中的一个元素，此函数将返回 true

#### 代码示例

```ts
import Engine from "@serverless-cd/engine";
import path from "path";
const logPrefix = path.join(__dirname, "logs");

(async () => {
  const steps = [
    { run: 'echo "hello"', id: "xhello" },
    {
      run: 'echo "world"',
      if: "${{ contains(github.ref, 'engine')}}",
      id: "contains",
    },
  ];
  const engine = new Engine({
    steps,
    logConfig: { logPrefix },
    inputs: {
      github: {
        ref: "refs/heads/engine",
      },
    },
  });
  const context = await engine.start();
  console.log(`context: ${JSON.stringify(context, null, 2)}`);
})();
```

#### 输出

```txt
Info: @serverless-cd/engine: 0.0.11, darwin-x64, node-v16.16.0
"hello"

"world"

Cleaning up task
context: {
  "status": "success",
  "completed": true,
  "cwd": "/Users/shihuali/workspace/a",
  "inputs": {
    "github": {
      "ref": "refs/heads/engine"
    }
  },
  "steps": [
    {
      "name": "Set up task",
      "status": "success",
      "process_time": 0.01,
      "stepCount": "0"
    },
    {
      "run": "echo \"hello\"",
      "id": "xhello",
      "stepCount": "1",
      "status": "success",
      "name": "Run echo \"hello\"",
      "outputs": {},
      "process_time": 0.03
    },
    {
      "run": "echo \"world\"",
      "if": "true",
      "id": "contains",
      "stepCount": "2",
      "status": "success",
      "name": "Run echo \"world\"",
      "outputs": {},
      "process_time": 0.02
    }
  ],
  "stepCount": "2"
}
```

### startsWith

`startsWith(searchString, searchValue)` 如果 searchString 以 searchValue 开头，则返回 true。

#### 代码示例

```ts
import Engine from "@serverless-cd/engine";
import path from "path";
const logPrefix = path.join(__dirname, "logs");

(async () => {
  const steps = [
    { run: 'echo "hello"', id: "xhello" },
    {
      run: 'echo "world"',
      if: "${{ startsWith(github.ref, 'refs/heads')}}",
      id: "startsWith",
    },
  ];
  const engine = new Engine({
    steps,
    logConfig: { logPrefix },
    inputs: {
      github: {
        ref: "refs/heads/engine",
      },
    },
  });
  const context = await engine.start();
  console.log(`context: ${JSON.stringify(context, null, 2)}`);
})();
```

#### 输出

```txt
Info: @serverless-cd/engine: 0.0.11, darwin-x64, node-v16.16.0
"hello"

"world"

Cleaning up task
context: {
  "status": "success",
  "completed": true,
  "cwd": "/Users/shihuali/workspace/a",
  "inputs": {
    "github": {
      "ref": "refs/heads/engine"
    }
  },
  "steps": [
    {
      "name": "Set up task",
      "status": "success",
      "process_time": 0.01,
      "stepCount": "0"
    },
    {
      "run": "echo \"hello\"",
      "id": "xhello",
      "stepCount": "1",
      "status": "success",
      "name": "Run echo \"hello\"",
      "outputs": {},
      "process_time": 0.02
    },
    {
      "run": "echo \"world\"",
      "if": "true",
      "id": "startsWith",
      "stepCount": "2",
      "status": "success",
      "name": "Run echo \"world\"",
      "outputs": {},
      "process_time": 0.02
    }
  ],
  "stepCount": "2"
}

```

### endsWith

`endsWith(searchString, searchValue)` 如果 searchString 以 searchValue 结尾，则返回 true。

#### 代码示例

```ts
import Engine from "@serverless-cd/engine";
import path from "path";
const logPrefix = path.join(__dirname, "logs");

(async () => {
  const steps = [
    { run: 'echo "hello"', id: "xhello" },
    {
      run: 'echo "world"',
      if: "${{ endsWith(github.ref, 'engine')}}",
      id: "endsWith",
    },
  ];
  const engine = new Engine({
    steps,
    logConfig: { logPrefix },
    inputs: {
      github: {
        ref: "refs/heads/engine",
      },
    },
  });
  const context = await engine.start();
  console.log(`context: ${JSON.stringify(context, null, 2)}`);
})();
```

#### 输出

```txt
Info: @serverless-cd/engine: 0.0.11, darwin-x64, node-v16.16.0
"hello"

"world"

Cleaning up task
context: {
  "status": "success",
  "completed": true,
  "cwd": "/Users/shihuali/workspace/a",
  "inputs": {
    "github": {
      "ref": "refs/heads/engine"
    }
  },
  "steps": [
    {
      "name": "Set up task",
      "status": "success",
      "process_time": 0.01,
      "stepCount": "0"
    },
    {
      "run": "echo \"hello\"",
      "id": "xhello",
      "stepCount": "1",
      "status": "success",
      "name": "Run echo \"hello\"",
      "outputs": {},
      "process_time": 0.02
    },
    {
      "run": "echo \"world\"",
      "if": "true",
      "id": "endsWith",
      "stepCount": "2",
      "status": "success",
      "name": "Run echo \"world\"",
      "outputs": {},
      "process_time": 0.01
    }
  ],
  "stepCount": "2"
}
```

## 状态检查函数

### success

当前面的步骤没有失败或取消时返回 `true`

```
steps:
  ...
  - name: The job has succeeded
    if: ${{ success() }}
```

### always

该步骤总是执行，并返回 true，即使取消也一样。 作业或步骤在重大故障阻止任务运行时不会运行。 例如，如果获取来源失败。

```
if: ${{ always() }}
```

### cancelled

在工作流程取消时返回 true。

```
if: ${{ cancelled() }}
```

### failure

在作业的任何之前一步失败时返回 true。 如果您有相依作业链，failure() 在任何上层节点作业失败时返回 true

```
steps:
  ...
  - name: The job has failed
    if: ${{ failure() }}
```

#### 有条件的失败

您可以为失败后运行的步骤添加额外的条件，但需要包含 failure()

yaml 示例

```
steps:
  ...
 - name: Failing step
   id: demo
   run: npm error
 - name: The demo step has failed
   run: node -v
   if: ${{ failure() && steps.demo.status === 'failure' }}
```

engine 执行代码示例

```ts
import Engine from "@serverless-cd/engine";
import path from "path";
const logPrefix = path.join(__dirname, "logs");

(async () => {
  const steps = [
    {
      name: "Failing step",
      id: "demo",
      run: "npm error",
    },
    {
      name: "The demo step has failed",
      run: "node -v",
      if: "${{ failure() && steps.demo.status === 'failure' }}",
    },
  ];
  const engine = new Engine({ steps, logConfig: { logPrefix } });
  const context = await engine.start();
  console.log(`context: ${JSON.stringify(context, null, 2)}`);
})();
```

输出

```txt
Info: @serverless-cd/engine: 0.0.11, darwin-x64, node-v16.16.0
Unknown command: "error"


To see a list of supported npm commands, run:
  npm help

nodejs.Error:
    at ChildProcess.<anonymous> (/Users/shihuali/workspace/a/engine/node_modules/@serverless-cd/engine/src/index.ts:517:20)
    at ChildProcess.emit (node:events:539:35)
    at ChildProcess.emit (node:domain:475:12)
    at Process.ChildProcess._handle.onexit (node:internal/child_process:291:12)
    at Process.callbackTrampoline (node:internal/async_hooks:130:17)

pid: 43036
hostname: B-C3L4ML85-0055.local

v16.16.0

Cleaning up task
context: {
  "status": "failure",
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
      "name": "Failing step",
      "id": "demo",
      "run": "npm error",
      "stepCount": "1",
      "status": "failure",
      "error": {},
      "process_time": 0.68
    },
    {
      "name": "The demo step has failed",
      "run": "node -v",
      "if": "true",
      "stepCount": "2",
      "status": "success",
      "outputs": {},
      "process_time": 0.02
    }
  ],
  "stepCount": "2",
  "error": {}
}
```

#### continue-on-error

忽略某一步骤的执行错误，不影响执行步骤的全局状态

```yaml
steps:
  ...
  - name: Failing step
    id: demo
    run: npm error
  	continue-on-error: true
  - run: echo "hello" // => hello
```

engine 执行代码示例

```ts
import Engine from "@serverless-cd/engine";
import path from "path";
const logPrefix = path.join(__dirname, "logs");

(async () => {
  const steps = [
    {
      name: "Failing step",
      id: "demo",
      run: "npm error",
      "continue-on-error": true,
    },
    {
      name: "The demo step has failed",
      run: "node -v",
    },
  ];
  const engine = new Engine({ steps, logConfig: { logPrefix } });
  const context = await engine.start();
  console.log(`context: ${JSON.stringify(context, null, 2)}`);
})();
```

输出

```txt
Info: @serverless-cd/engine: 0.0.11, darwin-x64, node-v16.16.0
Unknown command: "error"


To see a list of supported npm commands, run:
  npm help

v16.16.0

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
      "name": "Failing step",
      "id": "demo",
      "run": "npm error",
      "continue-on-error": true,
      "stepCount": "1",
      "status": "error-with-continue",
      "process_time": 0.62
    },
    {
      "name": "The demo step has failed",
      "run": "node -v",
      "stepCount": "2",
      "status": "success",
      "outputs": {},
      "process_time": 0.02
    }
  ],
  "stepCount": "2"
}
```
