---
{"publish":true,"title":"How to publish Obsidian notes with Quartz on Vercel","comments":true,"created":"2025-07-22T16:37:19.217+08:00","modified":"2025-07-22T18:31:07.335+08:00","cssclasses":""}
---

探索知识管理的旅程中，常常会忽略一个至关重要的步骤——分享你的见解。这个环节不仅是我们研究的终极目标，也是驱动我们不断探索的重要力量。

通过公开自己的思考，不仅可以与他人建立更深层次的联系，还能够获取多元化的反馈，进一步完善自己的认知结构。这种知识的分享与交流，有助于集体智慧的形成，激励我们在不断改变的环境中适应和成长。同时，这也激发了他人探索和分享的热情，形成一个良性循环，使知识得以在更广泛的维度上传播与深化。

然而，即便我们面临表达逻辑混乱和文笔不佳的困扰，也不应因此惧怕分享。恰恰在于这样的勇气——**无惧于不完美**——才能引领我们走向更高的认知境界。

## Step 0. Prerequisites

在这里我们尝试打开一个与外界沟通的渠道，我相信你收获的是赞扬与鼓励。接下来我将介绍如何发布你的纯文本笔记为个人博客：

1. [[Posts/Obsidian]] 作为在 Markdown 编辑器创建和编辑笔记
2. [[Posts/Quartz]] 作为静态站点生成器，将 Markdown 转化 HTML
3. [[Vercel]] 作为托管服务提供商

此设置是完全免费的，除了最后一个可选步骤。我是在 macOS 上完成这一切的。如果您使用的是不同的操作系统，可能需要调整终端命令。

在继续之前，您需要安装以下软件：

- NodeJS v18.14+（使用node -v检查您的版本）
- NPM v9.3.1+（使用npm -v检查您的版本）
- Git（使用git --version检查您的版本）
- VSCode
- Obsidian

## Step 1. Download and install Quartz

**Clone the Quartz repository**

打开您的终端并运行此命令：`git clone https://github.com/jackyzha0/quartz.git`

**Install Quartz dependencies**

 Quartz 是一个 Node 项目，运行时需要其他库。

进入 Quartz 根目录：`cd my-notes`

现在，使用NPM安装这些依赖项：`npm i`

**Initialize Quartz**



## References

- [How to publish Obsidian notes with Quartz on GitHub Pages](https://notes.nicolevanderhoeven.com/How+to+publish+Obsidian+notes+with+Quartz+on+GitHub+Pages) 