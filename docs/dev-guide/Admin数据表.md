---
sidebar_position: 1
title: Admin表设计
---


# 核心数据表
- user:  登录用户
- application: 应用
- task: 部署执行的任务
- session: session状态信息
- token: 访问令牌，用户访问Serverless-cd的API

## 详细表字段
```
Table team {
    id string [pk]
    secrets string  // 密钥
    name string // 团队名称
    owner string  [ref: > user.id] // 团队负责人
    member string
    created_time timestamp
    updated_time timestamp
}

Table user {
    id string [pk]
    avatar string
    username string // 名称
    secrets string  // 密钥
    password string // 登录密码(加密)
    third_part string // 三方绑定(github等)登录的信息
    github_unionid string  // github授权的唯一标识ID
    created_time timestamp
    updated_time timestamp
}

Table application {
    id string [pk, increment]
    user_id string  [ref: > user.id]
    owner string // github仓库登录的owner
    provider string // git代码托管厂商：github,gitee,gitlab,codeup
    provider_repo_id string // git代码repo唯一ID
    repo_name string // git代码repo 名称
    repo_url string // git代码repo url链接
    secrets string // 应用密钥secrets
    latest_task string // 最近生效的task信息
    trigger_spec string // trigger相关信息 
    description string
    created_time timestamp
    updated_time timestamp
}


Table task {
    id string [pk, increment]
    user_id string  [ref: > user.id]
    app_id string [ref: > application.id]
    status string // 任务执行状态
    steps string // 执行steps的详细信息
    trigger_payload string // webhook触发相关的信息
    created_time timestamp
    updated_time timestamp
}

Table token {
    id string [pk, increment]
    team_id string  [ref: > team.id]
    user_id string  [ref: > user.id]
    description string
    cd_token string
    active_time string
    expire_time string
    created_time timestamp
    updated_time timestamp
}

Table session {
    id string [pk, increment]
    session_data string
    expire_time string
    created_time timestamp
    updated_time timestamp
}
```

## ![image.png](https://cdn.nlark.com/yuque/0/2022/png/22111491/1667178736594-94a34c3b-4bed-4e6a-b1d5-6b7da035c844.png#averageHue=%23f3f3f3&clientId=u4dc25c22-35c9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=634&id=u25eee4fd&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1268&originWidth=2204&originalType=binary&ratio=1&rotation=0&showTitle=false&size=193585&status=done&style=none&taskId=ubca54273-f096-4f97-a1d1-c0be121f355&title=&width=1102)


## 资料
ER画图工具

1. [https://dbdiagram.io/d](https://dbdiagram.io/d)
2. [https://app.sqldbm.com/](https://app.sqldbm.com/)