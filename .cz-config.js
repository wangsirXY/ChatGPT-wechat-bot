module.exports = {
  // 可选类型
  types: [
    { value: "feat", name: "feat:     一个新的特性" },
    { value: "fix", name: "fix:      修复一个Bug" },
    { value: "docs", name: "docs:     文档变更" },
    { value: "style", name: "style:    代码格式(不影响代码运行的变动)" },
    {
      value: "refactor",
      name: "refactor: 代码重构，注意和特性、修复区分开",
    },
    { value: "perf", name: "perf:     性能优化" },
    { value: "test", name: "test:     增加测试" },
    { value: "ci", name: "ci:       修改项目继续集成流程" },
    {
      value: "chore",
      name: "chore:    构建过程或辅助工具的变动(包括但不限于文档、代码生成等)",
    },
    {
      value: "improvement",
      name: "improvement:   用于对当前实现进行改进而没有添加新功能或修复错误的提交",
    },
    { value: "merge", name: "merge:         仅进行分支合并" },
    { value: "deps", name: "deps:     升级依赖" },
    { value: "revert", name: "revert:   回滚到上一个版本" },
    { value: "build", name: "build:    打包(修改项目构建系统配置)" },
  ],
  // 消息步骤
  messages: {
    type: "请选择提交类型:",
    customScope: "请输入修改范围(可选):",
    subject: "请简要描述提交(必填):",
    body: "请输入详细描述(可选):",
    footer: "请输入要关闭的issue(可选):",
    confirmCommit: "确认使用以上信息提交？(y/n/e/h)",
  },
  // 跳过问题
  skipQuestions: ["body", "footer"],
  // subject文字长度默认是72
  subjectLimit: 72,
};