/**
  * @description ChatGPT模块
  * @author GuAn
  * @time 2023-03-30 10:42:05
  */

import { ChatGPTAPI } from "chatgpt";
import config from "./config.js";
import { retryRequest } from "./utils.js";

// ChatGPT对象
let chatGPT: any = {};
// 上下文对象
let chatOption: any = {};

/** 初始化 ChatGPT */
export async function initChatGPT() {
  chatGPT = new ChatGPTAPI({
    apiKey: config.openai.OPENAI_API_KEY,
    apiBaseUrl: config.openai.API_BASE_URL,
    completionParams: {
      model: 'gpt-3.5-turbo',
    },
  });
}

/**
 * 获取ChatGPT的回复
 * @param content 去除唤醒词后的提问内容
 * @param contactId 发送者的微信ID
 * @returns MarkDown格式的回答内容
 */
export async function getChatGPTReply(content: any, contactId: any) {
  /**
   * conversationId: 会话ID
   * text: ChatGPT回复的消息，MarkDown格式
   * id: 消息ID
   */
  const { conversationId, text, id } = await chatGPT.sendMessage(content, chatOption[contactId]);

  // 保存会话上下文
  chatOption = {
    [contactId]: {
      conversationId,
      parentMessageId: id,
    },
  };

  // ChatGPT回复的消息
  console.log('response: ', conversationId, text);
  // 回答消息内容
  return text;
}

/**
 * 回复消息
 * @param contact 发送者微信号信息（机器人）
 * @param content 去除唤醒词后的提问内容
 * @param nickname 提问者微信号昵称
 */
export async function replyMessage(contact: any, content: string, nickname?: string) {
  // 消息ID
  const { id: contactId } = contact;
  try {
    // 如果用户发的是重置上下文的关键词
    if (
      content.trim().toLocaleLowerCase() === config.wx.resetKey.toLocaleLowerCase()
    ) {
      // 重置上下文
      chatOption = {
        ...chatOption,
        [contactId]: {},
      };
      await contact.say('Previous conversation has been reset.');
      return;
    }
    // 用户发的不是重置上下文关键词
    const message = await retryRequest(
      // 获取ChatGPT回复的消息
      () => getChatGPTReply(content, contactId),
      config.wx.retryTimes,
      500
    );

    // 格式化消息回复内容
    formatMessage(contact, content, message, nickname);
  } catch (e: any) {
    console.error(e);
    // 如果网络超时，则回复超时提示
    if (e.message.includes('timed out')) {
      await contact.say(
        content +
        '\n-----------\nERROR: Please try again, ChatGPT timed out for waiting response.'
      );
    }
  }
}

/**
 * 格式化信息
 * @param contact 发送者信息
 */
async function formatMessage(contact: any, content: string, message: string, nickname?: string) {
  if (
    (contact.topic && contact?.topic() && config.wx.groupReplyMode) ||
    (!contact.topic && config.wx.privateReplyMode)
  ) {
    // 格式化回复内容为回复格式
    const result = content + `\n-----------\n@${nickname} ` + message;
    await contact.say(result);
  } else {
    await contact.say(message);
  }
}