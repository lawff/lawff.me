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

