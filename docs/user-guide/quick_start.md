---
sidebar_position: 1
title: 5分钟体验
---

# 部署到阿里云
## 前期准备
### 需要开通的产品

- [函数计算FC](https://fcnext.console.aliyun.com/)：整个系统的计算能力运行在FC上
- [日志服务SLS](https://sls.console.aliyun.com/)：分布式日志存储服务，用于定位和发现问题
- [对象存储OSS](https://oss.console.aliyun.com/)：用于存储输出日志信息
- [表格存储Tablestore](https://otsnext.console.aliyun.com/): 应用和任务的元数据信息存储

推荐您拥有以下的产品权限 / 策略：

| 服务/业务 | 权限/策略 |
| --- | --- |
| 函数计算FC | AliyunFCFullAccess |
| 日志服务SLS | AliyunLogFullAccess |
| 对象存储OSS | AliyunOTSFullAccess |
| 表格存储Tablestore | AliyunOSSFullAccess |

### 安装Serverless Devs：

1. [安装 Serverless Devs Cli 开发者工具](https://docs.serverless-devs.com/serverless-devs/install)
```
npm install @serverless-devs/s -g  --registry=https://registry.npmmirror.com
```

2. [添加授权信息配置](https://docs.serverless-devs.com/fc/config)
```
s config add
```

## 部署
#### 初始化项目

1. 使用 `s init` 进行初始化
```
s init serverless-cd -d serverless-cd
```
#### 填写初始化信息
> 如果没有特殊的需求或者是第一次使用Serverless-cd，推荐使用默认值。

1. 选择对应的地域信息
```
创建应用所在的地区
? 地域
  us-west-1
  cn-beijing
  cn-hangzhou
❯ cn-hongkong
  cn-shenzhen
  cn-qingdao
  cn-zhangjiakou
```

2. 选择OSS bucket

默认值 `auto` 会生成对应的OSS bucket, 格式为 `${uid}-${region}-serverless-cd`。
```
用于存放执行日志，填写auto默认会生成OSS bukect
? 对象存储 bukect 名称 auto
```

3. 选择函数的服务名：
```
应用所属的函数计算服务, 只能包含字母、数字、下划线和中划线。不能以数字、中划线开头。长度在 1-128 之间
? 服务名 serverless-cd
```

4. 选择serverless数据库实例名：
```
用于存储持久化数据，请前往https://otsnext.console.aliyun.com 创建实例
? Tablestore 实例名称 (serverless-cd)
```

5. 填写表结构的前缀：
```
相关表的前缀，必须以字母或下划线(_)开头
? 表名称前缀 cd
```

6. 自定义域名：
```
填写auto 系统会生成一个测试域名
? 自定义域名 auto
```

7. 默认的配置文件名称:

`serverless-pipeline.yaml` 是serverless-cd默认的规范，只有存在此文件才会被系统识别。
```
serverless-pipline 默认的配置文件
? 配置文件 serverless-pipeline.yaml
```
![s_init.gif](https://cdn.nlark.com/yuque/0/2022/gif/22111491/1668062181703-2bd9c271-9301-42be-9543-f3111321ffdc.gif#averageHue=%23000000&clientId=uf225b962-d843-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=MSJu7&margin=%5Bobject%20Object%5D&name=s_init.gif&originHeight=511&originWidth=897&originalType=binary&ratio=1&rotation=0&showTitle=false&size=194805&status=done&style=none&taskId=ucd5bed35-6c96-4847-b047-12371ec92c0&title=)

#### 执行部署
到对应的文件夹，执行 `s deploy` 进行部署

![s_deploy.gif](https://cdn.nlark.com/yuque/0/2022/gif/22111491/1668062363988-8824a763-8db7-40d8-8e27-ca03b95d869e.gif#averageHue=%23000000&clientId=uf225b962-d843-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=Gjq6J&margin=%5Bobject%20Object%5D&name=s_deploy.gif&originHeight=511&originWidth=897&originalType=binary&ratio=1&rotation=0&showTitle=false&size=685665&status=done&style=none&taskId=u47ee1014-89a5-4032-b743-fe19ae78c2c&title=)

部署完成后会生成一个对应的测试域名，格式为`auto.serverless-cd.${uid}.{region}.fc.devsapp.net`
## 快速体验
#### 访问控制台： 
`auto.serverless-cd.${uid}.{region}.fc.devsapp.net`
#### 创建应用：

   - 添加授权<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/22111491/1668063809412-b0292502-aff4-4397-9eae-404b440e65a5.png#averageHue=%23fafafa&clientId=uf225b962-d843-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=696&id=Oy3Wp&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1392&originWidth=2346&originalType=binary&ratio=1&rotation=0&showTitle=false&size=223792&status=done&style=none&taskId=ue681ad6b-848b-4d5f-a13c-418056e4507&title=&width=1173)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22111491/1668063886561-b378b5e3-44a9-4aa4-b2a2-00c763b74ba5.png#averageHue=%23f7f7f7&clientId=uf225b962-d843-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=279&id=sBA9W&margin=%5Bobject%20Object%5D&name=image.png&originHeight=558&originWidth=1220&originalType=binary&ratio=1&rotation=0&showTitle=false&size=52766&status=done&style=none&taskId=u1aa146d9-1996-4864-bae4-8ac3fedde86&title=&width=610)

   - 获取Token<br />在对应[GitHub setting](https://github.com/settings/tokens)页面，添加个人Token，并填入

![s_token.gif](https://cdn.nlark.com/yuque/0/2022/gif/22111491/1668064404553-2bb7835b-1257-4ad1-bfff-a579b1133083.gif#averageHue=%23000000&clientId=uf225b962-d843-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=uf0089dd3&margin=%5Bobject%20Object%5D&name=s_token.gif&originHeight=680&originWidth=1161&originalType=binary&ratio=1&rotation=0&showTitle=false&size=951606&status=done&style=none&taskId=uaf1d2c4a-bae2-4fd2-ba17-c953282831e&title=)

   - 导入应用:
      - 选择nodejs模版应用: [https://github.com/serverless-cd-demo/nodejs-ci](https://github.com/serverless-cd-demo/nodejs-ci)，并fork到当前账号

![s_demo.gif](https://cdn.nlark.com/yuque/0/2022/gif/22111491/1668064760983-0a45cac3-ff0e-4794-b622-c642fc9d3d02.gif#averageHue=%23000000&clientId=uf225b962-d843-4&crop=0&crop=0&crop=1&crop=1&from=drop&height=364&id=Nmi1M&margin=%5Bobject%20Object%5D&name=s_demo.gif&originHeight=663&originWidth=1161&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1774659&status=done&style=none&taskId=u123abe95-418b-4b53-9569-43cfd41a64c&title=&width=638)

   - 创建应用

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22111491/1668064987688-8b202fc0-174a-4e26-a0c8-f012691aba40.png#averageHue=%23faf8f8&clientId=uf225b962-d843-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=424&id=u4edae3f6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1524&originWidth=2346&originalType=binary&ratio=1&rotation=0&showTitle=false&size=222266&status=done&style=none&taskId=ucbe35cf0-160a-4f5a-be93-414e08c0bcf&title=&width=652)

3. 查看应用详情

可以看到刚创建的应用已经触发部署<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/22111491/1668065107301-8a32ca13-a302-43a7-8ffa-38a6b1816558.png#averageHue=%23fafafa&clientId=uf225b962-d843-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=687&id=u177f3e1f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1374&originWidth=1984&originalType=binary&ratio=1&rotation=0&showTitle=false&size=128563&status=done&style=none&taskId=u968b97fa-8998-4265-8017-7182a176bff&title=&width=992)<br />并且可以看到详细的部署日志信息<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/22111491/1668065144073-2952541b-c2f2-4e45-b3fe-9459622ec937.png#averageHue=%23999999&clientId=uf225b962-d843-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=541&id=u3f634eda&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1082&originWidth=2004&originalType=binary&ratio=1&rotation=0&showTitle=false&size=99798&status=done&style=none&taskId=ue3646785-81e4-4822-87ba-980ec8ce34c&title=&width=1002)

#### webhook触发部署
修改代码并且提交，查看自动化执行部署构建流程<br />![s_redeploy.gif](https://cdn.nlark.com/yuque/0/2022/gif/22111491/1668065492165-0210010f-1138-4b89-9f7a-1ca0036d1f73.gif#averageHue=%23000000&clientId=uc43ce293-3493-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=udae1dff0&margin=%5Bobject%20Object%5D&name=s_redeploy.gif&originHeight=682&originWidth=1161&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2127570&status=done&style=none&taskId=u85188504-47be-4bf9-afe2-7141a04bea6&title=)