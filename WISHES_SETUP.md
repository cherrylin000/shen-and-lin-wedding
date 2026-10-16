# 婚礼祝福留言墙（独立审核版本）
入口：`wishes.html`。本分支不修改原有 `index.html`，避免影响请柬。审核后可在请柬末尾加入链接 `<a href="wishes.html">留下祝福</a>`。

## 启用步骤
1. 创建 Firebase 项目、注册 Web App，并创建 Firestore 数据库。
2. 将 Firebase 控制台给出的 Web App 配置填写到 `wishes-config.js`。
3. 在 Firestore Rules 中部署 `firestore.rules`，不要使用测试模式规则。
4. 开启 Firebase App Check，并配置速率限制、垃圾信息处理与滥用监控；仅靠公开写入规则不能阻止刷屏。正式公开前建议增加服务端限流和审核机制。
5. 在独立预览站点测试两台设备同步、中文输入、异常网络、长文本和移动端排版。

## 设计说明
- 访客无需登录；留言公开展示，最新 100 条实时更新。
- Firestore 保存留言；前端使用 textContent 防止留言注入 HTML。
- 浏览器端不提供删除权限。管理员可通过 Firebase Console 删除不适当留言。
- Firestore 规则校验字段与长度，但匿名公开写入仍有刷屏风险。请在上线前完成防滥用措施。
- 当前仅提供独立页面，尚未嵌入原请柬；Firebase 尚未配置前不可真实发送。
