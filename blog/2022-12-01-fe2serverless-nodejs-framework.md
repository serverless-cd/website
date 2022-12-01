---
slug: fe2serverless-nodejs-framework
title: 前端遇见Serverless：Nodejs 框架选型
authors: [mamba, wss]
tags: [CI/CD, Serverless-Devs]
---

# 背景
在FaaS 的世界中，Nodejs和Python是绝对的王者。Python在运维，AI以及数据处理方面有着非常广泛应用场景。而Nodejs备受前端开发者的青睐。前端的天职是专注于提供更好的用户体验，对服务器运维，高并发，弹性扩展等领域接触不多。有了FaaS后，前端同学只需要专注应用的开发。由于Nodejs应用一般应用在Api Server的web场景。根据网页打开3s打开原则，接口一般要求在1s之内返回，否则整体用户体验会比较糟糕。所以优化启动速度就成了重中之重。

# 什么是冷启动
谈到FaaS,永远绕不开一个关键词 **冷启动**，冷启动犹如过街老鼠，各个Serverless的文章都在谈到如何优化冷启动。但是正是由于有了冷启动，我们才能享受FaaS的各种红利。

## 冷启动带来的好处
拿Nodejs举例，我们知道Nodejs是单线程的模型，这样的架构非常脆弱，一旦主线程有异常或者耗时操作，整个应用就崩溃了，同时也无法很好的利用操作系统的多核能力，提供更好的性能。Nodejs社区提供了[cluster](https://nodejs.org/api/cluster.html) 方案，实现了经典的master-worker的架构一方面更好的利用CPU多核能力，另一方面如果某个worker进程崩溃了，Master进程立即重新fork出新的Worker进程，保证服务的稳定性。很多Nodejs应用都会安装 [pm2](https://pm2.keymetrics.io/) 这样的进程管理工具，例如[egg.js](https://www.eggjs.org/) 框架通过`egg-cluster`提供了进程管理的能力
```
+---------+                 +---------+
   |  Worker |                 |  Master |
   +---------+                 +----+----+
        | uncaughtException         |
        +------------+              |
        |            |              |                   +---------+
        | <----------+              |                   |  Worker |
        |                           |                   +----+----+
        |        disconnect         |   fork a new worker    |
        +-------------------------> + ---------------------> |
        |         wait...           |                        |
        |          exit             |                        |
        +-------------------------> |                        |
        |                           |                        |
       die                          |                        |
                                    |                        |
                                    |                        |
```

有了FaaS后，就不需要使用上面的**cluster**模型了。<br />我们可以看到，每个request请求，FaaS平台都会新建一个单独的**新的实例**(instance)进行处理<br />所以多个请求之间并不会发生任何共享和抢占的行为，当然不会因为上一个用户请求异常造成下个用户不可用的情况，也保证了服务的高可用。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/22111491/1667390442726-8211f1de-c81a-488d-9e06-4bcb1bf2e273.png#clientId=u98dcae74-a366-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=454&id=u63a2ede7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=908&originWidth=1044&originalType=binary&ratio=1&rotation=0&showTitle=false&size=280671&status=done&style=none&taskId=u155aff6d-934e-4d10-a0b3-2740424ba79&title=&width=522)


## 冷启动带来的问题
我们在来详细看下在FaaS平台，Nodejs应用是如何启动的