---
title: "golang - cobra"
date: "2023-04-03"
summary: "Cobra 是一个用于创建强大的现代 CLI 应用程序的库。"
---

> [Cobra](https://github.com/spf13/cobra) 是一个用于创建强大的现代 CLI 应用程序的库。

### 开始

通过学习， 创建一个基于 cobra 的 CLI ，实现以下功能

- 增加version命令，打印版本号
- 增加gs命令，查询关键词的github
- 增加gt命令，查询相关语言的github trending
- 最后生成相应的 markdown 

涉及 cobra 的 *args* *flags* *subcommands* 等功能。


#### 创建项目

```bash

mkdir -p kira-trending
cd kira-trending
go mod init example.com/kira-trending

```
---
##### 知识点

- 通过 `&cobra.Command` 创建命令之后，执行命令的 `Execute` 方法可以执行命令 `run` 方法
```go
var rootCmd = &cobra.Command{
  Use:   "kira-trending",
  Run: func(cmd *cobra.Command, args []string) {
    // Do Stuff Here
  },
}

func Execute() {
  // 下面Execute之后会执行 rootCmd 的 run 方法
  if err := rootCmd.Execute(); err != nil {
    fmt.Println(err)
    os.Exit(1)
  }
}

```
- 如果需要在命令执行之前做一些事情，可以通过以下方法来实现
  - PersistentPreRun 可以传递给子命令，如果子命令也有定义，那么父命令的会被覆盖
  - PreRun
  - PostRun
  - PersistentPostRun

- flag: `cmd.Flags().StringP` / `cmd.PersistentFlags().StringP` 全局flag

#### 创建命令

```go
package cmd

import (
	"github.com/spf13/cobra"
)

var (
	kiraTrendingCmd = &cobra.Command{
		Use: "kira-trending",
	}
)

func Execute() error {
  // 可以通过 kira-trending --help 查看帮助
	return kiraTrendingCmd.Execute()
}
```
#
创建 version 子命令, 通过 `kira-trending version` 打印版本号 `v0.0.1`

```go
package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version number of kira-trending",
	Long:  `All software has versions. This is kira-trending's`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("v0.0.1")
	},
	Args: cobra.NoArgs,
}

func init() {
	kiraTrendingCmd.AddCommand(versionCmd)
}
```

#### 增加 gs 子命令， 增加flag， args使用， 细节请查看以下代码注释

```go
package cmd

import (
	"context"
	"fmt"

	"github.com/google/go-github/github"
	"github.com/spf13/cobra"
)

var (
	keyword string
)

var githubSCmd = &cobra.Command{
  // 子命令， 使用时 kira-trending gs
	Use:   "gs",
	Short: "Search GitHub repositories",
  // RunE 会返回一个错误，等同于 Run
	RunE:  searchRepo,
  // 在命令执行之后做一些事情, 这是一个钩子
	PostRun: func(cmd *cobra.Command, args []string) {
		// print the limit
		fmt.Println("\nThat's all.")
	},
  // 这个比如 你打了ga 会推荐你输入 gs
	SuggestFor: []string{"ga"},
  // 不能输入参数，为了学习而使用
	Args:       cobra.ExactArgs(0),
}

func searchRepo(cmd *cobra.Command, args []string) error {
	if keyword == "" {
		return fmt.Errorf("missing required flag: keyword")
	}

	fmt.Println("\nSearching...")
	fmt.Println()

	ctx := context.Background()
	client := github.NewClient(nil)

	query := fmt.Sprintf("%s in:name,description", keyword)
	opt := &github.SearchOptions{
		Sort:        "stars",
		Order:       "desc",
		ListOptions: github.ListOptions{PerPage: 20},
	}

	result, _, err := client.Search.Repositories(ctx, query, opt)
	if err != nil {
		return err
	}

	fmt.Printf("%d repository results:\n", result.GetTotal())
	for i, repo := range result.Repositories {
		// 还需要有链接
		fmt.Printf("%d. %s (🌟 %d) [%s]\n", i+1, repo.GetFullName(), repo.GetStargazersCount(), repo.GetHTMLURL())
	}

	return nil
}

func init() {
  // 增加flag， 使用时 kira-trending gs -k golang
	githubSCmd.PersistentFlags().StringVarP(&keyword, "keyword", "k", "", "search keyword (required)")
	kiraTrendingCmd.AddCommand(githubSCmd)
}

```
#
让我们来执行看一下效果
#
![结果](/images/cobra-show.png)

### 最后是完成的目录结构

![文件](/images/cobra-init.png)

#
代码地址： [kira-trending](https://github.com/lawff/kira-trending)
