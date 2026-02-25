# 我们的故事 · 情侣纪念网站

Next.js 14 + TypeScript + Tailwind CSS + Framer Motion 实现的情侣纪念首页。

## 设计说明

- **主色**：浅粉 `#FFB6C1`，背景 `#FFFAFA`，文字深灰
- **开屏页**：标题「这是我们的三年」，4 位密码（正确密码：`1314`），正确后淡入进入首页
- **首页**：顶部导航（我们的故事、小可爱、地图），中间「在一起 X 天」（从 2022-02-22 起算），底部「添加回忆」按钮

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。输入密码 `1314` 进入首页。

## 项目结构

- `src/app/page.tsx` - 根页面，控制开屏/首页切换
- `src/components/SplashScreen.tsx` - 开屏页（密码输入）
- `src/components/HomePage.tsx` - 首页框架
- 代码注释为中文，便于修改

## 后续可扩展

- 导航链接 `/story`、`/cutie`、`/map` 对应页面
- 「添加回忆」弹窗或独立页
- 持久化「已解锁」状态（如 localStorage）
