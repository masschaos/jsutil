const axios = require('axios')
const common = require('./common')
const config = require('./config')

var TOKEN = null
var DEBUG_CHANNEL = null
var INFO_CHANNEL = null
var ERROR_CHANNEL = null
var SOURCE = null
var ENV = null

function setToken (tokenValue) {
  TOKEN = tokenValue
}

function setDebugChannel (channelName) {
  DEBUG_CHANNEL = channelName
}

function setInfoChannel (channelName) {
  INFO_CHANNEL = channelName
}

function setErrorChannel (channelName) {
  ERROR_CHANNEL = channelName
}

function setChannels (debugChannelName, infoChannelName, errorChannelName) {
  setDebugChannel(debugChannelName)
  setInfoChannel(infoChannelName)
  setErrorChannel(errorChannelName)
}

function setSource (source) {
  SOURCE = source
}

function setEnv (env) {
  ENV = env
}

function debug (message, context) {
  const color = config.channelColors.get('debug')
  postMessageToSlack(DEBUG_CHANNEL, message, context, color)
}

function info (message, context) {
  const color = config.channelColors.get('info')
  postMessageToSlack(INFO_CHANNEL, message, context, color)
}

function error (message, context) {
  const color = config.channelColors.get('error')
  postMessageToSlack(ERROR_CHANNEL, message, context, color)
}

function generateAttachments (context, color) {
  const fields = []
  if (SOURCE) {
    fields.push({
      title: '来源程序',
      value: SOURCE,
      short: true
    })
  }
  if (ENV) {
    fields.push({
      title: '部署环境',
      value: ENV,
      short: true
    })
  }
  if (common.getType(context) === 'map') {
    for (var item of context) {
      const key = item[0].toString()
      const value = item[1].toString()
      const field = {
        title: key,
        value: value,
        short: true
      }
      fields.push(field)
    }
  } else if (common.getType(context) === 'object') {
    for (var key in context) {
      key = key.toString()
      const value = context[key].toString()
      const field = {
        title: key,
        value: value,
        short: true
      }
      fields.push(field)
    }
  }
  const attachment = {
    color: color,
    fields: fields
  }
  return [attachment]
}

function checkSettings (channel) {
  if (TOKEN === null) {
    return 'please setToken'
  }
  if (channel === null) {
    return 'please setChannels'
  }
  return null
}

function postMessageToSlack (channel, message, context, color) {
  const err = checkSettings(channel)
  if (err !== null) {
    console.log(err)
    return
  }
  const url = 'https://slack.com/api/chat.postMessage'
  const attachments = generateAttachments(context, color)
  const data = {
    channel: channel,
    text: message,
    attachments: attachments
  }
  axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf8',
      Authorization: 'Bearer ' + TOKEN
    },
    url: url,
    data: data
  })
    .then(response => {
      if (response.data.ok === false) {
        console.log('发送失败: ', response.data.error)
      }
    })
    .catch((e) => {
      console.log('slack接口调用异常: ', e)
    })
}

module.exports = {
  setToken,
  setDebugChannel,
  setInfoChannel,
  setErrorChannel,
  setChannels,
  setSource,
  setEnv,
  debug,
  info,
  error
}
