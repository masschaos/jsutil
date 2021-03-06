const slack = require('./slack')

module.exports = class IM {
  /**
   * Initialize a new `IM`.
   *
   * @api public
   */

  /**
    *
    * @param {object} [options] Application options
    * @param {string} [options.provider='slack'] IM provider, debug for local debug only
    * @param {string} [options.token] IM app token required by provider
    * @param {string} [options.debugChannel] Debug channel name
    * @param {string} [options.infoChannel] Info channel name
    * @param {string} [options.errorChannel] Error channel name
    * @param {string} [options.logger] A pino compatible logger
    * @param {string} [options.source] Reporter
    * @param {string} [options.env] Deploy env
    *
    */
  constructor (options) {
    options = options || {}
    this.provider = options.provider || process.env.IM_PROVIDER || 'slack'
    this.token = options.token || process.env.IM_TOKEN
    this.debugChannel = options.debugChannel || process.env.IM_DEBUG_CHANNEL
    this.infoChannel = options.infoChannel || process.env.IM_INFO_CHANNEL
    this.errorChannel = options.errorChannel || process.env.IM_ERROR_CHANNEL
    this.source = options.source || process.env.IM_SOURCE
    this.env = options.env || process.env.IM_ENV
    this.logger = options.logger || console
    this.debugMode = false
    // switch to real provider
    switch (this.provider) {
      case 'slack':
        if (!(this.token && this.debugChannel && this.infoChannel && this.errorChannel)) {
          throw new Error('im init failed, missing slack token or channel option')
        }
        slack.setToken(this.token)
        slack.setChannels(this.debugChannel, this.infoChannel, this.errorChannel)
        slack.setSource(this.source)
        slack.setEnv(this.env)
        this.sender = slack
        break
      case 'debug':
        this.debugMode = true
        break
      default:
        throw new Error(`im init failed, invalid provider option: ${this.provider}`)
    }
  }

  debug (message, context) {
    if (!this.debugMode) {
      this.sender.debug(message, context)
    }
    if (this.logger) {
      this.logger.debug({ context }, message)
    }
  }

  info (message, context) {
    if (!this.debugMode) {
      this.sender.info(message, context)
    }
    if (this.logger) {
      this.logger.info({ context }, message)
    }
  }

  error (message, context) {
    if (!this.debugMode) {
      this.sender.error(message, context)
    }
    if (this.logger) {
      this.logger.error({ context }, message)
    }
  }
}
