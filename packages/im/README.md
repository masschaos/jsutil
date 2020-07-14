# IM

## 概述

IM模块实现了对接IM系统的接口，使用该模块可以迅速将消息推送到指定的IM系统中，目前已实现的IM系统

* slack

## 使用说明

``` js
const IM = require('@masschaos/im')

const im = new IM({
  provider: 'slack', // slack is default
  token: 'your slack token',
  debugChannel: 'dev',
  infoChannel: 'info',
  errorChannel: 'error'
})

im.debug('hello debug')
im.info('hello info')
im.error('hello error')
```

## 函数列表

* debug(message, context)
* info(message, context)
* error(message, context)

> message: 消息内容，必填
> context: Object/Map类型，附属信息，可选。
