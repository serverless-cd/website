---
sidebar_position: 1
title: 上下文
---

# 上下文(context)

> serverless-cd执行过程中的全局上下文，可以在yaml任何地方进行引用


# task上下文
| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| status | [string](#r3kon) | task状态信息 |  |
| steps | object | 当前task作业中的信息 |  |
| env | object | 环境变量 |  |
| git | object | git相关信息 |  |


# steps上下文 
| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| steps.<step_id>.name | string | step 的显示名称, step_name 在task中唯一 | 默认为 `Run ${scriptName}` |
| steps.<step_id>.status | [string](#r3kon) | step 的运行状态 |  |
| steps.<step_id>.outputs | object | step 的输出信息 |  |
| steps.<step_id>.errorMessage | string | step的`status`为`failure`时候，当前字段不为空。 |  |


##  示例1:根据前面步骤的执行状态来决定当前步骤是否执行
```yaml
steps:
  - run: echo "hello"
    id: xhello
  - run: echo "world"
    if: '{{ steps.xhello.status==="success" }}'
    id: xworld
```

## 示例2:根据前面步骤的输出结果来决定当前步骤是否执行
```yaml
steps:
  - uses: @serverless-cd/checkout@v2
    id: 'xuse'
 	- run: echo "hello"
    if: ${{ steps.xuse.outputs.xx === 'xx' }}
```

# 状态

## 执行过程中的状态
```yaml
- running // 当前步骤正在执行
- pending // 当前步骤等待执行
- success // 当前步骤执行成功
- failure // 当前步骤执行失败
- cancelled // 取消当前步骤
- skipped // 忽略当前步骤
- error-with-continue // 当前步骤执行失败的话，不影响其他步骤
```

## 执行结束的状态
```yaml
- `success` // 执行成功
- `failure` // 执行失败
- `cancelled` // 执行取消
```
