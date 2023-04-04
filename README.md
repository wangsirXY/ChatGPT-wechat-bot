<h1 align="center">ChatGPT-wechat-bot🤖</h1>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> 基于ChatGPT的微信自动回复机器人🤖。

## Support

- [x] 支持上下文语境的对话。
- [x] 支持在群聊@你的机器人🤖，发送“@机器人 xxxx”即可收到回复。
- [x] 支持通过关键词唤醒你的机器人，如当在私聊中发送“小安 xxxx”时才会收到回复。
- [ ] 其他

## 默认配置

```js
{
  // 填入你的OPENAI_API_KEY
  OPENAI_API_KEY: '',
  // 反向代理地址，简单说就是你的在国外服务器地址，如何获取看README
  API_BASE_URL: "",
  // 开启会后收到ChatGPT的自动回复
  autoReply: true,
  // 在群组中设置唤醒微信机器人的关键词
  groupKey: '',
  // 在私聊中设置唤醒微信机器人的关键词
  privateKey: '',
  // 重置上下文的关键词，如可设置为reset
  resetKey: 'reset',
  // 是否在群聊中带上提问的问题
  groupReplyMode: true,
  // 是否在私聊中带上提问的问题
  privateReplyMode: false,
  // 根据正则匹配是否自动通过好友验证
  friendShipRule: /chatgpt|chat/,
  // 设置获取消息的重试次数
  retryTimes: 3,
}
```



## 开始机器人🤖

1. 首先需要获取你的 ChatGPT 的 OPENAI_API_KEY

   > 打开 https://platform.openai.com/overview 并登录注册，进入网页。

   <img width="50%" src="https://cdn.nlark.com/yuque/0/2023/png/32766795/1680598610665-c308978d-ba5f-45b5-a3f8-98d0a718c30c.png" /> 

   ![image.png](https://cdn.nlark.com/yuque/0/2023/png/32766795/1680598745215-56b3a279-7a9e-4e81-94b5-5ce766c5fd4b.png)

2. 把 `OPENAI_API_KEY` 填入目录 `src/config.ts` 下的 `openai.OPENAI_API_KEY` 中。

3. 把 `API_BASE_URL` 填入目录 `src/config.ts` 下的 `openai.API_BASE_URL` 中，如何设置可看下文 <a href="#设置反向代理地址">设置反向代理地址</a>。

4. 然后在终端运行以下命令。如有需要，请在`src/config.js`中配置其它配置变量。

   > 如果依赖安装不上，可切换为 `cnpm` 进行安装。

   ```bash
   # npm
   npm install
   npm run dev
   
   # yarn
   yarn install
   yarn dev
   ```

5. 执行完之后，可以看到终端控制台输出一下信息，扫码登录即可。

   ![image.png](https://cdn.nlark.com/yuque/0/2023/png/32766795/1680599558149-8ec3aaea-2a7a-4c25-bbb3-fdeaace55a28.png) 

6. 登录成功，用另外一个微信往你扫码登录的微信发消息，你将会收到来自 ChatGPT 的回复。

   <img width="90%" src="https://cdn.nlark.com/yuque/0/2023/png/32766795/1680599914719-e1d3cb62-3073-47dc-8de3-da5345d3e870.png" /> 

   <img width="90%" src="https://cdn.nlark.com/yuque/0/2023/png/32766795/1680600036994-38c1a7ca-05ff-4386-beca-97f79a8c10bd.png" /> 

   <img width="90%" src="https://cdn.nlark.com/yuque/0/2023/png/32766795/1680600305478-ad293826-da09-4974-9dc8-489399ff797b.png" /> 



## 设置反向代理地址

**方式一：** 

ChatGPT API 代理 https://hub.docker.com/r/mirrors2/chatgpt-api-proxy

chatgpt api 代理，已验证 OpenCat,AssisChat,AMA(问天),chathub

可配置好 OPENAI_API_KEY 分享代理地址给他人用。

快速开始

```
docker run -d -p 80:80 --name chatgpt-api-proxy mirrors2/chatgpt-api-proxy

可选 -e OPENAI_API_KEY={nide_api_key}
```

docker 跑起来之后你的代理地址就生效了：

官方的：`https://api.openai.com/v1/chat/completions`

你的： `你的域名/v1/chat/completions` 或者 `你的服务器ip和端口/v1/chat/completions`

**方式二：** 

在 https://cloud.tencent.com 注册账号

进入云函数控制台：https://console.cloud.tencent.com/scf/list

依次点击【新建】->【从头开始】，然后按照以下配置，**没写出来的就不用管，使用默认设置** 

- 函数类型：Web函数
- 函数名称：openai-proxy（也可以随便取个名字）
- 地域：香港（也可以是中国之外的任何国家）
- 运行环境：Nodejs 16.13（或者更高的版本）
- 高级配置:
  - 内存：64M
  - 执行超时时间：900 秒
  - 请求多并发：2 并发
- 日志配置 -> 日志投递：启用（可以选择不开，开的话一个月应该几分钱）
- 函数代码：本地上传zip包（[点我下载 ZIP 包](https://github.com/Ice-Hazymoon/openai-scf-proxy/releases/download/0.0.3/openai-proxy.zip)）
- 触发器配置（这里可能要创建一个新的触发器）：
  - 默认触发器
  - 触发别名/版本：默认流量
  - 请求方法：ANY
  - 发布环境：发布
  - 鉴权方法：免鉴权

之后点击“完成”按钮，进入【函数管理】，点击【函数代码】，往下拉，找到【访问路径】，这里就是你的代理地址

使用的时候需要把 "/release" 部分删除（以下地址非真实地址）

例如：`https://service-aaaaa.hk.apigw.tencentcs.com/release/` 

改为：`https://service-aaaaa.hk.apigw.tencentcs.com/` 

## QA

1. 微信无法取消登录问题 可以直接删除 `WechatEveryDay.memory-card` 文件，重新跑程序。

2. 支持的 node 版本: Node.js >= 16.8。

3. 因为 ChatGPT 的长度限制，如果回复消息不完整，可以对它说"请继续" 或者 "请继续写完"。

4. Error: Failed to launch the browser process puppeteer refer to 

   https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix

   ```bash
   // ubuntu
   sudo apt-get install chromium-browser
   sudo apt-get install  ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
   ```

## Licence

开源协议文档请参阅 [LICENSE](https://github.com/liyupi/app-template/blob/master/LICENSE)



