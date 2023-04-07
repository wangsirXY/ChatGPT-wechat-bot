/**
  * @description 指令: htlp, 为用户提供提示信息
  * @author GuAn
  * @time 2023-04-07 10:42:21
  */
export default function (nickname: string) {
  return `
    @${nickname} 我会为您提供以下帮助：\n
    \n
    1. 发送私聊信息“小安 + 问题”，即可唤醒我为您解答.\n
    2. 发送好友验证信息“chatgpt | chat”，即可添加我为好友.\n
    \n
    当然，这些只是我已经掌握的指令，今后我会为您提供更多的帮助.
  `
};