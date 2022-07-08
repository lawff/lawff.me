---
title: "从一道示例来谈谈算法的评价"
date: "2021-08-26"
summary: "只能验证算法有错，不能证明算法无错"
---

> **只能验证算法有错，不能证明算法无错**

## 算法的评价标准
- 1. 算法的 *正确性*
- 2. 算法的 *有效性*

### 只说其中的算法有效性
- 1. 算法的 *时间* 复杂性
- 2. 算法的 *空间* 复杂性

----

### 下面以一道示例来谈谈

> 设计算法将数组a[n]的每个元素都循环地右移k位，这里0<k<n

- 1. k遍右移法: 每遍将n个元素循环右移一位，经k遍右移，而完成

```js
function move(a, n, k) {
  for (i = 0; i < k; i++) {
    const x = a[n - 1]
    for (j = n - 2; j >= 0; j--) {
      a[j + 1] = a[j]
    }
    a[0] = x
  }
}
```

分析: 空间复杂性 S(n) = 1, 时间复杂性 T(n) = k(n+1)

----

- 2. 加长数组法: 多增加k个位置，先右移k位，再把k位的移动开头

```js
function move(a, n, k) {
  for (let i = n - 1; i >=0; i--) {
    a[i + k] = a[i]
  }
  for (let j = 0; j < k; j++) {
    a[j] = a[n + j]
  }
}
```
分析: 空间复杂性 s(n) = k, 时间复杂性 T(n) = n + k

----

- 3. 置换圈法: 每一位都移动k位，可以计算出有多少圈，以此来避免是否所有位数都需要移动

```js
function move(a, n, k) {
  // 求最大公约数
  function gcd(m, n) {
    let r
    while(n) {
      r = m % n
      m = n
      n = r
    }
    return m
  }
  m = gcd(n, k) // 圈数
  s = n / m
  for (let i = 0; i < m; i++) {
    const x = a[i]
    let q = i
    let p = (q - k + n) % n
    for (let j = 1; j < s; j++) {
      a[q] = a[p]
      q = p
      p = (p - k + n) % n
    }
    a[q] = x
  }
}
```
分析: 空间复杂性 s(n) = 1, 时间复杂性: T(n) = m + n <= n + k

## 分析

所以可以根据以上去判断哪种方式合适，当然当数据量不同的时候，也会有偏差， 所以运行的环境也是考虑的因素。

> [数据结构](https://www.icourse163.org/learn/PAEU-1001660013?tid=1465275441#/learn/content?type=detail&id=1244113041)