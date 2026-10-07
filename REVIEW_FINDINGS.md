# zh-CN 本地化审查发现汇总（进行中）

**更新时间**: 2026-10-07 00:24 UTC+8

## 已完成的审查 (5/11)

### ❌ CSS 实现 (css-implementation)
**状态**: 未通过 - 发现阻断性问题

#### 阻断性 (Blocker)
- [ ] **缺少键盘焦点状态**
  - 文件: `src/web/operator.css`
  - 问题: `.locale-switch` 没有 `:focus-visible` 样式
  - 影响: 键盘用户无法导航
  - 修复: 添加 `.locale-switch:focus-visible { outline: 2px solid var(--green); outline-offset: 2px; }`

#### 重要 (Major)
- [ ] **移动端触摸目标太小**
  - 当前: `padding: 2px 3px; font-size: 10px`
  - 问题: 低于 WCAG 44×44px 标准
  - 修复: `padding: 8px 10px`

- [ ] **移动端字体太小**
  - 当前: `10px`
  - 修复: `12px`

#### 次要 (Minor)
- [ ] 基础 padding 过紧: `2px 8px` → `4px 10px`
- [ ] 禁用状态光标: `cursor: wait` → `cursor: not-allowed`

---

### ✅ Rust 实现 (rust-implementation)
**状态**: 通过 - 设计良好且安全

**主要发现:**
- ✅ zh-CN locale 正确注册到 INSTALLED_LOCALES
- ✅ Locale 验证安全（防注入）
- ✅ 默认 locale 处理正确
- ✅ 测试覆盖全面（452条消息，72行交互，284个视觉检查）
- ℹ️ `AuthoringMessage.en` 字段命名容易混淆（但功能正确）

**无阻断问题**

---

### ❌ JavaScript 实现 (js-implementation)
**状态**: 未通过 - 发现可访问性问题

#### 重要 (Major)
- [ ] **错误反馈仅通过 tooltip**
  - 文件: `src/web/dashboard.js`
  - 问题: 屏幕阅读器无法读取 title 属性
  - 修复: 添加 aria-live 区域或可见错误消息

- [ ] **无可见错误反馈**
  - 问题: 触摸设备用户看不到错误（需要悬停）
  - 修复: 显示可见错误消息（行内文本或 toast）

#### 次要 (Minor)
- [ ] 'failed' 类永久保留: 重试前应移除
- [ ] 缺少加载状态通知: 添加 `aria-busy` 属性
- [ ] API 响应体未验证
- [ ] 空值检查不一致

---

### ❌ 翻译质量 (translation-quality)
**状态**: 高质量但需修复 - 100% 完成度

#### 重要 (Major)
- [ ] **"days" 未翻译**
  - 文件: `src/web/locales/zh-CN.json` 行1427
  - 当前: `"en": "days"`
  - 修复: `"en": "天"`

#### 次要 (Minor)
- [ ] **Base URL 术语不一致**
  - 行1220: "客户端 Base URL"（混用英文）
  - 行1418: "上游基础 URL"（全中文）
  - 行1927: "客户端基础 URL"（全中文）
  - 建议: 统一使用 "基础 URL"

- [ ] **重复概念翻译不一致**
  - `settings.connection.base_url` vs `setup.step4.baseurl`
  - 应使用相同翻译

**优点:**
- ✅ 987/987 键全部翻译
- ✅ 技术术语正确保留
- ✅ 占位符正确维护
- ✅ CLDR 复数处理正确
- ✅ 文化适配恰当

---

### 🔄 翻译结构 (translation-structure)
**状态**: 进行中

---

## 待完成的审查 (6/11)

- ⏳ 测试覆盖率审查 (test-coverage)
- ⏳ 验证器审查 (validator-review)
- ⏳ 渲染检查审查 (render-check-review)
- ⏳ 计划文档审查 (plan-documentation)
- ⏳ 知识库审查 (knowledge-base)
- ⏳ 命名分析 (naming-analysis) - **关键：zh-CN vs zh-Hans**
- ⏳ 上游兼容性 (upstream-compatibility)
- ⏳ README 审查 (readme-review)

---

## 问题优先级统计

### 阻断性 (必须修复)
- [ ] CSS: 键盘焦点状态 ⌨️
- [ ] JS: 屏幕阅读器可访问的错误反馈 ♿

### 重要 (强烈建议)
- [ ] CSS: 移动端触摸目标尺寸 📱
- [ ] CSS: 移动端字体大小 📱
- [ ] JS: 可见错误反馈 👁️
- [ ] 翻译: "days" 字段 🌐

### 次要 (建议改进)
- [ ] CSS: 基础 padding
- [ ] CSS: 禁用状态光标
- [ ] JS: 移除 'failed' 类
- [ ] JS: aria-busy 属性
- [ ] JS: API 响应验证
- [ ] JS: 空值检查一致性
- [ ] 翻译: Base URL 术语一致性
- [ ] 翻译: 重复概念一致性

---

## 估算修复工作量

- **CSS 修复**: ~10分钟（简单的样式添加）
- **JS 可访问性**: ~30分钟（需要添加 aria-live + 可见错误）
- **翻译修复**: ~5分钟（简单的文本替换）
- **测试验证**: ~20分钟（重新运行相关测试）

**总计**: ~1-1.5小时

---

## 下一步

1. ✅ 等待剩余审查完成
2. ⏳ 创建统一修复分支
3. ⏳ 应用所有必要修复
4. ⏳ 运行完整测试套件
5. ⏳ 解决 zh-CN vs zh-Hans 命名问题
6. ⏳ 准备上游 PR
