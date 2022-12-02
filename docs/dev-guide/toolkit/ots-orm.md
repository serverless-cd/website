---
sidebar_position: 6
title: 阿里云OTS库
---

# 阿里云OTS库(@serverless-cd/ots-orm)

针对阿里云[表格存储OTS](https://help.aliyun.com/document_detail/27280.html) 的ORM库，降低用户使用SDK的使用成本

## 安装

```bash
$ npm install @serverless-cd/ots-orm --save
```

## 示例

```typescript
import Orm from '@serverless-cd/ots-orm';

const orm = new Orm({
  accessKeyId: 'ACCESS_KEY_ID',
  accessKeySecret: 'ACCESS_KEY_SECRET',
  instanceName: 'instanceName',
  region: 'region',
}, 'tableName', 'indexName');

// orm.find();
```

## 参数解析
> const orm = new Orm(config, tableName, indexName)

| 属性 |	类型 |	默认值 |	必填 |	说明 |
| -- |	-- |	:--: |	-- |	-- |
| config |	[Object](#config) |	- |	是 |	密钥信息配置 |
| tableName |	String |	- |	是 |	数据表名称 |
| indexName |	String |	- |	是 |	数据表索引 |

### config

| 属性 |	类型 |	默认值 |	必填 |	说明 |
| -- |	-- |	:--: |	-- |	-- |
| accessKeyId |	String |	- |	是 | aliyun 密钥 accessKeyId |
| accessKeySecret |	String |	- |	是 |	aliyun 密钥 accessKeySecret |
| instanceName |	String |	- |	是 |	表格存储实例名称 |
| region |	String |	- |	是 |	表格存储实例名称的地区 |
| endpoint |	String |	- |	否 |	实例访问地址 |
| maxRetries |	Number |	20 |	否 |	最大重试次数 |


## 方法

### 创建表数据 create / update

#### 示例

```typescript
const primaryKey = [{ id: 'xxx' }];
const attributeColumns = {
  string: '12345',
  obj: { key: 'value' },
  array: [1, 2, 3],
  number: 234,
  boolean: true,
};
await orm.create(primaryKey, attributeColumns);
await orm.update(primaryKey, attributeColumns);
```

#### 参数解析

| 属性 |	类型 |	默认值 |	必填 |	说明 |
| -- |	-- |	:--: |	-- |	-- |
| primaryKey |	Array\<Record\<string, any>\> |	- |	是 |	行的主键 |
| attributeColumns |	Record\<string, any> |	- |	是 |	行的属性列 |

#### 返回值

操作行的数据，类型: `Record\<string, any>`


### 删除表数据 delete

#### 示例

```typescript
const primaryKey = [{ id: 'xxx' }];
await orm.delete(primaryKey);
```

#### 参数解析

| 属性 |	类型 |	默认值 |	必填 |	说明 |
| -- |	-- |	:--: |	-- |	-- |
| primaryKey |	Array\<Record\<string, any>\> |	- |	是 |	行的主键 |

### 批量删除表数据 batchDelete

#### 示例

```typescript
const primaryKeys = [
  [{ id: 'xxx' }],
  [{ id: 'xx2' }]
];
await orm.batchDelete(primaryKeys);
```

#### 参数解析

| 属性 |	类型 |	默认值 |	必填 |	说明 |
| -- |	-- |	:--: |	-- |	-- |
| primaryKeys |	Array\<Array\<Record\<string, any>\>> |	- |	是 | 各行的主键 |




### 根据主键查询数据 findByPrimary

#### 示例

```typescript
const primaryKey = [{ id: 'xxx' }];
await orm.findByPrimary(primaryKey);
```

#### 参数解析

| 属性 |	类型 |	默认值 |	必填 |	说明 |
| -- |	-- |	:--: |	-- |	-- |
| primaryKey |	Array\<Record\<string, any>\> |	- |	是 |	行的主键 |

#### 返回值

如果没查询到则为`空对象`，否则为类型: `Record\<string, any>`


### 查询数据（多元索引查询） find

#### 示例

```typescript
const { totalCount, result } = await orm.find();
```

#### 参数解析

| 属性 |	类型 |	默认值 |	必填 |	说明 |
| -- |	-- |	:--: |	-- |	-- |
| pageSize |	Number |	10 |	否 | 本次查询需要返回的最大数量 |
| currentPage |	Number |	1 |	否 | 本次查询的开始位置页码 |
| orderKeys |	Array\<String\> |	- |	否 | 根据传入字段排序 |
| \[key: String\] |	Any |	- |	否 | 查询关键词 |


#### 返回值

| 属性 |	类型 |	说明 |
| -- |	-- | -- |
| result |	Array\<Record\<string, any>\> | 返回数据集合 |
| totalCount |	Number | 返回数据总量 |

  

### 查询单个数据（多元索引查询） findOne

#### 示例

```typescript
const { totalCount, result } = await orm.findOne();
```

#### 参数解析

| 属性 |	类型 |	默认值 |	必填 |	说明 |
| -- |	-- |	:--: |	-- |	-- |
| pageSize |	Number |	10 |	否 | 本次查询需要返回的最大数量 |
| currentPage |	Number |	1 |	否 | 本次查询的开始位置页码 |
| orderKeys |	Array\<String\> |	- |	否 | 根据传入字段排序 |
| \[key: String\] |	Any |	- |	否 | 查询关键词 |


#### 返回值

如果没查询到则为`空对象`，否则为类型: `Record\<string, any>`

### 查询所有数据（多元索引查询） findAll

#### 示例

```typescript
const { totalCount, result } = await orm.findAll();
```

#### 参数解析

| 属性 |	类型 |	默认值 |	必填 |	说明 |
| -- |	-- |	:--: |	-- |	-- |
| orderKeys |	Array\<String\> |	- |	否 | 根据传入字段排序 |
| \[key: String\] |	Any |	- |	否 | 查询关键词 |


#### 返回值

| 属性 |	类型 |	说明 |
| -- |	-- | -- |
| result |	Array\<Record\<string, any>\> | 返回数据集合 |
| totalCount |	Number | 返回数据总量 |

  
### 模糊查询（多元索引查询） findByLike

#### 示例

```typescript
const params = {
  currentPage: 1,
  pageSize: 10,

}
const { totalCount, result } = await orm.findByLike(params);
```

#### 参数解析

| 属性 |	类型 |	默认值 |	必填 |	说明 |
| -- |	-- |	:--: |	-- |	-- |
| sort |	<Record\<string, 0 \| 1> |	- |	否 | 根据传入字段排序。 |
| \[key: String\] |	Any |	- |	否 | 模糊查询关键字 |


#### 返回值

| 属性 |	类型 |	说明 |
| -- |	-- | -- |
| result |	Array\<Record\<string, any>\> | 返回数据集合 |
| totalCount |	Number | 返回数据总量 |

  

