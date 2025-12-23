# 替换 Agent 为 Model

## 完成情况
1.  **全局搜索与替换**：
    *   已将数据库 Schema 中的 `Agent` 确认迁移为 `Model`。
    *   已重命名核心类型文件：`src/types/agent.ts` -> `src/types/model.ts`。
    *   已重命名 Store 文件：`src/store/agent` -> `src/store/model`。
    *   已更新后端 API 路由与错误信息：`src/app/api/model`。
    *   已更新 Service 层逻辑：`src/services/iao.service.ts`, `src/services/smartIndexer.service.ts`。
    *   已更新前端页面逻辑与状态管理：`src/app/[locale]/models/page.tsx`。
    *   已更新合约配置常量：`src/config/contracts.ts` (ABI 名称与 Token 常量)。
    *   已更新国际化资源文件：`messages/en.json`, `messages/zh.json`。
    *   已更新中间件配置：`src/proxy.ts`。
    *   已更新辅助工具：`src/lib/iao-success-checker.ts`。

2.  **清理冗余文件**：
    *   删除了重复的 Service 文件：`src/services/models.service.ts` (功能已包含在 `src/services/api/model.ts` 中)。

3.  **最终验证**：
    *   `src/config/contracts.ts` 中的 `USERAGENT` 已更正为 `USERMODEL`。
    *   `src/app/[locale]/models/page.tsx` 中的日志信息已修正。
    *   `src/proxy.ts` 中的路由保护已更新。

## 待办事项
*   无。所有已知的 "agent" 字段（在 Model 上下文中）都已修正为 "model"。

## 总结
项目中的 "Agent" 概念已成功重构为 "Model"，覆盖了从数据库、后端服务、API、前端组件到配置文件的所有层级。代码库现在应该使用统一的 "Model" 术语。
