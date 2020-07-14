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
  debugChannel: 'dev', // 频道名称
  infoChannel: 'info',
  errorChannel: 'error',
  source: '某某服务', // 来源程序
  env: '开发' // 部署环境
})

im.debug('hello debug')
im.info('hello info')
im.error('hello error')
```

## 环境变量

初始化时的参数全部支持使用环境变量，环境变量提供的参数初始化时可以不再提供。

* IM_PROVIDER
* IM_TOKEN
* IM_DEBUG_CHANNEL
* IM_INFO_CHANNEL
* IM_ERROR_CHANNEL
* IM_SOURCE
* IM_ENV

## 函数列表

* debug(message, context)
* info(message, context)
* error(message, context)

> message: 消息内容，必填
> context: Object/Map类型，附属信息，可选。
