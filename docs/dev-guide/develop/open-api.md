---
sidebar_position: 1
title: 开放API
---

# 开放API(open-api)
开放API接口，方便三方系统进行集成。在使用API前，需要到 settings > Tokens 创建Token

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22111491/1666777101973-acbb3ada-d9b0-47e8-bf40-454207274b2a.png#averageHue=%23fafafa&clientId=u4f99d8d6-005a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=448&id=u2d5e8212&margin=%5Bobject%20Object%5D&name=image.png&originHeight=896&originWidth=1902&originalType=binary&ratio=1&rotation=0&showTitle=false&size=82621&status=done&style=none&taskId=ud23afcfa-d41f-4697-8cfb-b7a7307b863&title=&width=951)


### 请求语法
在请求`header`头部加上key为`cd_token` ，值为在平台申请的token
```
curl \
  --header "Content-Type: application/json" \
  --header "cd_token: $CIRCLE_TOKEN" \
  --data '{"build_parameters": {"param1": "value1", "param2": 500}}' \
  --request POST \
  https://xxx.devsapp.net/api/application/list
```



# 开放API接口

## 应用管理

### 应用列表
接口名： /api/flow/application/list<br />请求方法： GET<br />请求参数: 无<br />响应结果：
```json
{
  "success": true,
  "data": [
    {
      "id": "xxx",
      "created_time": 1667808884503,
      "latest_task": {
          "taskId": "taskId",
          "commit": "commitId",
          "message": "Update serverless-pipeline.yaml",
          "ref": "refs/heads/main",
          "completed": true,
          "status": "success"
      },
      "owner": "owner",
      "provider": "github",
      "provider_repo_id": "provider_repo_id",
      "repo_name": "repo_name",
      "repo_url": "repo_url",
      "secrets": {},
      "trigger_spec": {
          "github": {
              "events": [
                  {
                      "eventName": "push",
                      "filter": "body.ref in [\"refs/heads/main\"]",
                      "template": "template.yaml"
                  }
              ],
              "secret": "secret"
          }
      },
      "updated_time": 1667809310261,
      "user_id": "user_id"
    }
  ]
}


```

### 应用详情
接口名： /api/flow/application/detail<br />请求方法： GET<br />请求参数: 

| 参数名 | 类型 | 描述 | 必填 |
| --- | --- | --- | --- |
| id | string | 应用ID | 是 |

响应结果：
```json
{
    "success": true,
    "data": {
        "id": "id",
        "created_time": 1667808884503,
        "latest_task": {
            "taskId": "taskId",
            "commit": "commitId",
            "message": "message",
            "ref": "refs/heads/main",
            "completed": true,
            "status": "success"
        },
        "owner": "owner",
        "provider": "github",
        "provider_repo_id": "provider_repo_id",
        "repo_name": "template-s-fc-express",
        "repo_url": "repo_url",
        "secrets": {},
        "trigger_spec": {
            "github": {
                "events": [
                    {
                        "eventName": "push",
                        "filter": "body.ref in [\"refs/heads/main\"]",
                        "template": "serverless-pipeline.yaml"
                    }
                ],
                "secret": "secret"
            }
        },
        "updated_time": 1667809310261,
        "user_id": "user_id"
    }
}
```

### 创建应用
接口名： /api/flow/application/create<br />请求方法： POST<br />请求参数: 

| 参数名 | 类型 | 描述 | 必填 |
| --- | --- | --- | --- |
| repo | string | 仓库名称 | 是 |
| owner | string | 仓库拥有者 | 是 |
| repo_url | string | 仓库地址 | 是 |
| provider_repo_id | string | 仓库id | 是 |
| description | string | 描述 | 否 |
| provider | string | 仓库类型 | 是 |
| trigger_spec | object | 触发配置 | 是 |
| secrets | object | 密钥配置 | 否 |

响应结果：
```json
{
  "success":true,
  "data":{
    "id":"id"
  }
}
```

## 部署相关

### 手动触发
接口名： /api/flow/dispatch/manual<br />请求方法： POST<br />请求参数:

| 参数名 | 类型 | 描述 | 必填 |
| --- | --- | --- | --- |
| appId | string | 应用ID | 是 |
| commitId | string | commit | 否 |
| ref | string | Git References,比如： refs/heads/main, refs/tags/0.0.1 | 是 |
| inputs | json | 自定义参数 |  |


### 重新部署/版本回滚
接口名： /api/flow/dispatch/redeploy<br />请求方法： POST

| 参数名 | 类型 | 描述 | 必填 |
| --- | --- | --- | --- |
| taskId | string | 部署ID | 是 |


### 取消部署
接口名： /api/flow/dispatch/cancel<br />请求方法： POST

| 参数名 | 类型 | 描述 | 必填 |
| --- | --- | --- | --- |
| taskId | string | 部署ID | 是 |

