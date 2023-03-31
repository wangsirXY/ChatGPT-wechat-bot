/**
  * @description 微信模块
  * @author GuAn
  * @time 2023-03-30 10:44:56
  */
import qrcodeTerminal from "qrcode-terminal";
import config from "./config.js";
import { bot, startTime } from "./index.js";
import { replyMessage } from "./chatgpt.js";

/**
 * 生成微信登录二维码
 * @param qrcode 二维码地址
 */
export function onScan(qrcode: string) {
  // 在console端显示登录二维码
  qrcodeTerminal.generate(qrcode);

  // 二维码图片地址
  const qrcodeImageUrl = [
    "https://api.qrserver.com/v1/create-qr-code/?data=",
    encodeURIComponent(qrcode)
  ].join("");

  // 在console端显示登录二维码地址
  console.log("二维码在线地址: ", qrcodeImageUrl);
}

/**
 * 登录成功
 * @param nickname 机器人微信昵称
 */
export function onLogin(nickname: any) {
  // 提示机器人微信登录成功
  console.log(`${nickname} has logged in.`);
  // 打印登录时间
  console.log(`Current time: ${new Date()}`);
  // 如果机器人设置自动回复，则打印提示
  if (config.autoReply)
    console.log(`Automatic robot chat mode has been activated.`);
}

/**
 * 退出登录成功
 * @param nickname 机器人微信昵称 
 */
export function onLogout(nickname: any) {
  console.log(`${nickname} has logged in.`);
}

/**
 * 加好友申请
 * @param friendship 消息类型？
 */
export async function onFriendShip(friendship: any) {
  // 判断是否为加好友请求
  if (friendship.type() === 2) {
    // 根据是否为自动通过好友验证的正则
    if (config.friendShipRule.test(friendship.hello())) {
      await friendship.accept();
    }
  }
}

/**
 * 收发消息（收发消息各执行一次，共执行两次）
 *  - 
 * @param msg 收到的消息对象
 */
export async function onMessage(msg: any) {
  // 避免重复发送（消息发送时间 < 初始化时间）
  if (msg.date() < startTime) return;

  // 发送者微信信息
  const contact = msg.talker();
  // 接收者微信信息
  const receiver = msg.to();
  // 消息内容
  const content = msg.text().trim();
  // 微信群聊信息
  const room = msg.room();

  /**
   * 联系人昵称
   *  - .alias() 获取这个联系人在群内的群昵称
   *  - .name() 获取联系人的昵称
   */
  const alias = (await contact.alias()) || (await contact.name());
  // 消息类型
  const isText = msg.type() === bot.Message.Type.Text;

  // 当前消息是否为机器人发送
  if (msg.self()) return;

  // 判断群聊消息和私聊消息
  if (room && isText) {
    // 如果是微信群聊
    console.log("----------收到用户群聊消息----------");
    /**
     * 打印信息
     * room.topic() 群昵称
     * contact.name() 发送者昵称
     * content 消息内容
     */
    console.log(`
      Group name: ${await room.topic()}\n
      talker: ${contact.name()}\n
      content: ${content}
    `);

    // 正则表达式；匹配是否有唤醒词
    const pattern = RegExp(`^@${receiver.name()}\\s+${config.groupKey}[\\s]*`);
    // 机器人是否在群里被@
    if (await msg.mentionSelf()) {
      // 匹配正则
      if (pattern.test(content)) {
        // 去除唤醒词后的群消息
        const groupContent = content.replace(pattern, "");
        // 调用回复消息方法
        replyMessage(room, groupContent, contact.name());
        return;
      }
      console.log(`Content is not within the scope of the customizition format.`);
    }
  } else if (isText) {
    // 如果是微信私聊
    console.log("----------收到用户私聊消息----------");
    console.log(`talker: ${alias} content: ${content}`);

    // 如果开启了自动回复
    if (config.autoReply) {
      // 如果消息以唤醒词开头
      if (content.startsWith(config.privateKey)) {
        // 去除唤醒词的消息内容
        let privateContent = config.privateKey !== "" ? content.subString(config.privateKey.length).trim() : content;
        // 调用回复消息方法
        replyMessage(contact, privateContent);
      }
    }
  } else {
    console.log(`Content is not within the scope of the customizition format.`);
  }
}