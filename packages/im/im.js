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

function debug (message, context) {
  PROVIDER.debug(message, context)
}

function info (message, context) {
  PROVIDER.info(message, context)
}

function error (message, context) {
  PROVIDER.error(message, context)
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
