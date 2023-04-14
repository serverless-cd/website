---
sidebar_position: 1
title: 了解Serverless-cd
---


# 核心概念
用户需要通过定义Steps，描述任务节点执行。Steps是一个数组，执行引擎会顺序地执行每一个step，每一个step都是执行引擎的独立子进程，主要有以下核心的概念：
- 步骤（Steps）： 流水线最小运行单元，任务的组成部分，默认是串行执行。
- 上下文（Context）： 您可以在步骤和操作中访问上下文信息
- 表达式（Expression）：使用`${{<expression>}}`表达式来访问上下文
- 变量（Variable）：读取，设置自定义变量在步骤（Steps）内共享

## 步骤（Steps）
Step 有两种类型：插件类型和 命令类型

### 命令类型Step
命令类型Step可以让用户使用Shell命令描述构建行为，通过`${{<Context>}}` 获取上下文变量，例如要打印当前执行上下文中的应用名称，可以通过`echo ${{ ctx.data.appName }}`实现。

| 参数 | 类型 | 说明 | 必填 | 参考值 |
| --- | --- | --- | --- | --- |
| run | string | 当前步骤运行的shell命令 | 是 | make setup |
| id | string | 当前步骤的 id(唯一标识) | 否 | s-setup |
| env | map<string, string> | 当前步骤环境变量 | 否 | {  "debug": "*" } |
| working-directory | string | 执行当前步骤命令的路径。默认为engine进程当前路径 | 否 | == |
| continue-on-error | boolean | 忽略异常。如果为 true，允许步骤执行失败时通过。默认为false。 | 否 | false |
| if | boolean | 表达式：如果`if` 条件为 true，该步骤将运行，否则忽略 | 否 | true |

#### 示例
```
steps:
  - run: echo "hello"
    id: xhello
  - run: echo '根据前一步骤的执行状态，决定是否执行当前步骤'
    if: ${{ steps.task.status === 'success' }}
  - run: npm run error
    id: xerror
  - run: echo '如果前面的步骤失败了，这一步不会执行'
  - run: echo '如果前面的步骤失败了，可以通过内置函数 failure() 来继续执行'
    if: ${{ failure() }}
```

### 插件类型Step
插件由应用中心官方维护。主要目的是将重复、繁琐的构建行为抽象为插件，只用申明插件名称，就能完成大段代码才能完成的工作，例如checkout代码这个工作，只需要声明插件为`@serverless-cd/checkout`就能实现。

| 参数 | 类型 | 说明 | 必填 | 参考值 |
| --- | --- | --- | --- | --- |
| plugin | string | 当前步骤运行的插件 | 是 | @serverless-cd/checkout|
| id | string | 当前步骤的 id(唯一标识) | 否 |  |
| env | map<string, string> | 当前步骤环境变量 | 否 | {  "debug": "*"} |
| inputs | object | plugin 插件接收的参数 | 否 | {  "key1": "value1",  "key2": "value2"} |
| continue-on-error | boolean | 如果为 true，允许步骤执行失败时通过 | 否 | false |
| if | boolean | 表达式：如果`if` 条件为 true，该步骤将运行，否则忽略 | 否 | true |
```
- name: Markdown message
  plugin: @serverless-cd/ding-talk
  inputs:
    webhook: https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxx
    msgtype: markdown
    payload:
      title: 通知
      text: "## 这是一条通知信息"
```


