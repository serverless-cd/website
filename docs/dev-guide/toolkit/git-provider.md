---
sidebar_position: 4
title: git代码托管平台能力
---

# git 代码托管平台能力(@serverless-cd/git-provider)

针对 github、gitee、gitlab 和阿里云 codeup 做一些特殊的处理，尽可能处理掉不同平台的差异

## 安装

```bash
$ npm install @serverless-cd/git-provider --save
```

## 示例

```typescript
import git from "@serverless-cd/git-provider";

const github = git("github", { access_token: "ghp_xxxx" });
await github.listOrgs();

const gitee = git("gitee", { access_token: "xxxxxxx" });
await gitee.listRepos();

const gitlab = git("gitlab", {
  access_token: "xxxxxxx",
  endpoint: "https://gitlab.com",
});

const codeup = git("codeup", {
  access_token: "xxxxxxx",
  accessKeyId: "xxxxxxx",
  accessKeySecret: "xxxxxxx",
});
```

### 参数解析

> const prioverd = git(priover, config);

| 参数    | 说明                                                     | 类型                    | 必填 | 默认值 |
| ------- | -------------------------------------------------------- | ----------------------- | ---- | :----: |
| priover | 供应商。目前仅支持 `github`、`gitee`、`gitlab`、`codeup` | string                  | 是   |   -    |
| config  | 密钥信息配置                                             | [GitConfig](#GitConfig) | 是   |   -    |

#### GitConfig

`github` 和 `gitee`

| 参数         | 说明     | 类型   | 必填 | 默认值 |
| ------------ | -------- | ------ | ---- | :----: |
| access_token | 私人令牌 | string | 是   |   -    |

`gitlab`

| 参数         | 说明         | 类型   | 必填 | 默认值 |
| ------------ | ------------ | ------ | ---- | :----: |
| access_token | 私人令牌     | string | 是   |   -    |
| endpoint     | 访问域名地址 | string | 是   |   -    |

`codeup`

| 参数            | 说明                        | 类型   | 必填 | 默认值 |
| --------------- | --------------------------- | ------ | ---- | :----: |
| access_token    | 私人令牌                    | string | 是   |   -    |
| accessKeyId     | aliyun 密钥 accessKeyId     | string | 是   |   -    |
| accessKeySecret | aliyun 密钥 accessKeySecret | string | 是   |   -    |
| securityToken   | aliyun 密钥 securityToken   | string | 否   |   -    |

## 方法

### 获取用户的仓库 listRepos

> [github 接口文档](https://docs.github.com/en/rest/repos/repos#list-repositories-for-the-authenticated-user)  
> [gitee 接口文档](https://docs.github.com/en/rest/repos/repos#list-repositories-for-the-authenticated-user)  
> [codeup 接口文档](https://help.aliyun.com/document_detail/460465.html)

#### `gitee`、`github` 示例

```typescript
await prioverd.listRepos();
```

#### `codeup` 示例

```typescript
await prioverd.listRepos({ organization_id: "xxx" });
```

参数解析

| 参数            | 说明                                                                                      | 类型   | 必填 | 默认值 |
| --------------- | ----------------------------------------------------------------------------------------- | ------ | ---- | :----: |
| organization_id | 企业标识，也称企业 id。可在云效访问链接中获取，如 https://devops.aliyun.com/organization/ | string | 是   |   -    |

#### `gitlab` 暂未支持

#### 返回值

返回示例

```json
[
  {
    "id": 0000,
    "name": "xxxxxxxx",
    "url": "xxxxxxxx",
    "avatar_url": "xxxxxxxx",
    "owner": "xxxxxxxx",
    "private": false,
    "description": "xxxxxxxx",
    "default_branch": "xxxxxxxx",
    "source": {}
  }
]
```

详细描述

返回类型为 Array<[ListReposRes](#listReposRes)\>

<div id="listReposRes"/>

| 参数           | 类型    | 说明                 |
| -------------- | ------- | -------------------- |
| id             | number  | 仓库唯一 id 值       |
| name           | string  | 仓库名称             |
| url            | string  | 仓库访问地址         |
| avatar_url     | string  | 头像地址             |
| owner          | string  | 仓库拥有者           |
| private        | boolean | 是否私有             |
| description    | string  | 仓库描述             |
| default_branch | string  | 默认分之             |
| source         | any     | 各自平台返回的数据源 |

### 获取用户的仓库 listBranches

> [github 接口文档](https://docs.github.com/en/rest/branches/branches#list-branches)  
> [gitee 接口文档](https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoBranches)  
> [codeup 接口文档](https://help.aliyun.com/document_detail/461641.html)  
> [gitlab 接口文档](https://www.bookstack.cn/read/gitlab-doc-zh/docs-296.md#7tkudr)

#### `gitee`、`github`、`gitlab` 示例

```typescript
await prioverd.listBranches({
  owner: "xxxxxxxx",
  repo: "xxxxxxxx",
});
```

参数解析

| 参数  | 说明       | 类型   | 必填 | 默认值 |
| ----- | ---------- | ------ | ---- | :----: |
| owner | 仓库拥有者 | string | 是   |   -    |
| repo  | 仓库名称   | string | 是   |   -    |

#### `codeup` 示例

```typescript
await prioverd.listBranches({
  project_id: 00000,
  organization_id: "xxxxxxxx",
});
```

参数解析

| 参数            | 说明                    | 类型   | 必填 | 默认值 |
| --------------- | ----------------------- | ------ | ---- | :----: |
| organization_id | 企业标识，也称企业 id。 | string | 是   |   -    |
| project_id      | 代码库 ID               | number | 是   |   -    |

#### 返回值

返回示例

```json
[
  {
    "name": "xxxxxxxx",
    "commit_sha": "xxxxxxxx",
    "source": {}
  }
]
```

详细描述

返回类型为 Array<[ListBranches](#listBranches)\>

<div id="listBranches"/>

| 参数       | 类型   | 说明                 |
| ---------- | ------ | -------------------- |
| name       | string | 分之名称             |
| commit_sha | string | 最近一次提交 ID      |
| source     | any    | 各自平台返回的数据源 |

### 获取传入 Branch/Tag 最近一次 Commit getRefCommit

> [github 接口文档](https://docs.github.com/en/rest/commits/commits#get-a-commit)  
> [gitee 获取 branch ](https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoBranchesBranch)、 [gitee 获取 tag ](https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoReleasesTagsTag)

<!-- > [codeup 接口文档]()
> [gitlab 接口文档]()    -->

#### `gitee`、`github` 示例

```typescript
await prioverd.getRefCommit({
  owner: "xxxxxx",
  repo: "xxxxxx",
  ref: "refs/heads/xxx", // 'refs/tags/xxx'
});
```

参数解析

| 参数  | 说明                                               | 类型   | 必填 | 默认值 |
| ----- | -------------------------------------------------- | ------ | ---- | :----: |
| owner | 仓库拥有者                                         | string | 是   |   -    |
| repo  | 仓库名称                                           | string | 是   |   -    |
| ref   | ref 参数。仅支持 `refs/tags/` 和 `ref/heads/` 开头 | string | 是   |   -    |

#### `codeup`、`gitlab` 暂未支持

#### 返回值

返回示例

```json
{
  "name": "xxxxxxxx",
  "commit_sha": "xxxxxxxx",
  "source": {}
}
```

详细描述

| 参数       | 类型   | 说明                 |
| ---------- | ------ | -------------------- |
| name       | string | 分之名称             |
| commit_sha | string | 最近一次提交 ID      |
| source     | any    | 各自平台返回的数据源 |

### 通过 commitId 获取信息 getCommitById

> [github 接口文档](https://docs.github.com/en/rest/commits/comments#get-a-commit-comment) 其中文档存在一些异常：GET /repos/{owner}/{repo}/comments/{sha} => GET /repos/{owner}/{repo}/commits/{sha}  
> [gitee 接口文档](https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoCommitsSha)

<!-- > [codeup 接口文档]()
> [gitlab 接口文档]()    -->

#### `gitee`、`github`、`gitlab` 示例

```typescript
await prioverd.getCommitById({
  owner: "xxxxxx",
  repo: "xxxxxx",
  sha: "xxxxx",
});
```

参数解析

| 参数  | 说明          | 类型   | 必填 | 默认值 |
| ----- | ------------- | ------ | ---- | :----: |
| owner | 仓库拥有者    | string | 是   |   -    |
| repo  | 仓库名称      | string | 是   |   -    |
| sha   | 提交信息的 id | string | 是   |   -    |

#### `codeup` 示例

```typescript
await prioverd.getCommitById({
  project_id: 00000,
  organization_id: "xxxxxxxx",
  sha: "xxxxx",
});
```

参数解析

| 参数            | 说明                    | 类型   | 必填 | 默认值 |
| --------------- | ----------------------- | ------ | ---- | :----: |
| organization_id | 企业标识，也称企业 id。 | string | 是   |   -    |
| project_id      | 代码库 ID               | number | 是   |   -    |
| sha             | 提交信息的 id           | string | 是   |   -    |

#### 返回值

返回示例

```json
{
  "message": "xxxxxxxx",
  "sha": "xxxxxxxx",
  "source": {}
}
```

详细描述

| 参数    | 类型   | 说明                 |
| ------- | ------ | -------------------- |
| message | string | 提交的描述信息       |
| sha     | string | 提交信息的 id        |
| source  | any    | 各自平台返回的数据源 |

### 获取 webhook 列表 listWebhook

> [github 接口文档](https://docs.github.com/en/rest/webhooks/repos)  
> [gitee 接口文档](https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoHooks)

<!-- > [codeup 接口文档]()
> [gitlab 接口文档]() -->

#### `gitee`、`github` 示例

```typescript
await prioverd.listWebhook({
  owner: "xxxxxx",
  repo: "xxxxxx",
});
```

参数解析

| 参数  | 说明       | 类型   | 必填 | 默认值 |
| ----- | ---------- | ------ | ---- | :----: |
| owner | 仓库拥有者 | string | 是   |   -    |
| repo  | 仓库名称   | string | 是   |   -    |

#### `codeup`、`gitlab` 暂未支持

#### 返回值

返回示例

```json
[
  {
    "id": 0000,
    "url": "xxxxxxxx",
    "source": {}
  }
]
```

详细描述

返回类型为 Array<[ListWebhook](#listWebhook)\>

<div id="listWebhook"/>

| 参数   | 类型   | 说明                 |
| ------ | ------ | -------------------- |
| id     | number | webhook Id 值        |
| url    | string | url 配置信息         |
| source | any    | 各自平台返回的数据源 |

### 创建 webhook createWebhook

> [github 接口文档](https://docs.github.com/en/rest/webhooks/repos#create-a-repository-webhook)  
> [gitee 接口文档](https://gitee.com/api/v5/swagger#/postV5ReposOwnerRepoHooks)

<!-- > [codeup 接口文档]()
> [gitlab 接口文档]() -->

#### `gitee`、`github` 示例

```typescript
await prioverd.createWebhook({
  owner: "xxxx",
  repo: "xxxx",
  url: "xxxx",
  secret: "xxxxx",
  events: ["push", "release", "pull_request", "issues"],
});
```

参数解析

| 参数   | 说明                | 类型                                                      | 必填 |        默认值         |
| ------ | ------------------- | --------------------------------------------------------- | ---- | :-------------------: |
| owner  | 仓库拥有者          | string                                                    | 是   |           -           |
| repo   | 仓库名称            | string                                                    | 是   |           -           |
| url    | 触发的 webhook 地址 | string                                                    | 是   |           -           |
| secret | 签名密钥            | string                                                    | 否   |           -           |
| events | 触发的事件          | Array<'push' \| 'release' \| 'pull_request' \| 'issues'\> | 否   | `['push', 'release']` |

#### `codeup`、`gitlab` 暂未支持

#### 返回值

返回示例

```json
{
  "id": 0000,
  "source": {}
}
```

详细描述

| 参数   | 类型   | 说明                 |
| ------ | ------ | -------------------- |
| id     | number | webhook Id 值        |
| source | any    | 各自平台返回的数据源 |

### 获取 webhook 信息 getWebhook

> [github 接口文档](https://docs.github.com/en/rest/webhooks/repos#get-a-repository-webhook)  
> [gitee 接口文档](https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoHooksId)

<!-- > [codeup 接口文档]()
> [gitlab 接口文档]() -->

#### `gitee`、`github` 示例

```typescript
await prioverd.getWebhook({
  owner: "xxxx",
  repo: "xxxx",
  hook_id: 00000,
});
```

参数解析

| 参数    | 说明          | 类型   | 必填 | 默认值 |
| ------- | ------------- | ------ | ---- | :----: |
| owner   | 仓库拥有者    | string | 是   |   -    |
| repo    | 仓库名称      | string | 是   |   -    |
| hook_id | webhook 的 ID | string | 是   |   -    |

#### `codeup`、`gitlab` 暂未支持

#### 返回值

返回示例

```json
{
  "id": 0000,
  "url": "xxxxxxxx",
  "source": {}
}
```

详细描述

| 参数   | 类型   | 说明                 |
| ------ | ------ | -------------------- |
| id     | number | webhook Id 值        |
| url    | string | 触发的 webhook 地址  |
| source | any    | 各自平台返回的数据源 |

### 修改 webhook updateWebhook

> [github 接口文档](https://docs.github.com/en/rest/webhooks/repos#update-a-repository-webhook)  
> [gitee 接口文档](https://gitee.com/api/v5/swagger#/patchV5ReposOwnerRepoHooksId)

<!-- > [codeup 接口文档]()
> [gitlab 接口文档]() -->

#### `gitee`、`github` 示例

```typescript
await prioverd.updateWebhook({
  owner: "xxxx",
  repo: "xxxx",
  url: "xxxx",
  hook_id: 00000,
  secret: "xxxxx",
  events: ["push", "release", "pull_request", "issues"],
});
```

参数解析

| 参数    | 说明                                   | 类型                                                      | 必填 | 默认值 |
| ------- | -------------------------------------- | --------------------------------------------------------- | ---- | :----: |
| owner   | 仓库拥有者                             | string                                                    | 是   |   -    |
| repo    | 仓库名称                               | string                                                    | 是   |   -    |
| hook_id | webhook 的 ID                          | string                                                    | 是   |   -    |
| url     | 触发的 webhook 地址                    | string                                                    | 是   |   -    |
| secret  | 签名密钥                               | string                                                    | 否   |   -    |
| events  | 触发的事件，默认 `['push', 'release']` | Array<'push' \| 'release' \| 'pull_request' \| 'issues'\> | 否   |   -    |

#### `codeup`、`gitlab` 暂未支持

#### 返回值

无

### 删除 webhook deleteWebhook

> [github 接口文档](https://docs.github.com/en/rest/webhooks/repos#delete-a-repository-webhook)  
> [gitee 接口文档](https://gitee.com/api/v5/swagger#/deleteV5ReposOwnerRepoHooksId)

<!-- > [codeup 接口文档]()
> [gitlab 接口文档]() -->

#### `gitee`、`github` 示例

```typescript
await prioverd.deleteWebhook({
  owner: "xxxx",
  repo: "xxxx",
  hook_id: 00000,
});
```

参数解析

| 参数    | 说明          | 类型   | 必填 | 默认值 |
| ------- | ------------- | ------ | ---- | :----: |
| owner   | 仓库拥有者    | string | 是   |   -    |
| repo    | 仓库名称      | string | 是   |   -    |
| hook_id | webhook 的 ID | string | 是   |   -    |

#### `codeup`、`gitlab` 暂未支持

#### 返回值

无

### 推送文件 putFile

> [github 接口文档](https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents)

<!-- > [gitee 接口文档]()
> [codeup 接口文档]()
> [gitlab 接口文档]() -->

#### `github` 示例

```typescript
await prioverd.putFile({
  owner: "xxxx",
  repo: "xxxx",
  path: "filename.txt",
  message: "commit message",
  content: "content",
});
```

参数解析

| 参数    | 说明           | 类型   | 必填 | 默认值 |
| ------- | -------------- | ------ | ---- | :----: |
| owner   | 仓库拥有者     | string | 是   |   -    |
| repo    | 仓库名称       | string | 是   |   -    |
| path    | 创建文件的路径 | string | 是   |   -    |
| message | commit 信息    | string | 是   |   -    |
| content | 推送的内容信息 | string | 是   |   -    |
| branch  | 推送的分支     | string | 否   | 主分支 |

#### `gitee`、`codeup`、`gitlab` 暂未支持

#### 返回值

无

### 获取组织信息 listOrgs

> [github 接口文档](https://docs.github.com/en/rest/orgs/orgs#list-organizations-for-the-authenticated-user)  
> [gitee 接口文档](https://gitee.com/api/v5/swagger#/getV5UserOrgs)

<!-- > [codeup 接口文档]()
> [gitlab 接口文档]() -->

#### `gitee`、`github` 示例

```typescript
await prioverd.listOrgs();
```

#### `codeup`、`gitlab` 暂未支持

#### 返回值

返回示例

```json
[
  {
    "org": "xxxxxxxx",
    "id": 00000,
    "source": {}
  }
]
```

详细描述

返回类型为 Array<[ListOrgs](#listOrgs)\>

<div id="ListOrgs"/>

| 参数   | 类型   | 说明                 |
| ------ | ------ | -------------------- |
| id     | number | 组织 id              |
| org    | string | 组织名称             |
| source | any    | 各自平台返回的数据源 |

### 获取组织的仓库 listOrgRepos

> [github 接口文档](https://docs.github.com/cn/rest/repos/repos#list-organization-repositories)

<!-- > [gitee 接口文档]()
> [codeup 接口文档]()
> [gitlab 接口文档]() -->

#### `github` 示例

```typescript
const org = "xxx";
await prioverd.listOrgRepos(org);
```

参数解析

| 参数 | 说明     | 类型   | 必填 | 默认值 |
| ---- | -------- | ------ | ---- | :----: |
| org  | 组织名称 | string | 是   |   -    |

#### `gitee`、`codeup`、`gitlab` 暂未支持

#### 返回值

返回示例

```json
[
  {
    "id": 0000,
    "name": "xxxxxxxx",
    "url": "xxxxxxxx",
    "avatar_url": "xxxxxxxx",
    "owner": "xxxxxxxx",
    "private": false,
    "description": "xxxxxxxx",
    "default_branch": "xxxxxxxx",
    "source": {}
  }
]
```

详细描述

返回类型为 Array<[ListOrgRepos](#listOrgRepos)\>

<div id="listOrgRepos"/>

| 参数           | 类型    | 说明                 |
| -------------- | ------- | -------------------- |
| id             | number  | 仓库唯一 id 值       |
| name           | string  | 仓库名称             |
| url            | string  | 仓库访问地址         |
| avatar_url     | string  | 头像地址             |
| owner          | string  | 仓库拥有者           |
| private        | boolean | 是否私有             |
| description    | string  | 仓库描述             |
| default_branch | string  | 默认分之             |
| source         | any     | 各自平台返回的数据源 |

### 获取组织的仓库 createFork

> [github 接口文档](https://docs.github.com/en/rest/repos/forks#create-a-fork)  
> [gitee 接口文档](https://gitee.com/api/v5/swagger#/postV5ReposOwnerRepoForks)  
> [gitlab 接口文档](https://docs.gitlab.com/ee/api/projects.html#fork-project)

#### `github`、`gitee`、`gitlab` 示例

```typescript
await prioverd.createFork({
  owner: "xxxxxx",
  repo: "xxxxxx",
});
```

参数解析

| 参数 | 说明     | 类型   | 必填 | 默认值 |
| ---- | -------- | ------ | ---- | :----: |
| owner  | 仓库所属空间地址 | string | 是   |   -    |
| repo  | 仓库名称 | string | 是   |   -    |

#### `codeup` 暂未支持

#### 返回值

返回示例

```json
[
  {
    "id": 0000,
    "full_name": "xxxx",
    "url": "xxxx",
  }
]
```

详细描述

返回类型为 Array<[IForkOutput](#IForkOutput)\>
<div id="IForkOutput"/>


| 参数           | 类型    | 说明                 |
| -------------- | ------- | -------------------- |
| id             | number  | 仓库唯一 id 值       |
| full_name      | string  | 仓库名称             |
| url            | string  | 仓库访问地址         |

### 创建一个仓库 createRepo

> [github 接口文档](https://docs.github.com/en/rest/repos/forks#create-a-fork)  
> [gitee 接口文档](https://gitee.com/api/v5/swagger#/postV5UserRepos)  
> [gitlab 接口文档](https://docs.gitlab.com/ee/api/projects.html#create-project)  
> [codeup 接口文档](https://help.aliyun.com/document_detail/215681.html)

#### `github`、`gitee` 示例

```typescript
await prioverd.createRepo({
  name: "xxxx",
  private: false,
  description: "xxxx"
});
```

#### `gitlab` 示例

```typescript
await prioverd.createRepo({
  name: "xxxx",
  visibility: ["Private", "Public"],
  description: "xxxx"
});
```

#### `codeup` 示例

```typescript
await prioverd.createRepo({
  name: "xxxx",
  organization_id: "xxxx",
  visibility_level: [0, 10],
  description: "xxxx",
});
```


参数解析

| 参数 | 说明     | 类型   | 必填 | 默认值 |
| ---- | -------- | ------ | ---- | :----: |
| name  | 仓库名称 | string | 是   |   -    |
| private        | 是否私有 | boolean  | 否   |   false    |
| description    | 仓库描述  | string  |   否  |     -      |
| visibility    | 仓库可见  | Array<'Private' \| 'Public'>  |   否   |     'Private'      |
| visibility_level    | 代码仓库可见性 0 - 私有，仅代码库成员可见 10 - 企业内公开，企业成员可见 | Array<0 \| 10>  |   否   |     0      |
| organization_id  | 企业标识，也称企业 id。 | string | 是   |   -    |

#### 返回值

返回示例

```json
[
  {
    "id": 0000,
    "full_name": "xxxx",
    "url": "xxxx",
  }
]
```

详细描述

返回类型为 Array<[ICreateRepoOutput](#ICreateRepoOutput)\>
<div id="ICreateRepoOutput"/>


| 参数           | 类型    | 说明                 |
| -------------- | ------- | -------------------- |
| id             | number  | 仓库唯一 id 值       |
| full_name      | string  | 仓库名称             |
| url            | string  | 仓库访问地址         |

### 获取一个仓库信息 hasRepo

> [github 接口文档](https://docs.github.com/zh/rest/repos/repos#get-a-repository)  
> [gitee 接口文档](https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepo)  
> [gitlab 接口文档](https://docs.gitlab.com/ee/api/projects.html#get-single-project)  
> [codeup 接口文档](https://help.aliyun.com/document_detail/460466.html)

#### `github`、`gitee`、`gitlab` 示例

```typescript
await prioverd.hasRepo({
  owner: "xxxxxx",
  repo: "xxxxxx",
});
```

#### `codeup` 示例

```typescript
await prioverd.hasRepo({
  project_id: 00000,
  organization_id: "xxxxxx",
});
```

参数解析

| 参数 | 说明     | 类型   | 必填 | 默认值 |
| ---- | -------- | ------ | ---- | :----: |
| owner  | 仓库所属空间地址 | string | 是   |   -    |
| repo  | 仓库名称 | string | 是   |   -    |
| organization_id | 企业标识，也称企业 id。 | string | 是   |   -    |
| project_id      | 代码库 ID               | number | 是   |   -    |


#### 返回值

返回示例

```json
[
  {
    "id": 0000,
    "full_name": "xxxx",
    "url": "xxxx",
  }
]
```

详细描述

返回类型为 Array<[IHasRepoOutput](#IHasRepoOutput)\>
<div id="IHasRepoOutput"/>


| 参数           | 类型    | 说明                 |
| -------------- | ------- | -------------------- |
| id             | number  | 仓库唯一 id 值       |
| full_name      | string  | 仓库名称             |
| url            | string  | 仓库访问地址         |

### 删除一个仓库 deleteRepo

> [github 接口文档](https://docs.github.com/zh/rest/repos/repos#delete-a-repository)  
> [gitee 接口文档](https://gitee.com/api/v5/swagger#/deleteV5ReposOwnerRepo)  
> [gitlab 接口文档](https://docs.gitlab.com/ee/api/projects.html#delete-project)  
> [codeup 接口文档](https://help.aliyun.com/document_detail/460705.html)

#### `github`、`gitee`、`gitlab` 示例

```typescript
await prioverd.deleteRepo({
  owner: "xxxxxx",
  repo: "xxxxxx",
});
```

#### `codeup` 示例

```typescript
await prioverd.deleteRepo({
  project_id: 00000,
  organization_id: "xxxxxx",
  reason: "xxxx"
});
```

参数解析

| 参数 | 说明     | 类型   | 必填 | 默认值 |
| ---- | -------- | ------ | ---- | :----: |
| owner  | 仓库所属空间地址 | string | 是   |   -    |
| repo  | 仓库名称 | string | 是   |   -    |
| organization_id | 企业标识，也称企业 id。 | string | 是   |   -    |
| project_id      | 代码库 ID               | number | 是   |   -    |
| reason      | 删除代码库原因             | string | 否   |   -    |


#### 返回值

无

