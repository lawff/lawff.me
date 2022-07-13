---
title: Notes - Lawliet FF
display: Notes
---

### 解决 Homebrew 下载更新极慢的问题

```bash
# 替换 homebrew-cask.git:
cd "$(brew --repo)"/Library/Taps/homebrew/homebrew-cask
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git
```

### 解决 node 版本默认问题

```bash
nvm alias default version
```

### 一个生成数组的小技巧

```bash
Array.from({ length: 10}, () => {})
```
### load external ts-files modules in Next.js

```bash
用 next-transplie-modules 插件
```
### jsx not named

```bash
npm -i @types/react -D
```
### [degit](https://github.com/Rich-Harris/degit)

```bash
npx degit user/project my-project
```

## Isomorphic `__dirname` by [antfu](https://antfu.me/notes#isomorphic-dirname)

In ESM, you might found your old friends `__dirname` and `__filename` are no longer available. When you search for [solutions](https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag), you will find that you will need to parse `import.meta.url` to get the equivalents. While most of the solutions only show you the way to get them in ESM only, If you like me, who write modules in TypeScript and transpile to both CJS and ESM at the same time using tools like [`tsup`](https://tsup.egoist.sh/). Here is the isomorphic solution: 

```js
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))
```

