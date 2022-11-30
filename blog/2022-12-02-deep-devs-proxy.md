---
slug: deep-devs-proxy
title: Serverless-Devs 技术解析：全局proxy代理
authors: [mamba, wss]
tags: [CI/CD, Serverless-Devs]
---


# 背景
[Serverless Devs](https://github.com/Serverless-Devs/Serverless-Devs)是一款**企业级**的，帮助用户管理Serverless**应用全生命周期**的开发者工具。企业内部有着比较严格的网络管控，比如可以控制下载哪些应用，访问哪些网站，以及浏览记录审计等。这些一般是通过代理服务器来实现。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/22111491/1666267127530-205ad311-1f04-4402-ac94-d5ee93384553.png#clientId=u59a6cfdc-6adb-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=343&id=uf9aa8de8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=686&originWidth=1386&originalType=binary&ratio=1&rotation=0&showTitle=false&size=144926&status=error&style=none&taskId=u92f34c0e-9a6e-4ed9-b29f-542425072b0&title=&width=693)<br />Serverless-Devs是一个组件（插件）化的工具。通过热加载的技术，所有的业务能力都是动态加载执行的。意味着所有的组件开发者可以自由的使用自己的喜欢的库和网络进行交互。如果需要实现上述的代理的能力，不太可能case by case 的去做处理，就需要全局的代理的能力。


# HTTP 代理服务器搭建
Squid 是一款广泛用于Linux和Unix平台的代理软件，对于我们实验有几个好处

- 搭建简单
- 可以方便查看访问日志，易于观察和验证

## 在CentOS7安装Squid
```
sudo yum install squid
```
安装完成后，启动并启用Squid服务
```
systemctl start squid
systemctl enable squid
```
验证是否成功，通过status命令查看
```
systemctl status squid
```

## 修改默认配置
打开squid.conf文件
```
/etc/squid/squid.conf
```

### 允许所有的IP进行代理访问
```
http_access allow all
```

### 允许代理HTTPS请求

#### 创建一个自签名的SSL证书

1. 转至 Squid 服务文件夹车，并创建SSL证书
```
$ cd /etc/squid
$ openssl req -new -newkey rsa:2048 -nodes -x509 -keyout bump.key -out bump.crt
```

2. 将证书文件转换为 DER 格式的受信任证书以便它可以被导入浏览器中
```
openssl x509 -in bump.crt -outform DER -out bump.der
```

#### 配置ssl_bump (适用于3.5.x版本)
```
http_port 3128 tcpkeepalive=60,30,3 ssl-bump generate-host-certificates=on dynamic_cert_mem_cache_size=20MB cert=/etc/squid/bump.crt key=/etc/squid/bump.key cipher=HIGH:MEDIUM:!LOW:!RC4:!SEED:!IDEA:!3DES:!MD5:!EXP:!PSK:!DSS options=NO_TLSv1,NO_SSLv3,NO_SSLv2,SINGLE_DH_USE,SINGLE_ECDH_USE tls-dh=prime256v1:/etc/squid/bump_dhparam.pem

sslcrtd_program /usr/lib64/squid/ssl_crtd -s /var/lib/squid/ssl_db -M 20MB

sslproxy_cert_error allow all

ssl_bump stare all
```

# 全局HTTP代理方案调研

## http_proxy环境变量
很多软件都识别http_proxy, https_proxy两个环境变量，比如curl ,wget

- Linux/Unix和macOS配置
```
export http_proxy=http://192.168.1.2:3128
export https_proxy=http://192.168.1.2:3128
```
通过终端输入 `env` 指令验证是否生效<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/22111491/1666269333135-c1bc6a5b-6f20-49ad-8422-ec09634e00df.png#clientId=u59a6cfdc-6adb-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=110&id=u2e3f3ab4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=220&originWidth=1142&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47141&status=error&style=none&taskId=u6ffe1853-573a-4d16-93b7-ab24bb602a5&title=&width=571)

- Windows
```
set http_proxy=http://192.168.1.2:3128
set https_proxy=http://192.168.1.2:3128
```

#### 通过access.log 验证 是否生效

# ![squid.gif](https://cdn.nlark.com/yuque/0/2022/gif/22111491/1666281165969-794d9967-7376-490f-862d-96f0d8e455ac.gif#clientId=u5032cb36-1756-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=drop&id=u9e58ef55&margin=%5Bobject%20Object%5D&name=squid.gif&originHeight=500&originWidth=1192&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1373707&status=error&style=none&taskId=uaf24aec1-eade-4680-ac1f-51b817bcbb6&title=)
我们可以看到配置了http_proxy  环境变量，在本地执行 `curl -i [http://www.aliyun.com/serverless](http://www.aliyun.com/serverless)` 能够自动代理到代理服务器中。<br />不过可惜的是Nodejs并不能自动识别这个环境变量


## http.Agent
http.Agent 主要是为 http.request, http.get 提供代理服务的，用于管理 http 连接的创建，销毁及复用工作。http.Agent默认使用 http.globalAgent 作为代理，每次请求都是“建立连接-数据传输-销毁连接”的过程，如果我们想让多个请求复用同一个 connection，则需要重新定义 agent 去覆盖默认的 http.globalAgent。基本所有Nodejs 生态的网络请求的库，都支持Agent模式

### got
[https://github.com/sindresorhus/got/blob/main/documentation/tips.md#proxying](https://github.com/sindresorhus/got/blob/main/documentation/tips.md#proxying)
```
import got from 'got';
import {HttpsProxyAgent} from 'hpagent';

await got('https://sindresorhus.com', {
	agent: {
		https: new HttpsProxyAgent({
			keepAlive: true,
			keepAliveMsecs: 1000,
			maxSockets: 256,
			maxFreeSockets: 256,
			scheduling: 'lifo',
			proxy: 'https://localhost:8080'
		})
	}
});
```

### httpx
[https://github.com/JacksonTian/httpx](https://github.com/JacksonTian/httpx)
```
const proxy = require('proxy-agent');
const httpx = require('httpx');

httpx.request('http://www.baidu.com/', {
  // pass a http proxy agent
  agent: new ProxyAgent("https://yourproxy:123")
});
```

### axios
[https://github.com/axios/axios](https://github.com/axios/axios)
```
proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    // hostname: '127.0.0.1' // Takes precedence over 'host' if both are defined
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  }
```

但是很遗憾，在Serverless Devs生态中用到了基本上述的所有的库。不太可能逐一进行修改。

## 全局代理
本质上所有的请求都是使用下面几个原始的API
```json
const httpGet = http.get;
const httpRequest = http.request;
const httpsGet = https.get;
const httpsRequest = https.request;
```
所以只需要在程序初始化之前，将`http.get` 替换为 `http.get({agent: proxyAgent})`，而这个这个其实就是 我们自己实现统一代理的Agent。[global-agent](https://www.npmjs.com/package/global-agent) 这个库已经帮我们做了相应的封装<br />下面是一个简单的Demo示例
```
const httpx = require('httpx');
const globalAgent = require('global-agent');

globalAgent.bootstrap();
global.GLOBAL_AGENT.HTTP_PROXY = "http://192.168.1.2:3128";
global.GLOBAL_AGENT.HTTPS_PROXY = "http://192.168.1.2:3128";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


httpx.request('http://www.aliyun.com/activity').then((response) => {
  response.pipe(process.stdout);
  response.on('end', () => {
    process.stdout.write('end');
  });
}, (err) => {
  console.log(err)
  // on error
});
```
通过观察Squid代理的 access.log，验证结果代理是生效的

# 参考资料

1. ssl bump 配置

[https://support.kaspersky.com/KWTS/6.1/zh-Hans/166244.htm](https://support.kaspersky.com/KWTS/6.1/zh-Hans/166244.htm)<br />[https://foamzou.com/2017/09/23/squid-proxy-with-ssl-bump/](https://foamzou.com/2017/09/23/squid-proxy-with-ssl-bump/)

2. nodejs全局代理

[https://www.npmjs.com/package/global-agent](https://www.npmjs.com/package/global-agent)