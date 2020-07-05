const axios = require('axios')
const common = require('./common')
const config = require('./config')

var TOKEN = null
var DEBUG_CHANNEL = null
var INFO_CHANNEL = null
var ERROR_CHANNEL = null

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

async function debug (message, context) {
  const color = config.channelColors.get('debug')
  return await postMessageToSlack(DEBUG_CHANNEL, message, context, color)
}

async function info (message, context) {
  const color = config.channelColors.get('info')
  return await postMessageToSlack(INFO_CHANNEL, message, context, color)
}

async function error (message, context) {
  const color = config.channelColors.get('error')
  return await postMessageToSlack(ERROR_CHANNEL, message, context, color)
}

function generateAttachments (context, color) {
  if (context === undefined) {
    return null
  }
  const fields = []
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

async function postMessageToSlack (channel, message, context, color) {
  const err = checkSettings(channel)
  if (err !== null) {
    return common.failedResponse(err)
  }
  const url = 'https://slack.com/api/chat.postMessage'
  const attachments = generateAttachments(context, color)
  const data = {
    channel: channel,
    text: message,
    attachments: attachments
  }
  const response = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf8',
      Authorization: 'Bearer ' + TOKEN
    },
    url: url,
    data: data
  })
  if (response.data.ok === false) {
    return common.failedResponse(response.data.error)
  }
  return common.successResponse()
}

module.exports = {
  setToken,
  setDebugChannel,
  setInfoChannel,
  setErrorChannel,
  setChannels,
  debug,
  info,
  error
}
