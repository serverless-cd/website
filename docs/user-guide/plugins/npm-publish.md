---
sidebar_position: 3
title: 发布npm包
---

# 发布npm包(npm-publish)

## 快速体验
### 前期准备
1. 准备好npm [access token](https://docs.npmjs.com/creating-and-viewing-access-tokens/)
2. 将npm

### 快速开始
```
- name: npm publish
  plugin: @serverless-cd/npm-publish
  inputs:
    token: ${{ secrets.npm_token }} 
    codeDir: ./code # 默认为代码库根目录
```

## 字段解析

| 参数名   | 必填 |  参数描述   |
| --------- | ---- | ------- | 
|  token    | Frue |   是否加签    |
|  registry    | False |   npm registry地址，默认为//registry.npmjs.org。如果是私有仓库需要单独填写   |
|  codeDir    | False |   需要发布的代码目录，默认为更目录./code    |


## 注意事项
### 作为普通的NPM Module使用

