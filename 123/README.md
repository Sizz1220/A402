# 打地鼠微信小程序

一个简单有趣的打地鼠游戏微信小程序。

## 功能特点

- 3x3的打地鼠游戏网格
- 随机出现的地鼠和炸弹
- 计时和得分系统
- 最高分记录
- 游戏结束界面

## 玩法说明

1. 点击"开始游戏"按钮开始
2. 在30秒时间内，点击出现的地鼠获得分数
3. 点击地鼠得1分，点击炸弹扣5分
4. 时间结束后，系统会记录最高分

## 开发说明

### 图片资源

本项目需要两张图片资源：
- `images/mole.png` - 地鼠图片
- `images/bomb.png` - 炸弹图片

请将这些图片放入 `images` 文件夹中。

### 开发环境

- 微信开发者工具
- 基础库 2.14.1 或更高

### 项目结构

```
|- app.js                 // 应用程序逻辑
|- app.json               // 应用程序配置
|- app.wxss               // 应用程序样式
|- project.config.json    // 项目配置
|- pages/                 // 页面文件夹
|   |- index/             // 首页
|   |   |- index.js
|   |   |- index.json
|   |   |- index.wxml
|   |   |- index.wxss
|   |- game/              // 游戏页面
|       |- game.js
|       |- game.json
|       |- game.wxml
|       |- game.wxss
|- images/                // 图片资源
    |- mole.png
    |- bomb.png
``` 