---
title: 如何使用 Quartz 和 Vercel 发布你的 Obsidian 笔记
tags:
  - Obsidian
  - Quartz
  - Vercel
comments: true
---

在知识管理的旅程中，我们常常忽略了一个至关重要的环节——分享。分享不仅是学习和研究的最终目的，更是驱动我们不断探索的强大动力。

将自己的思考公之于众，我们不仅能与他人建立更深层次的连接，还能收获多元的反馈，从而完善自己的认知体系。这种知识的交流与碰撞，促进了集体智慧的形成，也激励着我们在变化的世界中不断成长。同时，这也点燃了他人探索和分享的热情，构成一个良性循环。

即便我们可能面临逻辑混乱或文笔不佳的挑战，也不应惧怕分享。正是这份**无惧于不完美**的勇气，将引领我们走向更高的认知境界。

现在，让我们一起动手，为你的知识打开一扇面向世界的窗户。

## 准备工作 (Prerequisites)

在开始之前，请确保你的电脑上已经安装了以下软件。这个配置过程完全免费，我是在 macOS 上完成的，如果你的操作系统不同，部分终端命令可能需要微调。

1.  **[[Obsidian]]**: 你的 Markdown 笔记编辑器。
2.  **[[Quartz]]**: 静态网站生成器，它会将你的笔记转换成一个漂亮的网站。
3.  **[[Vercel]]**: 网站托管服务商，负责将你的网站发布到互联网上。

**环境要求：**

*   **Node.js**: `v18.14` 或更高版本 (在终端输入 `node -v` 查看)
*   **NPM**: `v9.3.1` 或更高版本 (在终端输入 `npm -v` 查看)
*   **Git**: (在终端输入 `git --version` 查看)
*   **GitHub 账号**: 用于托管你的笔记源码。

## 第一步：下载并初始化 Quartz

首先，我们需要从 GitHub 上获取 Quartz 的源码。打开你的终端，运行以下命令：

```bash
# 克隆 Quartz 项目到本地
git clone https://github.com/jackyzha0/quartz.git

# 进入项目目录 (注意：目录名是 quartz)
cd quartz

# 安装项目所需的依赖库
npm i
```

安装完成后，Quartz 提供了一个方便的初始化命令，可以帮助我们创建存放笔记内容的文件夹。

```bash
# 初始化你的数字花园
npx quartz create
```

执行此命令后，它会询问你希望将笔记内容存放在哪个文件夹，直接按回车键接受默认的 `content` 即可。

## 第二步：添加你的 Obsidian 笔记

现在，将你的 Obsidian 笔记库 (Vault) 中的所有 `.md` 文件和其他附件（如图片），复制到上一步创建的 `content` 文件夹中。

你可以选择性地复制部分笔记，或者整个库。Quartz 会将这个文件夹里的所有内容都处理成网站页面。

## 第三步：本地预览你的网站

在发布到互联网之前，先在本地看一下效果如何。运行以下命令：

```bash
# 启动本地开发服务器
npx quartz build --serve
```

终端会输出一个网址，通常是 `http://localhost:8080`。在浏览器中打开它，你就可以看到你的笔记已经变成一个可以交互的网站了！

## 第四步：将项目推送到 GitHub

为了让 Vercel 能够访问到你的网站文件，我们需要将整个 `quartz` 文件夹上传到一个 GitHub 仓库。

1.  **在 GitHub 上创建一个新的仓库**：访问 [GitHub](https://github.com/new)，给你的仓库取一个名字（例如 `my-digital-garden`），并保持设置为“公开 (Public)”。**不要**勾选初始化任何文件（如 README 或 .gitignore）。

2.  **在本地关联并推送代码**：回到你的终端，确保当前路径依然在 `quartz` 文件夹下。

    *   如果你之前 `Ctrl + C` 停止了本地预览，请直接执行以下命令。
    *   如果本地预览还在运行，请先按 `Ctrl + C` 停止它，再执行命令。

    ```bash
    # 初始化本地 Git 仓库
    git init

    # 添加所有文件到暂存区
    git add .

    # 创建第一次提交
    git commit -m "Initial commit with my notes"

    # 关联到你刚才创建的远程 GitHub 仓库
    # 将 <Your-Username> 和 <Your-Repo-Name> 替换成你自己的信息
    git remote add origin https://github.com/<Your-Username>/<Your-Repo-Name>.git

    # 推送代码到 GitHub
    git branch -M main
    git push -u origin main
    ```

现在，刷新你的 GitHub 仓库页面，你应该能看到所有文件都已上传成功。

## 第五步：使用 Vercel 进行部署

最后一步，我们将 GitHub 仓库和 Vercel 连接起来，实现自动化部署。

1.  使用你的 GitHub 账号登录 [Vercel](https://vercel.com/)。
2.  进入你的 Dashboard，点击 “Add New...” -> “Project”。
3.  在 “Import Git Repository” 列表中，找到你刚刚创建的 GitHub 仓库，点击旁边的 “Import” 按钮。
4.  在配置页面，Vercel 通常会自动识别出这是一个 Node.js 项目，你**无需修改任何设置**，直接点击 “Deploy” 即可。

等待几分钟，Vercel 就会完成构建和部署。成功后，它会提供一个 `.vercel.app` 后缀的网址，点击访问，恭喜你，你的个人知识网站已经成功发布了！

从此以后，每当你更新了笔记并推送到 GitHub，Vercel 都会自动重新部署，网站内容会保持同步更新。

## 参考文献 (References)

-   [How to publish Obsidian notes with Quartz on GitHub Pages](https://notes.nicolevanderhoeven.com/How+to+publish+Obsidian+notes+with+Quartz+on+GitHub+Pages)