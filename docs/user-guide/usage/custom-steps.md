---
sidebar_position: 3
title: 支持三种脚本
---

## 支持类型

自定义 step 支持三种类型：

- plugin 插件
- shell 类型
- [zx](https://github.com/google/zx) 类型

### plugin 插件

> 支持 npm package, 所有的包的使用方法可以在 [npm registry](https://www.npmjs.com/)查询

```yaml
steps:
	- plugin: @serverless-cd/checkout@2 # 应用名
  	inputs: # 参数
    	branch: main
```

### shell 类型

> 支持自定义的 shell 指令

```yaml
steps:
	- run: echo "hello world" # shell 命令
  	working-directory: './' # 执行命令的路径
```

### [zx](https://github.com/google/zx) 脚本

- 支持 javascript 编写 shell 脚本

```yaml
steps:
	- script: |
    	cd('/tmp')
		await $`ls -la`
```

- 支持文件路径

```bash
steps:
	- script: ./index.js
```

index.js 文件代码示例

```javascript
cd("/tmp");
await $`ls -la`;
```

- 支持识别魔法变量

```bash
steps:
	- script: |
    	await Promise.all([$`sleep 1; echo ${{env.name}}`, $`sleep 2; echo ${{env.age}}`, $`sleep 3; echo 3`])
  	env:
    	name: xiaoming
      	age: 20
```

## 支持 Nodejs 内置函数

### `promise`

```bash
await Promise.all([$`sleep 1; echo 1`, $`sleep 2; echo 2`, $`sleep 3; echo 3`])
```

### `fs`

```bash
let {name} = await fs.readJson('./package.json')
```

### `os`

```bash
await $`cd ${os.homedir()}`
```

### `path`

```bash
await $`ls -la ${path.resolve('./')}`
```

## 支持系统函数

### cd

Changes the current working directory.

```bash
cd('/tmp')
await $`pwd` // => /tmp
```

### chalk

The [chalk](https://www.npmjs.com/package/chalk) package.

```bash
console.log(chalk.blue('Hello world!'))
```

### glob

The [globby](https://www.npmjs.com/package/globby) package.

```bash
let packages = await glob(['package.json', 'packages/*/package.json'])
```

### YAML

The [yaml](https://www.npmjs.com/package/yaml) package.

```bash
console.log(YAML.parse('foo: bar').foo)
```

### which

The [which](https://www.npmjs.com/package/which) package.

```bash
let node = await which('node')
```
