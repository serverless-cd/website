---
sidebar_position: 1
title: 钉钉告警
---

# 钉钉告警(ding-talk)
> 发送钉钉通知插件

## 快速体验
### 前期准备
1. 下载钉钉，并且在群里[新建钉钉机器人](https://open.dingtalk.com/document/robots/custom-robot-access)


### 快速开始
```
- name: Markdown message
  plugin: @serverless-cd/ding-talk
  inputs:
  	webhook: https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxx
    msgtype: markdown
    payload:
      title: 杭州天气
      text: "#### 杭州天气 @150XXXXXXXX \n > 9度，西北风1级，空气良89，相对温度73%\n > ![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n > ###### 10点20分发布 [天气](https://www.dingtalk.com) \n"
```

## 字段解析

| 参数名   | 必填 |  参数描述   |
| --------- | ---- | ------- | 
|  webhook    | True |   机器人的 webhook 地址    |
|  secret    | False |   是否加签    |
|  at    | False |   @ 配置，[格式说明](#at)    |
|  msgtype    | False |  文案类型： `text`、`link`、`markdown`、`actionCard`、`feedCard`。默认 `text` |
|  payload | True | 发送消息载体，根据 msgtype 类型不同填写不同。详细参考 [格式说明](#payload) ｜

### at

| 参数名   | 必填 |  参数描述   |
| --------- | ---- | ------- | 
| isAtAll | False | 是否@所有人。Boolean 类型，默认为 `false` ｜
| atUserIds | False | 被@人的用户userid。Array`<String>` ｜
| atMobiles | False | 被@人的手机号。Array`<String>` ｜


### payload

#### text
| 参数名   | 必填 |  参数描述   |
| --------- | ---- | ------- | 
| content | True | 文案内容 ｜

示例：
```
- name: Text
  plugin: @serverless-cd/ding-talk
  inputs:
  	webhook: https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxx
    msgtype: text
    payload:
      content: 我就是我, @XXX 是不一样的烟火
```

#### link
| 参数名   | 必填 |  参数描述   |
| --------- | ---- | ------- | 
| text | True | 消息标题。 ｜
| title | True | 消息内容。如果太长只会部分展示。 ｜
| messageUrl | True | 图片URL。 ｜
| picUrl | True | 点击消息跳转的URL ｜

示例：
```
- name: Link
  plugin: @serverless-cd/ding-talk
  inputs:
  	webhook: https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxx
    msgtype: link
    payload:
      text: 我们的中国
      title: 中国
      picUrl: "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png", 
      messageUrl: "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png"
```

#### markdown
| 参数名   | 必填 |  参数描述   |
| --------- | ---- | ------- | 
| text | True | 消息标题。 ｜
| title | True | 消息内容。如果太长只会部分展示。 ｜
| messageUrl | True | 图片URL。 ｜
| picUrl | True | 点击消息跳转的URL ｜

示例：
```
- name: Markdown
  plugin: @serverless-cd/ding-talk
  inputs:
  	webhook: https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxx
    msgtype: markdown
    payload:
      title: 杭州天气
      text: "#### 杭州天气 @150XXXXXXXX \n > 9度，西北风1级，空气良89，相对温度73%\n > ![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n > ###### 10点20分发布 [天气](https://www.dingtalk.com) \n"
```

#### actionCard
| 参数名   | 必填 |  参数描述   |
| --------- | ---- | ------- | 
| text | True | 消息标题。 ｜
| title | True | 消息内容。如果太长只会部分展示。 ｜
| messageUrl | True | 图片URL。 ｜
| picUrl | True | 点击消息跳转的URL ｜

示例：
```
- name: ActionCard
  plugin: @serverless-cd/ding-talk
  inputs:
  	webhook: https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxx
    msgtype: actionCard
    payload:
      title: 我们乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身
      text: "![screenshot](https://gw.alicdn.com/tfsTB1ut3xxbsrBKNjSZFpXXcXhFXa-846-786.png) \n ### 乔布斯 20 年前想打造的苹果咖啡厅 \n Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划"
      btnOrientation: 0
      singleTitle: 阅读全文
      singleURL: https://www.dingtalk.com/
```


#### feedCard
| 参数名   | 必填 |  参数描述   |
| --------- | ---- | ------- | 
| text | True | 消息标题。 ｜
| title | True | 消息内容。如果太长只会部分展示。 ｜
| messageUrl | True | 图片URL。 ｜
| picUrl | True | 点击消息跳转的URL ｜

示例：
```
- name: FeedCard
  plugin: @serverless-cd/ding-talk
  inputs:
  	webhook: https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxx
    msgtype: feedCard
    payload:
      links:
        - title: 时代的火车向前开
          messageURL: https://www.dingtalk.com/
          picURL: https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png
        - title: 时代的火车向前开2
          messageURL: https://www.dingtalk.com/
          picURL: https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png
```

## 注意事项
### 使用动态魔法变量
本插件可以使用Serverless-cd的全局context变量

### 作为普通的NPM Module使用
