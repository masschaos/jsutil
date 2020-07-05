# IM
## 概述
IM模块实现了对接IM系统的接口，使用该模块可以迅速将消息推送到指定的IM系统中，目前已实现的IM系统
* slack

## 使用说明
``` js
const im = require('im')
im.setProvider('slack')  // 可不调用，默认slack
im.setToken('xxxxxx')
im.setDebugChannel('debug')
im.setInfoChannel('info')
im.setErrorChannel('error')
// im.setChannels('debug', 'info', 'error')  可以一次设置3个channel
im.debug('hello debug')
im.info('hello info')
im.error('hello error')
```

## 函数列表
* setProvider(providerName)
		设置IM服务提供者，目前只有slack, 默认slack
* setToken(token)
		设置token
* setDebugChannel(channelName)
* setInfoChannel(channelName)
* setErrorChannel(channelName)
* setChannels(debugChannelName, infoChannelName, errorChannelName)
* debug(message, context)
		向debugChannel发送消息
		message: string类型
		context: Object/Map类型，非必需
* info
* error