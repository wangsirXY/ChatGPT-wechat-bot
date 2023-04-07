/**
  * @description 配置文件
  * @author GuAn
  * @time 2023-03-30 10:12:29
  */
export default {
  // 是否停机维护
  temporaryClosure: false,
  // 微信相关参数
  wx: {
    // 设置获取消息的重试次数
    retryTimes: 3,
    // 在群组中设置唤醒微信机器人的关键词
    groupKey: '',
    // 在私聊中设置唤醒微信机器人的关键词
    privateKey: '小安',
    // 重置上下文的关键词，如可设置为reset
    resetKey: 'reset',
    // 开启会后收到ChatGPT的自动回复
    autoReply: true,
    // 根据正则匹配是否自动通过好友验证
    friendShipRule: /chatgpt|chat/,
    // 是否在群聊中按照回复的格式进行回复
    groupReplyMode: true,
    // 是否在私聊中按照回复的格式进行回复
    privateReplyMode: false,
  },
  // openai相关参数
  openai: {
    // 云函数请求地址
    API_BASE_URL: "https://xxxxxxxx.com",
    // 填入你的OPENAI_API_KEY
    OPENAI_API_KEY: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
};
