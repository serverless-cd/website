---
sidebar_position: 2
title: 发送邮件
---

# 发送邮件(send-email)
> 发送邮件

## 快速体验
### 前期准备
1. 如果使用QQ邮箱，预先准备好[授权码](https://service.mail.qq.com/cgi-bin/help?subtype=1&&no=1001256&&id=28)


### 快速开始
```
- plugin: @serverless-cd/send-email
  inputs: 
    config: 
      service: 'qq', // 通用邮箱类型也可是163
      pass: 'xxxxxxxx', // 这里密码不是qq密码，是你设置的smtp授权码
      secure: true, // 为false默认端口号587 为true默认端口号为465
      port: 465, // 自定义端口号
    mail:
      from: '"test" <xxxxxx@qq.com>',  // 发送者qq邮箱地址
      to: 'xxxx@qq.com', // 接收者,可以群发填写多个逗号分隔
      subject: 'Hello', // 主题名(邮件名)
      html: '<b>Hello world ${git.ref} ${args.name}?</b>'
```

### 公司邮箱配置
```
- plugin: @serverless-cd/send-email
  inputs: 
    config: 
      host: 'smtp.qiye.aliyun.com', // 服务器地址
      pass: 'xxxxxxxx', // 这里密码不是邮箱密码，是你设置的smtp授权码
      port: 465, // 自定义端口号
    mail:
      from: '"test" <xxxxxx@company.com>',  // 发送者公司邮箱地址
      to: 'xxxx@company.com', // 接收者,可以群发填写多个逗号分隔
      subject: 'Hello', // 主题名(邮件名)
      html: '<b>Hello world ${git.ref} ${args.name}?</b>'
```

## 字段解析

| 参数名   | 必填 |  参数描述   |
| --------- | ---- | ------- | 
|  config    | True |   邮件配置    |
|  mail    | True |   邮件内容    |

### config
邮件服务配置
#### 知名service 服务
支持知名service服务简化配置，具体[查看文档](https://nodemailer.com/smtp/well-known/)

| 参数名   | 必填 |  参数描述   |
| --------- | ---- | ------- | 
|  service    | True |   服务名    |
|  pass    | True |    授权码    |

#### 支持公司邮箱
支持知名Host服务简化配置，具体查看文档[查看文档](https://nodemailer.com/smtp/testing/)

| 参数名   | 必填 |  参数描述   |
| --------- | ---- | ------- | 
|  host    | True |   服务器地址    |
|  pass    | True |    授权码    |
|  port    | True |    服务器端口号    |
#### smtp 协议
使用方式请[查看文档](https://nodemailer.com/smtp/)

### mail
邮件内容配置
| 参数名   | 必填 |  参数描述   |
| --------- | ---- | ------- | 
| from | False | 发件人，默认为 `${mail.from}`｜
| to | True | 收件人 ｜
| subject | True | 邮件主题 ｜
| html | False | 邮件内容（HTML格式） ｜
| text | False | 邮件内容（文本格式） ｜


## 注意事项
### 使用动态魔法变量
本插件可以使用Serverless-cd的全局context变量
