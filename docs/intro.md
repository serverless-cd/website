---
sidebar_position: 1
title: Serverless-cd是什么
---

Serverless-cd 是一款运行在 Serverless 架构上的功能强大而灵活，安全，低成本的CI/CD开源框架。该框架基于 Serverless Devs 开发者工具打造，通过 Serverless-cd开发者可以快速构建企业内部应用管理PaaS平台。

# 开发者更想关注业务价值的创造

Serverless Devs 是CNCF 沙箱孵化项目，2020年由阿里云开源，它是一个开源开放的 Serverless 开发者平台，Serverless Devs 也是业内首个支持主流 Serverless 服务 / 框架的云原生全生命周期管理的平台，致力于为开发者打造 Serverless 应用开发一站式服务，帮助解决目前的工具链之困，让开发者一键体验多云产品，极速部署 Serverless 项目。

Serverless Devs 项目为应用的开发，调试，部署，运维，监控提供全生命周期的解决方案。在实际使用中，应用部署和交付对于开发者来说仍然是一个难题。开发者希望更专注于应用的开发和价值的创造——也就是关注代码编写和应用的构建，而非应用部署和交付。

在 Serverless-cd 项目发布之前，Serverless Devs 项目通过集成的方式，集成了主流的 CI/CD 工具：[https://github.com/Serverless-Devs/cicd](https://github.com/Serverless-Devs/cicd)，如 Jenkins、Github、Gitlab 等，但使用这些传统的 CI/CD 工具一般会面临如下几个问题：

1. 资源利用率低：需要提前准备构建机器，在没有构建任务时，机器资源浪费；
2. 任务排队：如果资源准备不充足，在业务构建的高峰期间， 任务排队时间过长；
3. 隔离性差：如果某个任务执行过程中消耗大量计算/存储资源，导致其他任务失败；
4. 安全问题：
   1. 使用平台提供的CICD服务：代码和构建机器不在同一个网络环境，不得不开放公网访问，引起安全问题。
   2. ECS虚机部署：多个应用同时在一个实例构建，某个恶意应用可以访问其他的应用的代码
<a name="MtKSS"></a>

## CI/CD 流水线的 2个特点

CI/CD 流水线有两个显著的特点：

1. 事件驱动

无论是接收 Webhook 自动触发，还是调用 Open Api 手动触发，对于 CICD 系统来说都是**被动**接收指令进行消费

2. 业务明显波峰波谷

触发 CI/CD 构建的高峰一般在上班的时间段中，下班后以及晚上构建任务比较少。同时有些任务执行非常耗时，有些任务又需要大量的CPU&内存资源，很难提前进行有效的容量预估。

- 机器资源准备过少：由于资源不足导致任务执行失败，或者多个任务进行资源抢占，一直无法执行。
- 机器资源准备过多：无法充分利用，造成资源闲置浪费。
<a name="d1P85"></a>

## 基于Serverless架构的CI/CD优势

在 Serverless 架构下，CI/CD 可以具备以下优势

1. 自动弹性

Serverless 平台会为每个构建任务分配一个全新的实例，保证每个任务之间互不影响。再也不用担心资源不足导致任务失败，也避免了由于资源不足导致任务一直排不上队的情况。

2. 按**价值**付费

在业务波谷（晚上或者下班后）期，只有少量甚至没有任务执行，资源就出现了闲置和浪费。Serverless 的理念是帮助客户按实际产生的价值付费，只有实实在在的发生了构建行为，才会产生费用。

3. 免运维

Serverless 弹性是按照请求进行水平扩容的，开发者无需关注底层资源调度和运维的工作，可以心无旁骛的实现业务开发和价值创造。
<a name="eLYXA"></a>

# Serverless-cd 技术架构

Serverless-cd 是完全遵循 Serverless 架构最佳实践，在规范和生态层面参考 Github Action 的实现。下面是Serverless-cd 部署 Serverless Devs 应用的一段 YAML：

```bash
name: "Deploy Express application to FC"
steps:
  - run: npm i @serverless-devs/s -g --registry=https://registry.npmmirror.com
  - run: s -v
  - run: echo ${{secrets.ALIYUN_ACCOUNTID}}
  - run: echo ${{secrets.ALIYUN_AK}}
  - run: echo ${{secrets.ALIYUN_SK}}
  - run: s config add --AccountID ${{secrets.ALIYUN_ACCOUNTID}}  --AccessKeyID ${{secrets.SIMPLE_ALIYUN_AK}}  --AccessKeySecret ${{secrets.SIMPLE_ALIYUN_SK}} -a default -f
  - run: s deploy --use-local -y
```

Serverless-cd 采用的是经典的 Master Worker 模型，采用[事件驱动](https://www.tibco.com/zh-hans/reference-center/what-is-event-driven-architecture)的架构，整体的架构如下图：<br />![image.png](https://img.alicdn.com/imgextra/i2/O1CN01lCGRpI1qYFvps7ICv_!!6000000005507-2-tps-1914-1078.png)

## 触发方式

触发器承担事件驱动中的生产者的角色，Serveless-cd暂时提供了三种触发方式：

1. 通过Webhook自动触发：

开发者可以配置对应的触发条件：比如Push到Master分支，发起Merge Request。这是一种非常敏捷的开发和交付的方式

2. 通过Open api触发：

Serverless cd平台的所有的能力都提供开放了Open api。以便开发者更好的构建企业内部的PaaS平台

3. 通过CLI触发:

从技术的角度来看Serverless-Devs本质是一个CLI工作，提供了组件化的能力，所谓的组件化也就是通过热更新的机制，让开发者根据自己的需求进行拓展。Serverless-cd通过自定义组件，让开发者可以通过通过命令行直接操作。<br />当然我们也在计划接入更多的触发类型，比如 [cloudevents](https://cloudevents.io/) 触发, 定时触发等
<a name="vuIQ3"></a>

## Serverless(FaaS) 平台

FaaS平台是整个平台的核心部分，承担事件驱动中的消费者角色，采用的是经典的 Master Worker 模型。

#### Master Worker 模型在 Serverless 架构的优势
传统的Master Woker部署，为了保证Master节点的高可用，需要部署三个节点搭配负载均衡以及健康检查，来保证Master节点高可用。在Serverless架构中，实例会根据请求自动弹性扩容，Master节点天然具备高可用能力，无论在可靠性，还是灵活性都有较大的优势

#### Master 函数作用
Master 函数本质是一个 HTTP 类型函数，作为整体流量的入口，同时也是整个系统的大脑，承担着非常重要职责。

1. 安全保障
- 公网密钥校验<br />Master 暴露的 URL 地址是可以公网访问的，为了防范恶意请求，serverless-cd 系统在下发 URL 的同时也会下发签名规则。如果是恶意的请求，就无法通过校验，来保证系统的安全性
- VPC 绑定

也支持绑定VPC环境，代码仓库和serverless-cd 服务绑定在同一个VPC环境，通过Webhook触发。公网用户无法直接访问，从网络上保证了绝对的安全

2. 过滤请求

我们每天在 Git Repository 会触发各种事件，比如新建 ISSUE，PUSH 代码，发起 Merge Request 等。这些动作都会通过 Webhook 触发，开发者可以配置规则过滤相关事件。下面是一个示例：代表在 GitHub 平台提交到Master 的代码才会触发
```
triggers:
  github:
    events:
      - eventName: "push"
        filter: 'body.ref in ["refs/heads/master"]'
```

3. 路由转发

Master 函数负责将请求分发给 Worker 函数，Worker 函数所有的行为都由 Master 函数控制
<a name="Z57Ni"></a>
#### Worker函数作用
Worker 函数本质是一个事件（Event）函数，只和 Master 函数通信，唯一的职责是处理 Pipeline，可以长时间运行。
<a name="dyyPp"></a>
## 自定义 pipeline
serverless-cd 支持三种方式自定义 pipeline
<a name="pFYoc"></a>
### shell 脚本
shell 脚本是最容易理解也是使用最广泛的
```
name: "shell example"
steps:
  - run: echo Hello world
```

### zx 脚本

[google/zx](https://github.com/google/zx) 允许开发者通过javascript语法来编写您的Shell脚本
```
name: "zx example"
steps:
  - script: 'const listFile = await $`ls -la`; console.log(listFile)',
```
### 使用自定义应用（NPM Package）进行扩展
Serverless-cd也支持封装通用的NPM包进行扩展：比如钉钉通知，企业微信通知，OSS文件上传等通用能力，都可以通过自定义应用扩展。自定义应用本质是发布在NPM仓库的包。
```
name: "zx example"
steps:
  - run: @serverless-cd/dingding
```

# 快速体验

## 提前准备

serverless-cd 部署完全是基于云进行，依赖相关云产品也是Serverless化。

- [函数计算FC](https://fcnext.console.aliyun.com/)：整个系统的计算能力运行在FC上
- [日志服务SLS](https://sls.console.aliyun.com/)：分布式日志存储服务，更好的定位和发现问题
- [对象存储OSS](https://oss.console.aliyun.com/)：用于存储日志信息
- [表格存储Tablestore](https://otsnext.console.aliyun.com/): 应用和任务的云数据信息存储
<a name="X7Mq8"></a>

## 本地部署

1. 下载安装 Serverless Devs：`npm install @serverlesss-devs -g` （版本必须大于2.1.7）,详细操作引导请参考[Serverless Devs 安装文档](https://docs.serverless-devs.com/serverless-devs/install)
2. 配置密匙信息：`s config add`, 详细操作引导请参考[配置阿里云秘钥](https://docs.serverless-devs.com/serverless-devs/command/config#config-add-%E5%91%BD%E4%BB%A4)
3. 初始化项目：`s init serverless-cd`
4. 进入项目并部署：`cd serverless-cd && s deploy`


# 开源共建

[Serverless-cd](https://github.com/Serverless-Devs/serverless-cd) 是业界首个基于 Serverless 架构的 CI/CD 的探索，欢迎大家关注我们的开源地址：[https://github.com/Serverless-Devs/serverless-cd](https://github.com/Serverless-Devs/serverless-cd) 。Serverless-cd 刚刚开源，还有大量的细节和工作，期待与更多开发者一起共建 Serevrless 生态，让开发者可以心无旁骛的专注业务开发和价值创造。