## 上下文（Context）
`上下文（Context）`是一种访问工作流运行、变量、运行环境及步骤相关信息的方式。 每个上下文都是一个包含属性的对象，属性可以是字符串或其他对象。
可以通过[表达式](#表达式)语法访问上下文相关信息 `${{<Context>}}`

步骤（Steps）执行引擎是开源开放的，上下文（Context）内容主要分为两部分
### 阿里云应用中心Context

| 属性    | 说明                   | 类型                   |
| ------- | ---------------------- | ---------------------- |
| uid   | 阿里云AccountId | string |
| ctx     | 阿里云应用中心上下文环境信息               | map<string, string>                 |
| [sts]     | 阿里云临时安全令牌[STS](#sts)          | object                 |

#### uid上下文
`uid`上下文代表阿里云AccountID

uid上下文示例内容：
```
{
  "uid": "13434024453624"
}
```
#### sts上下文
`sts`上下文 代表阿里云临时安全令牌[STS（Security Token Service）](https://help.aliyun.com/document_detail/28756.html)

uid上下文示例内容：

```
{
  "accessKeyId": "xxxx",
  "accessKeySecret": "xxxx",
  "securityToken": "xxxx"
}
```
### 内置Context
#### env上下文
`env 上下文`包含在 步骤中设置的变量以及系统变量

#### env 上下文的示例
```
steps:
  - run: echo 'Hi ${{ env.name }}'
    env:
      name: Tony
```
#### env 上下文获取系统环境变量
当前系统环境变量存在`PATH`值。通过`env`获取
```
steps:
  - run: echo 'Hi ${{ env.PATH }}'
```

#### steps上下文
steps 上下文包含有关当前已运行的步骤的信息

| 属性    | 说明                   | 类型                   |
| ------- | ---------------------- | ---------------------- |
| steps.<step_id>.name	   | step 的显示名称, step_name 在 task 中唯一	 | string |
| steps.<step_id>.status	     | [步骤运行状态](#步骤运行状态status)	               | map<string, string>                 |
| steps.<step_id>.outputs	     | 插件运行结束的输出信息	          | object                 |
| steps.<step_id>.error	     | step 的`status`为`failure`时，输出错误信息	          | Error                 |

##### steps 上下文的示例用法
根据前面步骤的执行状态来决定当前步骤是否执行

```
steps:
  - run: echo "hello"
    id: xhello
  - run: echo "world"
    if: ${{ steps.xhello.status==="success" }}
    id: xworld
```


## 表达式（Expression）
表达式（Expression）是对工作流和操作中的表达式求值，表达式可以是文字值、上下文引用或函数的任意组合。 您可以使用运算符组合文字、上下文引用和函数

表达式通常与工作流文件中的条件 `if` 关键字一起使用，如果 `if` 条件为 `true` 该步骤将运行。使用[函数](#函数)和表达式更好的搭配使用

表达式语法为：`${{ <expression> }}`

### if条件表达式
```
steps:
  ...
  - name: The job has succeeded
    if: ${{ success() }}
```

### 函数
#### 内置函数
1. contains

`contains(search, item)` 

如果 search 包含 item，则返回 true。 如果 search 是一个数组，item 是数组中的一个元素，此函数将返回 true

```
steps:
  - run: 'echo "contains success"',
    if: "${{ contains('Hello world', 'Hello')}}",
```
上面结果返回`true`,输出`contains success`

2. startsWith

`startsWith(searchString, searchValue)` 

如果 `searchString` 以 `searchValue` 开头，则返回 true。

```
steps:
  - run: 'echo "startsWith success"',
    if: "${{ startsWith('Hello world', 'Hello')}}",
```
上面结果返回`true`,输出`startsWith success`

3. endsWith

`endsWith(searchString, searchValue)` 

如果 `searchString` 以 `searchValue` 结尾，则返回 true。

```
steps:
  - run: 'echo "endsWith success"',
    if: "${{ endsWith('Hello world', 'Hello')}}",
```
上面结果返回`false`, 不输出值

4. toJSON

`toJSON(value)`

对 value 返回适合打印的 JSON 表示形式。 您可以使用此函数调试上下文中提供的信息。

`toJSON(job) `可能会返回 { "name": "hello serverless" }

#### 状态检查函数
1. success

当前面的步骤没有失败或取消时返回 `true`

```
steps:
  ...
  - name: The job has succeeded
    if: ${{ success() }}
```

2. always

该步骤总是执行，并返回 true，即使取消也一样。 作业或步骤在重大故障阻止任务运行时不会运行。 例如，如果获取来源失败。

```
steps:
  ...
  - name: The job has always execute
    if: ${{ always() }}
```

3. failure

在作业的任何之前一步失败时返回 true。


```
if: ${{ failure() }}
```

4. cancelled

在步骤取消时返回 true。

```
if: ${{ cancelled() }}

```

## 变量（Variable）
### 获取当前系统环境变量
```
steps:
  - run: echo $PATH
```

### 使用 `env` 上下文访问环境变量值
允许上下文设置和读取 env 键值，再步骤(Steps)内部之间共享变量
```
steps:
  - run: env.firstName=dankun
  - run: echo ${{ env.firstName }}
```

## 其他
### 步骤运行状态status
#### 执行过程中的状态
- `pending`:	等待执行
- `running`:	执行中
- `success`:	执行成功
- `failure`:	执行失败
- `skipped`:	忽略执行
- `cancelled`:	取消执行
- `error-with-continue`: 值为true时，允许步骤执行失败时通过

#### 执行完成的状态
- `success`:	执行成功
- `failure`:	执行失败
- `cancelled`:	取消执行
