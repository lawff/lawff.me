---
title: "How to use vite"
date: "2022-06-17"
summary: "read vite docs to record some tips"
---

## 命令

```ts

"dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
"build": "vite build", // 为生产环境构建产物
"preview": "vite preview" // 本地预览生产构建产物

```

## 插件
按需应用： 如果插件在服务或构建期间按需使用，请使用 apply 属性指明它们仅在 'build' 或 'serve' 模式时调用
  
  ```ts
  
  {
    apply: 'build',
  }
  
  ```

## public 目录
可以有一种用处， 压根不想引入该资源，只是想得到其 URL

## 库模式

```ts

// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'my-lib'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
  
  ```
