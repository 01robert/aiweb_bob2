# AI Chat Assistant

这是一个基于 Next.js 14 构建的现代化 AI 聊天助手网站。项目采用了简约优雅的设计风格，致力于提供流畅的用户体验。

## 项目特点

- 🎨 简约现代的 UI 设计
- 💬 实时聊天界面
- 📱 响应式布局，支持各种设备
- ⚡ 基于 Next.js 14 的高性能架构

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **字体**: Inter (Google Fonts)
- **代码规范**: ESLint

## 开发环境

### 系统要求

- Node.js 18.17 或更高版本
- npm 9+ 或 yarn 或 pnpm

### 安装步骤

1. 克隆项目
```bash
git clone [项目地址]
cd [项目目录]
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm run start
```

## 项目结构

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx    # 应用布局
│   │   ├── page.tsx      # 主页面
│   │   └── globals.css   # 全局样式
│   └── components/
│       └── chat/
│           └── ChatInterface.tsx  # 聊天界面组件
├── public/
└── ...
```

## 开发进度

- [x] 项目基础架构搭建
- [x] 聊天界面 UI 设计
- [x] 基础消息展示功能
- [ ] AI 对话功能集成
- [ ] 消息历史记录
- [ ] 用户认证系统
- [ ] 主题切换功能

## 后续计划

1. 集成 AI 对话功能
2. 添加用户认证系统
3. 实现消息持久化存储
4. 添加深色模式支持
5. 优化移动端体验

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

[MIT License](LICENSE)
