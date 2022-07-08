---
title: "从 vite 0.1.0 版本, 说说最初的 @vue/dev-server"
date: "2022-03-27"
summary: "No-bundle Dev Server for Vue Single-File Components"
---

**⚠️ 基本用法 ⚠️**

一个项目创建以下文件:

**index.html**

```html
<div id="app"></div>
<script type="module" src="/main.js"></script>
```

**main.js**

```js
import { createApp } from 'vue'
import Comp from './Comp.vue'

createApp(Comp).mount('#app')
```

**Comp.vue**

```vue
<template>
  <button @click="count++">{{ count }}</button>
</template>

<script>
export default {
  data: () => ({ count: 0 })
}
</script>

<style scoped>
button { color: red }
</style>
```

**执行**:

```bash
npx vite
```

访问 `http://localhost:3000`, 就可以看到这个项目的内容，包括热更新。

----
> **一步步来解析**

1. package.json 中 执行命令 bin: vite
2. vite 命令对应执行起了个服务， 默认指向当前的 cwd 或者 可以在命令行指定
3. 用 serve-handle 起服务，返回当前的 index.html，需要注意的话， index.html中的script需要用module模式， 这就是利用加载es原生能力，达到快速的效果
4. 处理其余文件，包括 js，css, .vue，做了一些处理之后直接返回
5. 最后要做的就是热更新
- 通过 chokidar 监听文件变化
- 服务端起一个ws服务， 可发送指令
```js
  const fileWatcher = chokidar.watch(cwd, {
    ignored: [/node_modules/]
  })

  fileWatcher.on('change', async (file) => {
    // 分别处理不同的文件 发送指令
  })
```
- 创建一个可以在client执行的js文件，连接ws，里面接受指令执行相应的操作，包括 刷新，再次渲染
```js
  const socket = new WebSocket(`ws://${location.host}`)

  // Listen for messages
  socket.addEventListener('message', ({ data }) => {
    const { type } = JSON.parse(data)
    switch (type) {
      case 'connected':
        break
      case 'reload':
        ...
        break
      case 'rerender':
        ...
        break
      case 'style-update':
        ...
        break
      case 'style-remove':
        ...
        break
      case 'full-reload':
        location.reload()
    }
  })
```

> 总结起来就是很简单， 就是创建个服务， 直接利用现在浏览器的原生能力，可以非常快速的启动并访问， 利用 ws 来热更新。

---

### 另外，可以看到这里面还增加了 单元测试

- 通过 execa 开启进程执行服务，puppeteer 打开网页，抓取相应的元素，比对每个元素上面的文字来进行测试，其中还通过修改文件之后对比文字来测试热更新。
- 通过 circleci 持续集成来进行每一次commit的单元测试

> 可以看出已经是一个比较完整的npm库了， 包括 有example, 以及 test