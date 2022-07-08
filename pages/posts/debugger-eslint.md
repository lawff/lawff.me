---
title: "记一次 eslint 调试来理解下其原理"
date: "2022-04-11"
summary: "@typescript-eslint/comma-dangle: ['error', 'always-multiline'] vs comma-dangle: ['error', 'never'], 谁优先?"
---

### 开启 debugger 模式

- eslint/bin/eslint.js 初始化一些参数信息
- eslint/lib/cli 
- eslint/dist/eslintrc.cjs
  - loadInDirectory
  按照 '.eslintrc.js'，'.eslintrc.cjs'，'.eslintrc.yaml'，'.eslintrc.yml'，'.eslintrc.json'，'.eslintrc'，'package.json'的顺利读取配置，一旦有了一个存在就不再读取下一个配置，如果都不存在， 则返回默认的配置
  - loadConfigFile 开始读取原文件信息
  - _normalizeConfigData 传入文件信息，以及上下文ctx，生成 config data
  - _normalizeObjectConfigData 生成 criteria 这个之后有用， 用它来判断 是不是需要这个rule
  - _loadExtends 如果有extends 预先加载 extends
  - _loadExtendedShareableConfig
  - _loadConfigData: 又回到最初的 loadConfigFile 读取 这是一个递归的过程
  ### 读取完配置之后 开始 检查
  - verify
  - _verifyWithConfigArray
  - 然后根据每一个文件生成最终的config， 包括rule ， parse， plugin， env等
    - createConfig
    - ExtractedConfig  其中每个规则之间是怎么去merge 的呢，贴一段代码吧，比较清楚
      ```js
      // Adopt the rule config which was found at first.
        if (targetDef === void 0) {
            if (Array.isArray(sourceDef)) {
                target[key] = [...sourceDef];
            } else {
                target[key] = [sourceDef];
            }

        /*
         * If the first found rule config is severity only and the current rule
         * config has options, merge the severity and the options.
         */
        } else if (
            targetDef.length === 1 &&
            Array.isArray(sourceDef) &&
            sourceDef.length >= 2
        ) {
            targetDef.push(...sourceDef.slice(1));
        }
      ```
    - 核心 runRules 开始针对每一条rule 开始 检查
      - createRuleListeners 遍历每一条rule 如果不是 off 或者 0 则开始创建listener
      - ruleListeners emitter.on 所有listener
      - 处理的时候注意 也和 parse 有关
      - 如果发现错误，会用report 上报
      - 如果有 --fix 还是在查完之后修复 如果这个错误是可以修复的话

### 回到一开始的疑问处
@typescript-eslint/comma-dangle: ['error', 'always-multiline'] vs comma-dangle: ['error', 'never'], 谁优先?
这要看 你要解析的文件是什么， 是用什么来parse ， 理论上来说 两条规则都会生效， 如果是特定的解析器来解析的话， 也是要找规则来，比如@typescript-eslint/comma-dangle 这个其实不对 JSONEXPRESSION 来判定。
![示例](/images/eslint.jpg)

#### 加一条
overrides 的时候， 当前eslintrc的优先级最高，越extends越靠后， 如果已经有规则了会忽略， 本文件的overrides 要比 本文件rule 优先级高，具体分文件 从 ExtractedConfig 那段代码来查看
