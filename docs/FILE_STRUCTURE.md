# 项目文件结构说明

## 核心文件

### 配置文件
- `next.config.js`: Next.js 的配置文件，设置了严格模式和构建优化选项
- `tsconfig.json`: TypeScript 配置文件，定义了编译选项和路径别名
- `tailwind.config.js`: Tailwind CSS 配置文件，定义了样式扫描范围
- `postcss.config.js`: PostCSS 配置文件，集成了 Tailwind 和 Autoprefixer
- `package.json`: 项目依赖和脚本配置文件

### 应用核心文件
- `src/app/layout.tsx`: 应用的根布局组件，定义了页面的基本结构和元数据
  - 集成了 Inter 字体
  - 设置了页面标题和描述
  - 定义了 HTML 语言和主体结构

- `src/app/page.tsx`: 应用的主页面组件
  - 实现了顶部导航栏
  - 集成了聊天界面组件
  - 设置了页面的基本布局和样式

- `src/app/globals.css`: 全局样式文件
  - 引入了 Tailwind CSS 的基础样式
  - 定义了全局颜色变量
  - 自定义了滚动条样式

### 组件文件
- `src/components/chat/ChatInterface.tsx`: 聊天界面的核心组件
  - 使用 'use client' 指令标记为客户端组件
  - 实现了消息列表和���入框功能
  - 管理聊天消息的状态
  - 处理消息发送逻辑

## 目录结构 