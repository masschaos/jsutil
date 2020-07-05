const slack = require('./slack')

var providers = new Map()
providers.set('slack', slack)
var PROVIDER = slack

function setProvider (providerName) {
  PROVIDER = providers.get(providerName)
}

function setToken (token) {
  PROVIDER.setToken(token)
}

function setDebugChannel (channelName) {
  PROVIDER.setDebugChannel(channelName)
}

function setInfoChannel (channelName) {
  PROVIDER.setInfoChannel(channelName)
}

function setErrorChannel (channelName) {
  PROVIDER.setErrorChannel(channelName)
}

function setChannels (debugChannelName, infoChannelName, errorChannelName) {
  PROVIDER.setDebugChannel(debugChannelName)
  PROVIDER.setInfoChannel(infoChannelName)
  PROVIDER.setErrorChannel(errorChannelName)
}

async function debug (message, context) {
  return await PROVIDER.debug(message, context)
}

async function info (message, context) {
  return await PROVIDER.info(message, context)
}

async function error (message, context) {
  return await PROVIDER.error(message, context)
}

module.exports = {
  setProvider,
  setToken,
  setDebugChannel,
  setInfoChannel,
  setErrorChannel,
  setChannels,
  debug,
  info,
  error
}
