---
sidebar_position: 6
title: 阿里云OTS库
---

# 阿里云 OTS 库(@serverless-cd/ots-orm)

针对阿里云[表格存储 OTS](https://help.aliyun.com/document_detail/27280.html) 的 ORM 库，降低用户使用 SDK 的使用成本

## 安装

```bash
$ npm install @serverless-cd/ots-orm --save
```

## 示例

```typescript
import Orm from "@serverless-cd/ots-orm";

const orm = new Orm(
  {
    accessKeyId: "ACCESS_KEY_ID",
    accessKeySecret: "ACCESS_KEY_SECRET",
    instanceName: "instanceName",
    region: "region",
  },
  "tableName",
  "indexName"
);

// orm.find();
```

## 参数解析

> const orm = new Orm(config, tableName, indexName)

<!-- 参数｜ 说明｜类型｜必填｜默认值 -->

| 参数      | 说明         | 类型                    | 必填 | 默认值 |
| --------- | ------------ | ----------------------- | ---- | :----: |
| config    | 密钥信息配置 | [OrmConfig](#OrmConfig) | 是   |   -    |
| tableName | 数据表名称   | string                  | 是   |   -    |
| indexName | 数据表索引   | string                  | 是   |   -    |

### OrmConfig

| 参数            | 说明                        | 类型   | 必填 | 默认值 |
| --------------- | --------------------------- | ------ | ---- | :----: |
| accessKeyId     | aliyun 密钥 accessKeyId     | string | 是   |   -    |
| accessKeySecret | aliyun 密钥 accessKeySecret | string | 是   |   -    |
| instanceName    | 表格存储实例名称            | string | 是   |   -    |
| region          | 表格存储实例名称的地区      | string | 是   |   -    |
| endpoint        | 实例访问地址                | string | 否   |   -    |
| maxRetries      | 最大重试次数                | number | 否   |   20   |

## 方法

### 创建表数据 create / update

#### 示例

```typescript
const primaryKey = [{ id: "xxx" }];
const attributeColumns = {
  string: "12345",
  obj: { key: "value" },
  array: [1, 2, 3],
  number: 234,
  boolean: true,
};
await orm.create(primaryKey, attributeColumns);
await orm.update(primaryKey, attributeColumns);
```

#### 参数解析

| 参数             | 说明       | 类型                         | 必填 | 默认值 |
| ---------------- | ---------- | ---------------------------- | ---- | :----: |
| primaryKey       | 行的主键   | Array<Record<string, any\>\> | 是   |   -    |
| attributeColumns | 行的属性列 | Record<string, any\>         | 是   |   -    |

#### 返回值

返回示例

```json
{
  "id": "xxx",
  "string": "12345",
  "obj": { "key": "value" },
  "array": [1, 2, 3],
  "number": 234,
  "boolean": true
}
```

详细描述  
返回的是操作行数据，类型: `Record<string, any>`

### 删除表数据 delete

#### 示例

```typescript
const primaryKey = [{ id: "xxx" }];
await orm.delete(primaryKey);
```

#### 参数解析

| 参数       | 说明     | 类型                         | 必填 | 默认值 |
| ---------- | -------- | ---------------------------- | ---- | :----: |
| primaryKey | 行的主键 | Array<Record<string, any\>\> | 是   |   -    |

#### 返回值

无

### 批量删除表数据 batchDelete

#### 示例

```typescript
const primaryKeys = [[{ id: "xxx" }], [{ id: "xx2" }]];
await orm.batchDelete(primaryKeys);
```

#### 参数解析

| 参数        | 说明       | 类型                                 | 必填 | 默认值 |
| ----------- | ---------- | ------------------------------------ | ---- | :----: |
| primaryKeys | 各行的主键 | Array<Array<Record<string, any\>\>\> | 是   |   -    |

#### 返回值

无

### 根据主键查询数据 findByPrimary

#### 示例

```typescript
const primaryKey = [{ id: "xxx" }];
await orm.findByPrimary(primaryKey);
```

#### 参数解析

| 参数       | 说明     | 类型                         | 必填 | 默认值 |
| ---------- | -------- | ---------------------------- | ---- | :----: |
| primaryKey | 行的主键 | Array<Record<string, any\>\> | 是   |   -    |

#### 返回值

查询到数据示例

```json
{
  "id": "xxx",
  "string": "12345",
  "obj": { "key": "value" },
  "array": [1, 2, 3],
  "number": 234,
  "boolean": true
}
```

为查询到数据示例

```json
{}
```

详细描述  
如果没查询到则为`空对象`，否则为类型: `Record<string, any>`

### 查询数据（多元索引查询） find

#### 示例

```typescript
const { totalCount, result } = await orm.find();
```

#### 参数解析

| 参数            | 说明                       | 类型           | 必填 | 默认值 |
| --------------- | -------------------------- | -------------- | ---- | :----: |
| pageSize        | 本次查询需要返回的最大数量 | number         | 否   |   10   |
| currentPage     | 本次查询的开始位置页码     | number         | 否   |   1    |
| orderKeys       | 根据传入字段排序           | Array<string\> | 否   |   -    |
| \[key: string\] | 查询关键词                 | any            | 否   |   -    |

#### 返回值

返回示例

```json
{
  "result": [
    {
      "id": "xxx",
      "string": "12345",
      "obj": { "key": "value" },
      "array": [1, 2, 3],
      "number": 234,
      "boolean": true
    }
  ],
  "totalCount": 1
}
```

详细描述

| 参数       | 类型                         | 说明         |
| ---------- | ---------------------------- | ------------ |
| result     | Array<Record<string, any\>\> | 返回数据集合 |
| totalCount | number                       | 返回数据总量 |

### 查询单个数据（多元索引查询） findOne

#### 示例

```typescript
const { totalCount, result } = await orm.findOne();
```

#### 参数解析

| 参数           | 说明                       | 类型           | 必填 | 默认值 |
| -------------- | -------------------------- | -------------- | ---- | :----: |
| pageSize       | 本次查询需要返回的最大数量 | number         | 否   |   10   |
| currentPage    | 本次查询的开始位置页码     | number         | 否   |   1    |
| orderKeys      | 根据传入字段排序           | Array<string\> | 否   |   -    |
| [key: string\] | 查询关键词                 | any            | 否   |   -    |

#### 返回值

查询到数据示例

```json
{
  "id": "xxx",
  "string": "12345",
  "obj": { "key": "value" },
  "array": [1, 2, 3],
  "number": 234,
  "boolean": true
}
```

为查询到数据示例

```json
{}
```

详细描述  
如果没查询到则为`空对象`，否则为类型: `Record<string, any>`

### 查询所有数据（多元索引查询） findAll

#### 示例

```typescript
const { totalCount, result } = await orm.findAll();
```

#### 参数解析

| 参数           | 说明             | 类型           | 必填 | 默认值 |
| -------------- | ---------------- | -------------- | ---- | :----: |
| orderKeys      | 根据传入字段排序 | Array<string\> | 否   |   -    |
| [key: string\] | 查询关键词       | any            | 否   |   -    |

#### 返回值

返回示例

```json
{
  "result": [
    {
      "id": "xxx",
      "string": "12345",
      "obj": { "key": "value" },
      "array": [1, 2, 3],
      "number": 234,
      "boolean": true
    }
  ],
  "totalCount": 1
}
```

详细描述

| 参数       | 类型                         | 说明         |
| ---------- | ---------------------------- | ------------ |
| result     | Array<Record<string, any\>\> | 返回数据集合 |
| totalCount | number                       | 返回数据总量 |

### 模糊查询（多元索引查询） findByLike

#### 示例

```typescript
const params = {
  currentPage: 1,
  pageSize: 10,
};
const { totalCount, result } = await orm.findByLike(params);
```

#### 参数解析

| 参数            | 说明               | 类型                     | 必填 | 默认值 |
| --------------- | ------------------ | ------------------------ | ---- | :----: |
| sort            | 根据传入字段排序。 | <Record<string, 0 \| 1\> | 否   |   -    |
| \[key: String\] | 模糊查询关键字     | any                      | 否   |   -    |

#### 返回值

返回示例

```json
{
  "result": [
    {
      "id": "xxx",
      "string": "12345",
      "obj": { "key": "value" },
      "array": [1, 2, 3],
      "number": 234,
      "boolean": true
    }
  ],
  "totalCount": 1
}
```

详细描述

| 参数       | 类型                         | 说明         |
| ---------- | ---------------------------- | ------------ |
| result     | Array<Record<string, any\>\> | 返回数据集合 |
| totalCount | number                       | 返回数据总量 |
