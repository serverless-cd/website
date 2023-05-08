# 初始化S工具

s-setup是一个常用的初始化功能，负责将用户的s工具配置完成。

## 快速体验

```yaml
- plugin: "@serverless-cd/s-setup"
  inputs:
    alias: string # 密钥对的别名
    credentials: # 阿里云密钥配置，用于上传下载缓存文件
      accessKeyID: string # 阿里云密钥 AK
      accessKeySecret: string # 阿里云密钥 SK
      securityToken: string # 选填
```

## 字段解析

| 参数     | 说明                                                                                         | 类型                                | 必填 | 默认值   |
| -------- | -------------------------------------------------------------------------------------------- | ----------------------------------- | ---- | -------- |
| alias      |   密钥对的别名    | string      | 是   |   default     |
| credentials      | 阿里云密钥配置，用于上传下载缓存文件                | [credentials](#credentials)      | 否   |  如果没有配置从应用关联的密钥获取，获取不到会异常     |

### credentials

| 参数     | 说明                                                                                         | 类型                                | 必填 | 默认值   |
| -------- | -------------------------------------------------------------------------------------------- | ----------------------------------- | ---- | -------- |
| accessKeyID      | 阿里云密钥 AK          | string      | 是   |    -     |
| accessKeySecret      | 阿里云密钥 SK       | string      | 是   |    -     |
| securityToken      | -               | string      | 否   |    false      |

## 最佳实践

[nodejs](https://github.com/serverless-cd-demo/serverless-devs-deploy)
