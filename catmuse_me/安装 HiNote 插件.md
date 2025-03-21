---
title: "安装 HiNote 插件"
date: "2025-03-21"
tags:
  - Seed
draft: true
description: 
aliases: 
comments: false
---
目前插件还没有上架 Obsidian 官方插件社区（正在审核中），但是可以通过以下方式安装测试版本体验。

HiNote 插件是我和 AI 共同完成，我主要梳理产品功能的规划和逻辑，还有交互和界面设计。具体的代码实现则由 AI 完成，所以作为内测阶段请谨慎安装。

## 通过 BRAT 安装插件

🌟 推荐使用 BRAT 安装方式，简单且支持版本更新。

1. 在插件社区搜索并安装 BRAT 插件；
2. 打开 BRAT 插件设置或通过快捷命令（Ctrl/Cmd+P），找到 Add Beta Plugin 选项；
3. 在弹出的对话窗口中输入 HiNote GitHub 仓库地址： https://github.com/CatMuse/HiNote
4. 等待安装完成提示后，即可在插件列表中看到 HiNote 插件；

![[Pasted image 20250315232003.png]]

## 通过 GitHub 手动安装

1. 打开 GitHub 项目地址： https://github.com/CatMuse/HiNote
2. 在右侧边栏找到发布（Releases）的最新版本；
3. 分别下载以下三个文件：`main.js`、`manifest.json`、`styles.css`；
4. 打开 Obsidian 第三方插件设置；
5. 在已安装插件标题右侧选择“文件夹”图标，打开插件文件夹；
6. 将下载的三个文件创建文件夹，放到插件文件夹中；
7. 回到 Obsidian 中，刷新第三方插件列表即可看到 HiNote 插件；

![[Pasted image 20250315234646.png]]