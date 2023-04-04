/**
  * @description 入口文件
  * @author GuAn
  * @time 2023-03-30 10:13:06
  */
import { WechatyBuilder } from "wechaty";
import { onFriendShip, onLogin, onLogout, onMessage, onScan } from "./wx.js";
import config from "./config.js";
import { initChatGPT } from "./chatgpt.js";

// 微信实例
export let bot: any = {};
// 初始化的时间
export const startTime = new Date();

initProject();

/** 初始化项目 */
async function initProject() {
  try {
    // 初始化ChatGPT
    await initChatGPT()

    // 创建微信实例
    bot = WechatyBuilder.build({
      name: "wechat-bot",
      puppet: 'wechaty-puppet-wechat', // 如果有token，记得更换对应的puppet
      puppetOptions: {
        uos: true,  // 开启 uos 协议
      },
    })

    // 挂载微信方法
    bot
      .on("scan", onScan)     // 扫码登录
      .on("login", onLogin)   // 登录成功
      .on("logout", onLogout)   // 退出登录成功
      .on("message", onMessage)   // 收发消息

    // 判断好友验证正则是否存在
    if (config.wx.friendShipRule) {
      bot.on("friendship", onFriendShip);   // 好友申请消息
    }

    // 启动微信登录
    bot
      .start()
      .then(() => {
        console.log("Start to log in WeChat...");
      }).catch((error: unknown) => {
        console.log(`WeChat Log Error: ${error}`);
      });
  } catch (error) {
    console.log(`init Error: ${error}`);
  }
}