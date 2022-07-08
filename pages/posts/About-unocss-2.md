---
title: "unocss - Unocss()"
date: "2022-05-05"
summary: "再次简单记录下 查看 unocss 的过程"
---

### 使用

```bash
npm i -D unocss
```

```ts
// vite.config.ts
import Unocss from 'unocss/vite'

export default {
  plugins: [
    Unocss({ /* options */ }),
  ],
}
```

### 过程

- UnocssVitePlugin - 接受一个参数 configOrPath
- VitePlugin - configOrPath, defaults
  - defaults { presets: presetUno() }
- createContext
- createGenerator
  - UnoGenerator
  - resolveConfig


# TODO
1. default preset
  - 内置的一些theme / rule
2. loadConfig
  - 查看 当前目录下的 配置文件， 可以指定后缀名， 或者 某些配置文件中的字段
  - 有两个库 可以注意下 jiti / defu
