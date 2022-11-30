---
sidebar_position: 2
title: 表达式
---


# 表达式
表达式可以设置环境变量和访问上下文。 表达式可以是文字值、上下文引用或函数的任意组合。 您可以使用运算符组合文字、上下文引用和函数。请参考 [上下文context](https://www.yuque.com/manba-ka8zh/udfvnw/nr68hk)

表达式`${{ <expression> }}`通常与工作流文件中的条件 if 关键字一起使用，以确定是否应运行步骤。 如果 if 条件为 true，该步骤将运行。

### if 条件中示例表达式
```yaml
steps:
  - uses: @serverless-cd/checkout@v2
    if: ${{ <expression> }}
```

### 设置环境变量的示例
```yaml
env:
  MY_ENV_VAR: ${{ <expression> }}
```

# 内置函数

## contains
`contains( search, item )` 如果 search 包含 item，则返回 true。 如果 search 是一个数组，item 是数组中的一个元素，此函数将返回 true

#### 使用字符串的示例
`contains('Hello world', 'llo')` 返回 `true`

#### 使用对象筛选器的示例
如果与事件相关的问题具有标签“bug”，`contains(github.event.issue.labels.*.name, 'bug')` 便会返回 `true`

#### 匹配字符串数组的示例
可以将 `contains()` 与 `fromJson()` 配合使用来检查字符串数组是否包含 item，而不是编写 `github.event_name == "push" || github.event_name == "pull_request"。`<br />例如，如果 `github.event_name` 是“push”或“pull_request”，`contains(fromJson('["push", "pull_request"]'), github.event_name) `便会返回 true


## toJSON


## hashFiles
`hashFiles(path)`<br />返回与 `path` 模式匹配的文件集的单个哈希。 可以提供用逗号分隔的单个 `path` 模式或多个 `path` 模式。  此函数为每个匹配的文件计算单独的 SHA-256 哈希， 然后使用这些哈希来计算文件集的最终 SHA-256 哈希。 如果 path 模式与任何文件都不匹配，则返回空字符串

#### 单一模式示例
匹配存储库中的任何 `package-lock.json` 文件。<br />`hashFiles('**/package-lock.json')`

#### 多个模式示例
为存储库中的任何 `package-lock.json` 和 `Gemfile.lock`文件创建哈希。<br />`hashFiles('**/package-lock.json', '**/Gemfile.lock')`


# 状态检查函数

## success
当前面的步骤没有失败或取消时返回 `true`
```
steps:
  ...
  - name: The job has succeeded
    if: {{ success() }}
```

## always
该步骤总是执行，并返回 true，即使取消也一样。 作业或步骤在重大故障阻止任务运行时不会运行。 例如，如果获取来源失败。
```
if: {{ always() }}
```

## cancelled
在工作流程取消时返回 true。
```
if: {{ cancelled() }}
```

## failure
在作业的任何之前一步失败时返回 true。 如果您有相依作业链，failure() 在任何上层节点作业失败时返回 true
```
steps:
  ...
  - name: The job has failed
    if: {{ failure() }}
```

### 有条件的失败
您可以为失败后运行的步骤添加额外的条件，但需要包含 failure() 
```
steps:
  ...
  - name: Failing step
    id: demo
    run: exit 1
  - name: The demo step has failed
    if: {{ failure() && steps.demo.status == 'failure' }}
```

### continue-on-error
忽略某一步骤的执行错误，不影响执行步骤的全局状态
```yaml
steps:
  ...
  - name: Failing step
    id: demo
    run: exit 1
  	continue-on-error: true
  - run: echo "hello" // => hello
```


## 对象过滤器
