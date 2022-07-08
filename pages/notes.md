---
title: Notes - Anthony Fu
display: Notes
subtitle: Quick notes / tips
description: Quick notes / tips
---

## Types for sub modules

_2022/03/24_

When you build multiple entries in a single package, you exports them with `exports` syntax. Like

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./foo": {
      "types": "./dist/foo.d.ts",
      "import": "./dist/foo.mjs",
      "require": "./dist/foo.cjs"
    },
  }
}
```

Then tho you provide `types` field for the sub modules, most of the users still got the error:

```txt
Cannot find module 'my-pkg/foo' or its corresponding type declarations.
```

Well that's because the `types` field in `exports` will only be resolved when you add `"moduleResolution": "NodeNext"` to the `tsconfig.json` file. Which might cause more issue since not all the packages are up to date.

So when you trying to import `my-pkg/foo`, TypeScript actually looking for the `foo.d.ts` file under your package root instead of your `dist` folder. One solution I been used for a long time is to create a redirection file that published to npm, like:

```ts
// foo.d.ts
export { default } from './dist/foo.d.ts'
export * from './dist/foo.d.ts'
```

Which solve the problem, but also making your root directory quite messy.

Until [@tmkx](https://github.com/tmkx) [shared me](https://github.com/antfu/unplugin-auto-import/pull/120) this solution:

```json
{
  "typesVersions": {
    "*": {
      "*": [
        "./dist/index.d.ts",
        "./dist/*"
      ]
    }
  }
}
```

Good day! [Reference](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#version-selection-with-typesversions)

## `range` in JavaScript

_2021/09/13_

Credit to [GitHub Copilot](https://copilot.github.com/).

I didn't know you could provide a map function to `Array.from` as a second argument until today.

```js
Array.from({ length: 10 }, (_, i) => i)
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```


## Clean npm cache

_2021/09/08_

My disk is full today :(

```bash
npm cache clean --force
yarn cache clean
pnpm store prune
```

## Isomorphic `__dirname`

_2021/08/30_

In ESM, you might found your old friends `__dirname` and `__filename` are no longer available. When you search for [solutions](https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag), you will find that you will need to parse `import.meta.url` to get the equivalents. While most of the solutions only show you the way to get them in ESM only, If you like me, who write modules in TypeScript and transpile to both CJS and ESM at the same time using tools like [`tsup`](https://tsup.egoist.sh/). Here is the isomorphic solution: 

```js
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))
```


