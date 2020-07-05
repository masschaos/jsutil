const axios = require('axios')
const common = require('./common')

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
  return await postMessageToSlack(DEBUG_CHANNEL, message, context)
}

async function info (message, context) {
  return await postMessageToSlack(INFO_CHANNEL, message, context)
}

async function error (message, context) {
  return await postMessageToSlack(ERROR_CHANNEL, message, context)
}

function generateAttachments (context) {
  if (context === undefined) {
    return null
  }
  let fields = context.fields
  fields = fields.map(field => {
    field.short = true
    return field
  })
  const attachment = {
    color: context.color,
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

async function postMessageToSlack (channel, message, context) {
  const err = checkSettings(channel)
  if (err !== null) {
    return common.failedResponse(err)
  }
  const url = 'https://slack.com/api/chat.postMessage'
  const attachments = generateAttachments(context)
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
