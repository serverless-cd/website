---
sidebar_position: 1
title: 数据库设计
---

# 核心数据表

- user: 登录用户
- org: 团队信息
- application: 应用
- task: 部署执行的任务
  <!-- - session: session 状态信息 -->
  <!-- - token: 访问令牌，用户访问 Serverless-cd 的 API -->

## 详细表字段

<!--
```
Table User {
  id string [pk]
  username String
  email String
  avatar String
  password String
  github_unionid String
  gitee_unionid String
}

Table Org {
  id    String [pk]
  third_part String
  user_id String
  secrets String
  name String
  role String
  description String
  alias String
  logo String
}

Ref: User.id <> Org.user_id

Table Application {
  id String [pk]
  org_id String
  owner_org_id String
  description String
  repo_owner String
  provider String
  environment String
  repo_id String
  repo_name String
  repo_url String
  repo_webhook_secret String
  created_time timestamp
  updated_time timestamp
}

Ref: Application.org_id > Org.id
Ref: Application.owner_org_id > Org.id

Table Task {
  id String [pk]
  env_name String
  app_id String
  trigger_payload  String
  status String
  steps String
  dispatch_org_id String
  created_time timestamp
  updated_time timestamp
}

Ref: Task.app_id > Application.id
Ref: Task.dispatch_org_id > Org.id
```
-->

User 和 Org 的关系：  
一个用户可以用多个团队，一个团队也可以包含很多用户。  
一个用户和一个团队名称最多只能对映一条团队数据。  
一个团队只能拥有一个最高管理员（即 Org.role 值为 OWNER）

Application 和 Org 的关系：  
一个团队下面可以拥有多个应用。

```
model User {
  id string @id             // 用户 ID，随机生成
  username String  @unique  // 用户名称
  email String?  @unique    // 用户邮箱
  avatar String?            // 用户头像
  password String?          // 登录密码(加密)
  github_unionid String? @unique   // github 登陆授权的唯一标识ID
  gitee_unionid String?  @unique      // gitee 登陆授权的唯一标识ID
}

model Org {
  id    String     @id    // 团队ID，生成格式变更为：user_id:name
  third_part String?  @db.Text  // 三方绑定(github等)登录的信息（内容下方有示例）
  user_id String      	// 关联的用户ID
  secrets String?   @db.Text    // 配置的密钥信息，标准JSON格式
  name String           // 团队名称
  role String           // 用户在团队中的角色
  description String?   // 团队描述信息
  alias String?   		  // 团队别名
  logo String?          // 团队logo
}

model Application {
  id String @id     // 应用ID，随机生成
  name String     // 应用名称，在组织下唯一
  org_id String     // 创建应用的人关联的团队ID
  owner_org_id String  // 应用属于某个团队最高管理员的关联团队ID，一个组织仅能一个 ownerId 
  description String?  // 应用描述
  environment String @db.Text  // 应用的环境配置（内容下方有示例）
  provider String      // 代码托管仓库的平台
  repo_owner String         // 代码托管仓库的拥有者名称
  repo_id String  // 代码在托管平台的仓库ID，provider 和 repo_id 可以组成唯一的数据
  repo_name String  // 代码在托管平台的仓库名称
  repo_url String   // 代码在托管平台的仓库地址
  repo_webhook_secret String?  // 托管平台仓库的 webhook 验证密钥
  created_time DateTime  @default(now())
  updated_time DateTime  @updatedAt
}

model Task {
  id String @id     // 任务ID，随机生成 如果是CD关联函数计算的异步任务ID
  env_name String   // 被触发的环境名称
  app_id String     // 被触发的应用ID
  trigger_payload  String? @db.Text     // 被触发的请求信息（内容待补充）
  status String?		    // 运行状态
  steps String?   @db.Text    // 运行步骤 （内容待补充）
  dispatch_org_id String?       // 记录谁操作的
  trigger_type   String? // 记录怎么触发的 (下方有具体描述)
  created_time DateTime  @default(now())
  updated_time DateTime  @updatedAt
}
```

## ![image.png](https://img.alicdn.com/imgextra/i3/O1CN010CFse61mTtj2d89HC_!!6000000004956-0-tps-2140-1352.jpg)

## 表中字段描述

third_part:

```json
{
  "github": {
    "access_token": "xxx",
    "owner": "xxxxx",
    "id": 0000000,
    "avatar": "https://avatars.xxxx.com/u/56686088?v=4"
  }
}
```

environmen：

```
{
    "default": {
        "type": "testing",
        "trigger_spec": {
            "github": {
                "push": {
                    "branches": {
                        "precise": [
                            "serverless-cd-project-setup"
                        ]
                    }
                }
            }
        },
        "secrets": {},
        "cd_pipeline_yaml": "serverless-pipeline.yaml",
        "resource": {
            "aliyun.fc": {
                "uid": "1920014488718015",
                "region": "cn-hangzhou",
                "functions": [
                    {
                        "name": "start-egg",
                        "service": "web-framework"
                    },
                    {
                        "name": "start-egg1",
                        "service": "web-framework2"
                    }
                ]
            }
        },
        "latest_task": {
            "taskId": "FwmglJmdaBv4rPGt",
            "status": "success",
            "completed": true
        }
    }
}
```

trigger_type 取值如下:  
`manual`、`redeploy`、`rollback` 表示控制台发出的动作   
`github`、`gitee`、`codeup`、`gitlab` 表示通过Webhook触发的动作   
以 `tracker:` 开头表示是通过其他手段上报上来的


## 资料

ER 画图工具

1. [https://dbdiagram.io/d](https://dbdiagram.io/d)
2. [https://app.sqldbm.com/](https://app.sqldbm.com/)
