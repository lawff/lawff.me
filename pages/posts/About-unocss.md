---
title: "unocss v0.0.1 初始"
date: "2022-04-13"
summary: "一种css基础能力.."
---

## 原理

- 预设一系列规则，用正则表达式来匹配，然后一一对应
  ```js
    //  类似这种表达式 
    [/^p()-(\w+)$/, directionSize('padding')],
    [/^p([xy]?)-(\w+)$/, directionSize('padding')],
    [/^p([rltb]?)-(\w+)$/, directionSize('padding')],
  ```
- 然后通过以vite 插件的形式，遍历打包过后的代码，找出上述规则对应的地方， 生成规则对应的css, 配合selector，生成最终的css
  ```js
    for (const [matcher, handler] of config.rules) {
      tokens.forEach((raw) => {
        ...
        ...  
        const selector = variants.reduce((p, v) => v.selector?.(p) || p, `.${cssEscape(raw)}`)
        const css = `${selector}{${body}}`
        sheet.push(css)
        ...
        ... 
      }
    })
  ```

### 可以看出，第一版还是很依赖 vite 打包工具来做的， 但是通过正则来匹配的话，速度会快上不少， 又实现了 动态css 的生成， 可以不需要枚举出所有css，而是有自己的一套规则

> 只需要不断的增加自己的规则，就能在class中直接使用, 就像官网自己说的那样：“No parsing, no AST, no scanning, it's INSTANT (200x faster than Windi CSS or Tailwind JIT).”

> [unocss](https://github.com/unocss/unocss)

