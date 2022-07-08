---
title: "聊一下 css in js 在 next 中的初探"
date: "2022-05-01"
summary: "css 怎么突然有了延迟？"
---

**⚠️ 遇到的问题 ⚠️**

最近在 next 中使用了由 css-in-js 创建的组件，但是这个组件的渲染过程中，发现了一个问题，当部署完之后，打开发现最初渲染的时候样式没有出现，只出现了内容但是样式丢失了。

紧接着查看访问的 html 文件，发现由于 next 采用的是 ssr 渲染，但是在渲染过程中 css 文件并非在服务端提前生成了。所以当 js 到达本地之后再去渲染出 css，这就造成了短暂的延迟。

----

查找next文档，发现有一段话是这样的：

![next](/images/css-in-js.png)

需要在`./pages/_document.tsx`，例如

```ts
import Document, { DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
}

export default MyDocument
```

---

- 原理其实很简单，就是在生成文件的时候，拦截props，解析出css，然后放到head里面。

> [Next](https://nextjs.org/docs/advanced-features/custom-document)
